console.log("Welcome to spotify");
//initialize the variables
let songindex = 0;
let audioElement= new Audio('song/1.mp3');
let masterplay= document.getElementById('masterplay');
let myprogressbar= document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let songs =[
    {songname: "Let Her Go",filepath: "song/1.mp3", coverpath:"cover/sg1.jpg"},
    {songname: "Country Roads",filepath: "song/2.mp3", coverpath:"cover/2.jpg"},
    {songname: "Haule Haule Vadon Se",filepath: "song/3.mp3", coverpath:"cover/3.jpg"},
    {songname: "Zaroori Tha",filepath: "song/4.mp3", coverpath:"cover/4.jpg"},
    {songname: "At My Worst",filepath: "song/5.mp3", coverpath:"cover/5.jpg"},
]

songitem.forEach((element, i)=>{ 
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innertext = songs[i].songname;
})

//handle play/pause event
masterplay.addEventListener('click',()=>{ 
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    console.log(progress);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeallplays =()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        
    });
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeallplays();
        songindex=parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= 'song/${songindex + 1}.mp3';
        mastersongname.innertext=songs[songindex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=4){
        songindex = 0;
    }
    else{
        songindex +=1;
    }
    audioElement.src= 'song/${songindex+1}.mp3';
    mastersongname.innertext=songs[songindex].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex -=1;
    }
    audioElement.src= 'song/${songindex+1}.mp3';
    mastersongname.innertext=songs[songindex].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})