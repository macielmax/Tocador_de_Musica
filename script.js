const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');

const possoclamar = {
    songName: 'Posso Clamar',
    artist: 'Groove Gospel',
    file: 'possoclamar'
};
const quandojesus = {
    songName: 'Quando Jesus Estendeu a sua mão',
    artist: 'Groove Gospel',
    file: 'quandojesus'
};
const soufeliz = {
    songName: 'Sou Feliz',
    artist: 'Groove Gospel',
    file: 'soufeliz'
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [possoclamar, quandojesus, soufeliz];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecide() {
    if (isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `img/${sortedPlaylist[index].file}.png`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();

}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();

}

function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex]
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClick() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }

}

function repeatButtonClick(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else{
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    }
    else {
        playSong();
    }
}

initializeSong();

play.addEventListener('click', playPauseDecide);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClick);
repeatButton.addEventListener('click', repeatButtonClick);
