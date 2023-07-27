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
  let endIndex = page * count;
  let startIndex = endIndex - count;
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
              <a onclick="addParamToUrl('page', ${i})" class="bg-lightBg dark:bg-darkLbg rounded-lg  px-3 py-2 cursor-pointer hover:opacity-70 transition-all duration-200">
                ${i}
              </a>
            `
      }
           
          </li>
      `)

  }

  return dataShow

}


const mediaHtmlTemplate = (data, type) => {
  return `           
      <div class="w-full">
<div class="relative">
<a  href='${data.type === 'mp3' ? `music.html` : `mVideo.html`}?artist=${data.artist}&id=${data.id}'><img  src=${data.photo} alt="cover" class="rounded-lg w-full object-cover" ${type === 'all' ? `style=height:16rem` : ''}></a> 

${data.type === 'mp3' ?
      `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
stroke="currentColor" class="w-6 h-6 absolute top-2 right-2 text-white">
<path stroke-linecap="round" stroke-linejoin="round"
d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
</svg>
`
      :
      `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
stroke="currentColor" class="w-6 h-6 absolute top-2 right-2 text-white">
<path stroke-linecap="round"
d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
</svg>
`
    }

</div>
<a href='${data.type === 'mp3' ? `music.html` : `mVideo.html`}?artist=${data.artist}&id=${data.id}' >
<h3 class="font-bold text-lg md:text-md mb-1 mt-4 text-darkBg dark:text-white"> ${data.song_farsi}</h3>
<h4 class="font-semibold text-sm md:text-xs text-secondText">${data.artist_farsi}</h4>
</a>

</div>`
}



export { showSwal, getInfoes, getParamToUrl, addParamToUrl, pagination, mediaHtmlTemplate }