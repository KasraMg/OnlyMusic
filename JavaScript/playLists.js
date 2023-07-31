import { getData, updateData } from "./helper/serviceData.js";
import { ourPlayList } from "./helper/server.js";
import { getParamToUrl } from "./utilis/utils.js"
import { idCreator } from "./helper/idCreator.js";

const notLogin = document.querySelector('#notLogin');
const isLogin = document.querySelector('#isLogin');
const mainShow = document.querySelector('#mainShow');
const loginBtnP = document.querySelector('#loginBtnP');
const existPlayList = document.querySelector('#existPlayList');
const newPlayListBtn = document.querySelector('#newPlayListBtn');

const userPlayListHeader = document.querySelector('#userPlayListHeader');
const deleteAlbumsBtn = document.querySelector('#deleteAlbumsBtn');
const removeWrapper = document.querySelector('#removeWrapper');
const confirmBtn = document.querySelector('#confirmBtn');
const cancelBtn = document.querySelector('#cancelBtn');


loginBtnP.addEventListener('click', () => location.href = 'login.html')



let showData = getData('showData');





window.addEventListener('load', () => {
  if (getParamToUrl('type') !== 'ourPlayList') {
    userPlayListHeader.classList.replace('hidden', 'flex')
  } else {
    userPlayListHeader.classList.contains('flex') && userPlayListHeader.classList.replace('flex', 'hidden')

  }



  if (showData && showData.id) {
    notLogin.classList.add('hidden');
    isLogin.classList.remove('hidden');
    loadData();
  }

  if (getParamToUrl('type') === 'ourPlayList') {
    notLogin.classList.add('hidden');
    isLogin.classList.remove('hidden');
    loadData();

  }

})

const loadData = () => {
  const paramsType = getParamToUrl('type');

  const showData = getData('showData');


  if (paramsType === 'ourPlayList') {
    showToDOM([...ourPlayList])
  } else {
    showToDOM([...showData.musicsAlbum])
    if (!showData.musicsAlbum.length) {
      deleteAlbumsBtn.disabled = true;
      deleteAlbumsBtn.style = 'opacity:20%'
      existPlayList.insertAdjacentHTML(
        "beforeend", `
        <div class="w-full text-orange-500">
          هنوز پلی لیستی ساخته نشده :(
        </div>`)

    } else {
      deleteAlbumsBtn.disabled = false;
      deleteAlbumsBtn.style = 'opacity:100%'
    }
  }



}



newPlayListBtn.addEventListener('click', () => {
  let showData = getData('showData')
  if (showData.musicsAlbum.length >= 4) {
    Swal.fire({
      title: 'بیشتر از 4 پلی لیست نمیتوان ساخت! برای خرید اشتراک ویژه با ما تماس بگیرید',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'تماس با ما',
      confirmButtonColor: 'red',
      cancelButtonText: 'لغو',
    }).then(result => {
      if (result.isConfirmed) {
        location.href = 'contactUs.html'
      }

    })
  } else {

    Swal.fire({
      title: 'آلبوم جدید',
      html: `
      <input id="textInput" class="swal2-input mb-5" placeholder="نام آلبوم" required>
         `,
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

          loadData()
        }


      }
    });
  }
})

const showToDOM = (array) => {
  existPlayList.innerHTML = ''
  array.forEach(item =>
    existPlayList.insertAdjacentHTML(
      "beforeend", `
            
      <div class="relative" ${item.type === 'ourPlayList' ? `id='ourPlayList'` : `id='userPlayList'`}>

            <a href='mPlayList.html?type=${item.type}&plId=${item.id}&id=${item.data[0] ? item.data[0].id : 'not'}' class="w-full cursor-pointer">
            <div class="relative ">
              <img src=${item.data[0] ? item.data[0].photo : `../Images/album/${Math.floor(Math.random() * 4)}.jpg`} alt="cover" class="rounded-lg  w-full ">
    

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="w-6 h-6 absolute top-2 right-2 text-white">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    
    
            </div >

  <div class="mt-4">
    <h3 class="font-bold text-lg md:text-md mb-1 text-darkBg dark:text-white">${item.name}</h3>

  </div>
    
          </a >

${item.type === 'ourPlayList' ? '' : `
    <div
      class="absolute top-0 left-0 right-0 z-50 w=h-full h-full justify-center items-center rounded-lg bg-[#0000007d] hidden" onclick='deleteHandler("${item.id}",event)' id='removeItemPlayList'>
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


let removeAlbum = []

function deleteHandler(id, event) {
  let svgElement = event.target.querySelector('svg');

  if (svgElement === null) {
    svgElement = event.target.parentNode;
  }

  if (!svgElement.style.cssText) {
    svgElement.classList.remove('text-white');
    svgElement.style = 'color:red';

    removeAlbum.push(+id)
  } else {
    svgElement.classList.add('text-white');
    svgElement.style.cssText = '';

    let cancelDelete = removeAlbum.filter(item => item !== +id);
    removeAlbum = [...cancelDelete];
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
  newPlayListBtn.disabled = true
  newPlayListBtn.style = 'opacity:20%'
  ///////////////////////////////////////////////////////
  removeAlbum = []
})

cancelBtn.addEventListener('click', cancelBtnHandler)


function cancelBtnHandler() {
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
  removeAlbum = []
  let svgElement = document.querySelectorAll('#removeItemPlayList svg');
  svgElement.forEach(item => {
    item.classList.add('text-white');
    item.style.cssText = '';
  })
  ////////////////////////////////////////////////////////
  newPlayListBtn.disabled = false
  newPlayListBtn.style = 'opacity:100%'
}

confirmBtn.addEventListener('click', () => {
  Swal.fire({
    title: 'آیا از حذف موزیک مطمئن هستید؟',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'حذف شود',
    confirmButtonColor: 'red',
    cancelButtonText: 'لغو',
  }).then((result) => {
    console.log(result)
    if (result.isConfirmed) {
      if (removeAlbum.length) {
        let showData = getData('showData');

        let musicsAlbumAfterRemove = showData.musicsAlbum.filter(obj => !removeAlbum.some(id => obj.id === id));

        showData.musicsAlbum = musicsAlbumAfterRemove;
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
      } else {
        iziToast.show({
          message: 'موردی برای حذف انتخاب نشده است',
          rtl: true,
        })
      }

    } else {
      cancelBtnHandler()
    }
  }
  )
})