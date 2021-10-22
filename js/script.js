{
    //variables for motion tracking
    let video;
    let poseNet;
    let pose;

    let decorationsArr;

    /* let imgHand;
     let imgReindeer;
     let imgReindeer;
     let imgKerstbal0;
     let imgKerstbal1;
     let imgKerstbal2;*/



    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const maakArray = () => {
        for (let i = 0; i < 3; i++) {
            christmasDecorationArr.push({ image: eval(`imgDecoration${i}`), ballX: getRandomInt(1, 100), ballY: getRandomInt(1, 300), heightBall: 30, widthBall: 30, rollover: false, laatLos: false });
            //christmasDecorationArr.push({ image: `imgKerstbal${i}`, ballX: getRandomInt(1, 100), ballY: getRandomInt(1, 450), heightBall: 50, widthBall: 50, rollover: false, laatLos: false });
        }
        return christmasDecorationArr;
    }



    function preload() {
        imgNose = loadImage('assets/img/nose.png');
        imgLeftHand = loadImage('assets/img/left_hand.png');
        imgRightHand = loadImage('assets/img/right_hand.png');
        imgReindeer = loadImage('assets/img/reindeer.png');
        imgSanta = loadImage('assets/img/santa.png');
        imgHappySanta = loadImage('assets/img/santa.png');
        imgTree = loadImage('assets/img/tree.png');

        imgDecoration0 = loadImage('assets/img/decorations/ball0.png');
        imgDecoration1 = loadImage('assets/img/decorations/ball1.png');
        imgDecoration2 = loadImage('assets/img/decorations/ball2.png');

        tsjing = new Audio('../assets/sound/ping.wav');
        tsjing2 = new Audio('../assets/sound/ping2.wav');

        decorationsArr = maakArray();
    }


    function setup() {
        //canvas = createCanvas(640, 480);
        canvas = createCanvas(960, 720);
        canvas.center('horizontal');

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
        scale(1.5);

        image(video, 0, 0);
        background(0, 0, 0);

        fill(255);
        //CHRISTMAS TREE
        image(imgTree, 170, 30, 300, 417);
        //REINDEER
        image(imgReindeer, 0, 330, 160, 150);

        textAlign(CENTER);
        fill(255, 255, 255);
        textFont('Space mono');
        textSize(9);

        if (pose) {
            showKerstbal();
            askSanta();
            //op het einde zetten zodat de neus over de images komt, ipv eronder
            getSkeletonpoints();
        }

    }


    function getSkeletonpoints() {
        x = pose.nose.x;
        y = pose.nose.y;
        //handje op neus
        image(imgNose, x - 20, y - 20, 40, 25);

        if (pose.score > 0.4) {
            image(imgRightHand, pose.rightWrist.x, pose.rightWrist.y, 40, 50);
            image(imgLeftHand, pose.leftWrist.x, pose.leftWrist.y, 50, 43);
        }
        else {
            fill(233, 70, 38);
            text(`I can't see your hands`, 250, 0, 150, 80);
        }



    }


    function showKerstbal() {
        decorationsArr.forEach(kerstbal => {
            //als je er niet over gaat
            if (!kerstbal.rollover) {
                checkNoseOver(kerstbal);
                image(kerstbal.image, kerstbal.ballX, kerstbal.ballY, kerstbal.widthBall, kerstbal.heightBall)
            }
            //als je er wel over gaat
            else {
                checkReindeerRelease(kerstbal);
                //als je hem vastneemt
                if (!kerstbal.laatLos) {
                    tsjing.play();
                    image(kerstbal.image, pose.nose.x, pose.nose.y, kerstbal.widthBall, kerstbal.heightBall);
                    kerstbal.ballX = pose.nose.x;
                    kerstbal.ballY = pose.nose.y;
                }//als je hem loslaat 
                else {

                    image(kerstbal.image, kerstbal.ballX, kerstbal.ballY, kerstbal.widthBall, kerstbal.heightBall);
                    kerstbal.rollover = false;

                }
            }
        })

    }

    function checkNoseOver(kerstbal) {
        // Is nose over object
        let noseX = pose.nose.x;
        let noseY = pose.nose.y;

        if (noseX <= kerstbal.ballX + kerstbal.widthBall && noseX >= kerstbal.ballX && noseY <= kerstbal.ballY + kerstbal.heightBall && noseY >= kerstbal.ballY) {
            kerstbal.rollover = true;
        }
    }


    function checkReindeerRelease(kerstbal) {
        if ((pose.leftWrist.x > 0 && pose.leftWrist.x < 150 && pose.leftWrist.y > 330 && pose.leftWrist.y < 480)) {
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


        //als je niet over santa gaat!
        if (!(noseX > 490 && noseY > 320)) {
            image(imgHappySanta, 490, 330, 120, 135);
            //image(imgHappySanta, 490, 150, 100, 115);
        }

        //als je wel over santa gaat!
        if (noseX > 490 && noseY > 320) {
            tsjing2.play();
            image(imgSanta, 480, 320, 140, 158);
            //image(imgSanta, 480, 140, 120, 135);
            speech = true;
            santaText = "braaf zijn he";
        }
        else {
            speech = false;
            aanHetPraten = false;
            santaText = "Dear child, I have to tell you something";


        }

        text(santaText, 470, 280, 150, 80);
    }




}