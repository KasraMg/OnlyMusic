let darkMode = false;
const AllToggle = document.querySelectorAll('#toggle');
const toggleBtn = document.querySelectorAll('#dark-mode');
const today = document.querySelector('#today');
const loginBtn = document.querySelector('#loginBtn');
const aside = document.querySelectorAll('aside li>a');
const hamburgerLi = document.querySelectorAll('#hamburger-menu li>a');

let url = window.location.pathname;
let fileName = url.substring(url.lastIndexOf('/') + 1);
const route = fileName.replace('.html', '');

aside.forEach(link => {
    link.classList.remove('active_Link');
    (link.id === route) && link.classList.add('active_Link')
});

hamburgerLi.forEach(link => {
    link.classList.remove('active_Link');
    (link.id === route) && link.classList.add('active_Link')
});


loginBtn.addEventListener('click', () => {
    location.href = 'login.html'
});

window.addEventListener('load', () => {
    if (!localStorage.getItem('darkMode')) {
        localStorage.setItem('darkMode', 'dark');
        darkMode = 'dark'
    } else {
        darkMode = localStorage.getItem('darkMode');
    }

    if (darkMode === 'dark') {
        document.documentElement.classList.add('dark')
        AllToggle[0].style.background = '#fff'
        AllToggle[1].style.background = '#fff'
    } else {
        document.documentElement.classList.remove('dark')
        AllToggle[0].style.background = '#000'
        AllToggle[1].style.background = '#000';
        toggleBtn[0].checked = true
        toggleBtn[1].checked = true
    }


    today.innerHTML = dateToDay()


    let showData = JSON.parse(localStorage.getItem('showData'));
    if (showData.id) {
        loginBtn.innerHTML = '';
        loginBtn.innerHTML = showData.userInfo.name;
    } else {
        loginBtn.innerHTML = `ورود / عضویت`
    }
})




AllToggle.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {

        if (darkMode === 'dark') {
            darkMode = 'light';
            localStorage.setItem('darkMode', darkMode);
        } else {
            darkMode = 'dark';
            localStorage.setItem('darkMode', darkMode);
        }

        if (darkMode === 'dark') {
            document.documentElement.classList.add('dark')
            AllToggle[0].style.background = '#fff'
            AllToggle[1].style.background = '#fff'
            toggleBtn[1].checked = false
        } else {
            document.documentElement.classList.remove('dark')
            AllToggle[0].style.background = '#000'
            AllToggle[1].style.background = '#000';
            toggleBtn[1].checked = true
        }

    })

})


const dateToDay = () => {
    const date = new Date();
    const configs = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }

    const toDay = date.toLocaleDateString('fa-IR', configs)

    return toDay
}


