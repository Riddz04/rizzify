console.log("Welcome to RIzzify");
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName : "Sajni", filePath : "songs/1.mp3", coverPath : "covers/1.jpg"},
    {songName : "Ik kudi", filePath : "songs/2.mp3", coverPath : "covers/2.png"},
    {songName : "Zulfan", filePath : "songs/3.mp3", coverPath : "covers/3.png"},
    {songName : "Double Take", filePath : "songs/4.mp3", coverPath : "covers/4.png"},
    {songName : "Ishq Mitaye", filePath : "songs/5.mp3", coverPath : "covers/5.png"},
    {songName : "Sahiba", filePath : "songs/6.mp3", coverPath : "covers/6.png"},
    {songName : "Nindaraan Diyaan", filePath : "songs/7.mp3", coverPath : "covers/7.png"},
    {songName : "Kamikaze", filePath : "songs/8.mp3", coverPath : "covers/8.png"},
    {songName : "Jaguar", filePath : "songs/9.mp3", coverPath : "covers/9.png"},
    {songName : "Gone Gone Gone", filePath : "songs/10.mp3", coverPath : "covers/10.png"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
})
//audioElement.play

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    }
    else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
    }
})


//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    ProgressBar.value = progress;
}) 

ProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = ProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = 'songs/${songIndex+1}.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})