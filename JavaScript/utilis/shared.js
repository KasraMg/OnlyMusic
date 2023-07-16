let darkMode=false

const toggle =document.querySelector('#toggle')

toggle.addEventListener('click',()=>{
    darkMode= !darkMode
    if (darkMode) {
        document.documentElement.classList.add('dark')
        toggle.style.background='#fff'
    }else{
        document.documentElement.classList.remove('dark') 
        toggle.style.background='#000'
    }
    console.log(darkMode);
})