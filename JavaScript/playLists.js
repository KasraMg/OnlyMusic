import { getData } from "./helper/serviceData.js";
import { ourPlayList } from "./helper/server.js";
import { getInfoes, getParamToUrl, addParamToUrl, pagination } from "./utilis/utils.js"

const notLogin = document.querySelector('#notLogin');
const mainShow = document.querySelector('#mainShow');
const loginBtnP = document.querySelector('#loginBtnP');
const existPlayList = document.querySelector('#existPlayList');
const buttonsWrapper = document.querySelectorAll('#buttonsWrapper button');


loginBtnP.addEventListener('click', () => location.href = 'login.html')



let userLogin = getData('showData');

if (userLogin.id) {
    notLogin.classList.add('hidden');
    mainShow.classList.remove('hidden')
}




buttonsWrapper.forEach(element => {
    element.addEventListener('click', event => {
        addParamToUrl('type', event.target.id)
    })
});


window.addEventListener('load', () => {

    if (getParamToUrl('type') === 'all') {
        buttonsWrapper[0].classList.remove('btn');
        buttonsWrapper[0].classList.add('active__Btn');
        showToDOM()

    } else if (getParamToUrl('type') === 'music') {
        buttonsWrapper[1].classList.remove('btn');
        buttonsWrapper[1].classList.add('active__Btn');
        showToDOM()
    } else {
        buttonsWrapper[2].classList.remove('btn');
        buttonsWrapper[2].classList.add('active__Btn');
    }
})



const showToDOM = () => {
    ourPlayList.forEach(item =>
        existPlayList.insertAdjacentHTML(
            "beforeend", `
            
            <a href='#' class="w-full cursor-pointer">
            <div class="relative ">
              <img src=${item[1][0].photo} alt="cover" class="rounded-lg w-full h-full">
    
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 absolute top-2 right-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
              </svg>
    
    
            </div>
    
            <div class="mt-4">
              <h3 class="font-bold text-lg md:text-md mb-1 text-darkBg dark:text-white">${item[0]}</h3>
    
            </div>
    
          </a>
            
            `));
}
