import { submitHandler, data, allInputs } from "./helper/enterPanelCommon.js"
////////////////////////////////////////////////////////////
const nameUser = document.querySelector('#nameUser');
const joinToSite = document.querySelector('#joinToSite');
const editIcon = document.querySelector('#editIcon');
const logoutBtn = document.querySelector('#logoutBtn');

const mainPanel = document.querySelector('#mainPanel');
const editInfoForm = document.querySelector('#editInfoForm');
const backToMain = document.querySelector('#backToMain');
const editInfoBtn = document.querySelector('#editInfoBtn');



const localData = JSON.parse(localStorage.getItem('mainData'));
const checkEmailUser = localData.find(item => item.userInfo.email === data.email);

window.addEventListener('load', () => {
    if (!Object.keys(checkEmailUser).length) {
        location.href = 'index.html'
    }


    nameUser.innerHTML = checkEmailUser.userInfo.name;
    joinToSite.innerHTML = checkEmailUser.userInfo.registerDate;
})

logoutBtn.addEventListener('click', () => {
    localStorage.setItem('showData', JSON.stringify({}))
    location.href = 'index.html'

})


editIcon.addEventListener('click', () => {
    editInfoForm.classList.replace("hidden", "flex");
    mainPanel.classList.add('hidden')
    allInputs.forEach((element, index) => {
        if (index !== 3) {
            element.value = data[element.id]
        }
    });

})

backToMain.addEventListener('click', () => {
    editInfoForm.classList.replace("flex", "hidden");
    mainPanel.classList.remove('hidden')


})


editInfoBtn.addEventListener('click', (event) => submitHandler(event, () => {
    let { name, email, password } = data
    let editUser = { ...checkEmailUser, userInfo: { ...checkEmailUser.userInfo, name, email, password } }

    localData[checkEmailUser.id - 1] = editUser;



    localStorage.setItem('showData', JSON.stringify(editUser));
    localStorage.setItem('mainData', JSON.stringify(localData));

    location.reload()
    alert('با موفقیت انجام شد');
}
))



