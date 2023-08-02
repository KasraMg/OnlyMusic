import { submitHandler, data, allInputs } from "./helper/enterPanelCommon.js"
import { getData, setData, updateData } from "./helper/serviceData.js";
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


const chooseBtn = document.querySelectorAll('#chooseBtn p');
const showBody = document.querySelectorAll('#showBody>div');






const localData = getData('mainData');
const checkEmailUser = localData.find(item => item.userInfo.email === data.email);





nameUser.innerHTML = checkEmailUser.userInfo.name;
joinToSite.innerHTML = checkEmailUser.userInfo.registerDate;




logoutBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'آیا می خواهید از حساب کاربری خود خارج شوید؟',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText:'بله',
        confirmButtonColor: 'red',
        cancelButtonText: 'لغو',
        preConfirm: (result) => {
            if (result) {
                setData('showData', {});
                location.href = 'index.html'
            }
        }
    })


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
    let editUser = { ...checkEmailUser, userInfo: { ...checkEmailUser.userInfo, name, email, password: btoa(password) } }

    localData[checkEmailUser.id - 1] = editUser;


    setData('showData', editUser);
    setData('mainData', localData);

    Swal.fire({
        title: 'اطلاعات شما با موفقیت به روز رسانی شد :)',
        icon: 'success',
        confirmButtonText: 'عالی!',

    }).then((result) => {
        location.reload()

    })
}));

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

    showData.recentMedia.map(item => (
        recent.insertAdjacentHTML(
            "beforeend", mediaHtmlTemplate(item, 'all'))));

    !showData.recentMedia.length && recent.insertAdjacentHTML('beforeend', `  <div class="text-orange-400">
            هنوز موزیک یا موزیک ویدیویی دیده نشده :(
        </div>`)



    favoriteShow();

})


const favoriteShow = () => {
    favorite.innerHTML = ''
    const showData = getData('showData');

    showData.favorite.map(item => (
        favorite.insertAdjacentHTML(
            "beforeend",
            ` <section class=" bg-lightBg flex justify-between dark:bg-[#18191d]  items-center p-3 rounded-md">
            <a href="${item.type === 'mp3' ? 'music' : 'mVideo'}.html?artist=${item.artist}&id=${item.id}" class="flex gap-4 items-center">
                <img src="${item.photo}" class=" w-16 h-16 rounded" alt="">
                <div>
                    <p class=" font-vazirBold text-[18px]">${item.song_farsi}</p>
                    <p class="text-[#8e8e92] text-[14px]">${item.artist_farsi}</p>
                </div>
            </a>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-6 h-6 cursor-pointer text-redBg" id='likeMedia' data-id=${item.id}>
                <path
                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>


        </section>`
        )));


    !showData.favorite.length && favorite.insertAdjacentHTML('beforeend', `  <div class="text-orange-400 md:-mr-24 sm:!mr-0">
    هنوز موزیک یا موزیک ویدیویی اضافه نشده :(
</div>`)


    const likeMedia = document.querySelectorAll('#likeMedia');

    likeMedia.forEach(item => {
        item.addEventListener('click', event => {
            let svgElement = event.target.querySelector('svg');

            if (svgElement === null) {
                svgElement = event.target.parentNode;
            }

            const showData = getData('showData');
            let mediaExistenceIndex = showData.favorite.findIndex(item => +item.id === +svgElement.dataset.id);
            if (mediaExistenceIndex !== -1) {
                showData.favorite.splice(mediaExistenceIndex, 1);
                updateData(showData)
                favoriteShow()
                iziToast.show({
                    message: 'موزیک از لیست مورد علاقه ها حذف شد :(',
                    rtl: true,
                });
            }

          

        })


    })
}



