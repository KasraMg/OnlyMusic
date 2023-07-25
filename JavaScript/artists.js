import { artists } from "./helper/server.js";
import { getParamToUrl, addParamToUrl, pagination } from "./utilis/utils.js"

const artistsWrapper = document.querySelector('#artistsWrapper');
const paginationWrapper = document.querySelector('#paginationWrapper');

window.addParamToUrl = addParamToUrl

window.addEventListener('load', () => {
    pagination(artists, +getParamToUrl('page'), 18, paginationWrapper).map(artist => (
        artistsWrapper.insertAdjacentHTML(
            "beforeend", `
            
            <a href='artist.html?artist=${artist.name}&type=all&page=1' class="w-full">
            <div class="">
              <img src=${artist.photo} alt="cover" class="rounded-full w-full">
            </div>
  
            <div class="mt-4">
              <h3 class="font-bold text-center text-lg md:text-md text-darkBgarkBg dark:text-white">${artist.name}
              </h3>
            </div>
          </a>
            
                       
            `)))

})