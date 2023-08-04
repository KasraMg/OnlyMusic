import { getData } from "./helper/repeatedActivities.js";
import { artists } from "./helper/server.js";
import { getParamToUrl } from "./utilis/utils.js"
//////////////////////////////////////////////////////////////////////////////////
const artistName = document.querySelector('#artistName');
const imagesArtistWrapper = document.querySelectorAll('#imagesArtistWrapper img');
const explainArtist = document.querySelector('#explainArtist');
/////////////////////////////////////////////////////////////////////////////////
let artistActive = artists.find(artist => {
    if (artist.englishName === getParamToUrl('artist')) {
        return artist
    }
})
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', () => {
    explainArtist.innerText = artistActive.text
    artistName.innerText = artistActive.name
    imagesArtistWrapper.forEach(img => {
        img.src = artistActive.photo
    });


    const paramsType = getParamToUrl('type');
    const baseUrl = `https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=search&q=${getParamToUrl('artist')}`


    if (paramsType === 'all') {
        getData(baseUrl, null, paramsType, artistActive.name)
    } else if (paramsType === 'music') {
        getData(baseUrl, 'mp3s', null, artistActive.name)
    } else {
        getData(baseUrl, 'videos', null, artistActive.name)
    }
    document.title = artistActive.name

})



