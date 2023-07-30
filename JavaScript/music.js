import { recentMediaHandler } from "./helper/recentMedia.js"
import { saveHandler } from "./helper/likeOrSave.js"
import { idCreator } from "./helper/idCreator.js"
import { updateData } from "./helper/serviceData.js"
import { destructorData } from "./helper/destructorData.js"

import { getData } from "./helper/serviceData.js"
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
const downloadBtn = document.querySelectorAll('#downloadBtn')
const mainSection = document.querySelector('#mainSection')
const loader = document.querySelector('.loader')


let songs;
let allDatas;
let newTime;


window.addEventListener('load', () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlResult = params.get('id');
  getInfoes(urlResult).then(data => {
    loader.classList.add('hidden')
    if (data.status == 200 && data.result.link) {



      allDatas = data.result
      recentMediaHandler(allDatas);




      nextIcon.addEventListener('click', () => {
        pauseSong()
        location.href = `music.html?artist=${data.result.artist}&id=${data.result.related[0].id}`
      })

      prevIcon.addEventListener('click', () => {
        pauseSong()
        location.href = `music.html?artist=${data.result.artist}&id=${data.result.related[0].id}`
      })

      roundomIcon.addEventListener('click', () => {
        pauseSong()
        location.href = `music.html?artist=${data.result.artist}&id=${data.result.related[3].id}`
      })

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
        displayName: data.result.song_farsi ? data.result.song_farsi : data.result.song,
        artist: data.result.artist_farsi ? data.result.artist_farsi : data.result.artist,
        cover: data.result.photo_player,
        id: data.result.id,
      }

      loadSong(songs);

      ArtistName.setAttribute('href', `artist.html?artist=${data.result.artist}&type=all&page=1`)

      if (data.result.lyric_synced) {
        data.result.lyric_synced.map(text => {
          lyric.insertAdjacentHTML("beforeend",
            `
        <p>${text.text}</p>
        `)
        })
      }
      else {
        lyric.insertAdjacentHTML("beforeend",
          `
        <p>متنی یافت نشد :((</p>
        `)
      }


      relatedMusic.innerHTML = ''
      relatedMusic.innerHTML = `
      <section class="bg-lightBg  relative flex justify-between dark:bg-[#18191d]  items-center p-3 rounded-md">
      
      <a href='music.html?artist=${songs.artist}&id=${songs.id}' class="flex gap-4 items-center">
          <img src="${songs.cover}" class=" w-16 h-16 rounded" alt="">
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
              <p class=" font-vazirBold text-[18px]"> ${songs.displayName}</p>
              <p class="text-[#8e8e92] text-[14px]"> ${songs.artist}  </p>
          </div>
      </a>
    
     
        
  </section>
      `

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
  
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="w-6 h-6 cursor-pointer" id="noSavePlayList-more" data-id='${music.id}'}>
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    class="w-6 h-6 text-white hidden cursor-pointer" id="savePlayList-more" data-id='${music.id}'>
    <path fill-rule="evenodd"
      d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
      clip-rule="evenodd" />
  </svg>
      
</section>
    `)
      })

      const showData = getData('showData')
      if (!!showData && !Object.keys(showData).length) {
        let noSavePlayListMore = document.querySelectorAll('#noSavePlayList-more');
        noSavePlayListMore.forEach(item => {
          item.addEventListener('click', () => {
            Swal.fire({
              title: 'برای افزودن به پلی لیست ابتدا وارد شوید.',
              icon: 'warning',
              confirmButtonText: 'ورود',

            }).then((result) => {

              if (result.isConfirmed) {
                location.href = 'login.html'
              }
            })

          })
        });


      } else {

        Array.from(relatedMusic.children).forEach((item, index) => {
          if (index !== 0) {
            let savIcons = item.querySelectorAll('svg');
            const songId = savIcons[0].dataset.id
            let changeSaveIcon = findInPlayList(songId).some(item => item.flag === true);

            if (changeSaveIcon) {
              savIcons[1].classList.remove('hidden');
              savIcons[0].classList.add('hidden');
            }
          }
        })


        let noSavePlayListMore = document.querySelectorAll('#noSavePlayList-more');
        let savePlayListMore = document.querySelectorAll('#savePlayList-more');

        noSavePlayListMore.forEach((item, index) => {
          item.addEventListener('click', event => {
            let svgElement = event.target;

            if (event.target.tagName === 'path') {
              svgElement = event.target.parentNode;
            }
            saveHandlerMore(svgElement.dataset.id, index)

          })
        });

        savePlayListMore.forEach((item, index) => {
          item.addEventListener('click', event => {
            let svgElement = event.target;

            if (event.target.tagName === 'path') {
              svgElement = event.target.parentNode;
            }
            saveHandlerMore(svgElement.dataset.id, index)

          })
        })

      }


      shereIcon.addEventListener('click', () => {
        let link = location.href
        navigator.clipboard.writeText(link)
        iziToast.show({
          message: 'آدرس سایت با موفقیت در کلیپ بورد شما کپی شد',
          rtl: true,
        });
      })
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









  const saveHandlerMore = (id, indexInWrapper) => {
    const showData = getData('showData');
    let noSavePlayListMore = document.querySelectorAll('#noSavePlayList-more')
    let savePlayListMore = document.querySelectorAll('#savePlayList-more')
    console.log(indexInWrapper, id);



    const template = `
 <div class="mx-auto w-2/3 p-4 rounded-lg bg-[#00000045] dark:bg-[#ffffff45] flex flex-col justify-center items-center gap-6" id='alertModalMore'>
   <div class="w-full rounded-md p-2 bg-sky-500 cursor-pointer flex justify-center items-center">+</div>
</div>`

    let arr = findInPlayList(id);
    Swal.fire({
      title: 'پلی لیست',
      html: template,
      focusConfirm: false,
      showConfirmButton: false,
      showCloseButton: true

    });

    let alertModalMore = document.querySelector('#alertModalMore');
    showData.musicsAlbum.forEach((item, index) => {
      alertModalMore.insertAdjacentHTML('afterbegin', `<p class="w-full rounded-md p-2 btn cursor-pointer ${arr.length && arr[index].flag ? '!bg-green-500' : ''}" id='${item.id}'>${item.name}</p>`)
    });


    let alertModalMoreItem = document.querySelectorAll('#alertModalMore p');
    alertModalMoreItem.forEach(item => {

      item.addEventListener('click', event => {


        let index = showData.musicsAlbum.findIndex(item => item.id == event.target.id);
        console.log(event.target.classList.contains('!bg-green-500'));
        if (event.target.classList.contains('!bg-green-500')) {

          event.target.classList.remove('!bg-green-500');
          let indexInPlayList = showData.musicsAlbum[index].data.findIndex(item => item.id == id);
          showData.musicsAlbum[index].data.splice(indexInPlayList, 1);
          updateData(showData);
          let changeSaveIcon = findInPlayList(id).some(item => item.flag === true);

          if (changeSaveIcon) {
            savePlayListMore[indexInWrapper].classList.remove('hidden');
            !noSavePlayListMore[indexInWrapper].classList.contains('hidden') && noSavePlayListMore[indexInWrapper].classList.add('hidden');
          } else {
            console.log(savePlayListMore[indexInWrapper]);
            !savePlayListMore[indexInWrapper].classList.contains('hidden') && savePlayListMore[indexInWrapper].classList.add('hidden');
            noSavePlayListMore[indexInWrapper].classList.remove('hidden');
          }

        } else {


          getInfoes(id).then(data => {
            console.log(data);
            if (data.status == 200 && data.result.link) {
              if (showData.musicsAlbum[index].data.findIndex(item => item.id == data.result.id) == -1) {
                showData.musicsAlbum[index].data.unshift(destructorData(data.result));
                event.target.classList.add('!bg-green-500')
                updateData(showData);
                console.log(showData);
                let changeSaveIcon = findInPlayList(id).some(item => item.flag === true);

                if (changeSaveIcon) {
                  savePlayListMore[indexInWrapper].classList.remove('hidden');
                  !noSavePlayListMore[indexInWrapper].classList.contains('hidden') && noSavePlayListMore[indexInWrapper].classList.add('hidden');
                } else {
                  !savePlayListMore[indexInWrapper].classList.contains('hidden') && savePlayListMore[indexInWrapper].classList.add('hidden');
                  noSavePlayListMore[indexInWrapper].classList.remove('hidden');
                }
              }
            }
          })
        }


      })
    })

    let newPlayListBtn = document.querySelector('#alertModalMore div')
    newPlayListBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'آلبوم جدید',
        html: `<input id="textInput1" class="swal2-input mb-5" placeholder="نام آلبوم" required> `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'ایجاد',
        cancelButtonText: 'لغو',
        preConfirm: () => {
          const inputValue = document.getElementById('textInput1').value;

          if (!inputValue || inputValue.trim() === '') {
            Swal.showValidationMessage('لطفاً نام آلبوم را وارد کنید');

          } else {

            const showData = getData('showData');
            const newMusicAlbum = {
              id: idCreator(showData.musicsAlbum),
              name: inputValue.trim(),
              type: 'musicsAlbum',
              data: []
            }

            showData.musicsAlbum.unshift(newMusicAlbum);
            updateData(showData)

            saveHandler()
          }


        }
      });
    })


  }

  const findInPlayList = (id) => {
    const showData = getData('showData');

    let arr = []


    showData.musicsAlbum.forEach(item => {
      const flag = item.data.some(data => data.id == id)
      arr.push({ name: item.name, flag })
    });

    return arr
  }

})
const getInfoes = async (id) => {
  const res = await fetch(`https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=get_song&id=${id}`)
  const data = await res.json()
  return data
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
    if (progress.style.width > '99%') {
      pauseSong()
      location.href = `music.html?artist=${allDatas.artist}&id=${allDatas.related[4].id}`
    }
  }
  if (isPlaying) {
    currentTime.innerHTML = ''
    currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
  }
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
  songName.textContent = song.displayName;
  ArtistName.textContent = song.artist;
  music.src = song.path;
  cover.style.backgroundImage = `url(${song.cover})`
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;

}

let speaker = true;

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


