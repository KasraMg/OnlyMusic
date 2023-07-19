import { addNewUser } from "./helper/addNewUser.js";
import { submitHandler, data } from "./helper/enterPanelCommon.js";

////////////////////////////////////////////////////////////// 

const loginBtn = document.querySelector('#loginBtn')

loginBtn.addEventListener('click', event => {
    event.preventDefault();
    location.href = 'login.html'
})

////////////////////////////////////////////////////////////////////
const registerBtn = document.querySelector('#registerBtn')

registerBtn.addEventListener('click', (event) => submitHandler(event, () => {
    alert('yoho register');

    let { name, email, password } = data
    let dataToSave = { name, email, password }
    addNewUser(dataToSave);
    window.location.reload();
    window.location.href = 'Index.html'
}
))



