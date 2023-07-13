function goBack() {
  window.history.back();
  console.log("We are in previous page");
}
function goForward() {
  window.history.forward();
  console.log("We are in next page");
}

//------------------------------------------------Rock section----------------------------------------------------
const rockUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=rock";

const getRockRow = function () {
  fetch(rockUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dell' album");
      }
    })
    .then((data) => {
      console.log(data);

      //-----------------------------Rock section-------------------
      const rockRow = document.getElementById("rock-row");

      for (let i = 0; i < 6; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("col", "mb-4");
        newDiv.innerHTML = `
       
        <div class="card h-100">
          <div class="position-relative">
          <a href="./album.html?id=${data.data[i].album.id}">
            <img
              src="${data.data[i].album.cover_medium}"
              class="card-img-top p-4 rounded-5"
            />
            </a>

            <button
              class="play-button d-none rounded-circle px-2 border-0"
            >
              <i class="bi bi-play-fill text-black fs-1"></i>
            </button>
          </div>
          <div class="px-4 pb-3">
          <a href="./album.html?id=${data.data[i].album.id}">
            <h5 class="card-title text-white">${data.data[i].album.title}</h5>
            </a>

            <a href="./artist2.html?id=${data.data[i].artist.id}">
            <p class="card-text text-secondary">${data.data[i].artist.name}</p>
            </a>
          </div>
        </div>
      
        `;
        rockRow.appendChild(newDiv);
      }

       //--------------diaply play button on mouseover--------------
       const allPlayButton = document.querySelectorAll(".play-button");
       const allCards = document.querySelectorAll(".card");
       allCards.forEach((e, i) => {
         e.addEventListener("mouseover", function () {
           allPlayButton[i].classList.remove("d-none");
         });
 
         e.addEventListener("mouseout", function () {
           allPlayButton[i].classList.add("d-none");
         });
       });
       //------------------------------------------------------------
      //---------------------------------------------------------------------
    })
    .catch((err) => {
      console.log(err);
    });
};
//----------------------------------------------------------------------------------------------------

//------------------------------------------------pop section----------------------------------------------------
const popUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=pop";

const getpopRow = function () {
  fetch(popUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dell' album");
      }
    })
    .then((data) => {
      console.log(data);

      //-----------------------------pop section-------------------
      const popRow = document.getElementById("pop-row");

      for (let i = 0; i < 6; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("col", "mb-4");
        newDiv.innerHTML = `
       
        <div class="card h-100">
          <div class="position-relative">
          <a href="./album.html?id=${data.data[i].album.id}">
            <img
              src="${data.data[i].album.cover_medium}"
              class="card-img-top p-4 rounded-5"
            />
            </a>

            <button
              class="play-button d-none rounded-circle px-2 border-0"
            >
              <i class="bi bi-play-fill text-black fs-1"></i>
            </button>
          </div>
          <div class="px-4 pb-3">
          <a href="./album.html?id=${data.data[i].album.id}">
            <h5 class="card-title text-white">${data.data[i].album.title}</h5>
            </a>

            <a href="./artist2.html?id=${data.data[i].artist.id}">
            <p class="card-text text-secondary">${data.data[i].artist.name}</p>
            </a>
          </div>
        </div>
      
        `;
        popRow.appendChild(newDiv);
      }

      //--------------diaply play button on mouseover--------------
      const allPlayButton = document.querySelectorAll(".play-button");
      const allCards = document.querySelectorAll(".card");
      allCards.forEach((e, i) => {
        e.addEventListener("mouseover", function () {
          allPlayButton[i].classList.remove("d-none");
        });

        e.addEventListener("mouseout", function () {
          allPlayButton[i].classList.add("d-none");
        });
      });
      //------------------------------------------------------------

      //---------------------------------------------------------------------
    })
    .catch((err) => {
      console.log(err);
    });
};
//----------------------------------------------------------------------------------------------------





//------------------------------------------------Album popular----------------------------------------------------
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/charts";

const getAlbumRow = function () {
  fetch(albumUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dell' album");
      }
    })
    .then((data) => {
      console.log('album',data);

      

     
    })
    .catch((err) => {
      console.log(err);
    });
};
//----------------------------------------------------------------------------------------------------





getRockRow();
getpopRow();
