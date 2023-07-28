import { getParamToUrl, getInfoes, mediaHtmlTemplate } from "./utilis/utils.js";

window.addEventListener('load', () => {
    const param = getParamToUrl('param')

    console.log(param);

    const SearchMusics = document.querySelector('#SearchMusics')
    const SearchVideos = document.querySelector('#SearchVideos') 
    const musicSearchParent = document.querySelector('#musicSearchParent') 
    const videoSearchParent = document.querySelector('#videoSearchParent') 
    const loader = document.querySelector('.loader')

    getInfoes(`https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=search&q=${param}`).then(data => {
        console.log(data);
        loader.classList.add('hidden')
        if (data.result.mp3s.length > 0) {
            data.result.mp3s.map(music => {
                SearchMusics.insertAdjacentHTML('beforeend', `
                
                <div style="width:250px"  >
                <div class="relative">
                <a  href='music.html?artist=${music.artist}&id=${music.id}'>
                <img  src=${music.photo} alt="cover" class="rounded-lg  sm:!w-full object-cover" style="height:200px;width:230px;margin: 0rem auto;"></a> 
                        
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 absolute    text-white" style='right:27px;top:10px'>
                <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
                 
                      
                
                </div>
                <a  href='${music.type === 'mp3' ? `music.html` : `mVideo.html`}?artist=${music.artist}&id=${music.id}' >
                <h3 style="padding-right:23px;" class="font-bold text-lg md:text-md mb-1 mt-4 text-darkBg dark:text-white"> ${music.song_farsi ? music.song_farsi : music.song}</h3>
                <h4 style="padding-right:23px;" class="font-semibold text-sm md:text-xs text-secondText">${music.artist_farsi ? music.artist_farsi : music.artist}</h4>
                </a>
                
                </div>`

                )
            })

        } else {
            musicSearchParent.innerHTML=''
            musicSearchParent.insertAdjacentHTML("beforeend",
            `
            <img style=' margin-top:3rem' src='../Images/icons8-sad-100.png' class='mx-auto' />
            <p style="width: fit-content; margin-bottom:3rem; margin-top:2rem;" class="bg-lightBg dark:bg-darkLbg dark:text-white rounded-md mx-auto text-black   w-fit px-6 py-3"> آهنگی یافت نشد :))</p>
            `)  
             
        }

        if (data.result.videos.length > 0) {
            data.result.videos.map(video => {
                SearchVideos.insertAdjacentHTML('beforeend', `
                
                <div style="width:250px"  >
                <div class="relative">
                <a  href='mVideo.html?artist=${video.artist}&id=${video.id}'>
                <img  src=${video.photo} alt="cover" class="rounded-lg  sm:!w-full object-cover" style="height:200px;width:230px;margin: 0rem auto;"></a> 
                        
                 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 absolute top-2 right-2 text-white" style='right:27px;top:10px'>
                <path stroke-linecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
                 
                      
                
                </div>
                <a  href='${video.type === 'mp3' ? `music.html` : `mVideo.html`}?artist=${video.artist}&id=${video.id}' >
                <h3 style="padding-right:23px;" class="font-bold text-lg md:text-md mb-1 mt-4 text-darkBg dark:text-white"> ${video.song_farsi ? video.song_farsi : video.song}</h3>
                <h4 style="padding-right:23px;" class="font-semibold text-sm md:text-xs text-secondText">${video.artist_farsi ? video.artist_farsi : video.artist}</h4>
                </a>
                
                </div>`

                )
            })

        } else {
            videoSearchParent.innerHTML=''
            videoSearchParent.insertAdjacentHTML("beforeend",
            `
            <img style=' margin-top:3rem' src='../Images/icons8-sad-100.png' class='mx-auto' />
            <p style="width: fit-content; margin-bottom:3rem; margin-top:2rem;" class="bg-lightBg dark:bg-darkLbg dark:text-white rounded-md mx-auto text-black   w-fit px-6 py-3"> ویدیویی یافت نشد :))</p>
            `)  
        }
         

    })
})