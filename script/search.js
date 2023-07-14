


function goBack() {
  window.history.back();
  console.log("We are in previous page");
}
function goForward() {
  window.history.forward();
  console.log("We are in next page");
}

const formReference = document.querySelector("form");

//------------------------search event---------------------------
formReference.addEventListener("submit", function (e) {
  let urlAlbum =
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=album:";
  let urlArtist =
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=artist:";
    let urlArtistId =  "https://striveschool-api.herokuapp.com/api/deezer/artist/";

  e.preventDefault();
  const searchInput = document.getElementById("listen");

  urlArtist = urlArtist + '"' + searchInput.value + '"';
  urlAlbum = urlAlbum + '"' + searchInput.value + '"';

  // -------------------------------------ricerca artista-------------------
  fetch(urlArtist)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dell' album");
      }
    })
    .then((data) => {
      console.log("dati", data);

      //-------------------------recupero dati artista-----------
      let artistId = data.data[0].artist.id; 
      let artistImg = data.data[0].artist.picture_xl
      let artistName = data.data[0].artist.name

      console.log('id:',artistId);
      console.log('nome:',artistName);
      //-----------------------------------------------------------

      //--------------------rimuovo contenuto search e creo card-----------
        const section = document.getElementById('categorie')
        section.innerHTML = ''
        searchInput.value = ''
        
       
      //----------------------------inserisco card artista---------------------
      const artistCol = document.getElementById('artist-col')
     artistCol.innerHTML = `
     <h3 class="text-white mt-5 mb-4">Top Result</h3>   

     
        <div class="card">
          <div class="position-relative">
          <a href="./artist2.html?id=${artistId}">
            <img
              src="${artistImg}"
              class="card-img-top p-4 rounded-circle"
            />
            </a>

            <button class="play-button d-none rounded-circle px-2">
              <i class="bi bi-play-fill text-black fs-1 text-center"></i>
            </button>
          </div>
          <div class="px-4 pb-3">
          <a href="./artist2.html?id=${artistId}">
            <h5 class="card-title text-white">${artistName}</h5>
            </a>
            <p class="card-text text-secondary">
              Artist
            </p>
          </div>
        </div>
     
     
     `
      //------------------------------------------------------------------------




      //----------------------------inserisco top song---------------------
      const songCol = document.getElementById('song-col')
      songCol.innerHTML = `
      <h3 class="text-white mt-5">Songs</h3>`


      for(let i=0;i<5;i++){

        let newSongDiv = document.createElement('div')
        newSongDiv.classList.add('d-flex', 'align-items-center', 'gap-1','mb-1')

        newSongDiv.innerHTML = `

       
        <img class="w-25" src="${data.data[i].album.cover}" alt="">
           <div>
           <a href="./album.html?id=${data.data[i].album.id}">
             <h4 class="m-0 text-white">${data.data[i].title}</h4>
             </a>

             <a href="./artist2.html?id=${artistId}">
             <h5 class="text-secondary">${data.data[i].artist.name}</h5>
             </a>
           </div>
       
        
        
        `
        songCol.appendChild(newSongDiv)
      }
      //------------------------------------------------------------------------


      //-----------------------------------Artisti------------------------------
      const atristsCol = document.getElementById('artists-col')

      

      //------------------------------------------------------------------------












      //----------------------------altre fetch------------------------
      const albumCol = document.getElementById('album-col')
      
      const urlArtistId = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=' + searchInput.value
console.log(urlArtistId);

      fetch(urlArtistId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel recupero dell' album");
        }
      })
      .then((data) => {
        console.log("data artist top 50", data);
        let tracklistUrl = data.tracklist
        console.log(tracklistUrl);


         


    })

    
    .catch((err)=>{
        console.log(err);
    })
      //------------------------------------------------------------------------






      
    })
    .catch((err) => {
      console.log(err);
    });

  
});
