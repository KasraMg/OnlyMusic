const showSwal = (title, icon, confirmButtonText, callback) => {
    Swal.fire({
        title,
        icon,
        confirmButtonText,
    }).then((result) => callback(result));
};


const getInfoes = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}


const getParamToUrl = (param) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get(param);

}

const addParamToUrl = (param, value) => {
    let url = new URL(location.href)
    let searchParams = url.searchParams

    searchParams.set(param, value);

    if (param === 'type') {
        searchParams.set('page', 1)
    }

    url.search = searchParams.toString()
    location.href = url.toString()
}


const pagination = (mainArray, page, count, paginationParentElem) => {
    paginationParentElem.innerHTML = ''
    let endIndex = page * count
    let startIndex = endIndex - count
    let dataShow = mainArray.slice(startIndex, endIndex)
    let paginatedCount = Math.ceil(mainArray.length / count)

    for (let i = 1; i < paginatedCount + 1; i++) {
        paginationParentElem.insertAdjacentHTML('beforeend', `
          <li class="courses__pagination-item">
          ${i === Number(page) ? `
              <a onclick="addParamToUrl('page', ${i})" class="active__Btn rounded-lg  px-3 py-2 cursor-pointer">
                ${i}
              </a>
            ` : `
              <a onclick="addParamToUrl('page', ${i})" class="bg-lightBg dark:bg-[#1c1c24] rounded-lg  px-3 py-2 cursor-pointer hover:opacity-70 transition-all duration-200">
                ${i}
              </a>
            `
            }
           
          </li>
      `)

    }

    return dataShow

}


export { showSwal, getInfoes, getParamToUrl, addParamToUrl, pagination }