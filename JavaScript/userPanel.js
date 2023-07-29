import { submitHandler, data, allInputs } from "./helper/enterPanelCommon.js"
import { getData, setData } from "./helper/serviceData.js";
import { mediaHtmlTemplate } from './utilis/utils.js'
////////////////////////////////////////////////////////////
const nameUser = document.querySelector('#nameUser');
const joinToSite = document.querySelector('#joinToSite');
const editIcon = document.querySelector('#editIcon');
const logoutBtn = document.querySelector('#logoutBtn');

const mainPanel = document.querySelector('#mainPanel');
const editInfoForm = document.querySelector('#editInfoForm');
const backToMain = document.querySelector('#backToMain');
const editInfoBtn = document.querySelector('#editInfoBtn');
const recent = document.querySelector('#recent');
const favorite = document.querySelector('#favorite');
const musicPlayListCount = document.querySelector('#musicPlayListCount');
const videoPlayListCount = document.querySelector('#videoPlayListCount');


const chooseBtn = document.querySelectorAll('#chooseBtn p');
const showBody = document.querySelectorAll('#showBody>div');






const localData = getData('mainData');
const checkEmailUser = localData.find(item => item.userInfo.email === data.email);





nameUser.innerHTML = checkEmailUser.userInfo.name;
joinToSite.innerHTML = checkEmailUser.userInfo.registerDate;




logoutBtn.addEventListener('click', () => {
    setData('showData', {});
    location.href = 'index.html'

});

editIcon.addEventListener('click', () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    editInfoForm.classList.replace("hidden", "flex");
    mainPanel.classList.add('hidden');
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


    setData('showData', editUser);
    setData('mainData', localData);

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



window.addEventListener('load', () => {
    const showData = getData('showData');
    musicPlayListCount.innerHTML = showData.musicsAlbum.length
    videoPlayListCount.innerHTML = showData.videosAlbum.length

    showData.recentMedia.map(item => (
        recent.insertAdjacentHTML(
            "beforeend", mediaHtmlTemplate(item, 'all'))));


    showData.favorite.map(item => (
        favorite.insertAdjacentHTML(
            "beforeend",
            ` <section class=" bg-lightBg flex justify-between dark:bg-[#18191d]  items-center p-3 rounded-md">
            <a href="#" class="flex gap-4 items-center">
                <img src="${item.photo}" class=" w-16 h-16 rounded" alt="">
                <div>
                    <p class=" font-vazirBold text-[18px]">${item.song_farsi}</p>
                    <p class="text-[#8e8e92] text-[14px]">${item.artist_farsi}</p>
                </div>
            </a>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-6 h-6 cursor-pointer text-redBg">
                <path
                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>


        </section>`
        )));


})
