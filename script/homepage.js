const allPlayButton = document.querySelectorAll('.play-button')
const allCards = document.querySelectorAll('.card')


//diaply play button on mouseover
allCards.forEach((e,i)=>{
  
    e.addEventListener('mouseover',function(){
        
        allPlayButton[i].classList.remove('d-none')
    })

    e.addEventListener('mouseout',function(){
        allPlayButton[i].classList.add('d-none')
    })
})

function goBack() {
	window.history.back();
	console.log('We are in previous page');
}
function goForward() {
	window.history.forward();
	console.log('We are in next page');
}






const urlAlbum = 'https://striveschool-api.herokuapp.com/api/deezer/search/album?q=blanco'

//------------------------------------------------Fetch----------------------------------------------------
const getData = function () {


  fetch(urlAlbum)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dell' album");
      }
    })
    .then((data)=>{

       console.log(data);

    })
    .catch((err)=>{
        console.log(err);
    })

}

getData()