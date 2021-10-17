{

    //variables for motion tracking
    let video;
    let poseNet;
    let pose;


    let decorationsArr;
    let imgKerstbal0;
    let imgKerstbal1;
    let imgKerstbal2;
    let imgHand;


    let praat;



    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const maakArray = () => {

        for (let i = 0; i < 3; i++) {
            christmasDecorationArr.push({ image: `imgKerstbal${i}`, ballX: getRandomInt(1, 100), ballY: getRandomInt(1, 450), heightBall: 50, widthBall: 50, rollover: false, laatLos: false });
        }
        return christmasDecorationArr;
    }




    function preload() {
        imgHand = loadImage('assets/img/hand.png');
        imgKerstbal0 = loadImage('assets/img/kerstbal0.jpg');
        imgKerstbal1 = loadImage('assets/img/kerstbal1.jpg');
        imgKerstbal2 = loadImage('assets/img/kerstbal2.jpg');

        decorationsArr = maakArray();
    }


    function setup() {
        createCanvas(640, 480);

        // image(imgHand, 0, 0);

        video = createCapture(VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video, { flipHorizontal: true }, modelLoaded);
        poseNet.on('pose', gotPoses);
    }


    function gotPoses(poses) {
        if (poses.length > 0) {
            pose = poses[0].pose;
        }
    }

    function modelLoaded() {
        console.log('poseNet ready');
    }

    function draw() {
        //posenet
        image(video, 0, 0);

        background(127, 127, 75);

        rect(300, 0, 100, 500);
        fill('red');
        rect(600, 0, 100, 300);
        image(imgHand, 300, 0, 100, 500);

        if (pose) {
            getSkeletonpoints();
            showKerstbal();
            askSanta();
        }

    }




    function getSkeletonpoints() {
        x = pose.nose.x;
        y = pose.nose.y;
        //handje op neus
        image(imgHand, x - 20, y - 20, 50, 50);
        fill(0, 0, 255);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 64);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 64);
    }


    function showKerstbal() {
        decorationsArr.forEach(kerstbal => {
            //als je er niet over gaat
            if (!kerstbal.rollover) {
                checkOver(kerstbal);
                image(imgKerstbal0, kerstbal.ballX, kerstbal.ballY, kerstbal.widthBall, kerstbal.heightBall)
            }
            //als je er wel over gaat
            else {
                checkLaatlos(kerstbal);
                //als je hem vastneemt
                if (!kerstbal.laatLos) {
                    image(imgKerstbal0, pose.nose.x, pose.nose.y, kerstbal.widthBall, kerstbal.heightBall);
                    kerstbal.ballX = pose.nose.x;
                    kerstbal.ballY = pose.nose.y;
                }//als je hem loslaat 
                else {
                    image(imgKerstbal1, kerstbal.ballX, kerstbal.ballY, kerstbal.widthBall, kerstbal.heightBall);
                    kerstbal.rollover = false;

                }
            }
        })

    }

    function checkOver(kerstbal) {
        // Is nose over object
        let noseX = pose.nose.x;
        let noseY = pose.nose.y;

        if (noseX <= kerstbal.ballX + kerstbal.widthBall && noseX >= kerstbal.ballX && noseY <= kerstbal.ballY + kerstbal.heightBall && noseY >= kerstbal.ballY) {
            kerstbal.rollover = true;
        }
    }

    function checkLaatlos(kerstbal) {
        if ((pose.leftWrist.x > 300 && pose.leftWrist.x < 400)) {
            console.log('ik laat hem los');
            kerstbal.laatLos = true;
        }
        else {
            kerstbal.laatLos = false;
        }
    }


    function askSanta() {
        let noseX = pose.nose.x;
        let noseY = pose.nose.y;

        if (noseX > 500 && noseY < 300) {
            speech = true;
        }
        else {
            speech = false;
            aanHetPraten = false;
        }
    }


}