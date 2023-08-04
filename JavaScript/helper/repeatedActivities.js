import { getInfoes, getParamToUrl, addParamToUrl, pagination, mediaHtmlTemplate } from "../utilis/utils.js"
//////////////////////////////////////////////////////////////////////////////////
const buttonsWrapper = document.querySelectorAll('#buttonsWrapper button');
const paginationWrapper = document.querySelector('#paginationWrapper');
const mainContent = document.querySelector('#mainContent');
const loader = document.querySelector('.loader')
//////////////////////////////////////////////////////////////////////////////////
window.addParamToUrl = addParamToUrl;

buttonsWrapper.forEach(element => {
    // element.classList.remove('btn');
    if (element.id === getParamToUrl('type')) {
        element.classList.add('active__Btn');
    }

    element.addEventListener('click', event => {
        addParamToUrl('type', event.target.id)
    })
});
//////////////////////////////////////////////////////////////////////////////////
const getData = async (url, key, type, artistFilter) => {
    let mainData = null;

    let a = await getInfoes(url);
    if (a.status !== 200) {
          location.href='error.html' 
    } else {
        mainData = a.result




        if (type === 'all') {
            let allData = [...filterPersianData(mainData.videos,artistFilter), ...filterPersianData(mainData.mp3s,artistFilter)];
            showToDOM(allData, 'all')
        } else if (key) {
            showToDOM(filterPersianData(mainData[key], artistFilter));

        } else {
            showToDOM(filterPersianData(mainData, artistFilter));

        }
    }
}

const showToDOM = (resultFilter, type) => {
    if (resultFilter.length) {

        pagination(resultFilter, +getParamToUrl('page'), 16, paginationWrapper).map(item => (
            mainContent.insertAdjacentHTML(
                "beforeend", mediaHtmlTemplate(item, type))))
    } else {
        mainContent.insertAdjacentHTML(
            "beforeend", `  <div class="text-orange-400">
اثری یافت نشد :(
            </div>`)
    }
    loader.classList.add('hidden')

}
const filterPersianData = (array, artistFilter) => {
    let showArray = array.filter(data => {
        if (artistFilter) {

            return data.artist_farsi && data.song_farsi && data.artist_farsi.includes(artistFilter)
        } else {
            return data.artist_farsi && data.song_farsi
        }
    });


    return showArray
}



export { getData }
