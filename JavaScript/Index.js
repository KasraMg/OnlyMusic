import { ourPlayList, artists } from "./helper/server.js";
import { getInfoes, mediaHtmlTemplate } from "./utilis/utils.js";





const playListContent = document.querySelector('#playListContent')
const artistsDev = document.querySelector('#allArtist')
const loader = document.querySelector('.loader')

artists.slice(0, 6).map(info => (
  artistsDev.insertAdjacentHTML('beforeend',
    `
    <div class="w-full cursor-pointer">
    <a href='artist.html?artist=${info.englishName}&type=all&page=1' class="">
      <img src="${info.photo}" alt="cover" class="rounded-full mx-auto " style='height:140px;width:140px'>
    </a>

    <a href='artist.html?artist=${info.englishName}&type=all&page=1''  >
      <h3 class="font-bold mt-4 text-center text-lg md:text-md text-darkBg dark:text-white">${info.name} </h3>
    </a>

  </div>
    `)
));

ourPlayList.forEach(item =>
  playListContent.insertAdjacentHTML(
    "beforeend", `
        
        <a href='mPlayList.html?type=ourPlayList&plId=${item.id}&id=${item.data[0].id}' class="w-full cursor-pointer">
        <div class="relative ">
          <img src=${item.data[0].photo} alt="cover" class="rounded-lg w-full h-full">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 absolute top-2 right-2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          </svg>


        </div>

        <div class="mt-4">
          <h3 class="font-bold text-lg md:text-md mb-1 text-darkBg dark:text-white">${item.name}</h3>

        </div>

      </a> `
  ));







window.addEventListener('load', () => {
  const mySwiper1 = document.querySelector('#mySwiper1')
  const specialMusics = document.querySelector('#specialMusics')
  const newSong = document.querySelector('#newSong')
  const newMusicVideo = document.querySelector('#newMusicVideo')

  getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=new_songs').then(data => {
    loader.classList.add('hidden')
    if (data.status == 200) {

      let resultFilter = data.result.filter(data => {
        return data.artist_farsi && data.song_farsi
      })

      resultFilter.slice(0, 8).map(music => (
        newSong.insertAdjacentHTML(
          "beforeend", mediaHtmlTemplate(music))
      ))




    }else{
      location.href='error.html'
    }

  })






  getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=hot_songs').then(data => {
    if (data.status == 200) {
      let resultFilter = data.result.filter(data => {
        return data.artist_farsi && data.song_farsi
      })

      resultFilter.slice(0, 8).map(music => (
        specialMusics.insertAdjacentHTML(
          "beforeend", mediaHtmlTemplate(music))
      ))

      let randomArray = createRandomArray(resultFilter.length);

      let sliderToShow = randomArray.map(item => resultFilter[item])
      sliderToShow.map(music => (
        mySwiper1.insertAdjacentHTML(
          "beforeend", `
                          <a  href='music.html?artist=${music.artist}&id=${music.id}'  class="relative swiper-slide">
                          <img src='${music.photo}' class=' w-full rounded-xl'/>
                          <div class="absolute" id="textCap">
                          <p>${music.artist_farsi}</p>
                          <p>${music.song_farsi.length > 10 ? '...' + music.song_farsi.slice(0, 13) : music.song_farsi}</p>
                        </div>
                          </a>   

                  `)
      ))



      var mySwiperWrapper1 = new Swiper("#mySwiperWrapper1", {
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          400: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          850: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 2,
          },
          1050: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }

      });
    }else{
      location.href='error.html'
    }
  })

  getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=hot_videos').then(data => {
    if (data.status == 200) {
      let resultFilter = data.result.filter(data => {
        return data.artist_farsi && data.song_farsi
      })

      resultFilter.slice(0, 8).map(music => (
        newMusicVideo.insertAdjacentHTML(
          "beforeend", mediaHtmlTemplate(music))
      ))
    }else{
      location.href='error.html'
    }
  })
})

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function createRandomArray(length) {
  let randomArray = [];

  while (randomArray.length < 12) {
    var randomNumber = Math.floor(Math.random() * length);


    if (randomArray.indexOf(randomNumber) === -1) {
      randomArray.push(randomNumber);
    }
  }

  return randomArray;
}







