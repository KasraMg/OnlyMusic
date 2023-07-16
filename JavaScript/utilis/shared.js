let darkMode=true
const Alltoggle =document.querySelectorAll('#toggle')



window.addEventListener('load',()=>{
    if (darkMode) {
        document.documentElement.classList.add('dark')
        Alltoggle[0].style.background='#fff'
        Alltoggle[1].style.background='#fff'
    }else{
        document.documentElement.classList.remove('dark') 
        Alltoggle[0].style.background='#000'
        Alltoggle[1].style.background='#000'
    }
})

Alltoggle.forEach(toggle=>{
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
})


 