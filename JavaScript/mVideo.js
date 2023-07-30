import { recentMediaHandler } from "./helper/recentMedia.js"
import { getParamToUrl } from "./utilis/utils.js"
import { destructorData } from "./helper/destructorData.js"
import { getData, updateData } from "./helper/serviceData.js"

const noLikeMedia = document.querySelector('#noLikeMedia')
const likeMedia = document.querySelector('#likeMedia')


const playIcon = document.querySelector('#play')
const nextIcon = document.querySelector('#next')
const speakerIcon = document.querySelector('#speaker')
const prevIcon = document.querySelector('#prev')
const fullScreenIcon = document.querySelector('#full-screen')
const currentTime = document.querySelector('#currentTime')
const videoTime = document.querySelector('#videoTime')
const ArtistName = document.querySelector('#ArtistName')
const videoName = document.querySelector('#videoName')
const video = document.querySelector('video')
const cover = document.querySelector('#cover')
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const firstDetails = document.getElementById('firstDetails')
const shereIcon = document.getElementById('shereIcon')
const relatedVideos = document.getElementById('relatedVideos')
const downloadBtn = document.querySelectorAll('#downloadBtn')
const mainSection = document.querySelector('#mainSection')
const loader = document.querySelector('.loader')

let videos;
let allDatas;
let newTime;

let sendVideoData = null;
window.addEventListener('load', () => {

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlResult = params.get('id');


  getInfoes(urlResult).then(data => {
    console.log(data);
    loader.classList.add('hidden')
    if (data.status == 200 && data.result.link) {



      allDatas = data.result
      sendVideoData = allDatas
      recentMediaHandler(allDatas)

      nextIcon.addEventListener('click', () => {
        pauseVideo()
        location.href = `mVideo.html?artist=${data.result.artist}&id=${data.result.related[2].id}`
      })

      prevIcon.addEventListener('click', () => {
        pauseVideo()
        location.href = `mVideo.html?artist=${data.result.artist}&id=${data.result.related[0].id}`
      })

      videos = {

        path: data.result.link,
        displayName: data.result.song_farsi ? data.result.song_farsi : data.result.song,
        artist: data.result.artist_farsi ? data.result.artist_farsi : data.result.artist,
        cover: data.result.photo_player,
        id: data.result.id,

      }

      loadVideo(videos);

      firstDetails.insertAdjacentHTML('beforeend',
        `
    
    <section class="flex justify-center items-center">
    <p>${data.result.views}</p>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
      
</section>

<section class="flex justify-center items-center border-solid border-r-1 border-[#292932]">
    <p>${data.result.likes}</p> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      
</section>

<section class="flex justify-center items-center border-solid border-r-1 border-[#292932]">
    <p>${data.result.likes}</p>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5  mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
      
      
</section>
    `
      )

      shereIcon.addEventListener('click', () => {
        let link = location.href
        navigator.clipboard.writeText(link)
        iziToast.show({
          message: 'آدرس سایت با موفقیت در کلیپ بورد شما کپی شد',
          rtl: true,
        });
      })

      relatedVideos.innerHTML = ''
      relatedVideos.innerHTML = `
    <section class="bg-lightBg  relative flex justify-between dark:bg-[#18191d]  items-center p-3 rounded-md">
    
    <a href='mVideo.html?artist=${videos.artist}&id=${videos.id}' class="flex gap-4 items-center">
        <img src="${videos.cover}" class=" w-16 h-16 rounded" alt="">
        <div class="loaderSong absolute  " style="right:15px; top:32px">
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
      </div>
        <div>
            <p class=" font-vazirBold text-[18px]"> ${videos.displayName}</p>
            <p class="text-[#8e8e92] text-[14px]"> ${videos.artist}  </p>
        </div>
    </a>
  
  
      
</section>
    `

      data.result.related.slice(0, 10).map(music => {

        relatedVideos.insertAdjacentHTML("beforeend",
          `
  <section class="bg-lightBg  flex justify-between dark:bg-[#18191d]  items-center p-3 rounded-md">
  <a href='mVideo.html?artist=${music.artist}&id=${music.id}' class="flex gap-4 items-center">
      <img src="${music.photo}" class=" w-16 h-16 rounded" alt="">
      <div>
          <p class=" font-vazirBold text-[18px]"> ${music.song_farsi ? music.song_farsi : music.song}</p>
          <p class="text-[#8e8e92] text-[14px]"> ${music.artist_farsi ? music.artist_farsi : music.artist}  </p>
      </div>
  </a>

 
    
</section>
  `)
      })

      //////////////////////////////////////////////////////////////////////////
      const showData = getData('showData');

      if (!!showData && !Object.keys(showData).length) {
        noLikeMedia.addEventListener('click', () => noLoginSwal('برای لایک کردن ابتدا وارد شوید.'));
      } else {
        let likeFlag = showData.favorite.some(item => item.id == getParamToUrl('id'));
        if (likeFlag) {
          likeMedia.classList.remove('hidden');
          noLikeMedia.classList.add('hidden');
        }
        noLikeMedia.addEventListener('click', noLikeMediaHandler)
        likeMedia.addEventListener('click', likeMediaHandler);
      }
      //////////////////////////////////////////////////////////////////////////


      const musicUrl = data.result.link;

      downloadBtn.forEach(btn => {
        btn.addEventListener('click', () => {
          download(musicUrl);
        })
      })

      function download(url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = true;
        link.click();
      }

    }
    else {
      mainSection.innerHTML = ''
      mainSection.insertAdjacentHTML("beforeend",
        `
      <img style=' margin-top:5rem' src='../Images/icons8-sad-100.png' class='mx-auto' />
      <p style="width: fit-content; margin-bottom:8rem; margin-top:1rem;" class="bg-lightBg dark:bg-darkLbg dark:text-white rounded-md mx-auto text-black   w-fit px-6 py-3">اطلاعات اهنگ یافت نشد :))</p>
      `)
      mainSection.style.textAlign = 'center'
      mainSection.style.gridTemplateColumns = 'auto'
    }
  })
})

