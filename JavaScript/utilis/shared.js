let darkMode=false

const toggle =document.querySelector('#toggle')

toggle.addEventListener('click', () => {
    darkMode = !darkMode
    if (darkMode) {
        $.documentElement.classList.add('dark')
        toggle.style.background = '#fff'
    } else {
        $.documentElement.classList.remove('dark')
        toggle.style.background = '#000'
    }
    console.log(darkMode);
})

const aside = $.querySelectorAll('aside a');
aside.forEach(item => {
    item.addEventListener('click', event => {
        aside.forEach(item => {
            item.classList.remove('text-white')
            item.classList.remove('bg-redBg');
            item.classList.remove('dark:text-mainBg')
            item.classList.remove('dark:bg-golden')

        })

        const clickItem = event.target

        if (clickItem.parentNode.tagName === 'A') {

            clickItem.parentNode.classList.add('text-white');
            clickItem.parentNode.classList.add('bg-redBg');
            clickItem.parentNode.classList.add('dark:text-mainBg');
            clickItem.parentNode.classList.add('dark:bg-golden');

        } else {
            clickItem.classList.add('text-white');
            clickItem.classList.add('bg-redBg')
            clickItem.classList.add('dark:text-mainBg');
            clickItem.classList.add('dark:bg-golden');

        }


    })
})
