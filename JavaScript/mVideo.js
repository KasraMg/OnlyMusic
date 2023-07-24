 
let playerBtn = document.querySelector('.vjs-big-play-button')
let customController = document.querySelector('.video-controll-bg')
// playerBtn.addEventListener('click',()=>{
//     customController.style.zIndex='999'
// })




const playIcon =document.querySelector('#play')
const nextIcon =document.querySelector('#next')
const speakerIcon =document.querySelector('#speaker')
const prevIcon =document.querySelector('#prev') 
const fullScreenIcon =document.querySelector('#full-screen')
const currentTime =document.querySelector('#currentTime')
const videoTime =document.querySelector('#videoTime') 
const ArtistName =document.querySelector('#ArtistName')
const videoName =document.querySelector('#videoName')
const video =document.querySelector('video')
const cover =document.querySelector('#cover')
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
 

const videos = [
  {
    path:
      "../Media/pishiVideo.mp4",
    displayName: "Bazgasht",
    artist: "Pishro",
    cover:
      "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
  },
  {
    path:
      "../Media/ho3ein.mp4",
    displayName: "شک",
    artist: "قاف و فدایی",
    cover:
      "../Images/photo_6034947501133510284_y.jpg",
  },
  
   
]

let isPlaying = false;
document.body.addEventListener('keydown',(e)=>{
    console.log(e);
    if (e.code === "Space") {
        e.preventDefault()
        
        if (isPlaying) { 
            pauseSong() 
          
        }else{
            playSong() 
           
        }
    }
    if (e.code === "ArrowRight") {
        newTime =video.currentTime + 10
        video.currentTime=newTime
    }
    if (e.code === "ArrowLeft") {
        newTime =video.currentTime - 10
        video.currentTime=newTime
    }
})
loadSong(videos[0]);
 
nextIcon.addEventListener('click',()=>{
   pauseSong()
  loadSong(videos[1])
})
prevIcon.addEventListener('click',()=>{
  pauseSong()
  loadSong(videos[0])
})
function playSong() {
    isPlaying = true;
    playIcon.innerHTML=''
    playIcon.innerHTML=' <i class="fas fa-pause " ></i>'
    video.play(); 
  }
function pauseSong() {
      isPlaying = false; 
      video.pause();
      playIcon.innerHTML=''
      playIcon.innerHTML=' <i class="fas fa-play " ></i>'
    }
  
playIcon.addEventListener("click", function () {
    if (isPlaying) {
      pauseSong()  
    } else {
      playSong()  
    }
  })


  function loadSong(videoData) {
    console.log(videoData);
    videoName.textContent = videoData.displayName;
    ArtistName.textContent = videoData.artist;
    video.src = videoData.path; 
    video.poster=videoData.cover 
  }


  function updateProgressBar(e) {
    let currentMinutes;
    let currentSeconds ;
    if (isPlaying) { 
      const duration = e.srcElement.duration;
      const currentTime = e.srcElement.currentTime;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100; 
      progress.style.width = progressPercent + "%";
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60); 
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        videoTime.innerHTML = durationMinutes + ":" + durationSeconds;
      }
      // Calculate display for currentTime


      
       currentMinutes = Math.floor(currentTime / 60);
       currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
       
      if (progress.style.width === '100%') { 
        video.pause()
        pauseSong()  
    }
    }
    if (isPlaying) { 
        
   currentTime.innerHTML=''
    currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
    }
   
     
  } 
  function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = video.duration;
    video.currentTime = (clickX / width) * duration; 
  
  }

  let speaker = true
  speakerIcon.addEventListener('click',(e)=>{ 
    if (speaker) {
      video.volume=0
      speaker=false
      speakerIcon.innerHTML=''
      speakerIcon.innerHTML=' <i class="fa-solid fa-volume-xmark relative top-[3px]" ></i>'
    }else{
      video.volume=1
      speakerIcon.innerHTML=''
      speakerIcon.innerHTML=' <i class="fa-solid fa-volume-high relative top-[3px]" ></i>' 
      speaker=true
    }
    fa-volume-xmark
  })


  fullScreenIcon.addEventListener('click',()=>{ 
    video.requestFullscreen()

  })

  video.addEventListener("timeupdate", updateProgressBar);
  progressContainer.addEventListener("click", setProgressBar);