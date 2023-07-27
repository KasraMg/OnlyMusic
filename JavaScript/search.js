import { getParamToUrl,getInfoes } from "./utilis/utils.js";

window.addEventListener('load',()=>{
    const param =getParamToUrl('param')
    console.log(param);
    getInfoes(`https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=search&q=${param}`).then(data=>{
        console.log(data);
    })
})