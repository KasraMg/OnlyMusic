const notLogin = document.querySelector('#notLogin');
const mainShow = document.querySelector('#mainShow');
const loginBtnP = document.querySelector('#loginBtnP');


loginBtnP.addEventListener('click', () => location.href = 'login.html')



let userLogin = JSON.parse(localStorage.getItem('showData'));

if (userLogin) {
    notLogin.classList.add('hidden');
    mainShow.classList.remove('hidden')
}