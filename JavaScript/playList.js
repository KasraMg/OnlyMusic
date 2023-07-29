import { getData, updateData } from "./helper/serviceData.js";
import { getParamToUrl, addParamToUrl } from "./utilis/utils.js";
import { ourPlayList } from "./helper/server.js";
////////////////////////////////////////////////////////////////////
const headerEdit = document.querySelector('#headerEdit');
const editBtn = document.querySelector('#editBtn');

const showEditButtons = document.querySelector('#showEditButtons');
const cancelBtn = document.querySelector('#cancelBtn');
const albumName = document.querySelector('#albumName');
const albumNameInput = document.querySelector('#albumNameInput');
const moreAlbum = document.querySelector('#moreAlbum');
const confirmBtn = document.querySelector('#confirmBtn');
////////////////////////////////////////////////////////////////////
let sortable = Sortable.create(moreAlbum, false);
////////////////////////////////////////////////////////////////////
const type = getParamToUrl('type');
const playListId = getParamToUrl('plId');
const songId = getParamToUrl('id');
///////////////////////////////////////////////////////////////////
// redirect if not login
let showData = getData('showData');
if (!Object.keys(showData).length) {
    location.href = 'index.html'
}
/////////////////////////////////////////////////////////////////
let url = window.location.pathname;
let fileName = url.substring(url.lastIndexOf('/') + 1);
const mainType = fileName.replace('.html', '');
/////////////////////////////////////////////////////////////////
let albumDetails = {};
window.addEventListener('load', () => {
    if (type === 'ourPlayList') {
        albumDetails = ourPlayList.find(item => item.id === +playListId);
        editBtn.disabled = true;
        editBtn.style.opacity = '0%'
    } else {

        if (mainType === 'mPlayList') {
            albumDetails = showData.musicsAlbum.find(item => item.id === +playListId)

        } else {
            albumDetails = showData.videosAlbum.find(item => item.id === +playListId);
        }
    }

    albumName.innerHTML = albumDetails.name
    albumNameInput.value = albumDetails.name

    showToDom(albumDetails.data)


})

editBtn.addEventListener('click', () => {
    headerEdit.classList.replace('flex', 'hidden');
    showEditButtons.classList.replace('hidden', 'flex');
    moreAlbum.classList.add('activeEdit')

    if (type !== 'ourPlayList') {
        sortable.option("disabled", false);
    }

})

cancelBtn.addEventListener('click', () => {
    showEditButtons.classList.replace('flex', 'hidden');
    headerEdit.classList.replace('hidden', 'flex');
    moreAlbum.classList.remove('activeEdit')

    if (type !== 'ourPlayList') {
        sortable.option("disabled", true);
        albumNameInput.value = albumDetails.name;
        moreAlbum.innerHTML = ''
        showToDom(albumDetails.data)
    }

})

confirmBtn.addEventListener('click', () => {
    const idArray = Array.from(moreAlbum.children).map(item => item.dataset.id)

    albumDetails.data.sort((a, b) => {
        const indexA = idArray.indexOf(a.id);
        const indexB = idArray.indexOf(b.id);
        return indexA - indexB;
    });

    albumDetails.name = albumNameInput.value.trim();

    updateData(showData)
    location.reload()
})

const deleteHandler = id => {
    let dataAfterRemove = albumDetails.data.filter(item => +item.id !== id);

    if (mainType === 'vPlayList') {
        showData.videosAlbum[playListId - 1].data = dataAfterRemove;
    } else {
        showData.musicsAlbum[playListId - 1].data = dataAfterRemove;
    }

    updateData(showData);

    addParamToUrl('id', dataAfterRemove[0].id)
}

window.deleteHandler = deleteHandler

const showToDom = (array) => {
    array.map(item => {
        moreAlbum.insertAdjacentHTML(
            "beforeend",
            `
        <section class="bg-lightBg  flex justify-between dark:bg-[#18191d]  items-center p-3 rounded-md" data-id=${item.id}>
        <a href="${(mainType === 'vPlayList') ? `vPlayList` : `mPlayList`}.html?type=${type}&plId=${playListId}&id=${item.id}"  class="relative flex gap-4 items-center">
          <img src='${item.photo}'
            class="w-16 h-16 rounded" alt="">
            <div class="loaderSong absolute top-5 right-1 ${item.id === songId ? `` : `!hidden`}">
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
            <span class="stroke"></span>
          </div>
          <div>
            <p class=" font-vazirBold text-[18px]">${item.song_farsi}</p>
            <p class="text-[#8e8e92] text-[14px]">${item.artist_farsi}</p>
          </div>
        </a>
        
            ${(type === 'ourPlayList') ? '' :
                `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-redBg cursor-pointer" onclick="deleteHandler(${item.id}, event)">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                `
            }

      </section>
        `
        )
    })
}