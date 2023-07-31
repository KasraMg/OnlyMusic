import { getInfoes, getParamToUrl, addParamToUrl, pagination, mediaHtmlTemplate } from "../utilis/utils.js"
//////////////////////////////////////////////////////////////////////////////////
const buttonsWrapper = document.querySelectorAll('#buttonsWrapper button');
const paginationWrapper = document.querySelector('#paginationWrapper');
const mainContent = document.querySelector('#mainContent');
const loader = document.querySelector('.loader')
//////////////////////////////////////////////////////////////////////////////////
window.addParamToUrl = addParamToUrl;

buttonsWrapper.forEach(element => {
    element.classList.remove('btn');
    if (element.id === getParamToUrl('type')) {
        element.classList.add('active__Btn');
    }

    element.addEventListener('click', event => {
        addParamToUrl('type', event.target.id)
    })
});
//////////////////////////////////////////////////////////////////////////////////
const getData = async (url, key, type) => {
    let mainData = null;

    let a = await getInfoes(url);
    console.log(a);
    if (a.status !== 200) {
        alert('403')
    } else {
        mainData = a.result




        if (type === 'all') {
            let allData = [...filterPersianData(mainData.videos), ...filterPersianData(mainData.mp3s)];
            showToDOM(allData, 'all')
        } else if (key) {
            showToDOM(filterPersianData(mainData[key]));

        } else {
            showToDOM(filterPersianData(mainData));

        }
    }
}

const showToDOM = (resultFilter, type) => {
    pagination(resultFilter, +getParamToUrl('page'), 16, paginationWrapper).map(item => (
        mainContent.insertAdjacentHTML(
            "beforeend", mediaHtmlTemplate(item, type))))
    loader.classList.add('hidden')
}

const filterPersianData = array => {
    let showArray = array.filter(data => {
        return data.artist_farsi && data.song_farsi
    });


    return showArray
}



export { getData }
