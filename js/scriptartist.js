
//footer progress button play
let playBtn = document.getElementById("playBtn");
let progressBarra = document.getElementById("progressBarra");

let isPlaying = false;
let progress = 0;
let interval = null;

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    // PLAY
    isPlaying = true;
    playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';

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


//definisco searchparams
let params = new URLSearchParams(window.location.search)
let artistId = params.get("id")

//fetch
fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
  .then(res => res.json())
  .then(artist => {

    console.log(artist)
    
    document.querySelector(".h2-header").textContent = artist.name
    document.querySelector(".header-artist").style.backgroundImage = `url(${artist.picture_xl})`

  })



//inserire album dell'artista con FETCH: "limit" dopo l'id per scegliere solo un massimo di 8 album tra tutti quelli disponibili!
fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`)
  .then(res => res.json())
  .then(data => {

//ciclo per inserire gli album degli artisti
    let trakListArtist = document.querySelector(".popolari")
    let riproduzioniList = document.querySelector(".list-riproduzioni-artist")
    let releaseList = document.querySelector(".list-release-artist")

    data.data.slice(0,8).forEach(album => {
        //div dell'album
        let div = document.createElement("div")

        //immagine album
        let img = document.createElement("img")
        img.src = album.cover_small
        div.appendChild(img)

        //titolo album
        let title = document.createElement("p")
        title.textContent = album.title
        div.appendChild(title)

        trakListArtist.appendChild(div)

        //riproduzioni
        let riproduzioni = document.createElement("p")
        riproduzioni.textContent = album.fans
        riproduzioniList.appendChild(riproduzioni)

        //durata album
        let release = document.createElement("p")
        release.textContent = album.release_date.slice(0,4) //con slice scelgo solo l'anno di pubblicazione
        releaseList.appendChild(release)

        
    });

    console.log(data)

  })

//trak.rank ascoltatori
