import { getData } from "./helper/serviceData.js";

const headerEdit = document.querySelector('#headerEdit');
const editBtn = document.querySelector('#editBtn');

const showEditButtons = document.querySelector('#showEditButtons');
const cancelBtn = document.querySelector('#cancelBtn');
// const confirmBtn = document.querySelector('#confirmBtn');


window.addEventListener('load', () => {
    let loginFlag = getData('showData');
    if (!Object.keys(loginFlag).length) {
        location.href = 'index.html'
    }
})



editBtn.addEventListener('click', () => {
    headerEdit.classList.replace('flex', 'hidden');
    showEditButtons.classList.replace('hidden', 'flex');
})


cancelBtn.addEventListener('click', () => {
    showEditButtons.classList.replace('flex', 'hidden');
    headerEdit.classList.replace('hidden', 'flex');
})



