// const buttonPlay = document.getElementById("button-play");
// const changePlay = document.getElementById("change-play");
// buttonPlay.addEventListener("click", function () {
//   buttonPlay;
// });

const rockUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=rock";

const trackRock = function () {
  fetch(rockUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dell'album");
      }
    })
    .then((data) => {
      console.log(data);
      const buttonPlay = document.getElementById("button-play");
      const buttonPause = document.getElementById("button-pause");
      function playMusic() {
        let audio = new Audio("");
        audio.play();
      }
      buttonPlay.addEventListener("click", playMusic);
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};
trackRock();
