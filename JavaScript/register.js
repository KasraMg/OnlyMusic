import { addNewUser } from "./helper/addNewUser.js";
import { submitHandler, data } from "./helper/enterPanelCommon.js";
import { showSwal } from "./utilis/utils.js";

////////////////////////////////////////////////////////////// 

const loginBtn = document.querySelector('#loginBtn')

loginBtn.addEventListener('click', event => {
    event.preventDefault();
    location.href = 'login.html'
})

////////////////////////////////////////////////////////////////////
const registerBtn = document.querySelector('#registerBtn')

registerBtn.addEventListener('click', (event) => submitHandler(event, () => {
     showSwal(  ' با موفقیت ثبت نام شدید!' ,'success',  'بزن بریم',(result) => {
        location.href = "userPanel.html";
      }  )
    const dateToDay = () => {
        const date = new Date();
        const configs = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }

        const toDay = date.toLocaleDateString('fa-IR', configs)

        return toDay
    }

    let { name, email, password } = data
    let dataToSave = { name, email, password, registerDate: dateToDay() }
    addNewUser(dataToSave);
   
}
))
