import { getData, setData } from "./serviceData.js";

const addNewUser = data => {

    const newUserInfo = {
        userInfo: {
            ...data
        },
        id: 1,
        musicsAlbum: [
            {
                id: 1,
                name: 'شخصی',
                type: 'musicsAlbum',
                data: [
                    {
                        id: '99193',
                        photo: "https://assets.rjassets.com/static/mp3/homayoun-shajarian-yek-nafas-arezouye-to/831b1137962e9db.jpg",
                        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/99193-226394f93acb3c4.mp3",
                        plays: '10,246,788',
                        likes: '13,204',
                        downloads: '10,246,788',
                        song_farsi: "یک نفس آرزوی تو",
                        artist_farsi: "همایون شجریان",
                    }, {
                        id: '97284',
                        photo: "https://assets.rjassets.com/static/mp3/homayoun-shajarian-asemane-abri/d3d91b20e3e12ca.jpg",
                        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/97284-282b44b8917942d.mp3",
                        plays: '15,894,699',
                        likes: '18,189',
                        downloads: '15,894,699',
                        song_farsi: "آسمان ابری",
                        artist_farsi: "همایون شجریان",
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
                    }]
            },

            {
                id: 2,
                name: 'test75',
                type: 'musicsAlbum',
                data: [{
                    id: '105744',
                    photo: "https://assets.rjassets.com/static/mp3/shadmehr-aghili-chera-too-jangi/95796ce775c9a91.jpg",
                    link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/105744-949f30374731f94.mp3",
                    plays: '49,421,095',
                    likes: '49,850',
                    downloads: '49,421,095',
                    song_farsi: "چرا تو جنگی",
                    artist_farsi: "شادمهر عقیلی",
                }, {
                    id: '101612',
                    photo: "https://assets.rjassets.com/static/mp3/shadmehr-aghili-daste-man-nist/52fbbf01742ce4f.jpg",
                    link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/101612-f7b4c735bc5e301.mp3",
                    plays: '86,274,517',
                    likes: '80,829',
                    downloads: '86,274,517',
                    song_farsi: "دست من نیست",
                    artist_farsi: "شادمهر عقیلی",
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
                }]
            },
        ],
        videosAlbum: [
            {
                id: 1,
                name: 'فیلمک',
                type: 'videoAlbum',
                format:'video',
                data: [
                    {
                        id: '99193',
                        photo: "https://assets.rjassets.com/static/mp3/homayoun-shajarian-yek-nafas-arezouye-to/831b1137962e9db.jpg",
                        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/99193-226394f93acb3c4.mp3",
                        plays: '10,246,788',
                        likes: '13,204',
                        downloads: '10,246,788',
                        song_farsi: "یک نفس آرزوی تو",
                        artist_farsi: "همایون شجریان",
                    }, {
                        id: '97284',
                        photo: "https://assets.rjassets.com/static/mp3/homayoun-shajarian-asemane-abri/d3d91b20e3e12ca.jpg",
                        link: "https://host2.mediacon-rj.app/media/mp3/mp3-256/97284-282b44b8917942d.mp3",
                        plays: '15,894,699',
                        likes: '18,189',
                        downloads: '15,894,699',
                        song_farsi: "آسمان ابری",
                        artist_farsi: "همایون شجریان",
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
                    }]
            },
        ],
        favorite: [],
        lastMusic: '',


    }

    let mainData = getData('mainData');


    if (!mainData) {
        setData('mainData', [newUserInfo])
        setData('showData', newUserInfo);
    } else {
        newUserInfo.id = mainData.length + 1;
        mainData.push(newUserInfo);
        setData('mainData', mainData)
        setData('showData', newUserInfo)

    }
}

export { addNewUser }