


function searchFilter (){
    let input = document.getElementById('myInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    
    for(i=0; i < cards.length; i++){
        let card = cards[i];
        let name = card.getAttribute("data-caption").toLowerCase();
        
        if(name.indexOf(input) > -1){
            cards[i].style.display="";
        } else {
            cards[i].style.display="none";
        }
    }
}