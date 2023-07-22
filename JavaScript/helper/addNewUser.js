import { getData, setData } from "./serviceData.js";

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
    let mainData = getData('mainData');


    if (!mainData) {
        setData('mainData', [newUserInfo])
        setData('showData', newUserInfo);
    } else {
        newUserInfo.id = mainData.length + 1;
        mainData.push(newUserInfo);
        setData('mainData', mainData)
        setData('showData', newUserInfo)

    }
}

export { addNewUser }