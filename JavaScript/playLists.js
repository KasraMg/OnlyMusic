import { getData, updateData } from "./helper/serviceData.js";
import { ourPlayList } from "./helper/server.js";
import { getParamToUrl } from "./utilis/utils.js"
import { idCreator } from "./helper/idCreator.js";

const notLogin = document.querySelector('#notLogin');
const mainShow = document.querySelector('#mainShow');
const loginBtnP = document.querySelector('#loginBtnP');
const existPlayList = document.querySelector('#existPlayList');
const newPlayListBtn = document.querySelector('#newPlayListBtn');

const deleteAlbumsBtn = document.querySelector('#deleteAlbumsBtn');
const removeWrapper = document.querySelector('#removeWrapper');
const confirmBtn = document.querySelector('#confirmBtn');
const cancelBtn = document.querySelector('#cancelBtn');


loginBtnP.addEventListener('click', () => location.href = 'login.html')



let showData = getData('showData');

if (showData.id) {
  notLogin.classList.add('hidden');
  mainShow.classList.remove('hidden')
}


window.addEventListener('load', () => {
  loadData()
})

const loadData = () => {
  const paramsType = getParamToUrl('type');

  const showData = getData('showData');
  const musicPlayListLocal = showData.musicsAlbum;
  const videoPlayListLocal = showData.videosAlbum;


  if (paramsType === 'all') {
    showToDOM([...ourPlayList, ...musicPlayListLocal, ...videoPlayListLocal])
  } else if (paramsType === 'music') {
    showToDOM([...ourPlayList, ...musicPlayListLocal])
  } else {
    showToDOM([...videoPlayListLocal])

  }
}



newPlayListBtn.addEventListener('click', async () => {

  Swal.fire({
    title: 'آلبوم جدید',
    html: `
      <input id="textInput" class="swal2-input mb-5" placeholder="نام آلبوم" required>
      <div class="flex justify-center gap-4">
        <div>
          <label for="radioInput1">
            <input id="radioInput1" type="radio" name="radioGroup" required> موزیک
          </label>
        </div>
        <div>
          <label for="radioInput2">
            <input id="radioInput2" type="radio" name="radioGroup" required> موزیک ویدیو
          </label>
        </div>
      `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'ایجاد',
    cancelButtonText: 'لغو',
    preConfirm: () => {
      const inputValue = document.getElementById('textInput').value;
      const isRadioSelected1 = document.getElementById('radioInput1').checked;
      const isRadioSelected2 = document.getElementById('radioInput2').checked;




      if (!inputValue || inputValue.trim() === '') {
        Swal.showValidationMessage('لطفاً نام آلبوم را وارد کنید');
      } else if (!isRadioSelected1 && !isRadioSelected2) {
        Swal.showValidationMessage('لطفاً یکی از گزینه‌های موزیک یا موزیک ویدیو را انتخاب کنید');
      } else {

        const showData = getData('showData');

        if (isRadioSelected1) {
          const newMusicAlbum = {
            id: idCreator(showData.musicsAlbum),
            name: inputValue.trim(),
            type: 'musicsAlbum',
            data: []
          }

          showData.musicsAlbum.unshift(newMusicAlbum);
          updateData(showData)
        } else {
          const newVideoAlbum = {
            id: idCreator(showData.videosAlbum),
            name: inputValue.trim(),
            type: 'videosAlbum',
            data: []
          }
          showData.videosAlbum.unshift(newVideoAlbum);
          updateData(showData)
        }
        loadData()
      }


    }
  });
})

const showToDOM = (array) => {
  existPlayList.innerHTML = ''
  array.forEach(item =>
    existPlayList.insertAdjacentHTML(
      "beforeend", `
            
      <div class="relative" ${item.type === 'ourPlayList' ? `id='ourPlayList'` : `id='userPlayList'`}>

            <a href='${item.format === 'video' ? 'vPlayList' : 'mPlayList'}.html?type=${item.type}&plId=${item.id}&id=${item.data[0] ? item.data[0].id : 'not'}' class="w-full cursor-pointer">
            <div class="relative ">
              <img src=${item.data[0] ? item.data[0].photo : '../Images/playList.jpg'} alt="cover" class="rounded-lg w-full h-full">
    

     ${item.type === 'videosAlbum' ?
      `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor" class="w-6 h-6 absolute top-2 right-2 text-white">
             <path stroke-linecap="round"
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
      
      `
      :
      `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="w-6 h-6 absolute top-2 right-2 text-white">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
      `
    }
    
            </div >

  <div class="mt-4">
    <h3 class="font-bold text-lg md:text-md mb-1 text-darkBg dark:text-white">${item.name}</h3>

  </div>
    
          </a >

${item.type === 'ourPlayList' ? '' : `
    <div
      class="absolute top-0 left-0 right-0 z-50 w=h-full h-full justify-center items-center rounded-lg bg-[#0000007d] hidden" onclick='deleteHandler("${item.type}","${item.id}",event)' id='removeItemPlayList'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-12 h-12 text-white" >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>

    </div>
    `}
  </div>

  `));
}


