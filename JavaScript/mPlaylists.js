
const playIcon = document.querySelector('#play')
const nextIcon = document.querySelector('#next')
const speakerIcon = document.querySelector('#speaker')
const prevIcon = document.querySelector('#prev')
const roundomIcon = document.querySelector('#roundom')
const currentTime = document.querySelector('#currentTime')
const musicTime = document.querySelector('#musicTime')
const ArtistName = document.querySelector('#ArtistName')
const songName = document.querySelector('#songName')
const music = document.querySelector('audio')
const cover = document.querySelector('#cover')
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const firstDetails = document.getElementById('firstDetails')
const artistName = document.getElementById('artistName')
const shereIcon = document.getElementById('shereIcon')
const downloadBtn = document.querySelectorAll('#downloadBtn')



let songs;
let musicUrl;
let results;
let listType;


window.addEventListener('load', () => {
  songs = [
    {
      id: 1,
      name: 'رپ',
      type: 'ourPlayList',
      data: [
        {
          id: '89643',
          photo: '../Images/rapGame.jpg',
          link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/89643-3ec826c9c179bbd.mp3",
          plays: '2,474,839',
          likes: '3,699',
          downloads: '2,474,839',
          song_farsi: "رپ گیم اوج",
          artist_farsi: "پیشرو",
          current: 1
        },

        {
          id: '76394',
          photo: "../Images/pishroPlayList.jpg",
          link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/76394-f043aabcd0e56c1.mp3",
          plays: '2,312,733',
          likes: '3,533',
          downloads: '2,312,733',
          song_farsi: "رپر قدیمی ریمیکس",
          artist_farsi: "پیشرو",
          current: 2
        },
        {
          id: '22419',
          photo: "https://assets.rjassets.com/static/mp3/ali-sorena-majnoone-shahr/9a452da8de927f4.jpg",
          link: "https://host1.mediacon-rj.app/media/mp3/mp3-256/22419-760a12d8d2f0bfc.mp3",
          plays: '4,523,691"',
          likes: '9,827',
          downloads: '4,523,691',
          song_farsi: "علی سورنا",
          artist_farsi: "مجنون شهر",
          current: 3
        },

        {
          id: '22417',
          photo: "https://assets.rjassets.com/static/mp3/ali-sorena-nemitarsam/68eba671e2b61c2.jpg",
          path: "https://host1.mediacon-rj.app/media/mp3/mp3-256/22417-2080d359c26ce7d.mp3",
          plays: '3,563,743"',
          likes: '6,179',
          downloads: '3,563,743',
          song_farsi: "نمیترسم",
          artist_farsi: "علی سورنا",
          current: 4
        }
      ]

    },
    {
      id: 2,
      name: 'سنتی',
      type: 'ourPlayList',
      data: [{
        id: '97284',
        photo: "https://assets.rjassets.com/static/mp3/homayoun-shajarian-asemane-abri/d3d91b20e3e12ca.jpg",
        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/97284-282b44b8917942d.mp3",
        plays: '15,894,699',
        likes: '18,189',
        downloads: '15,894,699',
        song_farsi: "آسمان ابری",
        artist_farsi: "همایون شجریان",
        current: 1
      },
      {
        id: '99193',
        photo: "https://assets.rjassets.com/static/mp3/homayoun-shajarian-yek-nafas-arezouye-to/831b1137962e9db.jpg",
        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/99193-226394f93acb3c4.mp3",
        plays: '10,246,788',
        likes: '13,204',
        downloads: '10,246,788',
        song_farsi: "یک نفس آرزوی تو",
        artist_farsi: "همایون شجریان",
        current: 2
      },

      {
        id: '98183',
        photo: "https://assets.rjassets.com/static/mp3/homayoun-shajarian-havaye-zemzemehayet/a4bf9281bfa5b7d.jpg",
        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/98183-b35aef05f4b0c2e.mp3",
        plays: '10,474,856',
        likes: '11,836',
        downloads: "10,474,856",
        song_farsi: "هوای زمزمه هایت",
        artist_farsi: "همایون شجریان",
        current: 3
      },
      {
        id: '20169',
        photo: "https://assets.rjassets.com/static/mp3/homayoun-shajarian-havaye-geryeh/2a9977cb7f7eda3.jpg",
        link: "https://host1.mediacon-rj.app/media/mp3/mp3-256/20169-f38d85c950deebe.mp3",
        plays: '17,345,802',
        likes: '24,913',
        downloads: '17,345,802',
        song_farsi: "هوای گریه",
        artist_farsi: "همایون شجریان",
        current: 4
      }]
    },

    {
      id: 3,
      name: 'پاپ v1',
      type: 'ourPlayList',
      data: [{
        id: '101612',
        photo: "https://assets.rjassets.com/static/mp3/shadmehr-aghili-daste-man-nist/52fbbf01742ce4f.jpg",
        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/101612-f7b4c735bc5e301.mp3",
        plays: '86,274,517',
        likes: '80,829',
        downloads: '86,274,517',
        song_farsi: "دست من نیست",
        artist_farsi: "شادمهر عقیلی",
        current: 1
      },
      {
        id: '105744',
        photo: "https://assets.rjassets.com/static/mp3/shadmehr-aghili-chera-too-jangi/95796ce775c9a91.jpg",
        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/105744-949f30374731f94.mp3",
        plays: '49,421,095',
        likes: '49,850',
        downloads: '49,421,095',
        song_farsi: "چرا تو جنگی",
        artist_farsi: "شادمهر عقیلی",
        current: 2
      },
      {
        id: '113832',
        photo: "https://assets.rjassets.com/static/mp3/ali-yasini-nesfe-shab/2313b1b542f2d82.jpg",
        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/113832-64271a002902289.mp3",
        plays: '19,168,731',
        likes: '30,986',
        downloads: '19,168,731',
        song_farsi: "نصف شب",
        artist_farsi: "علی یاسینی",
        current: 3
      },
      {
        id: '113403',
        photo: "https://assets.rjassets.com/static/mp3/ali-yasini-nade-ghol/ad762502b6565d4.jpg",
        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/113403-26c03bf2a132d0a.mp3",
        plays: '21,169,634',
        likes: '29,491',
        downloads: '21,169,634',
        song_farsi: "نده قول",
        artist_farsi: "علی یاسینی",
        current: 4
      }]
    },

    {
      id: 4,
      name: 'پاپ v2',
      type: 'ourPlayList',
      data: [
        {
          id: '113403',
          photo: "https://assets.rjassets.com/static/mp3/ali-yasini-nade-ghol/ad762502b6565d4.jpg",
          link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/113403-26c03bf2a132d0a.mp3",
          plays: '21,169,634',
          likes: '29,491',
          downloads: '21,169,634',
          song_farsi: "نده قول",
          artist_farsi: "علی یاسینی",
          current: 1
        },
        {
          id: '101612',
          photo: "https://assets.rjassets.com/static/mp3/shadmehr-aghili-daste-man-nist/52fbbf01742ce4f.jpg",
          link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/101612-f7b4c735bc5e301.mp3",
          plays: '86,274,517',
          likes: '80,829',
          downloads: '86,274,517',
          song_farsi: "دست من نیست",
          artist_farsi: "شادمهر عقیلی",
          current: 2
        },
        {
          id: '105744',
          photo: "https://assets.rjassets.com/static/mp3/shadmehr-aghili-chera-too-jangi/95796ce775c9a91.jpg",
          link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/105744-949f30374731f94.mp3",
          plays: '49,421,095',
          likes: '49,850',
          downloads: '49,421,095',
          song_farsi: "چرا تو جنگی",
          artist_farsi: "شادمهر عقیلی",
          current: 3
        },
        {
          id: '113832',
          photo: "https://assets.rjassets.com/static/mp3/ali-yasini-nesfe-shab/2313b1b542f2d82.jpg",
          link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/113832-64271a002902289.mp3",
          plays: '19,168,731',
          likes: '30,986',
          downloads: '19,168,731',
          song_farsi: "نصف شب",
          artist_farsi: "علی یاسینی",
          current: 4
        },
      ]
    },
  ]

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlResult = params.get('id');
  const typeResult = params.get('plId');

  if (urlResult === 'not') {


    Swal.fire({
      title: 'آهنگی در پلی لیست موجود نیست',
      icon: 'warning',
      confirmButtonText: 'افزودن',

    }).then((result) => {
     
      if (result.isConfirmed) {
        location.href = 'musics.html?type=newMusic&page=1'
      }else{
        history.back()
      }
    })




  } else {

    listType = songs.filter(playLists => {
      return playLists.id == typeResult
    })

    songs.filter(song => {
      if (song.id == typeResult) {
        results = song.data.filter(res => {
          return res.id == urlResult
        })

      }


    })

    loadSong(results[0]);



    nextIcon.addEventListener('click', () => {
      pauseSong()
      if (results[0].current !== listType[0].data.length) {
        let res = listType[0].data.filter(datas => {
          return datas.current == results[0].current + 1

        })
        location.href = `?type=ourPlayList&plId=${listType[0].id}&id=${res[0].id}`

      } else {
        let res = listType[0].data.filter(datas => {
          return datas.current == results[0].current - 3

        })
        console.log(res);
        location.href = `?type=ourPlayList&plId=${listType[0].id}&id=${res[0].id}`
      }


    })

    prevIcon.addEventListener('click', () => {
      pauseSong()
      if (results[0].current !== 1) {
        let res = listType[0].data.filter(datas => {
          return datas.current == results[0].current - 1

        })
        location.href = `?type=ourPlayList&plId=${listType[0].id}&id=${res[0].id}`

      } else {
        let res = listType[0].data.filter(datas => {
          return datas.current == results[0].current + 3

        })
        console.log(res);
        location.href = `?type=ourPlayList&plId=${listType[0].id}&id=${res[0].id}`
      }
    })

    roundomIcon.addEventListener('click', () => {
      pauseSong()
      let number = [1, 2, 3, 4];

      let randomIndex = Math.floor(Math.random() * number.length);
      let selectedNumber = number[randomIndex];

      let res = listType[0].data.filter(datas => {

        return datas.current == selectedNumber

      })

      location.href = `?type=ourPlayList&plId=${listType[0].id}&id=${res[0].id}`
    })

    shereIcon.addEventListener('click', () => {
      let link = location.href
      navigator.clipboard.writeText(link)
      iziToast.show({
        message: 'آدرس سایت با موفقیت در کلیپ بورد شما کپی شد',
        rtl: true,
      });
    })


    downloadBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        download(musicUrl);
      })
    })

    function download(url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = true;
      link.click();
    }

  }





})



