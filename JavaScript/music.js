


const playIcon = document.querySelector('#play')
const nextIcon = document.querySelector('#next')
const speakerIcon = document.querySelector('#speaker')
const prevIcon = document.querySelector('#prev')
const roundomIcon = document.querySelector('#roundom')
const currentTime = document.querySelector('#currentTime')
const musicTime = document.querySelector('#musicTime')
const ArtistName = document.querySelector('#ArtistName')
const songName = document.querySelector('#songName')
const music = document.querySelector('audio')
const cover = document.querySelector('#cover')
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const firstDetails = document.getElementById('firstDetails')
const artistName = document.getElementById('artistName')
const lyric = document.getElementById('lyric')
const relatedMusic = document.getElementById('relatedMusic')
const shereIcon = document.getElementById('shereIcon')

let songs;
window.addEventListener('load', () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlResult = params.get('id');

  getInfoes(urlResult).then(data => {
    console.log(data);

    if (data.status == 200) {

      firstDetails.insertAdjacentHTML('beforeend',
        `
      
      <section class="flex justify-center items-center">
      <p>${data.result.plays}</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
        
  </section>

  <section class="flex justify-center items-center border-solid border-r-1 border-[#292932]">
      <p>${data.result.downloads}</p> 
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
      songs = {
        path: data.result.link,
        displayName: data.result.song_farsi,
        artist: data.result.artist_farsi,
        cover: data.result.photo_player,
      }
      loadSong(songs);

      if (data.result.lyric_synced) {
        data.result.lyric_synced.map(text => {
          lyric.insertAdjacentHTML("beforeend",
            `
        <p>${text.text}</p>
        `)
        })
      } else {
        lyric.insertAdjacentHTML("beforeend",
          `
        <p>متنی یافت نشد :((</p>
        `)
      }


      relatedMusic.innerHTML = ''
      data.result.related.slice(0, 10).map(music => {

        relatedMusic.insertAdjacentHTML("beforeend",
          `
    <section class="bg-lightBg  flex justify-between dark:bg-[#18191d]  items-center p-3 rounded-md">
    <a href='music.html?artist=${music.artist}&id=${music.id}' class="flex gap-4 items-center">
        <img src="${music.photo}" class=" w-16 h-16 rounded" alt="">
        <div>
            <p class=" font-vazirBold text-[18px]"> ${music.song_farsi ? music.song_farsi : music.song}</p>
            <p class="text-[#8e8e92] text-[14px]"> ${music.artist_farsi ? music.artist_farsi : music.artist}  </p>
        </div>
    </a>
  
    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
      
</section>
    `)
      })

      shereIcon.addEventListener('click',()=>{
        let link=location.href 
        navigator.clipboard.writeText(link)
        iziToast.show({ 
          message: 'آدرس سایت با موفقیت در کلیپ بورد شما کپی شد',
          rtl: true,
      });
      })
    }
  })

})
const getInfoes = async (id) => {
  const res = await fetch(`https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=get_song&id=${id}`)
  const data = await res.json()
  return data
}



document.body.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
    e.preventDefault()

    if (isPlaying) {
      pauseSong()

    } else {
      playSong()

    }
  }
  if (e.code === "ArrowRight") {
    newTime = music.currentTime + 10
    music.currentTime = newTime
  }
  if (e.code === "ArrowLeft") {
    newTime = music.currentTime - 10
    music.currentTime = newTime
  }
})




let isPlaying = false;


roundomIcon.addEventListener('click', () => {
  pauseSong()
  loadSong(songs[2])
})
nextIcon.addEventListener('click', () => {
  pauseSong()
  loadSong(songs)
})
prevIcon.addEventListener('click', () => {
  pauseSong()
  loadSong(songs)
})
function playSong() {
  isPlaying = true;
  playIcon.innerHTML = ''
  playIcon.innerHTML = ' <i class="fas fa-pause " ></i>'
  music.play();
}
function pauseSong() {
  isPlaying = false;
  music.pause();
  playIcon.innerHTML = ''
  playIcon.innerHTML = ' <i class="fas fa-play " ></i>'
}

playIcon.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()

  }
})


function loadSong(song) {
  console.log(song.cover);
  songName.textContent = song.displayName;
  ArtistName.textContent = song.artist;
  music.src = song.path;
  cover.style.backgroundImage = `url(${song.cover})`
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
      musicTime.textContent = durationMinutes + ":" + durationSeconds;
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
    currentTime.innerHTML = ''
    currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
  console.log(music.currentTime);

}

let speaker = true
speakerIcon.addEventListener('click', (e) => {
  if (speaker) {
    music.volume = 0
    speaker = false
    speakerIcon.innerHTML = ''
    speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-xmark relative top-[3px]" ></i>'
  } else {
    music.volume = 1
    speakerIcon.innerHTML = ''
    speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-high relative top-[3px]" ></i>'
    speaker = true
  }
  fa - volume - xmark
})

music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