let removeObg = {
  musicsAlbum: [],
  videosAlbum: [],
}

function deleteHandler(type, id, event) {
  let svgElement = event.target.querySelector('svg');

  if (svgElement === null) {
    svgElement = event.target.parentNode;
  }

  if (!svgElement.style.cssText) {
    svgElement.classList.remove('text-white');
    svgElement.style = 'color:red';

    removeObg[type] = [...removeObg[type], +id]
  } else {
    svgElement.classList.add('text-white');
    svgElement.style.cssText = '';

    let cancelDelete = removeObg[type].filter(item => item !== id);
    removeObg[type] = [...cancelDelete]
  }

}

window.deleteHandler = deleteHandler


deleteAlbumsBtn.addEventListener('click', () => {
  deleteAlbumsBtn.classList.replace('flex', 'hidden');
  removeWrapper.classList.replace('hidden', 'flex');
  ////////////////////////////////////////////////////////
  const removeItemPlayList = document.querySelectorAll('#removeItemPlayList');
  removeItemPlayList.forEach(item => {
    item.classList.replace('hidden', 'flex')
  })
  ////////////////////////////////////////////////////////
  const userPlayList = document.querySelectorAll('#userPlayList');
  userPlayList.forEach(item => {
    item.classList.add('removePlayList');

  })
  ////////////////////////////////////////////////////////
  const ourPlayList = document.querySelectorAll('#ourPlayList');
  ourPlayList.forEach(item => {
    item.classList.add('hidden');
  })
  ////////////////////////////////////////////////////////
  newPlayListBtn.disabled = true
  newPlayListBtn.style = 'opacity:10%'
  ///////////////////////////////////////////////////////
  removeObg = {
    musicsAlbum: [],
    videosAlbum: [],
  }
})

cancelBtn.addEventListener('click', () => {
  removeWrapper.classList.replace('flex', 'hidden');
  deleteAlbumsBtn.classList.replace('hidden', 'flex');
  ////////////////////////////////////////////////////////
  const removeItemPlayList = document.querySelectorAll('#removeItemPlayList');
  removeItemPlayList.forEach(item => {
    item.classList.replace('flex', 'hidden')
  })
  ////////////////////////////////////////////////////////
  const userPlayList = document.querySelectorAll('#userPlayList');
  userPlayList.forEach(item => {
    item.classList.remove('removePlayList');

  })
  ////////////////////////////////////////////////////////
  const ourPlayList = document.querySelectorAll('#ourPlayList');
  ourPlayList.forEach(item => {
    item.classList.remove('hidden');
  })
  ////////////////////////////////////////////////////////
  removeObg = {
    musicsAlbum: [],
    videosAlbum: [],
  }
  ////////////////////////////////////////////////////////
  newPlayListBtn.disabled = false
  newPlayListBtn.style = 'opacity:100%'

})

confirmBtn.addEventListener('click', () => {
  let showData = getData('showData');

  let musicsAlbumAfterRemove = showData.musicsAlbum.filter(obj => !removeObg.musicsAlbum.some(id => obj.id === id));
  let videosAlbumAfterRemove = showData.videosAlbum.filter(obj => !removeObg.videosAlbum.some(id => obj.id === id));

  showData.musicsAlbum = musicsAlbumAfterRemove;
  showData.videosAlbum = videosAlbumAfterRemove;
  ////////////////////////////////////////////////////////
  removeWrapper.classList.replace('flex', 'hidden');
  deleteAlbumsBtn.classList.replace('hidden', 'flex');
  ////////////////////////////////////////////////////////
  const removeItemPlayList = document.querySelectorAll('#removeItemPlayList');
  removeItemPlayList.forEach(item => {
    item.classList.replace('flex', 'hidden')
  })
  const userPlayList = document.querySelectorAll('#userPlayList');
  userPlayList.forEach(item => {
    item.classList.remove('removePlayList');

  })
  ////////////////////////////////////////////////////////
  const ourPlayList = document.querySelectorAll('#ourPlayList');
  ourPlayList.forEach(item => {
    item.classList.remove('hidden');
  })
  ////////////////////////////////////////////////////////
  newPlayListBtn.disabled = false
  newPlayListBtn.style = 'opacity:100%'
  ////////////////////////////////////////////////////////
  updateData(showData);
  loadData();
  /////////////////////////////////////////////////////////////
  removeObg = {
    musicsAlbum: [],
    videosAlbum: [],
  }

})