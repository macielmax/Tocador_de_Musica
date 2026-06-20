const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

const possoclamar = {
    songName : 'Posso Clamar',
    artist : 'Groove Gospel',
    file : 'posso_clamar'
};
const quandojesusestendeuasuamao = {
    songName : 'Quando Jesus Estendeu a sua mão',
    artist : 'Groove Gospel',
    file : 'quando_jesus_ estendeu_a_ sua_mão'
};
const soufeliz = {
    songName : 'Sou Feliz',
    artist : 'Groove Gospel',
    file : 'sou_feliz'
};

let isPlaying = false;
const playlist = [possoclamar, quandojesusestendeuasuamao, soufeliz];
let index = 0;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecide(){
    if(isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong(){
    cover.src = `img/${playlist[index].file}.png`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = playlist.length;
    }
    else{
        index -= 1;
    }
    initializeSong();
    playSong();
    
}

function nextSong(){
    if(index === playlist.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    initializeSong();
    playSong();
    
}

initializeSong();

play.addEventListener('click', playPauseDecide);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);


