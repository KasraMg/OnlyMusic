const addNewUser = data => {

    const newUserInfo = {
        userInfo: {
            ...data
        },
        id: 1,
        album: [],
        favorite: [],
        lastMusic: '',


    }

    if (!localStorage.getItem('mainData')) {
        localStorage.setItem('mainData', JSON.stringify([newUserInfo]))
        localStorage.setItem('showData', JSON.stringify(newUserInfo))
    } else {
        let mainData = JSON.parse(localStorage.getItem('mainData'));
        newUserInfo.id = mainData.length + 1;
        mainData.push(newUserInfo);
        localStorage.setItem('mainData', JSON.stringify(mainData))
        localStorage.setItem('showData', JSON.stringify(newUserInfo))

    }
}

export { addNewUser }