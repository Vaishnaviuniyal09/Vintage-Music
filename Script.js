console.log("Welcome to Vintage-Music");
//Initialize the variables
let songIndex=0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let mastersongName = document.getElementById('mastersongName');
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs =[ 
    {songName: "kehdoon Tumhen", filePath: "song/1.mp3" , coverPath:"covers/1.jpeg"},
    {songName: "Yeh Shaam Mastani", filePath: "song/2.mp3" , coverPath:"covers/2.jpeg"},
    {songName: "Chaudhvin Ka Chand Ho", filePath: "song/3.mp3" , coverPath:"covers/3.jpeg"},
    {songName: "Lag ja gale", filePath: "song/4.mp3" , coverPath:"covers/4.jpeg"},
    {songName: "Aabhi na jao", filePath: "song/5.mp3" , coverPath:"covers/5.jpeg"},
    {songName: "kora Kagaz", filePath: "song/6.mp3" , coverPath:"covers/6.jpeg"},
]
songitem.forEach((Element , i)=>{
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
})
//Handle play/pause click
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity =0;
    }
})
//listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressbar.value = progress;
})

myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressbar.value *audioElement.duration/100;
})

const  makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((Element)=>{
    Element.classList.remove('fa-circle-pause');
    Element.classList.add('fa-circle-play');
    
        })
    }

Array.from(document.getElementsByClassName('SongItemPlay')).forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/${songIndex+1}.mp3`;
        mastersongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity =1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=6){
        songIndex =0;
    }
    else{
    songIndex +=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex =0;
    }
    else{
    songIndex -=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})