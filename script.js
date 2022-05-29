const musicContainer = document.querySelector(".music-container");
const imageContainer = document.querySelector(".image-container");

const prev = document.querySelector("#previous");
const play = document.querySelector("#play");
const next = document.querySelector("#next");

const audio = document.querySelector("#aud1");
const progressBar = document.querySelector(".progressbar");
const progress = document.querySelector(".progress");

const cover = document.querySelector("#cover");
const title = document.querySelector("#title");

//My musics

const songs = ["Burn the house down", "Giver", "Kiss me more", "Venom", "Thank you", "Less I know the better", "Moth to a flame"];

//Keep track of songs
let songIndex = 0;

//Initially load the songs
loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText = song;
    audio.src = `/files/${song}.mp3`
    cover.src = `/images/${song}.jpg`
}

//Play EventListeners

play.addEventListener("click", () => {
    const isPlaying = imageContainer.classList.contains("play");
    // console.log(isPlaying)
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
});

function playSong(){
    imageContainer.classList.add("play");
    document.querySelector(".music-info").classList.add("pop");
    play.querySelector("i.fas").classList.remove("fa-play");
    play.querySelector("i.fas").classList.add("fa-pause");
    audio.play();

}

function pauseSong(){
    imageContainer.classList.remove("play");
    document.querySelector(".music-info").classList.remove("pop");
    play.querySelector("i.fas").classList.remove("fa-pause");
    play.querySelector("i.fas").classList.add("fa-play");
    audio.pause();
}

//Prvious song Event listener

prev.addEventListener("click", () => {
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length-1
    }
    
    loadSong(songs[songIndex])
    playSong();
});

//Next song Event listener

next.addEventListener("click", () => {
    songIndex++
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    
    loadSong(songs[songIndex])
    playSong();
});

//Progress bar Event Listener

audio.addEventListener("timeupdate", (e) => {
    const curr = e.srcElement.currentTime;
    const dur = e.srcElement.duration;

    const progressPercent = (curr/dur) * 100;

    progress.style.width = `${progressPercent}%`;

});

//Set Music using progress bar
function setProgress(e){
    const width = this.clientWidth;
    console.log(width);
    const clickX = e.offsetX;
    console.log(clickX)
    const duration = audio.duration;
    console.log(duration)

    audio.currentTime = (clickX / width) * duration;
    
}

progressBar.addEventListener("click", setProgress);

//Go to next when the music ends

audio.addEventListener("ended", () => {
    songIndex++
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    
    loadSong(songs[songIndex])
    playSong();
});

