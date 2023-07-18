
import { validation } from "../utilis/validation.js";
import { rightCode } from '../helper/captchaCreator.js'
import { showSwal } from "../utilis/utils.js";
//////////////////////////////////////////////////////////
const password = document.querySelector("#password");
const eyePassword = document.querySelectorAll("#eyePassword");
let eyePasswordFlag = false;
eyePassword.forEach(element => {
    element.addEventListener('click', () => {
        eyePasswordFlag = !eyePasswordFlag;
        showAndHiddenPassword(eyePassword, password, eyePasswordFlag)
    })
})


const confirmPassword = document.querySelector("#confirmPassword");
const eyeConfirmPassword = document.querySelectorAll("#eyeConfirmPassword");
let eyeConfirmPasswordFlag = false;
eyeConfirmPassword.forEach(element => {
    element.addEventListener('click', () => {
        eyeConfirmPasswordFlag = !eyeConfirmPasswordFlag;
        showAndHiddenPassword(eyeConfirmPassword, confirmPassword, eyeConfirmPasswordFlag)

    })
})

const showAndHiddenPassword = (icons, input, flag) => {
    if (flag) {
        icons[0].classList.add('hidden');
        icons[1].classList.remove('hidden');
        input.type = 'text'
    } else {
        icons[0].classList.remove('hidden');
        icons[1].classList.add('hidden');
        input.type = 'password'
    }
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
let url = window.location.pathname;
let fileName = url.substring(url.lastIndexOf('/') + 1);
const type = fileName.replace('.html', '');

let touch = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    checkBox: false,
    captcha: ''
}
let data = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkBox: false,
    captcha: ''
}


const allInputs = document.querySelectorAll('form input');
const allMassageError = document.querySelectorAll('form p');

allInputs.forEach(element => {
    element.addEventListener('change', event => {
        if (event.target.id === "checkBox") {
            data = { ...data, [event.target.id]: event.target.checked };
        } else {
            data = { ...data, [event.target.id]: event.target.value.trim() }
            element.value = data[element.id]
        }

        setError(validation(data, type, rightCode))

    });
})



allInputs.forEach(element => {
    element.addEventListener('blur', event => {
        touch = { ...touch, [event.target.id]: true };

        setError(validation(data, type, rightCode))

    })

});
const setError = (errors) => {

    allMassageError.forEach(element => {
        element.classList.add('hidden');

    });

    allInputs.forEach(element => {
        element.classList.remove('ring-[#d3282842]')
        element.classList.remove('ring-4')
        element.classList.remove('focus:ring-[#d3282842]');
        element.classList.add('focus:ring-[#285ed342]')

    })

    allMassageError.forEach((element, index) => {

        let touchFlag = touch[element.id.replace('Error', '')]

        if (touchFlag && errors[element.id]) {
            element.classList.remove('hidden');
            element.innerHTML = errors[element.id];

            allInputs[index].classList.remove('focus:ring-[#285ed342]');
            allInputs[index].classList.add('focus:ring-[#d3282842]');
            allInputs[index].classList.add('ring-4');
            allInputs[index].classList.add('ring-[#d3282842]');
        }

    })
}

const submitHandler = (event, completeHandler) => {
    event.preventDefault();

    if (!Object.keys(validation(data, type, rightCode)).length) {
        completeHandler()

    } else {

        touch = {
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
            checkBox: true,
            captcha: true

        }

        setError(validation(data, type, rightCode))


        showSwal(
            "لطفا فیلد ها را با دقت کامل کنید",
            "error",
            "اصلاح اطلاعات",
            (result) => { }
        );

    }
}



export { submitHandler, data }