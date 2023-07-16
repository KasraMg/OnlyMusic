let darkMode=true
const toggle =document.querySelector('#toggle')



window.addEventListener('load',()=>{
    if (darkMode) {
        document.documentElement.classList.add('dark')
        toggle.style.background='#fff'
    }else{
        document.documentElement.classList.remove('dark') 
        toggle.style.background='#000'
    }
})


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