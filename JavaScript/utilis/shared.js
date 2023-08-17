let darkMode = false;
const AllToggle = document.querySelectorAll('#toggle');
const toggleBtn = document.querySelectorAll('#dark-mode');
const today = document.querySelector('#today');
const loginBtn = document.querySelector('#loginBtn');
const aside = document.querySelectorAll('aside li>a');
const hamburgerLi = document.querySelectorAll('#hamburger-menu li>a');
const searchIcon = document.querySelector('#searchIcon')
const searchInput = document.querySelector('#searchInput')
const searchIconMd = document.querySelector('#searchIconMd')
const searchInputMd = document.querySelector('#searchInputMd')

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
    if (showData === null || Object.keys(showData).length === 0) {
        loginBtn.innerHTML = `ورود / عضویت`
        loginBtn.addEventListener('click', () => {

            location.href = '/Src/login.html'


        });
    } else {
        loginBtn.innerHTML = '';
        if (window.innerWidth < 901) {
            loginBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style="width:1.2rem;height:1.25rem">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
           </svg>

            `;

        } else {
            loginBtn.innerHTML = showData.userInfo.name;
        }

        loginBtn.addEventListener('click', () => {

            location.href = '/Src/userPanel.html'


        });
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


searchIcon.addEventListener('click', () => {
    if (searchInput.value) {

        location.href = `/Src/search.html?param=${searchInput.value}`
  

 
    }

})


searchInput.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {
        if (e.target.value) {

            location.href = `/Src/search.html?param=${e.target.value}`
 
 

 
        }
    }
})
searchIconMd.addEventListener('click', () => {
    if (searchInputMd.value) {
        location.href = `/Src/search.html?param=${searchInputMd.value}`
    }

})


searchInputMd.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {

        if (e.target.value) {
            location.href = `/Src/search.html?param=${e.target.value}`
        }
 

        

 
    }
})
