import { submitHandler, data } from "./helper/enterPanelCommon.js"
import { rightCode } from "./helper/captchaCreator.js"
import { getData, setData } from "./helper/serviceData.js"
/////////////////////////////////////////////////////////
const registerBtn = document.querySelector('#registerBtn')

registerBtn.addEventListener('click', event => {
    event.preventDefault()
    location.href = 'register.html'
})


////////////////////////////////////////////////////////////
const loginBtn = document.querySelector('#loginBtn');
const soundCaptcha = document.querySelector('#soundCaptcha');
const audio = document.querySelector('audio');



soundCaptcha.addEventListener('click', () => {
    let res = `https://one-api.ir/tts/?token=677668:64ae5b9d7c848&action=microsoft&lang=en-CA-LiamNeural&q=${rightCode}&rate=-5`;
    audio.src = res;
    audio.load();
    audio.play();
})





loginBtn.addEventListener('click', (event) => submitHandler(event, () => {


    const localData = getData('mainData');
    const checkEmailUser = localData.find(item => item.userInfo.email === data.email);

    setData('showData', checkEmailUser);

    window.location.reload();
    window.location.href = 'userPanel.html'
}
))

