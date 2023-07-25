// import { getInfoes, getParamToUrl, addParamToUrl, pagination } from "./utilis/utils.js"

// window.addParamToUrl = addParamToUrl

// const musicVideoWrapper = document.querySelector('#musicVideoWrapper');
// const paginationWrapper = document.querySelector('#paginationWrapper');

// const buttonsWrapper = document.querySelectorAll('#buttonsWrapper button');

// window.addEventListener('load', () => {

//     if (getParamToUrl('type') === 'newVideo') {

//         buttonsWrapper[0].classList.remove('btn');
//         buttonsWrapper[0].classList.add('active__Btn');

//         getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=new_videos').then(data => {
//             if (data.status == 200) {
//                 let resultFilter = data.result.filter(data => {
//                     return data.artist_farsi && data.song_farsi
//                 })
//                 showToDOM(resultFilter);

//             }

//         })
//     } else {

//         buttonsWrapper[1].classList.remove('btn');
//         buttonsWrapper[1].classList.add('active__Btn');
        
//         getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=hot_videos').then(data => {
//             if (data.status == 200) {
//                 let resultFilter = data.result.filter(data => {
//                     return data.artist_farsi && data.song_farsi
//                 })
//                 showToDOM(resultFilter);
//             }
//         })
//     }

// });


// const showToDOM = (resultFilter) => {
//     pagination(resultFilter, +getParamToUrl('page'), 20, paginationWrapper).map(video => (
//         musicVideoWrapper.insertAdjacentHTML(
//             "beforeend", `

//             <div class="w-full cursor-pointer">
//   <div class="relative">
//    <a  href='mVideo.html?name=${video.song}}'><img  src=${video.photo} alt="cover" class="rounded-lg w-full h-full"></a> 

//    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
//    stroke="currentColor" class="w-6 h-6 absolute top-2 right-2">
//    <path stroke-linecap="round"
//      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
//  </svg>

//   </div>

//   <a href='mVideo.html?name=${video.song}}' >
//     <h3 class="font-bold text-lg md:text-md mb-1 mt-4 text-darkBg dark:text-white"> ${video.song_farsi}</h3>
//     <h4 class="font-semibold text-sm md:text-xs text-secondText">${video.artist_farsi}</h4>
//   </a>

// </div>

//             `)
//     ))
// }

// buttonsWrapper.forEach(element => {
//     element.addEventListener('click', event => {
//         addParamToUrl('type', event.target.id)
//     })
// })

