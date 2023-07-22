import { getData } from "./helper/serviceData.js";

const notLogin = document.querySelector('#notLogin');
const mainShow = document.querySelector('#mainShow');
const loginBtnP = document.querySelector('#loginBtnP');


loginBtnP.addEventListener('click', () => location.href = 'login.html')



let userLogin = getData('showData');

if (userLogin.id) {
    notLogin.classList.add('hidden');
    mainShow.classList.remove('hidden')
}