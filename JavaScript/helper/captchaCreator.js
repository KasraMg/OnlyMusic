let rightCode = '';
let toggleBtn = document.querySelector('#toggle');


let url = window.location.pathname;
let fileName = url.substring(url.lastIndexOf('/') + 1);
const type = fileName.replace('.html', '');

if (type === 'login') {

    toggleBtn.addEventListener('click', function () {
        getImgValiCode();
    }, false);





    getImgValiCode();
    function getImgValiCode() {
        let showNum = [];
        let canvasWinth = 150;
        let canvasHeight = 30;
        let canvas = document.getElementById('valicode');
        let context = canvas.getContext('2d');
        canvas.width = canvasWinth;
        canvas.height = canvasHeight;
        let word = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
        let number = '0,1,2,3,4,5,6,7,8,9';
        let saCode = word.split(',');
        let wordCode = word.split(',');
        let numberCode = number.split(',');


        for (let i = wordCode.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wordCode[i], wordCode[j]] = [wordCode[j], wordCode[i]];
        }

        for (let i = numberCode.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numberCode[i], numberCode[j]] = [numberCode[j], numberCode[i]];
        }


        let numberSlice = numberCode.slice(0, 2);
        let wordSlice = wordCode.slice(0, 3);
        let mainArray = [...numberSlice, ...wordSlice];

        for (let i = mainArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mainArray[i], mainArray[j]] = [mainArray[j], mainArray[i]];
        }

        for (let i = 0; i <= 4; i++) {
            let sDeg = (Math.random() * 30 * Math.PI) / 180;
            //////////////////////////////////////////////////////////////////////////


            let cTxt = mainArray[i];

            showNum[i] = cTxt.toLowerCase();
            let x = 44 + i * 20;
            let y = 20 + Math.random() * 8;
            context.font = 'bold 23px 微软雅黑';
            context.translate(x, y);
            context.rotate(sDeg);

            context.fillStyle = randomColor();
            context.fillText(cTxt, 0, 0);

            context.rotate(-sDeg);
            context.translate(-x, -y);
        }
        for (let i = 0; i <= 5; i++) {
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(
                Math.random() * canvasWinth,
                Math.random() * canvasHeight
            );
            context.lineTo(
                Math.random() * canvasWinth,
                Math.random() * canvasHeight
            );
            context.stroke();
        }
        for (let i = 0; i < 30; i++) {
            context.strokeStyle = randomColor();
            context.beginPath();
            let x = Math.random() * canvasWinth;
            let y = Math.random() * canvasHeight;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
        rightCode = showNum.join('');
    }

    function randomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
} else {
    rightCode = null
}


export { rightCode }