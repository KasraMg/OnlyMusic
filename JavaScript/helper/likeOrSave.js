import { getInfoes, getParamToUrl } from "../utilis/utils.js"
import { destructorData } from './destructorData.js'
import { getData, updateData } from "./serviceData.js"
import { idCreator } from "./idCreator.js"




const noLikeMedia = document.querySelector('#noLikeMedia')
const likeMedia = document.querySelector('#likeMedia')
const noSavePlayList = document.querySelector('#noSavePlayList')
const savePlayList = document.querySelector('#savePlayList');

let url = window.location.pathname;
let fileName = url.substring(url.lastIndexOf('/') + 1);
const type = fileName.replace('.html', '');


window.addEventListener('load', () => {
    const showData = getData('showData');




    if (!!showData && !Object.keys(showData).length) {
        noLikeMedia.addEventListener('click', () => noLoginSwal('برای لایک کردن ابتدا وارد شوید.'));
        (type === 'music') && noSavePlayList.addEventListener('click', () => noLoginSwal('برای افزودن به پلی لیست ابتدا وارد شوید.'))
    } else {
        let likeFlag = showData.favorite.some(item => item.id == getParamToUrl('id'));
        if (likeFlag) {
            likeMedia.classList.remove('hidden');
            noLikeMedia.classList.add('hidden');
        }
        noLikeMedia.addEventListener('click', noLikeMediaHandler)
        likeMedia.addEventListener('click', likeMediaHandler);

        if (type === 'music') {
            noSavePlayList.addEventListener('click', saveHandler);
            savePlayList.addEventListener('click', saveHandler);
            let changeSaveIcon = findInPlayList().some(item => item.flag === true);
            if (changeSaveIcon) {
                savePlayList.classList.remove('hidden');
                noSavePlayList.classList.add('hidden');
            }
        }






    }




})



const noLikeMediaHandler = () => {

    let baseUrl = ''


    if (type === 'music') {
        baseUrl = `https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=get_song&id=${getParamToUrl('id')}`
    } else {
        baseUrl = `https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=get_video&id=${getParamToUrl('id')}`
    }


    const showData = getData('showData');
    getInfoes(baseUrl).then(data => {
        if (data.status == 200 && data.result.link) {
            showData.favorite.unshift(destructorData(data.result));

            likeMedia.classList.remove('hidden');
            noLikeMedia.classList.add('hidden');

            updateData(showData)
        }
    })
}

const likeMediaHandler = () => {
    likeMedia.classList.add('hidden');
    noLikeMedia.classList.remove('hidden');
    const showData = getData('showData');
    let mediaExistenceIndex = showData.favorite.findIndex(item => item.id === +getParamToUrl('id'));
    if (mediaExistenceIndex !== -1) {
        showData.favorite.splice(mediaExistenceIndex, 1);
        console.log(showData);
        updateData(showData)

    }
}

const findInPlayList = () => {
    const showData = getData('showData');

    let arr = []


    showData.musicsAlbum.forEach(item => {
        const flag = item.data.some(data => data.id == getParamToUrl('id'))
        arr.push({ name: item.name, flag })
    });

    return arr
}


const saveHandler = () => {
    const showData = getData('showData');




    const template = `
 <div class="mx-auto w-2/3 p-4 rounded-lg bg-[#00000045] dark:bg-[#ffffff45] flex flex-col justify-center items-center gap-6" id='alertModal'>
   <div class="w-full rounded-md p-2 bg-sky-500 cursor-pointer flex justify-center items-center">+</div>
</div>`

    let arr = findInPlayList();
    Swal.fire({
        title: 'پلی لیست',
        html: template,
        focusConfirm: false,
        showConfirmButton: false,
        showCloseButton: true
    });

    let alertModal = document.querySelector('#alertModal');
    console.log(showData.musicsAlbum);
    showData.musicsAlbum.forEach((item, index) => {
        console.log(arr[index].flag, arr.length)
        alertModal.insertAdjacentHTML('afterbegin', `<p class="w-full rounded-md p-2 btn cursor-pointer ${arr.length && arr[index].flag ? '!bg-green-500' : ''}" id='${item.id}'>${item.name}</p>`)
    });


    let alertModalItem = document.querySelectorAll('#alertModal p');
    alertModalItem.forEach(item => {

        item.addEventListener('click', event => {


            let index = showData.musicsAlbum.findIndex(item => item.id == event.target.id);

            if (event.target.classList.contains('!bg-green-500')) {

                event.target.classList.remove('!bg-green-500');
                let indexInPlayList = showData.musicsAlbum[index].data.findIndex(item => item.id == getParamToUrl('id'));
                showData.musicsAlbum[index].data.splice(indexInPlayList, 1);
                updateData(showData);
                let changeSaveIcon = findInPlayList().some(item => item.flag === true);
                if (changeSaveIcon) {
                    savePlayList.classList.remove('hidden');
                    !noSavePlayList.classList.contains('hidden') && noSavePlayList.classList.add('hidden');
                } else {
                    !savePlayList.classList.contains('hidden') && savePlayList.classList.add('hidden');
                    noSavePlayList.classList.remove('hidden');
                }

            } else {




                let baseUrl = `https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=get_song&id=${getParamToUrl('id')}`



                getInfoes(baseUrl).then(data => {
                    if (data.status == 200 && data.result.link) {
                        if (showData.musicsAlbum[index].data.findIndex(item => item.id == data.result.id) == -1) {
                            showData.musicsAlbum[index].data.unshift(destructorData(data.result));
                            event.target.classList.add('!bg-green-500')
                            updateData(showData);


                            let changeSaveIcon = findInPlayList().some(item => item.flag === true);
                            if (changeSaveIcon) {
                                savePlayList.classList.remove('hidden');
                                !noSavePlayList.classList.contains('hidden') && noSavePlayList.classList.add('hidden');
                            } else {
                                !savePlayList.classList.contains('hidden') && savePlayList.classList.add('hidden');
                                noSavePlayList.classList.remove('hidden');
                            }
                        }
                    }
                })
            }


        })
    })

    let newPlayListBtn = document.querySelector('#alertModal div')
    newPlayListBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'آلبوم جدید',
            html: `<input id="textInput" class="swal2-input mb-5" placeholder="نام آلبوم" required> `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ایجاد',
            cancelButtonText: 'لغو',
            preConfirm: () => {
                const inputValue = document.getElementById('textInput').value;

                if (!inputValue || inputValue.trim() === '') {
                    Swal.showValidationMessage('لطفاً نام آلبوم را وارد کنید');

                } else {

                    const showData = getData('showData');
                    const newMusicAlbum = {
                        id: idCreator(showData.musicsAlbum),
                        name: inputValue.trim(),
                        type: 'musicsAlbum',
                        data: []
                    }

                    showData.musicsAlbum.unshift(newMusicAlbum);
                    updateData(showData)

                    saveHandler()
                }


            }
        });
    })


}


const noLoginSwal = text => {
    Swal.fire({
        title: text,
        icon: 'warning',
        confirmButtonText: 'ورود',

    }).then((result) => {

        if (result.isConfirmed) {
            location.href = 'login.html'
        }
    })
}




export { saveHandler }
