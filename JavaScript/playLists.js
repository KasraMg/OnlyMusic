import { getData } from "./helper/serviceData.js";
import { ourPlayList } from "./helper/server.js";
import { getParamToUrl } from "./utilis/utils.js"

const notLogin = document.querySelector('#notLogin');
const mainShow = document.querySelector('#mainShow');
const loginBtnP = document.querySelector('#loginBtnP');
const existPlayList = document.querySelector('#existPlayList');
const newPlayListBtn = document.querySelector('#newPlayListBtn');


loginBtnP.addEventListener('click', () => location.href = 'login.html')



let userLogin = getData('showData');

if (userLogin.id) {
  notLogin.classList.add('hidden');
  mainShow.classList.remove('hidden')
}


window.addEventListener('load', () => {
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
})



const showToDOM = (array) => {
  array.forEach(item =>
    existPlayList.insertAdjacentHTML(
      "beforeend", `
            
            <a href='${item.format === 'video' ? 'vPlayList' : 'mPlayList'}.html?type=${item.type}&plId=${item.id}&id=${item.data[0].id}' class="w-full cursor-pointer">
            <div class="relative ">
              <img src=${item.data[0].photo} alt="cover" class="rounded-lg w-full h-full">
    

     ${item.format === 'video' ?
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

  `));
}


newPlayListBtn.addEventListener('click', async () => {


  // const inputOptions = new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       'musicsAlbum': 'موزیک',
  //       'videosAlbum': 'موزیک ویدو',
  //     })
  //   }, 1)
  // })

  // const { value: color, value: formValues } = await Swal.fire({
  //   title: 'پلی لیست جدید',
  //   html:
  //     '<input id="swal-input1" class="swal2-input">' +
  //     '<br/>' +
  //     '<input type="radio" id="html" name="fav_language" value="HTML">' +
  //     '<label for="html">HTML</label>' +
  //     '<br/>' +
  //     '<input type="radio" id="html" name="fav_language" value="HTML">' +
  //     '<label for="html">HTML</label>',
  //   focusConfirm: false,
  //   preConfirm: () => {
  //     return [
  //       document.getElementById('swal-input1').value,
  //     ]
  //   },
  //   input: 'radio',
  //   inputOptions: inputOptions,
  //   inputValidator: (value) => {
  //     if (!value) {
  //       return 'یکی از گزینه ها باید انتخاب شود'
  //     }
  //   }
  // })

  // if (color) {
  //   console.log(color);
  //   console.log(formValues);
  //   Swal.fire({ html: `You selected: ${color}` })
  // }

})
