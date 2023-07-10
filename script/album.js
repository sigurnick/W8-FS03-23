const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("id");

const getAlbum = function () {
  const urlAlbum =
    "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

  fetch(urlAlbum)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dell' album");
      }
    })
    .then((data) => {
      console.log(data);

      //-------------Inserisco l'limmagine dell' data--------------
      const topContainer = document.getElementById("top-container");
      let newDiv = document.createElement("div");
      newDiv.classList.add("d-flex", "justify-content-center");
      newDiv.innerHTML = `<img
         class="img-fluid mb-3"
         src="${data.cover_medium}"
       />`;
      topContainer.prepend(newDiv); //appendo l'immagine all'inizio del contenitore
      //-------------------------------------------

      //----------------------inserisco immagine artista----------------
      const artistInfoContainer = document.getElementById("artist-info");
      newDiv = document.createElement("div");
      newDiv.innerHTML = `<img
       id="artist-img"
       class="rounded-5"
       src="${data.artist.picture}"
     />`;
      artistInfoContainer.prepend(newDiv);
      //-------------------------------------------------------

      //riferimenti HTML
      const artistName = document.getElementById("artist-name");
      const albumName = document.getElementById("album-name");
      const albumYear = document.getElementById("album-year");
      const albumNSongs = document.getElementById("album-n-songs");
      const albumDurations = document.getElementById("album-duration");

      //inserisco valori nell' HTML
      artistName.innerText = data.contributors[0].name; //nome artista
      albumName.innerText = data.title; //nome album
      albumYear.innerHTML = `&middot; ${data.release_date.slice(
        0,
        4
      )} &middot;`; //anno album
      albumNSongs.innerText = data.nb_tracks + " brani"; //numero canzoni


      //------------------------------
      const tracks = data.tracks.data; //array delle tracce  
      console.log(tracks);                                  
      //----------------------Calcolo la durata dell' album-----------------
      let duration = 0;

      //ciclo l'array delle traccie e prendo la durata di ogni canzone
      tracks.forEach((e) => {
        duration = duration + e.duration;
      });

      duration = duration / 60; //trasformo la durata in secondi in minuti
      console.log("durata trasformata in minuti", duration);
      let durationSecond = duration.toString(); //trasformo in stringa
      durationSecond = durationSecond.slice(3, 5); // estrapolo i secondi dopo il punto (es: 79.71 - prendo 71)
      console.log("secondi dopo il punto", durationSecond);
      duration = Math.floor(duration);
      albumDurations.innerText = duration + " min " + durationSecond + " sec.";
      //--------------------------------------------------------------------------




      //----------------------Inserisco canzoni-----------------
      const tracksContainer = document.getElementById('tacks-container')
      tracks.forEach((e,i)=>{
        newDivTacks = document.createElement('div')
        newDivTacks.classList.add('row', 'justify-content-between')
        newDivTacks.innerHTML = ` <div class="col col-7">
        <div class="d-flex align-items-center gap-3">
          <h5 class="text-white">${i}</h5>

          <div>
            <h4 class="text-white">${e.title}</h4>
            <h6>${e.artist.name}</h6>
          </div>
        </div>
      </div>

      <div class="col col-4 d-none d-lg-block">
        <div>2357657</div>
      </div>

      <div class="col col-1 d-none d-lg-block">
        <div>${e.duration}</div>
      </div>

      <div class="col col-1 d-lg-none">
        <button>
          <i class="bi bi-three-dots-vertical text-secondary fs-4"></i>
        </button>
      </div>`

      tracksContainer.appendChild(newDivTacks)

      })


    })
    .catch((err) => {
      console.log(err);
    });
};

getAlbum();
