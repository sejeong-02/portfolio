
let song = document.querySelector("#song");
let playBtn = document.querySelector("#play-button");
let stopBtn = document.querySelector("#stop-button");



playBtn.addEventListener('click', function () {
    song.play();

})

stopBtn.addEventListener('click', function () {
    song.pause();

})

song.volume = .35;