const getInfoes = async (id) => {
  const res = await fetch(` https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=get_video&id=${id} `)
  const data = await res.json()
  return data
}



let isPlaying = false;
document.body.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
    e.preventDefault()

    if (isPlaying) {
      pauseVideo()

    } else {
      playVideo()

    }
  }
  if (e.code === "ArrowRight") {
    newTime = video.currentTime + 10
    video.currentTime = newTime
  }
  if (e.code === "ArrowLeft") {
    newTime = video.currentTime - 10
    video.currentTime = newTime
  }
})


nextIcon.addEventListener('click', () => {
  pauseVideo()
  loadVideo(videos)
})
prevIcon.addEventListener('click', () => {
  pauseVideo()
  loadVideo(videos)
})
function playVideo() {
  isPlaying = true;
  playIcon.innerHTML = ''
  playIcon.innerHTML = ' <i class="fas fa-pause " ></i>'
  video.play();
}
function pauseVideo() {
  isPlaying = false;
  video.pause();
  playIcon.innerHTML = ''
  playIcon.innerHTML = ' <i class="fas fa-play " ></i>'
}

playIcon.addEventListener("click", function () {
  if (isPlaying) {
    pauseVideo()
  } else {
    playVideo()
  }
})


function loadVideo(videoData) {
  videoName.textContent = videoData.displayName;
  ArtistName.textContent = videoData.artist;
  video.src = videoData.path;
  video.poster = videoData.cover
}


function updateProgressBar(e) {
  let currentMinutes;
  let currentSeconds;
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

    if (progress.style.width > '99%') {
      location.href = `mVideo.html?artist=${allDatas.artist}&id=${allDatas.related[4].id}`
      pauseVideo()

    }
  }
  if (isPlaying) {

    currentTime.innerHTML = ''
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
speakerIcon.addEventListener('click', (e) => {
  if (speaker) {
    video.volume = 0
    speaker = false
    speakerIcon.innerHTML = ''
    speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-xmark relative top-[3px]" ></i>'
  } else {
    video.volume = 1
    speakerIcon.innerHTML = ''
    speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-high relative top-[3px]" ></i>'
    speaker = true
  }
  fa - volume - xmark
})


fullScreenIcon.addEventListener('click', () => {
  video.requestFullscreen()

})

video.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

/////////////////////////////////////////////////////////////////////////////////////////

const noLikeMediaHandler = () => {

  const showData = getData('showData');

  likeMedia.classList.remove('hidden');
  noLikeMedia.classList.add('hidden');
  likeMedia.style.pointerEvents = 'none';
console.log(sendVideoData);
  showData.favorite.unshift(destructorData(sendVideoData));
  updateData(showData);
  likeMedia.style.pointerEvents = 'auto'



}

const likeMediaHandler = () => {

  likeMedia.classList.add('hidden');
  noLikeMedia.classList.remove('hidden');
  const showData = getData('showData');
  let mediaExistenceIndex = showData.favorite.findIndex(item => item.id === +getParamToUrl('id'));
  if (mediaExistenceIndex !== -1) {
      showData.favorite.splice(mediaExistenceIndex, 1);
      updateData(showData)

  }
}

const noLoginSwal = text => {
  Swal.fire({
      title: text,
      icon: 'warning',
      confirmButtonText: 'ورود',

  }).then((result) => {

      if (result.isConfirmed) {
          location.href = 'login.html'
      }
  })
}