import { getParamToUrl } from "./utilis/utils.js"
import { getData } from "./helper/repeatedActivities.js";
//////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', () => {
    const paramsType = getParamToUrl('type');

    if (paramsType === 'newVideo') {
        getData('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=new_videos')
    } else {
        getData('https://one-api.ir/radiojavan/?token=677668:64ae5b9d7c848&action=hot_videos')
    }

});

