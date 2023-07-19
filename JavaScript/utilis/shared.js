let darkMode = false;
const AllToggle = document.querySelectorAll('#toggle');
const toggleBtn = document.querySelectorAll('#dark-mode');
const today = document.querySelector('#today');
const loginBtn = document.querySelector('#loginBtn');
loginBtn.addEventListener('click', () => {
    location.href = 'login.html'
})

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
    if (showData) {
        loginBtn.innerHTML = ''
        loginBtn.innerHTML = showData.userInfo.name
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


