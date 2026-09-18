
//footer progress button play
let playBtn = document.getElementById("playBtn");
let progressBarra = document.getElementById("progressBarra");

let isPlaying = false;
let progress = 0;
let interval = null;

//eventListener con ciclo for per cliccare sul bottone e attivare/fermare
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    // PLAY
    isPlaying = true;
    playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';

   //progressione 
    interval = setInterval(() => {
      if (progress < 100) {
        progress++;
        progressBarra.value = progress;
      } else {
        clearInterval(interval);
        isPlaying = false;
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
    }, 100); 

  } else {
    // PAUSE
    isPlaying = false;
    playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    clearInterval(interval);
  }
});

//JSON PLAYER
let correnteTraccia = JSON.parse(localStorage.getItem("tracciaCorrente"))
  //ciclo if per mostrare la stessa traccia nel player
  if (correnteTraccia) {
    document.querySelector(".player-title").textContent = correnteTraccia.title
    document.querySelector(".player-artist").textContent = correnteTraccia.artist
    document.querySelector(".player-img").src = correnteTraccia.img
  }



//api home

//seleziono card album dalla class
let albumCards = document.querySelectorAll(".card-album")

//fetch per inserire ogni album nella home
albumCards.forEach(card => {

  let albumId = card.dataset.album

  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
  //convertire risposta in JSON
    .then(response => response.json())
  //definisco i dati dell'album
    .then(album => {

      let img = card.querySelector(".card-img-top")
      let title = card.querySelector(".card-title")
      let artist = card.querySelector(".card-artist")

      img.src = album.cover_medium
      title.textContent = album.title
      artist.textContent = album.artist.name

    })

    //cliccare sull'ALBUM
    //DENTRO AL CICLO FOREACH
    card.addEventListener("click", () => {
      window.location.href = `album.spotify.html?id=${albumId}`

    })

})


//albumId: id dell'album cliccato
//richiama l'url dell'album cliccato:
let params = new URLSearchParams(window.location.search)
let albumId = params.get("id")




//SEARCH BAR
//cerca artista/album--> clicca icona--> fetch mostra in home "ascoltati di recente" (container-all-album) solo i selezionati
//click: i-input
let icons = document.querySelectorAll(".i-input")
let search = document.getElementById("searchInput")
let cards = document.querySelectorAll(".card-album") //querySelector ALL per selezionarle tutte!!!
let container = document.querySelector(".container-all-album")

//evento click sull'icona per chiamare fetch

  icons.forEach((icon) => {

    icon.addEventListener("click", () => {

        let search = icon.nextElementSibling;

        let query = search.value;

        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)

            .then(res => res.json())

            .then(data => {

                console.log(data);

                let result = data.data;

                cards.forEach((card, index) => {

                    let track = result[index];

                    if (track) {

                        let img = card.querySelector(".card-img-top");
                        let title = card.querySelector(".card-title");
                        let artist = card.querySelector(".card-artist");

                        img.src = track.album.cover_medium;
                        title.textContent = track.album.title;
                        artist.textContent = track.artist.name;

                        card.dataset.album = track.album.id;
                    }
                });
            });
    });


  })