function loadSong(song) {
  songName.textContent = song.song_farsi;
  ArtistName.textContent = song.artist_farsi;
  music.src = song.link;
  cover.style.background = `url(${song.photo})`
  musicUrl = song.link;
  console.log(cover);
  firstDetails.insertAdjacentHTML('beforeend',
    `
      
      <section class="flex justify-center items-center">
      <p>${song.plays}</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
        
  </section>

  <section class="flex justify-center items-center border-solid border-r-1 border-[#292932]">
      <p>${song.downloads}</p> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        
  </section>

  <section class="flex justify-center items-center border-solid border-r-1 border-[#292932]">
      <p>${song.likes}</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5  mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        
        
  </section>
      `
  )
}







function updateProgressBar(e) {
  let currentMinutes;
  let currentSeconds;
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      musicTime.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime



    currentMinutes = Math.floor(currentTime / 60);
    currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (progress.style.width > '99.5%') {
      pauseSong()

    }
  }
  if (isPlaying) {
    currentTime.innerHTML = ''
    currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
  }
}

document.body.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
    e.preventDefault()

    if (isPlaying) {
      pauseSong()

    } else {
      playSong()

    }
  }
  if (e.code === "ArrowRight") {
    newTime = music.currentTime + 10
    music.currentTime = newTime
  }
  if (e.code === "ArrowLeft") {
    newTime = music.currentTime - 10
    music.currentTime = newTime
  }
})




let isPlaying = false;




function playSong() {
  isPlaying = true;
  playIcon.innerHTML = ''
  playIcon.innerHTML = ' <i class="fas fa-pause " ></i>'
  music.play();
}
function pauseSong() {
  isPlaying = false;
  music.pause();
  playIcon.innerHTML = ''
  playIcon.innerHTML = ' <i class="fas fa-play " ></i>'
}

playIcon.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()

  }
})



function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;

}

let speaker = true;

speakerIcon.addEventListener('click', (e) => {
  if (speaker) {
    music.volume = 0
    speaker = false
    speakerIcon.innerHTML = ''
    speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-xmark relative top-[3px]" ></i>'
  } else {
    music.volume = 1
    speakerIcon.innerHTML = ''
    speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-high relative top-[3px]" ></i>'
    speaker = true
  }
  fa - volume - xmark
})

music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);


