import { getData } from "./helper/repeatedActivities.js";
import { artists } from "./helper/server.js";
import { getParamToUrl } from "./utilis/utils.js"
//////////////////////////////////////////////////////////////////////////////////
const artistName = document.querySelector('#artistName');
const imagesArtistWrapper = document.querySelectorAll('#imagesArtistWrapper img');
/////////////////////////////////////////////////////////////////////////////////
let imgSrc = artists.find(artist => {
    if (artist.name === getParamToUrl('artist')) {
        return artist
    }
})
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', () => {
    artistName.innerHTML = getParamToUrl('artist')
    imagesArtistWrapper.forEach(img => {
        img.src = imgSrc.photo
    });

    const paramsType = getParamToUrl('type');
    const baseUrl = `https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=search&q=${getParamToUrl('artist')}`


    if (paramsType === 'all') {
        getData(baseUrl, null, paramsType)
    } else if (paramsType === 'music') {
        getData(baseUrl, 'mp3s')
    } else {
        getData(baseUrl, 'videos')
    }
})
