import { recentMediaHandler } from "./helper/recentMedia.js"
import { getData, updateData } from "./helper/serviceData.js"
import { destructorData } from "./helper/destructorData.js"
import { getParamToUrl } from "./utilis/utils.js"
import { sliceCounter } from "./helper/sliceCounter.js"

const likeMedia = document.querySelector('#likeMedia')

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
const loopIcon = document.querySelector('#loopIcon')
const searchInput = document.querySelector('#searchInput') 
const searchInputMd = document.querySelector('#searchInputMd')



let songs;
let musicUrl;
let results;
let listType;
let musicResult;
let sendData = null;
let listLength;
let song2;
let musicIndex;
let nextMusic
let typeResult;
let newTime 
window.addEventListener('load', () => {


  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlResult = params.get('id');
  typeResult = params.get('plId');
  musicResult = params.get('type');

  const showData = getData('showData')
  if (showData && showData.id) {
    let likeFlag = showData.favorite.some(item => item.id == getParamToUrl('id'));
    if (likeFlag) {
      likeMedia.classList.remove('hidden');
      noLikeMedia.classList.add('hidden');
    }
    noLikeMedia.addEventListener('click', noLikeMediaHandler)
    likeMedia.addEventListener('click', likeMediaHandler);
  } else {

    noLikeMedia.addEventListener('click', () => noLoginSwal('برای لایک کردن ابتدا وارد شوید.'));

  }



  if (urlResult === 'not') {


    Swal.fire({
      title: 'آهنگی در پلی لیست موجود نیست',
      icon: 'warning',
      confirmButtonText: 'افزودن',

    }).then((result) => {

      if (result.isConfirmed) {
        location.href = 'musics.html?type=newMusic&page=1'
      } else {
        history.back()
      }
    })




  } else {

    if (musicResult == 'musicsAlbum') {
      const showData = getData('showData');
      const playListActive = showData.musicsAlbum.find(item => item.id == typeResult)
      song2 = playListActive.data
      const musicResult = song2.filter(music => {
        return music.id == urlResult
      })
      document.title=musicResult[0].song_farsi; 
      recentMediaHandler(musicResult[0]);
      musicIndex = song2.findIndex((music) => {
        return music.id == urlResult
      })
      sendData = musicResult[0]
      loadSong(musicResult[0]);

      nextIcon.addEventListener('click', () => {
        pauseSong()
        if (musicIndex + 1 == song2.length) {
          location.href = `?type=musicsAlbum&plId=${typeResult}&id=${song2[0].id}`
        } else {
          nextMusic = song2[musicIndex + 1]
          location.href = `?type=musicsAlbum&plId=${typeResult}&id=${nextMusic.id}`
        }



      })

      prevIcon.addEventListener('click', () => {
        pauseSong()

        if (musicIndex !== 0) {
          let nextMusic = song2[musicIndex - 1]
          location.href = `?type=musicsAlbum&plId=${typeResult}&id=${nextMusic.id}`


        } else {
          location.href = `?type=musicsAlbum&plId=${typeResult}&id=${song2[song2.length - 1].id}`
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

    } else {
      songs = [
        {
          id: 1,
          name: 'رپ',
          type: 'ourPlayList',
          data: [
            {
              "id": 89643,
              "photo": "https://assets.rjassets.com/static/mp3/pishro-rap-game-(ft-owj)/16665e5cc83dfd0.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/89643-3ec826c9c179bbd.mp3",
              "plays": "2,480,720",
              "likes": "3711",
              "downloads": "2,480,720",
              "song_farsi": "رپ گیم اوج",
              "artist_farsi": "پیشرو",
              "artist": "Pishro",
              "type": "mp3",
              "current": 1
            },
            {
              "id": 76394,
              "photo": "https://assets.rjassets.com/static/mp3/pishro-rapere-ghadimi-(erfam-remix)/466e92daec4720e.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/76394-f043aabcd0e56c1.mp3",
              "plays": "2,315,405",
              "likes": "3,540",
              "downloads": "2,315,405",
              "song_farsi": "رپر قدیمی ریمیکس",
              "artist_farsi": "پیشرو",
              "artist": "Pishro",
              "type": "mp3",
              "current": 2
            },
            {
              "id": 22419,
              "photo": "https://assets.rjassets.com/static/mp3/ali-sorena-majnoone-shahr/9a452da8de927f4.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/22419-760a12d8d2f0bfc.mp3",
              "plays": "4,527,388",
              "likes": "9,839",
              "downloads": "4,527,388",
              "song_farsi": "مجنون شهر",
              "artist_farsi": "علی سورنا",
              "artist": "Ali Sorena",
              "type": "mp3",
              "current": 3
            },
            {
              "id": 22417,
              "photo": "https://assets.rjassets.com/static/mp3/ali-sorena-nemitarsam/68eba671e2b61c2.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/22417-2080d359c26ce7d.mp3",
              "plays": "3,565,759",
              "likes": "6,183",
              "downloads": "3,565,759",
              "song_farsi": "نمیترسم",
              "artist_farsi": "علی سورنا",
              "artist": "Ali Sorena",
              "type": "mp3",
              "current": 4
            },
            {
              "id": 48014,
              "photo": "https://assets.rjassets.com/static/mp3/ho3ein-gorg-(ft-pishro-tataloo)/94c55b029f5afe3.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/48014-bad273cff2887e5.mp3",
              "plays": "31,236,244",
              "likes": "30,731",
              "downloads": "31,236,244",
              "song_farsi": "گرگ پیشرو امیر تتلو",
              "artist_farsi": "حصین",
              "artist": "Ho3ein",
              "type": "mp3",
              "current": 5
            },
            {
              "id": 85930,
              "photo": "https://assets.rjassets.com/static/mp3/reza-pishro-pesare-ebne-sina/2e0c7f206d6f86a.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/85930-dc66650ee10008b.mp3",
              "plays": "3,136,984",
              "likes": "5,350",
              "downloads": "3,136,984",
              "song_farsi": "پسر ابن سینا",
              "artist_farsi": "پیشرو",
              "artist": "Pishro",
              "type": "mp3",
              "current": 6
            },
            {
              "id": 48014,
              "photo": "https://assets.rjassets.com/static/mp3/ho3ein-gorg-(ft-pishro-tataloo)/94c55b029f5afe3.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/48014-bad273cff2887e5.mp3",
              "plays": "31,236,244",
              "likes": "30,731",
              "downloads": "31,236,244",
              "song_farsi": "گرگ پیشرو امیر تتلو",
              "artist_farsi": "حصین",
              "artist": "Ho3ein",
              "type": "mp3",
              "current": 7
            },
            {
              "id": 76394,
              "photo": "https://assets.rjassets.com/static/mp3/pishro-rapere-ghadimi-(erfam-remix)/466e92daec4720e.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/76394-f043aabcd0e56c1.mp3",
              "plays": "2,315,405",
              "likes": "3,540",
              "downloads": "2,315,405",
              "song_farsi": "رپر قدیمی ریمیکس",
              "artist_farsi": "پیشرو",
              "artist": "Pishro",
              "type": "mp3",
              "current": 8
            },
            {
              "id": 50246,
              "photo": "https://assets.rjassets.com/static/mp3/reza-pishro-dandune-babr/efedfa220cba894.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/pishro-dandune-babr/Pishro+-+Dandune+Babr.mp3",
              "plays": "1,164,278",
              "likes": "1,647",
              "downloads": "1,164,278",
              "song_farsi": "دندون ببر",
              "artist_farsi": "پیشرو",
              "artist": "Pishro",
              "type": "mp3",
              "current": 9
            },
            {
              "id": 77406,
              "photo": "https://assets.rjassets.com/static/mp3/ali-sorena-kavir/268c1019e1e781b.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/77406-c5dee5df450fb38.mp3",
              "plays": "3,297,879",
              "likes": "5,288",
              "downloads": "3,297,879",
              "song_farsi": "کویر",
              "artist_farsi": "علی سورنا",
              "artist": "Ali Sorena",
              "type": "mp3",
              "current": 10
            },
            {
              "id": 77411,
              "photo": "https://assets.rjassets.com/static/mp3/ali-sorena-poshte-in-jang-ha/1eccd6a28067792.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/77411-6b6022fbfd01e44.mp3",
              "plays": "1,751,898",
              "likes": "3,302",
              "downloads": "1,751,898",
              "song_farsi": "پشت این جنگ‌ها",
              "artist_farsi": "علی سورنا",
              "artist": "Ali Sorena",
              "type": "mp3",
              "current": 11
            }
          ]
        },
        {
          id: 2,
          name: 'سنتی',
          type: 'ourPlayList',
          data: [
            {
              "id": 97284,
              "photo": "https://assets.rjassets.com/static/mp3/homayoun-shajarian-asemane-abri/d3d91b20e3e12ca.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/97284-282b44b8917942d.mp3",
              "plays": "15,950,191",
              "likes": "18,262",
              "downloads": "15,950,191",
              "song_farsi": "آسمان ابری",
              "artist_farsi": "همایون شجریان",
              "artist": "Homayoun Shajarian",
              "type": "mp3",
              "current": 1
            },
            {
              "id": 21805,
              "photo": "https://assets.rjassets.com/static/mp3/shajarian-baroon/a11f03a4367454d.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/21805-da7f56aa2681ae2.mp3",
              "plays": "9,564,859",
              "likes": "14,763",
              "downloads": "9,564,859",
              "song_farsi": "بارون",
              "artist_farsi": "شجریان",
              "artist": "Shajarian",
              "type": "mp3",
              "current": 2
            },
            {
              "id": 20169,
              "photo": "https://assets.rjassets.com/static/mp3/homayoun-shajarian-havaye-geryeh/2a9977cb7f7eda3.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/20169-f38d85c950deebe.mp3",
              "plays": "17,368,113",
              "likes": "24,932",
              "downloads": "17,368,113",
              "song_farsi": "هوای گریه",
              "artist_farsi": "همایون شجریان",
              "artist": "Homayoun Shajarian",
              "type": "mp3",
              "current": 3
            },
            {
              "id": 68818,
              "photo": "https://assets.rjassets.com/static/mp3/homayoun-shajarian-gerye-miayad-mara/0e5f92ac05f6533.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/68818-b76653d06fa364a.mp3",
              "plays": "9,731,931",
              "likes": "10,719",
              "downloads": "9,731,931",
              "song_farsi": "گریه می آید مرا",
              "artist_farsi": "همایون شجریان",
              "artist": "Homayoun Shajarian",
              "type": "mp3",
              "current": 4
            },
            {
              "id": 24196,
              "photo": "https://assets.rjassets.com/static/mp3/homayoun-shajarian-tahmoures-pournazeri-chera-rafti/f93b5a4ebd2fa28.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/24196-c00e0b79083c93d.mp3",
              "plays": "20,772,457",
              "likes": "39055",
              "downloads": "20,772,457",
              "song_farsi": "چرا رفتی",
              "artist_farsi": "همایون شجریان و تهمورس پورناظری",
              "artist": "Homayoun Shajarian & Tahmoures Pournazeri",
              "type": "mp3",
              "current": 5
            },
            {
              "id": 87565,
              "photo": "https://assets.rjassets.com/static/mp3/alireza-ghorbani-booye-gisoo/59bd1813802ae2b.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/87565-d2fe1d9eb79bd37.mp3",
              "plays": "5,867,995",
              "likes": "6,654",
              "downloads": "5,867,995",
              "song_farsi": "بوی گیسو",
              "artist_farsi": "علیرضا قربانی",
              "artist": "Alireza Ghorbani",
              "type": "mp3",
              "current": 6
            },
            {
              "id": 93688,
              "photo": "https://assets.rjassets.com/static/mp3/alireza-ghorbani-khiale-khosh/b8778c2d650829b.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/93688-a352dfd3dc1c135.mp3",
              "plays": "16,293,959",
              "likes": "19,302",
              "downloads": "16,293,959",
              "song_farsi": "خیال خوش",
              "artist_farsi": "علیرضا قربانی",
              "artist": "Alireza Ghorbani",
              "type": "mp3",
              "current": 7
            },
            {
              "id": 87228,
              "photo": "https://assets.rjassets.com/static/mp3/alireza-ghorbani-roozegare-gharib/9235c5ee2a0b56b.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/87228-fd505f4707fd35d.mp3",
              "plays": "9,019,952",
              "likes": "11,632",
              "downloads": "9,019,952",
              "song_farsi": "روزگار غریب",
              "artist_farsi": "علیرضا قربانی",
              "artist": "Alireza Ghorbani",
              "type": "mp3",
              "current": 8
            },
            {
              "id": 93993,
              "photo": "https://assets.rjassets.com/static/mp3/ali-zand-vakili-fasle-parishani/37b59be72c7b522.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/93993-ed7d746f61f219f.mp3",
              "plays": "16,759,797",
              "likes": "15,752",
              "downloads": "16,759,797",
              "song_farsi": "فصل پریشانی",
              "artist_farsi": "علی زند وکیلی",
              "artist": "Ali Zand Vakili",
              "type": "mp3",
              "current": 9
            },
            {
              "id": 96027,
              "photo": "https://assets.rjassets.com/static/mp3/ali-zand-vakili-neghab/ba245a0eb67709e.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/96027-b43c430dc80442a.mp3",
              "plays": "15,372,441",
              "likes": "16,427",
              "downloads": "15,372,441",
              "song_farsi": "نقاب",
              "artist_farsi": "علی زند وکیلی",
              "artist": "Ali Zand Vakili",
              "type": "mp3",
              "current": 10
            },
            {
              "id": 93294,
              "photo": "https://assets.rjassets.com/static/mp3/ali-zand-vakili-akhrain-avaz/a88da428bd572fb.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/93294-ee92d0af9662b7d.mp3",
              "plays": "11,006,263",
              "likes": "8,839",
              "downloads": "11,006,263",
              "song_farsi": "آخرین آواز",
              "artist_farsi": "علی زند وکیلی",
              "artist": "Ali Zand Vakili",
              "type": "mp3",
              "current": 11
            }
          ]
        },

        {
          id: 3,
          name: '🤍',
          type: 'ourPlayList',
          data: [
            {
              "id": 117051,
              "photo": "https://assets.rjassets.com/static/mp3/alireza-ghorbani-parishani/0d246f880a02cff.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/117051-c8e344134951299.mp3",
              "plays": "1,247,235",
              "likes": "3,152",
              "downloads": "1,247,235",
              "song_farsi": "پشیمانی",
              "artist_farsi": "علیرضا قربانی",
              "artist": "Alireza Ghorbani",
              "type": "mp3",
              "current": 1
            },
            {
              "id": 115059,
              "photo": "https://assets.rjassets.com/static/mp3/alireza-ghorbani-roozhaye-bi-gharar/7ce0d7b29bf24b4.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/115059-e5699763c1e5d9b.mp3",
              "plays": "2,334,524",
              "likes": "3920",
              "downloads": "2,334,524",
              "song_farsi": "روزهای بی قرار",
              "artist_farsi": "علیرضا قربانی",
              "artist": "Alireza Ghorbani",
              "type": "mp3",
              "current": 2
            },
            {
              "id": 109562,
              "photo": "https://assets.rjassets.com/static/mp3/alireza-ghorbani-midani-to/34190a3155fd6a6.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/109562-5ef0b647e5c89ff.mp3",
              "plays": "328,508",
              "likes": "642",
              "downloads": "328,508",
              "song_farsi": "میدانی تو",
              "artist_farsi": "علیرضا قربانی",
              "artist": "Alireza Ghorbani",
              "type": "mp3",
              "current": 3
            },
            {
              "id": 46194,
              "photo": "https://assets.rjassets.com/static/mp3/alireza-ghorbani-ey-del/321480b3ddab827.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/alireza-ghorbani-ey-del/Alireza+Ghorbani+-+Ey+Del.mp3",
              "plays": "282,963",
              "likes": "393",
              "downloads": "282,963",
              "song_farsi": "ای دل",
              "artist_farsi": "علیرضا قربانی",
              "artist": "Alireza Ghorbani",
              "type": "mp3",
              "current": 4
            },
            {
              "id": 53928,
              "photo": "https://assets.rjassets.com/static/mp3/ali-zand-vakili-lalaei/773363a87ae2c4a.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/53928-8cb6943efc4b0d8.mp3",
              "plays": "30,250,097",
              "likes": "42713",
              "downloads": "30,250,097",
              "song_farsi": "لالایی",
              "artist_farsi": "علی زند وکیلی",
              "artist": "Ali Zand Vakili",
              "type": "mp3",
              "current": 5
            },
            {
              "id": 47630,
              "photo": "https://assets.rjassets.com/static/mp3/ali-zand-vakili-be-sooye-to-(new-version)/df2cf1994970c1a.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/47630-6d7cc661102f633.mp3",
              "plays": "3,120,260",
              "likes": "2,846",
              "downloads": "3,120,260",
              "song_farsi": "به سوی تو",
              "artist_farsi": "علی زند وکیلی",
              "artist": "Ali Zand Vakili",
              "type": "mp3",
              "current": 6
            },
            {
              "id": 85818,
              "photo": "https://assets.rjassets.com/static/mp3/reza-bahram-mo-be-mo/bf6730268c21b4d.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/85818-6b48bdb05c1bac6.mp3",
              "plays": "32,308,864",
              "likes": "26,910",
              "downloads": "32,308,864",
              "song_farsi": "مو به مو",
              "artist_farsi": "رضا بهرام",
              "artist": "Reza Bahram",
              "type": "mp3",
              "current": 7
            },
            {
              "id": 84885,
              "photo": "https://assets.rjassets.com/static/mp3/reza-bahram-divaneh/04bafc6ad861e45.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/84885-fdf8550ae9553ff.mp3",
              "plays": "53,687,956",
              "likes": "50,677",
              "downloads": "53,687,956",
              "song_farsi": "دیوانه",
              "artist_farsi": "رضا بهرام",
              "artist": "Reza Bahram",
              "type": "mp3",
              "current": 8
            },
            {
              "id": 89451,
              "photo": "https://assets.rjassets.com/static/mp3/chaartaar-begoo-ke-zendeim/bf982e3be62fdb8.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/89451-664d3aad81b39b4.mp3",
              "plays": "8,670,130",
              "likes": "8,569",
              "downloads": "8,670,130",
              "song_farsi": "بگو که زنده ایم",
              "artist_farsi": "چارتار",
              "artist": "Chaartaar",
              "type": "mp3",
              "current": 9
            },
            {
              "id": 45974,
              "photo": "https://assets.rjassets.com/static/mp3/chaartaar-asemaan-ham-zamin-mikhorad/9868c1b13bbf488.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/45974-538c00f8e965d04.mp3",
              "plays": "18,841,415",
              "likes": "22,219",
              "downloads": "18,841,415",
              "song_farsi": "آسمان هم زمین میخورد",
              "artist_farsi": "چارتار",
              "artist": "Chaartaar",
              "type": "mp3",
              "current": 10
            },
            {
              "id": 91121,
              "photo": "https://assets.rjassets.com/static/mp3/chaartaar-gele-kon/cd67a958dcf14c6.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/91121-4e5727df9177c5b.mp3",
              "plays": "7,492,856",
              "likes": "7,373",
              "downloads": "7,492,856",
              "song_farsi": "گله کن",
              "artist_farsi": "چارتار",
              "artist": "Chaartaar",
              "type": "mp3",
              "current": 11
            },
            {
              "id": 23044,
              "photo": "https://assets.rjassets.com/static/mp3/chaartaar-ashoobam/75492d49d760d78.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/23044-39eb8b39812f631.mp3",
              "plays": "22,237,218",
              "likes": "31939",
              "downloads": "22,237,218",
              "song_farsi": "آشوبم",
              "artist_farsi": "چارتار",
              "artist": "Chaartaar",
              "type": "mp3",
              "current": 12
            }
          ]
        },

        {
          id: 4,
          name: 'پاپ v1',
          type: 'ourPlayList',
          data: [
            {
              "id": 101378,
              "photo": "https://assets.rjassets.com/static/mp3/mohsen-chavoshi-koja-boodi/0cf78c75f95f1f5.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/101378-ffd612dcb8b426f.mp3",
              "plays": "10,311,516",
              "likes": "12,584",
              "downloads": "10,311,516",
              "song_farsi": "کجا بودی",
              "artist_farsi": "محسن چاوشی",
              "artist": "Mohsen Chavoshi",
              "type": "mp3",
              "current": 1
            },
            {
              "id": 115629,
              "photo": "https://assets.rjassets.com/static/mp3/mohsen-chavoshi-rahayam-kon/d78b574f5654110.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/115629-116dd64d75b327a.mp3",
              "plays": "8,819,461",
              "likes": "15,816",
              "downloads": "8,819,461",
              "song_farsi": "رهایم کن",
              "artist_farsi": "محسن چاوشی",
              "artist": "Mohsen Chavoshi",
              "type": "mp3",
              "current": 2
            },
            {
              "id": 108170,
              "photo": "https://assets.rjassets.com/static/mp3/mohsen-chavoshi-postchi/c913accd979b66b.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/108170-5f657cc859798ab.mp3",
              "plays": "2,842,863",
              "likes": "3,480",
              "downloads": "2,842,863",
              "song_farsi": "پستچی",
              "artist_farsi": "محسن چاوشی",
              "artist": "Mohsen Chavoshi",
              "type": "mp3",
              "current": 3
            },
            {
              "id": 113403,
              "photo": "https://assets.rjassets.com/static/mp3/ali-yasini-nade-ghol/ad762502b6565d4.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/113403-26c03bf2a132d0a.mp3",
              "plays": "21,459,391",
              "likes": "29,683",
              "downloads": "21,459,391",
              "song_farsi": "نده قول",
              "artist_farsi": "علی یاسینی",
              "artist": "Ali Yasini",
              "type": "mp3",
              "current": 4
            },
            {
              "id": 102906,
              "photo": "https://assets.rjassets.com/static/mp3/ali-yasini-behtar-az-mane/f0bc1a95c2e21e0.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/102906-c3139b5d1bd7c64.mp3",
              "plays": "47,306,080",
              "likes": "49640",
              "downloads": "47,306,080",
              "song_farsi": "بهتر از منه",
              "artist_farsi": "علی یاسینی",
              "artist": "Ali Yasini",
              "type": "mp3",
              "current": 5
            },
            {
              "id": 92251,
              "photo": "https://assets.rjassets.com/static/mp3/shadmehr-aghili-bi-ehsas/d6642e68399bef2.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/92251-2c9aebcd840d710.mp3",
              "plays": "99,340,503",
              "likes": "81506",
              "downloads": "99,340,503",
              "song_farsi": "بی احساس",
              "artist_farsi": "شادمهر عقیلی",
              "artist": "Shadmehr Aghili",
              "type": "mp3",
              "current": 6
            },
            {
              "id": 76876,
              "photo": "https://assets.rjassets.com/static/mp3/shadmehr-aghili-sarnevesht/e420f86e48f5b50.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/76876-71e5ff5d02a8ece.mp3",
              "plays": "36,719,489",
              "likes": "47731",
              "downloads": "36,719,489",
              "song_farsi": "سرنوشت",
              "artist_farsi": "شادمهر عقیلی",
              "artist": "Shadmehr Aghili",
              "type": "mp3",
              "current": 7
            },
            {
              "id": 12313,
              "photo": "https://assets.rjassets.com/static/mp3/mohsen-yeganeh-rage-khab/fa358668.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/12313-2be90a156507a8d.mp3",
              "plays": "8,504,948",
              "likes": "10,027",
              "downloads": "8,504,948",
              "song_farsi": "رگ خواب",
              "artist_farsi": "محسن یگانه",
              "artist": "Mohsen Yeganeh",
              "type": "mp3",
              "current": 8
            },
            {
              "id": 65190,
              "photo": "https://assets.rjassets.com/static/mp3/mohsen-yeganeh-behet-ghol-midam-(live)/8a56ed3d7f29c8c.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/65190-8727f03c21c91f6.mp3",
              "plays": "30,156,366",
              "likes": "33,851",
              "downloads": "30,156,366",
              "song_farsi": "بهت قول میدم",
              "artist_farsi": "محسن یگانه",
              "artist": "Mohsen Yeganeh",
              "type": "mp3",
              "current": 9
            },
            {
              "id": 71469,
              "photo": "https://assets.rjassets.com/static/mp3/reza-sadeghi-hame-on-rooza/4dfeddee6098a25.jpg",
              "link": "https://host1.mediacon-rj.app/media/mp3/mp3-256/71469-bcc74d00b335fd2.mp3",
              "plays": "45,071,260",
              "likes": "44,573",
              "downloads": "45,071,260",
              "song_farsi": "همه ی اون روزا",
              "artist_farsi": "رضا صادقی",
              "artist": "Reza Sadeghi",
              "type": "mp3",
              "current": 10
            },
            {
              "id": 107240,
              "photo": "https://assets.rjassets.com/static/mp3/shervin-hajipour-miboosamet/c81297a94eb15e4.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/107240-21684b584ca0073.mp3",
              "plays": "2,306,937",
              "likes": "3,417",
              "downloads": "2,306,937",
              "song_farsi": "میبوسمت",
              "artist_farsi": "شروین حاجی پور",
              "artist": "Shervin Hajipour",
              "type": "mp3",
              "current": 11
            },
            {
              "id": 105666,
              "photo": "https://assets.rjassets.com/static/mp3/haamim-roze-sefid/c4f1f5cf8e55125.jpg",
              "link": "https://host2.mediacon-rj.app/media/mp3/mp3-256/105666-ccb9fb1665e3156.mp3",
              "plays": "44,154,472",
              "likes": "50392",
              "downloads": "44,154,472",
              "song_farsi": "رز سفید",
              "artist_farsi": "حامیم",
              "artist": "Haamim",
              "type": "mp3",
              "current": 12
            }
          ]
        },
      ]

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
      recentMediaHandler(results[0]);

      sendData = results[0]
      loadSong(results[0]);
      document.title=results[0].song_farsi; 

      listLength = listType[0].data.length - 1

      nextIcon.addEventListener('click', () => {
        pauseSong()
        if (results[0].current !== listType[0].data.length) {
          let res = listType[0].data.filter(datas => {
            return datas.current == results[0].current + 1

          })
          location.href = `?type=ourPlayList&plId=${listType[0].id}&id=${res[0].id}`

        } else {
          let res = listType[0].data.filter(datas => {
            return datas.current == results[0].current - listLength

          })
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
            return datas.current == results[0].current + listLength

          })
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



  }





})


function loadSong(song) {
  songName.textContent = song.song_farsi;
  ArtistName.textContent = song.artist_farsi;
  music.src = song.link;
  cover.style.background = `url(${song.photo})`
  musicUrl = song.link;
  firstDetails.innerHTML = ''
  firstDetails.insertAdjacentHTML('beforeend',
    `
      
      <section class="flex justify-center items-center sm-x3:text-xs">
      <p>${sliceCounter(song.plays)}</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 sm-x3:w-4 h-5 sm-x3:h-4 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
        
  </section>

  <section class="flex justify-center items-center border-solid border-r-1 border-[#292932] sm-x3:text-xs">
      <p>${sliceCounter(song.downloads)}</p> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 sm-x3:w-4 h-5 sm-x3:h-4 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        
  </section>

  <section class="flex justify-center items-center border-solid border-r-1 border-[#292932] sm-x3:text-xs">
      <p>${sliceCounter(song.likes)}</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 sm-x3:w-4 h-5 sm-x3:h-4  mr-2">
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
    if (progress.style.width === '100%') {
      if (loopIcon.classList.contains('text-secondText')) {
        pauseSong()
      }
      if (musicResult == 'ourPlayList') {
        if (results[0].current !== listType[0].data.length) {
          let res = listType[0].data.filter(datas => {
            return datas.current == results[0].current + 1

          })
          location.href = `?type=ourPlayList&plId=${listType[0].id}&id=${res[0].id}`

        } else {
          let res = listType[0].data.filter(datas => {
            return datas.current == results[0].current - listLength

          })
          location.href = `?type=ourPlayList&plId=${listType[0].id}&id=${res[0].id}`
        }
      } else {
        if (musicIndex + 1 == song2.length) {
          location.href = `?type=musicsAlbum&plId=${typeResult}&id=${song2[0].id}`
        } else {
          let nextMusic = song2[musicIndex + 1]
          location.href = `?type=musicsAlbum&plId=${typeResult}&id=${nextMusic.id}`
        }
      }


    }
  }
  if (isPlaying) {
    currentTime.innerHTML = ''
    currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
  }
}


let focus = false

searchInput.addEventListener("focus", () => {
  focus = true
})
searchInput.addEventListener("blur", () => {
  focus = false
})
searchInputMd.addEventListener("focus", () => {
  focus = true
})
searchInputMd.addEventListener("blur", () => {
  focus = false
})
document.body.addEventListener('keydown', (e) => {
  if (!focus) {

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
    if (e.keyCode === 77) {
      if (speaker) {
        music.volume = 0
        speaker = false
        speakerIcon.innerHTML = ''
        speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-xmark relative top-[8px]" style="top:2.8px;cursor:pointer" ></i>'
      } else {
        music.volume = 1
        speakerIcon.innerHTML = ''
        speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-high relative top-[8px]" style="top:2.8px;cursor:pointer" ></i>'
        speaker = true
      }
    }
    
    if (e.keyCode === 76) {
      const loopIcon = document.querySelector('#loopIcon');
      loopHandler(loopIcon)
    }
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
    speakerIcon.innerHTML = ' <i style="top:3px"  class="fa-solid fa-volume-xmark relative top-[3px]" ></i>'
  } else {
    music.volume = 1
    speakerIcon.innerHTML = ''
    speakerIcon.innerHTML = ' <i class="fa-solid fa-volume-high relative top-[3px]" style="top:3px"  ></i>'
    speaker = true
  }
  fa - volume - xmark
})

music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);


loopIcon.addEventListener('click', event => {
  let svgIcon = event.target
  if (event.target.tagName === 'path') {
    svgIcon = event.target.parentNode
  }

  loopHandler(svgIcon);
})


const loopHandler = (svgIcon) => {
  if (svgIcon.classList.contains('text-secondText')) {
    music.loop = true;
    loopIcon.classList.replace('text-secondText', 'text-white')

  } else {
    music.loop = false;
    loopIcon.classList.replace('text-white', 'text-secondText')
  }
}
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
const noLikeMediaHandler = () => {


  const showData = getData('showData');

  likeMedia.classList.remove('hidden');
  noLikeMedia.classList.add('hidden');

  showData.favorite.unshift(destructorData(sendData));
  updateData(showData);

  iziToast.show({
    message: 'موزیک به لیست مورد علاقه اضافه شد :)',
    rtl: true,
  });

}

const likeMediaHandler = () => {

  likeMedia.classList.add('hidden');
  noLikeMedia.classList.remove('hidden');
  const showData = getData('showData');
  let mediaExistenceIndex = showData.favorite.findIndex(item => item.id == getParamToUrl('id'));
  if (mediaExistenceIndex !== -1) {
    showData.favorite.splice(mediaExistenceIndex, 1);
    updateData(showData)

  }

  iziToast.show({
    message: 'موزیک از لیست مورد علاقه حذف شد :(',
    rtl: true,
  });

}

const noLoginSwal = text => {
  Swal.fire({
    title: text,
    icon: 'warning',
    confirmButtonText: 'ورود',

  }).then((result) => {

    if (result.isConfirmed) {
      location.href = 'login.html'
    }
  })
}

