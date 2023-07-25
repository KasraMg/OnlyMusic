import { artists } from "./helper/server.js";
import { getParamToUrl, addParamToUrl, pagination } from "./utilis/utils.js"


console.log(getParamToUrl('artist'));

const artistName = document.querySelector('#artistName');
const imagesArtistWrapper = document.querySelector('#imagesArtistWrapper img');
const buttonsWrapper = document.querySelectorAll('#buttonsWrapper button');
const paginationWrapper = document.querySelectorAll('#paginationWrapper');



window.addEventListener('load', () => {
    if (getParamToUrl('type') === 'all') {
        buttonsWrapper[0].classList.remove('btn');
        buttonsWrapper[0].classList.add('active__Btn');
        showToDOM()

    } else if (getParamToUrl('type') === 'music') {
        buttonsWrapper[1].classList.remove('btn');
        buttonsWrapper[1].classList.add('active__Btn');
        showToDOM()
    } else {
        buttonsWrapper[2].classList.remove('btn');
        buttonsWrapper[2].classList.add('active__Btn');
        getInfoes(`https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=search&q=${getParamToUrl('artist')}`).then(data => {
    if (data.status == 200) {
        let resultFilter = data.result.videos.filter(data => {
            return data.artist_farsi && data.song_farsi
        })
        showToDOM(resultFilter,'videos');

    }

})
    }
})


buttonsWrapper.forEach(element => {
    element.addEventListener('click', event => {
        addParamToUrl('type', event.target.id)
    })
});




const showToDOM = (resultFilter, type) => {
    pagination(resultFilter, +getParamToUrl('page'), 16, paginationWrapper).map(music => (
        musicWrapper.insertAdjacentHTML(
            "beforeend", `
            
            
            
            <div class="w-full cursor-pointer">
  <div class="relative">
   <a  href='music.html?name=${music.song}}'><img  src=${music.photo} alt="cover" class="rounded-lg w-full h-full"></a> 
        ${type === 'videos' ? `   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
stroke="currentColor" class="w-6 h-6 absolute top-2 right-2">
<path stroke-linecap="round"
  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
</svg>` : ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
stroke="currentColor" class="w-6 h-6 absolute top-2 right-2">
<path stroke-linecap="round" stroke-linejoin="round"
  d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
</svg>`}
   

  </div>

  <a href='music.html?name=${music.song}}' >
    <h3 class="font-bold text-lg md:text-md mb-1 mt-4 text-darkBg dark:text-white"> ${music.song_farsi}</h3>
    <h4 class="font-semibold text-sm md:text-xs text-secondText">${music.artist_farsi}</h4>
  </a>

</div>
            
            
            `)))
}


