import { destructorData } from "./destructorData.js";
import { getData, updateData } from "./serviceData.js";


const recentMediaHandler = (data) => {
    const needData = destructorData(data);

    const showData = getData('showData');

    if (showData && !!Object.keys(showData).length) {

        let mediaExistenceIndex = showData.recentMedia.findIndex(item => item.id === needData.id);
        
        if (mediaExistenceIndex !== -1) {
            showData.recentMedia.splice(mediaExistenceIndex, 1)
        } else {
            if (showData.recentMedia.length >= 10) {
                showData.recentMedia.pop();
            }
        }

        showData.recentMedia.unshift(needData);
        updateData(showData);

    }

}




export { recentMediaHandler }