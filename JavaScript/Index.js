import { ourPlayList, artists } from "./helper/server.js";
import { } from "./helper/server.js";

import { getInfoes, mediaHtmlTemplate } from "./utilis/utils.js";

let swiper = new Swiper(".mySwiper", {
  rewind: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let introSwiper2 = new Swiper(".introSwiper2", {
  rewind: true,
  slidesPerView: 2,
  spaceBetween: 10,


  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 20,
    }
  },
});



const playListContent = document.querySelector('#playListContent')
const artistsDev = document.querySelector('#allArtist')

artists.map(info => (
  artistsDev.insertAdjacentHTML('beforeend',
    `
    <div class="w-full cursor-pointer">
    <a href='artist.html?artist=${info.name}&type=all&page=1' class="">
      <img src="${info.photo}" alt="cover" class="rounded-full mx-auto " style='height:140px;width:140px'>
    </a>

    <a href='artist.html?artist=${info.name}&type=all&page=1''  >
      <h3 class="font-bold mt-4 text-center text-lg md:text-md text-darkBg dark:text-white">${info.name} </h3>
    </a>

  </div>
    `)
));

ourPlayList.forEach(item =>
  playListContent.insertAdjacentHTML(
    "beforeend", `
        
        <a href='#' class="w-full cursor-pointer">
        <div class="relative ">
          <img src=${item[1][0].photo} alt="cover" class="rounded-lg w-full h-full">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 absolute top-2 right-2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          </svg>


        </div>

        <div class="mt-4">
          <h3 class="font-bold text-lg md:text-md mb-1 text-darkBg dark:text-white">${item[0]}</h3>

        </div>

      </a> `
  ));




window.addEventListener('load', () => {
  const indexSwiper1 = document.querySelector('#indexSwiper1')
  const indexSwiper2 = document.querySelector('#indexSwiper2')
  const specialMusics = document.querySelector('#specialMusics')
  const newSong = document.querySelector('#newSong')
  const newMusicVideo = document.querySelector('#newMusicVideo')

  getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=new_songs').then(data => {
      if (data.status == 200) {
          let resultFilter = data.result.filter(data => {
              return data.artist_farsi && data.song_farsi
          })

          resultFilter.slice(0, 8).map(music => (
              newSong.insertAdjacentHTML(
                  "beforeend", mediaHtmlTemplate(music))
          ))

          resultFilter.slice(9, 15).map(music => (
              indexSwiper1.insertAdjacentHTML(
                  "beforeend", `

                          <a  href='music.html?artist=${music.artist}&id=${music.id}'  class="swiper-slide" style=' height:288px; background-repeat: no-repeat; background-position: center; background-size: cover;   border-radius: 10px;'>
                          <img src='${music.photo}' class=' absolute w-full rounded-xl ' style='    top: -140px;'/>
                              <div class=" font-vazirLight absolute w-full right-5 space-y-2 text-right text-white bottom-5" style='position:absolute; right:30px; bottom:30px;'>
                              <p style=" width: fit-content;  padding-left: 0.75rem; padding-right: 0.75rem;  padding-top: 0.25rem ;  padding-bottom: 0.25rem ; border-radius: 0.15rem;  background: #ffffff38;"  class="  text-black text-2xl !font-vazirMedium"> ${music.song_farsi} </p>
                                  <p style=" width: fit-content;  padding-left: 0.75rem; padding-right: 0.75rem;  padding-top: 0.25rem ;  padding-bottom: 0.25rem ; border-radius: 0.15rem;" class='bg-white rounded-xl text-black w-fit px-3 py-1'>${music.artist_farsi}</p>
                              </div>

                          </a>

                  `)
          ))

          resultFilter.slice(16, 100).map(music => (
              indexSwiper2.insertAdjacentHTML(
                  "beforeend", `

                          <a  href='music.html?artist=${music.artist}&id=${music.id}'  class="swiper-slide h-72 rounded-md bg-no-repeat bg-cover bg-center " style='height:288px'>
                          <img src='${music.photo}' class=' absolute w-full rounded-xl ' style='    top: -89px;'/>
                              <div class=" font-vazirLight absolute w-full right-5 space-y-2 text-right text-white bottom-5"  style='position:absolute; right:30px; bottom:30px;'>
                              <p style=" width: fit-content;  padding-left: 0.75rem; padding-right: 0.75rem;  padding-top: 0.25rem ;  padding-bottom: 0.25rem ; border-radius: 0.15rem;  background: #ffffff38;" class=" text-black text-2xl !font-vazirMedium"> ${music.song_farsi} </p>
                                  <p style=" width: fit-content;  padding-left: 0.75rem; padding-right: 0.75rem;  padding-top: 0.25rem ;  padding-bottom: 0.25rem ; border-radius: 0.15rem;" class='bg-white rounded-xl text-black w-fit px-3 py-1'>${music.artist_farsi}</p>
                              </div>

                          </div>

                  `)
          ))
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
      }
  })

  getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=new_videos').then(data => {
      if (data.status == 200) {
          let resultFilter = data.result.filter(data => {
              return data.artist_farsi && data.song_farsi
          })

          resultFilter.slice(0, 8).map(music => (
              newMusicVideo.insertAdjacentHTML(
                  "beforeend", mediaHtmlTemplate(music))
          ))
      }
  })
})

