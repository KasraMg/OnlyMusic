const idCreator = (array) => {
    let checkId = true;
    let randomId = null;

    while (checkId) {
        randomId = Math.floor(Math.random() * 999);
        checkId = array.some(item => item.id === randomId);
    }

    return randomId
}

export { idCreator }
