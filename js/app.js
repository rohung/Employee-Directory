let employees = [];
const urlAPI =`https://randomuser.me/api/?results=12&inc=name, picture,
                email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const rightBtn = document.querySelector(".rightBtn");
const leftBtn = document.querySelector(".leftBtn");



fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


function displayEmployees(employeeData) {
    console.log(employeeData);
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach( (employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    });

    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index){
    
    console.log(index);

    let { 
        name, 
        dob, 
        phone, 
        email, 
        location: { city, street, state, postcode}, 
        picture 
    } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <br />
            <p class="phone">${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state}, ${postcode}</p>
            <p class="birthday">Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

   
    if( parseInt(index) === 0) {
       leftBtn.classList.add("hidden");
    } else {
        leftBtn.classList.remove('hidden');
    }
    
    if(parseInt(index) === 11) {
        rightBtn.classList.add("hidden");
    } else {
        rightBtn.classList.remove('hidden');
    }
    


    rightBtn.addEventListener('click', () => {
        if (index < 11) {
            index += 1;
            displayModal(parseInt(index));
            
        }
    });

    leftBtn.addEventListener('click', () => {
        if (index > 0) {
            index -= 1;
            displayModal(parseInt(index));
            
        }
     });

     
}



gridContainer.addEventListener('click' , e => {
    
    if(e.target !== gridContainer) {
        
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    
        overlay.classList.add("hidden");
    
});

