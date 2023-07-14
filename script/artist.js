function goBack() {
  window.history.back();
  console.log("We are in previous page");
}
function goForward() {
  window.history.forward();
  console.log("We are in next page");
}


// endpoint per il recupero dell' id degli artisti
const URL = 'https://striveschool-api.herokuapp.com/api/deezer/artist/'
// recuperiamo il parametro "id" della address bar:
const addressBarcontent = new URLSearchParams(location.search)
const artistId = addressBarcontent.get('id')
console.log('ARTISTID', artistId)
console.log(URL + artistId)
//Creo una funzione che mi converte la durata delle canzoni da secondi in minuti
const convertSecondsInMinutes = function (seconds) {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
// faccio uno slice per prendere quello che ce prima e dopo la virgola
// in maniera tale da ottenere numeri interi
    extraSeconds = extraSeconds.toString();
    minutes = minutes.slice(1, 2);
    return minutes + ":" + extraSeconds;
  };
  //faccio una fetch per i dettagli del singolo artista recuperato dalla barra degli indirizzi
fetch(URL + artistId) // + artistId)
.then((res) => {
    if(res.ok){
        return res.json()
    } else {
        throw new Error("Errore nel recupero dei dettagli degli artisti")
    }
})
.then((detail) => {
    console.log('DETAIL',detail)
    //manipolo il DOM
    //aggiungo lo spinner
    const spinnerBox = document.getElementById('spinner-box')
    spinnerBox.classList.add('d-none')
    //mi prendo il riferimento sull'aside per riempirla dinamicamente
    // con i brani piu ascoltati 
    const playlistAside = document.getElementById('libreria-aside')
    // mi creo un template literal e popolo dinamicamente il contenitore
    playlistAside.innerHTML = `
    <div id="libreria-aside" class="d-flex align-items-end">
            <img
              class="img-album-song-aside mt-5"
              src="${detail.picture}"
              alt=""
            />
            <p class="text-white mb-0 ms-3">
             ${detail.tracklist}
            </p>
          </div>
    
    `
    //inserisco i dettagli sull'artisti
    const nomeArtista = document.getElementById('nome-artista')
    nomeArtista.innerHTML = `
    <h1
    class="fs-5-lg position-absolute text-white fw-bold title-album mb-0"
  >
    ${detail.name}
  </h1>
    `
    const immagineArtisti = document.getElementById('immagine-artisti')
  //   immagineArtisti.innerHTML = `
  //   <img
  //   class="w-100 bg-album"
  //   src="${detail.picture_xl}"
  //   alt="album immagine"
  // />
    
  //   `


    immagineArtisti.innerHTML = `
    <div class="img-fluid" style="background-image: url('${detail.picture_xl}'); 
    height: 700px;
    background-size: cover;
   
    background-repeat: no-repeat;
    "> 
    </div>
    
    
    `


    const urlArtist = detail.tracklist
    console.log('url artist',urlArtist)
// faccio una seconda fetch per tirare fuori dal secondo endpoint la tracklist
// degli artisti
fetch(urlArtist)
.then((res)=>{
    if(res.ok){
        return res.json()
    } else {
        throw new Error("Errore nel recupero dei dati")
    }
})
.then((data)=> {
    console.log('artist2url', data)
    playlistAside.innerHTML = `
    <div id="libreria-aside" class="d-flex align-items-end">
    <img
      class="img-album-song-aside mt-5"
      src=""
      alt=""
    />
    <p class="text-white mb-0 ms-3">
     
    </p>
  </div>
    
    `
    // mi ciclo tutte le tracce all'interno dell'array
    for(let i=0; i<5;i++)
      {
        let durationSong = convertSecondsInMinutes(data.data[i].duration)
        //mi creo un div dove appendere i brani
        const braniPopolari = document.getElementById('brani-popolari')
        let newDivPopularSong = document.createElement('div')
        newDivPopularSong.classList.add('d-flex','col','mb-3','justify-content-between','align-items-center','row-song') 
        newDivPopularSong.innerHTML = `
        
        <div class="d-flex align-items-center w-100">
                <span class="text-white fs-4 me-3">${i+1}</span>
                <img
                  class="img-album-song"
                  src="${data.data[i].album.cover}"
                  alt="album"
                />
                <div class="d-flex w-100 justify-content-center flex-column align-items-baseline">
                  <a class="d-flex w-100 hover-ancor-brani text-decoration-none ms-3" href=""
                    >${data.data[i].title}</a
                  >
                  <p class="p-hidden text-white">18,591,546</p>
                </div>
              </div>
              <div class="">
              <span class="span-hidden text-white fs-6"></span>
              <span class="text-white fs-6 me-3">${durationSong}</span>
              </div>
        
        ` 
        braniPopolari.appendChild(newDivPopularSong)
        const aside = document.getElementById('title-album-artist')
          let newSongDiv = document.createElement('div')
          newSongDiv.classList.add("d-flex", "align-items-end")
          newSongDiv.innerHTML = `
          <div id="libreria-aside" class="d-flex align-items-end">
            <img
              class="img-album-song-aside mt-3"
              src="${data.data[i].album.cover}"
              alt=""
            />
            <a class="text-white mb-0 ms-3 text-decoration-none" href=""> ${data.data[i].title}</a>
          </div>
           `
          aside.appendChild(newSongDiv)

      }
})
.catch((err)=> {
    console.log(err)
})
})
.catch((err) => {
    console.log(err)
})
.catch((err) => {
    console.log('Errore',err)
})
