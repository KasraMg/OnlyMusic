const validation = (data, type, mainCaptcha) => {

    const errors = {};

    if (!data.email.trim()) {
        errors.emailError = "ایمیل الزامی می باشد.";
    } else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(data.email)) {
        errors.emailError = "ایمیل وارد شده معتبر نیست!";
    } else if (!emailExist(data.email)[0] && type === 'login') {
        errors.emailError = 'این ایمیل در سایت ثبت نام نکرده است'
    } else {
        delete errors.emailError;
    }


    if (!data.password.trim()) {
        errors.passwordError = "گذرواژه الزامی می باشد";
    } else if (data.password.length < 6) {
        errors.passwordError = "گذرواژه باید بیشتر از 6 کارکتر باشد"
    } else if (emailExist(data.email)[1] !== data.password && type === 'login') {
        errors.passwordError = 'رمز عبور نامعتبر است'
    } else {
        delete errors.passwordError;
    }
    ////////////////
    if (type === 'login') {
      
        if (data.captcha === '') {
            errors.captchaError = 'لطفا کد امنتی را وارد کنید'
        } else if (data.captcha.toLowerCase() !== mainCaptcha) {
            errors.captchaError = "کد وارد شده صحیح نمیباشد"
        } else {
            delete errors.captchaError;
        }


    }



    //  this section  validation for sing up form
    if (type === "register") {


        if (emailExist(data.email)[0]) {
            errors.emailError = 'با این ایمیل ثبت نام شده است'
        }

        if (!data.name.trim()) {
            errors.nameError = "نام و نام خانوادگی الزامی می باشد.";
        } else if (!(/^[\u0600-\u06FFa-zA-Z\s]+$/).test(data.name.trim()) || data.name.trim().length < 3) {
            errors.nameError = 'لطفا نام و نام خانودادگی صحیح را وارد کنید'
        } else {
            delete errors.nameError;
        }

        if (!data.confirmPassword.trim()) {
            errors.confirmPasswordError = "نکرار گذرواژه الزامی می باشد"
        } else if (data.password !== data.confirmPassword) {
            errors.confirmPasswordError = "گذرواژه مطابقت ندارد"
        } else {
            delete errors.confirmPasswordError
        }


        if (!data.checkBox) {
            errors.checkBoxError = "پذیرفتن قوانین برای عضویت الزامی است."
        } else {
            delete errors.checkBoxError
        }
    }


    return errors

}


const emailExist = email => {
    const localData = JSON.parse(localStorage.getItem('mainData'))
    if (localData) {
        const checkEmailUser = localData.find(item => item.userInfo.email === email)
        if (checkEmailUser) {
            return [true, checkEmailUser.userInfo.password]
        }
    }
    return [false, false]
}


export { validation }