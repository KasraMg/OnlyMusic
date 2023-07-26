import { artists } from "./helper/server.js";
import { getInfoes, getParamToUrl, addParamToUrl, pagination, mediaHtmlTemplate } from "./utilis/utils.js"


window.addParamToUrl = addParamToUrl;

const artistName = document.querySelector('#artistName');
const imagesArtistWrapper = document.querySelectorAll('#imagesArtistWrapper img');
const buttonsWrapper = document.querySelectorAll('#buttonsWrapper button');
const paginationWrapper = document.querySelector('#paginationWrapper');
const wrapper = document.querySelector('#wrapper');

let imgSrc = artists.find(artist => {
    if (artist.name === getParamToUrl('artist')) {
        return artist
    }
})

window.addEventListener('load', () => {
    artistName.innerHTML = getParamToUrl('artist')
    imagesArtistWrapper.forEach(img => {
        img.src = imgSrc.photo
    })


    if (getParamToUrl('type') === 'all') {
        getInfoes(`https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=search&q=${getParamToUrl('artist')}`).then(data => {
            if (data.status == 200) {
                let resultMusicFilter = data.result.mp3s.filter(data => {
                    return data.artist_farsi && data.song_farsi
                });
                let resultVideoFilter = data.result.videos.filter(data => {
                    return data.artist_farsi && data.song_farsi
                });
                let allData = [...resultVideoFilter, ...resultMusicFilter];
                showToDOM(allData)

            }

        })

    } else if (getParamToUrl('type') === 'music') {

        getInfoes(`https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=search&q=${getParamToUrl('artist')}`).then(data => {
            if (data.status == 200) {
                let resultFilter = data.result.mp3s.filter(data => {
                    return data.artist_farsi && data.song_farsi
                });
                showToDOM(resultFilter);

            }

        })
    } else {

        getInfoes(`https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=search&q=${getParamToUrl('artist')}`).then(data => {
            if (data.status == 200) {
                let resultFilter = data.result.videos.filter(data => {
                    return data.artist_farsi && data.song_farsi
                });
                showToDOM(resultFilter);

            }

        })
    }
})


buttonsWrapper.forEach(element => {
    element.classList.remove('btn');
    if (element.id === getParamToUrl('type')) {
        element.classList.add('active__Btn');
    }

    element.addEventListener('click', event => {
        addParamToUrl('type', event.target.id)
    })
});



const showToDOM = (resultFilter) => {
    pagination(resultFilter, +getParamToUrl('page'), 16, paginationWrapper).map(item => (
        wrapper.insertAdjacentHTML(
            "beforeend", mediaHtmlTemplate(item))))
}




