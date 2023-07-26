import { getInfoes, getParamToUrl, addParamToUrl, pagination, mediaHtmlTemplate } from "./utilis/utils.js"

window.addParamToUrl = addParamToUrl

const musicWrapper = document.querySelector('#musicWrapper');
const paginationWrapper = document.querySelector('#paginationWrapper');

const buttonsWrapper = document.querySelectorAll('#buttonsWrapper button');

window.addEventListener('load', () => {

    if (getParamToUrl('type') === 'newMusic') {

        buttonsWrapper[0].classList.remove('btn');
        buttonsWrapper[0].classList.add('active__Btn');

        getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=new_songs').then(data => {
            if (data.status == 200) {
                let resultFilter = data.result.filter(data => {
                    return data.artist_farsi && data.song_farsi
                })
                showToDOM(resultFilter);

            }

        })
    } else {

        buttonsWrapper[1].classList.remove('btn');
        buttonsWrapper[1].classList.add('active__Btn');

        getInfoes('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=hot_songs').then(data => {
            if (data.status == 200) {
                let resultFilter = data.result.filter(data => {
                    return data.artist_farsi && data.song_farsi
                })
                showToDOM(resultFilter);
            }
        })
    }

});


const showToDOM = (resultFilter) => {
    pagination(resultFilter, +getParamToUrl('page'), 20, paginationWrapper).map(music => (
        musicWrapper.insertAdjacentHTML(
            "beforeend", mediaHtmlTemplate(music))
    ))
}


buttonsWrapper.forEach(element => {
    element.addEventListener('click', event => {
        addParamToUrl('type', event.target.id)
    })
})

