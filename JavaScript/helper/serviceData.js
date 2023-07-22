const getData = key => {
    return JSON.parse(localStorage.getItem(key));
}

const setData = (key,value) => {
    localStorage.setItem(key, JSON.stringify(value));
}


export { getData, setData }

