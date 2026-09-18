

//LOCAL STORAGE per il player
let correnteTraccia = JSON.parse(localStorage.getItem("tracciaCorrente"))
  //ciclo if per mostrare la stessa traccia nel player
  if (correnteTraccia) {
    document.querySelector(".player-title").textContent = correnteTraccia.title
    document.querySelector(".player-artist").textContent = correnteTraccia.artist
    document.querySelector(".player-img").src = correnteTraccia.img
  }


//navbar sticky
let bar = document.getElementById("bar");
let container = document.querySelector(".col-8-album");

container.addEventListener("scroll", () => {
  if (container.scrollTop > 220) {
    bar.classList.add("sticky-active");
  } else {
    bar.classList.remove("sticky-active");
  }
});


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



//inserire i dati degli album nella pagina album.html
let params = new URLSearchParams(window.location.search)
let albumId = params.get("id")

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
  .then(res => res.json())
  .then(album => {

    document.querySelector(".img-album").src = album.cover_big
    document.querySelector(".h1-album").textContent = album.title
    document.querySelector(".artist-album").textContent = album.artist.name
    

let img = document.querySelector(".img-artist")
img.src = album.artist.picture


//cliccare sull'ARTIST!!! event listener click
    document.querySelector(".artist-album").addEventListener ("click", () => {
        window.location.href = `artist.spotify.html?id=${album.artist.id}`
    })


//DENTRO A FETCH!!! : tracklist/riproduzioni/duration


//variabili per gli elementi dell'album
let trackList = document.querySelector(".list-album")
let riproduzioni = document.querySelector(".list-riproduzioni")
let trackTime = document.querySelector(".list-time")


//ciclo per chiamare le riproduzioni
album.tracks.data.forEach(track => {

//tracklist
let title = document.createElement("li")
title.textContent = track.title
trackList.appendChild(title)

//artist name
let artist = document.createElement("p")
artist.textContent = track.artist.name
trackList.appendChild(artist)

//riproduzioni 
let plays = document.createElement("p")
plays.textContent = track.rank

riproduzioni.appendChild(plays)

//time duration
//minuti e secondi 
let minutes = Math.floor(track.duration / 60)
let seconds = track.duration % 60

let time = document.createElement("p")
time.textContent = `${minutes}:${seconds}`

trackTime.appendChild(time)



//click sulla traccia --> la traccia appare nel player con i suoi dati (nel forEach del fetch)
//variabili per il PLAYER
let playerTitle = document.querySelector(".player-title")
let playerArtist = document.querySelector(".player-artist")
let playerCover = document.querySelector(".player-img")


//eventListener
title.addEventListener("click", () => {
    playerTitle.textContent = track.title
    playerArtist.textContent = track.artist.name
    playerCover.src = album.cover_small

    //LOCALSTORAGE per salvare la traccia nel player quando viene cambiata pagina!:
    let elementiPlayer = {
    title: track.title,
    artist: track.artist.name,
    img: album.cover_small,
  }

  //JSON stringa
  localStorage.setItem("tracciaCorrente", JSON.stringify(elementiPlayer))
  //JSON riportato js (IN OGNI JS PAGINA)!! anche in questa, ad inizio pagina
  
})


//click sulla traccia !!MOBILE!!
//variabili per il PLAYER
let playerTitleMobile = document.querySelector(".player-title-mobile")
let playerArtistMobile = document.querySelector(".player-artist-mobile")
let playerCoverMobile = document.querySelector(".player-img-mobile")


//eventListener
title.addEventListener("click", () => {
    playerTitleMobile.textContent = track.title
    playerArtistMobile.textContent = track.artist.name
    playerCoverMobile.src = album.cover_small

    //LOCALSTORAGE per salvare la traccia nel player quando viene cambiata pagina!:
    let elementiPlayer = {
    title: track.title,
    artist: track.artist.name,
    img: album.cover_small,
  }

  //JSON stringa
  localStorage.setItem("tracciaCorrente", JSON.stringify(elementiPlayer))
  //JSON riportato js (IN OGNI JS PAGINA)!! anche in questa, ad inizio pagina
  
})


   })

console.log(album)

})





