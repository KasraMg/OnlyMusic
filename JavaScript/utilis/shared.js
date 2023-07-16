let darkMode = false;
const AllToggle = document.querySelectorAll('#toggle');
const toggleBtn = document.querySelectorAll('#dark-mode');


window.addEventListener('load', () => {
    if (!localStorage.getItem('darkMode')) {
        localStorage.setItem('darkMode', 'dark');
        darkMode = 'dark'
    } else {
        darkMode = localStorage.getItem('darkMode');
        console.log(darkMode);
    }

    if (darkMode==='dark') {
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
})




AllToggle.forEach((toggle,index) => {
    toggle.addEventListener('click', ()=>{
    
        if (darkMode === 'dark') {
            darkMode = 'light';
            localStorage.setItem('darkMode', darkMode);
        } else {
            darkMode = 'dark';
            localStorage.setItem('darkMode', darkMode);
        }

        if(darkMode==='dark'){
            document.documentElement.classList.add('dark')
            AllToggle[0].style.background = '#fff'
            AllToggle[1].style.background = '#fff' 
            toggleBtn[1].checked = false
                      }else{
                        document.documentElement.classList.remove('dark')
                        AllToggle[0].style.background = '#000'
                        AllToggle[1].style.background = '#000';
                        toggleBtn[1].checked = true
                      }
        
       })
    
})


