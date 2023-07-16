let darkMode=false

const toggle =document.querySelector('#toggle')

toggle.addEventListener('click',()=>{
    darkMode= !darkMode
    if (darkMode) {
        document.documentElement.classList.add('dark')
    }else{
        document.documentElement.classList.remove('dark')
    }
})