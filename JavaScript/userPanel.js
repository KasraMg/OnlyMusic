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


const chooseBtn = document.querySelectorAll('#chooseBtn p');
const showBody = document.querySelectorAll('#showBody>div');


const recent = document.querySelector('#recent');
const favorite = document.querySelector('#favorite');




const localData = JSON.parse(localStorage.getItem('mainData'));
const checkEmailUser = localData.find(item => item.userInfo.email === data.email);





nameUser.innerHTML = checkEmailUser.userInfo.name;
joinToSite.innerHTML = checkEmailUser.userInfo.registerDate;




logoutBtn.addEventListener('click', () => {
    localStorage.setItem('showData', JSON.stringify({}))
    location.href = 'index.html'

});

editIcon.addEventListener('click', () => {
    editInfoForm.classList.replace("hidden", "flex");
    mainPanel.classList.add('hidden')
    allInputs.forEach((element, index) => {
        if (index !== 3) {
            element.value = data[element.id]
        }
    });

});

backToMain.addEventListener('click', () => {
    editInfoForm.classList.replace("flex", "hidden");
    mainPanel.classList.remove('hidden')


});

editInfoBtn.addEventListener('click', (event) => submitHandler(event, () => {
    let { name, email, password } = data
    let editUser = { ...checkEmailUser, userInfo: { ...checkEmailUser.userInfo, name, email, password } }

    localData[checkEmailUser.id - 1] = editUser;



    localStorage.setItem('showData', JSON.stringify(editUser));
    localStorage.setItem('mainData', JSON.stringify(localData));

    location.reload()
    alert('با موفقیت انجام شد');
}
));

chooseBtn.forEach(element => {
    element.addEventListener('click', event => {

        chooseBtn.forEach(item => {
            item.classList.remove('active__Btn')
        })
        event.target.classList.add('active__Btn');


        showBody.forEach(item => {
            item.classList.replace("grid", "hidden");
        })

        if (event.target.id === 'recentBtn') {
            showBody[0].classList.replace("hidden", "grid");
        } else {
            showBody[1].classList.replace("hidden", "grid");
        }
    })
})



