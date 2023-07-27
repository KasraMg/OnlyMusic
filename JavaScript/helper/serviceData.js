const getData = key => {
    return JSON.parse(localStorage.getItem(key));
}

const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}


const updateData = (showData) => {
    setData('showData', showData);
    const mainData = getData('mainData');
    const index = mainData.findIndex(item => item.id === showData.id);
    if (index !== -1) {
        mainData.splice(index, 1, showData);
    }
    setData('mainData', mainData);
}



export { getData, setData, updateData }

