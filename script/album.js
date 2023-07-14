
function goBack() {
	window.history.back();
	console.log('We are in previous page');
}
function goForward() {
	window.history.forward();
	console.log('We are in next page');
}

//----------------------------------funzione per prendere il colore medio di un immagine-----------------------------------------

// crea un canvas con l'immagine e ne ritorno il context 2d
const draw = function (img) {
  let canvas = document.createElement("canvas");
  let c = canvas.getContext("2d");
  c.width = canvas.width = img.clientWidth;
  c.height = canvas.height = img.clientHeight;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
  return c;
};

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
  let col,
    colors = {};
  let pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = c.getImageData(0, 0, c.width, c.height);
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3];
    if (a < 255 / 2) continue;
    col = rgbToHex(r, g, b);
    if (!colors[col]) colors[col] = 0;
    colors[col]++;
  }
  return colors;
};

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0;
  let mostRecurrent = null;
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor;
      highestValue = colorMap[hexColor];
    }
  }
  return mostRecurrent;
};

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  } else {
    return ((r << 16) | (g << 8) | b).toString(16);
  }
};

// inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
const pad = function (hex) {
  return ("000000" + hex).slice(-6);
};

//-------------------------------------------------------------------------------------------------------------------------------



//-------------------funzione che converte secondi in minuti--------------------------------------------
const convertSecondsInMinutes = function (seconds) {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    extraSeconds = extraSeconds.toString();
    minutes = minutes.slice(1, 2);
    return minutes + ":" + extraSeconds;
  };
  //------------------------------------------------------------------------------------------------------




// let params = new URLSearchParams(location.search);

// let q = params.get("q");
const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("id");
console.log(albumId);
const urlAlbum = 'https://striveschool-api.herokuapp.com/api/deezer/album/' + albumId
const getAlbum = function () {

//const urlAlbum ="https://striveschool-api.herokuapp.com/api/deezer/album/75621032";
//const urlAlbum ="https://striveschool-api.herokuapp.com/api/deezer/search?q=innamorato";



  fetch(urlAlbum)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dell' album");
      }
    })
    .then((data) => {
      console.log('dati',data);

      //-------------Inserisco l'limmagine dell' album--------------
      const generateImage = function () {
        // genero dinamicamente un tag <img /> in un <div> vuoto

        let imageSrc = data.cover_medium;

        const topContainer = document.getElementById("top-container");
        const coverContainer = document.getElementById("cover-container");
    
        // let newDivCover = document.createElement("div");
        // newDivCover.classList.add("d-flex", "justify-content-center","coverContainer");

        coverContainer.innerHTML = `<img
        style="box-shadow: 5px 5px 25px 5px #000000"
           class="img-fluid mb-3"
           src="${imageSrc}"
           id="img"
           crossorigin="anonymous"
           onload="start()"
         />`;
        

        
      };
      generateImage();

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

      artistName.innerHTML = `
     <a href="./artist2.html?id=${data.artist.id}">
     
     <h4  class="text-white mb-0">
     ${data.artist.name}
   </h4>
     </a>

      
      `

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
      const tracksContainer = document.getElementById("tacks-container");
      tracks.forEach((e, i) => {
        const songDuration = convertSecondsInMinutes(e.duration); //prende la durata delle canzoni

        newDivTacks = document.createElement("div");
        newDivTacks.classList.add("row", "justify-content-between", "row-song", "align-items-center");
        newDivTacks.innerHTML = ` <div class="col col-7">
        <div class="d-flex align-items-center gap-3">
          <h5 class="text-white">${i+1}</h5>

          <div class="p-1">
            <h4 class="text-white mb-1">${e.title}</h4>
            <a href="./artist2.html?id=${data.artist.id}">
            <h6 class="text-secondary">${e.artist.name}</h6>
            </a>

          </div>
        </div>
      </div>

      <div class="col col-4 d-none d-lg-block">
        <div class="text-secondary">2357657</div>
      </div>

      <div class="col col-1 d-none d-lg-block">
        <div class="text-secondary">${songDuration}</div>
      </div>

      <div class="col col-1 d-lg-none">
        <button>
          <i class="bi bi-three-dots-vertical text-secondary fs-4"></i>
        </button>
      </div>`;

        tracksContainer.appendChild(newDivTacks);
      });
      //--------------------------------------------------------------------
    })
    .catch((err) => {
      console.log(err);
    });
};

getAlbum();

//-------------------------------prende colore medio cover--------------------------------
const start = function () {
  // prendo il riferimento all'immagine del dom
  let imgReference = document.querySelector("#img");

  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference);

  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context);

  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors);

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent);

  // console.log del risultato
  console.log(mostRecurrentHex);

  const topContainerBackground = document.getElementById(
    "top-container-background"
  );

  //metto il background gradient dinamico
  topContainerBackground.style.backgroundImage = `
    linear-gradient(#${mostRecurrentHex}, rgb(18, 18, 18))  
    `;
};
