{
    //variables for motion tracking
    let video;
    let poseNet;
    let pose;

    let decorationsArr;


    const makeDecorationsArray = () => {
        for (let i = 0; i <= 11; i++) {
            christmasDecorationArr.push({ image: eval(`imgDecoration${i}`), ballX: getRandomNumber(1, 170), ballY: getRandomNumber(1, 230), heightBall: 30, widthBall: 30, rollover: false, laatLos: false });
        }
        return christmasDecorationArr;
    }

    function preload() {
        imgNose = loadImage('assets/img/nose.png');
        imgLeftHand = loadImage('assets/img/left_hand.png');
        imgRightHand = loadImage('assets/img/right_hand.png');
        imgReindeer = loadImage('assets/img/reindeer.png');
        imgPettedReindeer = loadImage('assets/img/petted_reindeer.png');
        imgSanta = loadImage('assets/img/santa.png');
        imgSpeakingSanta = loadImage('assets/img/speaking_santa.png');
        imgTree = loadImage('assets/img/tree.png');

        imgDecoration0 = loadImage('assets/img/decorations/ball0.png');
        imgDecoration1 = loadImage('assets/img/decorations/ball1.png');
        imgDecoration2 = loadImage('assets/img/decorations/ball2.png');
        imgDecoration3 = loadImage('assets/img/decorations/ball3.png');
        imgDecoration4 = loadImage('assets/img/decorations/ball4.png');
        imgDecoration5 = loadImage('assets/img/decorations/ball5.png');
        imgDecoration6 = loadImage('assets/img/decorations/ball6.png');
        imgDecoration7 = loadImage('assets/img/decorations/ball7.png');
        imgDecoration8 = loadImage('assets/img/decorations/ball8.png');
        imgDecoration9 = loadImage('assets/img/decorations/ball9.png');
        imgDecoration10 = loadImage('assets/img/decorations/ball10.png');
        imgDecoration11 = loadImage('assets/img/decorations/ball11.png');
        imgDecoration12 = loadImage('assets/img/decorations/ball12.png');
        imgDecoration13 = loadImage('assets/img/decorations/ball13.png');
        imgDecoration14 = loadImage('assets/img/decorations/ball14.png');
        imgDecoration15 = loadImage('assets/img/decorations/ball15.png');

        tsjing = new Audio('../assets/sound/ping.wav');
        tsjing2 = new Audio('../assets/sound/ping2.wav');

        decorationsArr = makeDecorationsArray();
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

        image(imgTree, 170, 30, 300, 417);

        image(imgReindeer, 0, 330, 160, 150);


        textAlign(CENTER);
        fill(255, 255, 255);
        textFont('Space mono');
        textSize(9);

        if (pose) {
            showKerstbal();
            askSanta();
            getSkeletonpoints();
        }

    }


    function getSkeletonpoints() {
        x = pose.nose.x;
        y = pose.nose.y;
        //handje op neus
        image(imgNose, x - 20, y - 20, 40, 25);

        if (pose.score > 0.3) {
            instructionText = `Use your nose to decorate the three`;
            if (pose.nose.x > 350) {
                image(imgRightHand, pose.rightWrist.x, pose.rightWrist.y, 40, 50);
                image(imgLeftHand, pose.leftWrist.x, pose.leftWrist.y, 50, 43);
                instructionText = `Pssst.. Santa has to tell you something`;
            }
        }
        else {
            instructionText = `Your hands aren't visible`;
        }


        fill(233, 70, 38);
        text(instructionText, 250, 0, 150, 80);
    }


    function showKerstbal() {
        decorationsArr.forEach(kerstbal => {
            //if you don't hover over the ball
            if (!kerstbal.rollover) {
                checkNoseOver(kerstbal);
                image(kerstbal.image, kerstbal.ballX, kerstbal.ballY, kerstbal.widthBall, kerstbal.heightBall)
            }
            //if you hover over the ball
            else {
                checkReindeerRelease(kerstbal);
                image(imgPettedReindeer, 0, 330, 160, 150);
                //if you take the ball
                if (!kerstbal.laatLos) {
                    tsjing.play();
                    image(kerstbal.image, pose.nose.x, pose.nose.y, kerstbal.widthBall, kerstbal.heightBall);
                    kerstbal.ballX = pose.nose.x;
                    kerstbal.ballY = pose.nose.y;
                }//If you release the ball
                else {
                    image(kerstbal.image, kerstbal.ballX, kerstbal.ballY, kerstbal.widthBall, kerstbal.heightBall);
                    kerstbal.rollover = false;

                }
            }
        })

    }

    function checkNoseOver(kerstbal) {
        // Is nose over object?
        let noseX = pose.nose.x;
        let noseY = pose.nose.y;
        if (noseX <= kerstbal.ballX + kerstbal.widthBall && noseX >= kerstbal.ballX && noseY <= kerstbal.ballY + kerstbal.heightBall && noseY >= kerstbal.ballY) {
            kerstbal.rollover = true;
        }
    }


    function checkReindeerRelease(kerstbal) {
        // Is your left hand over the reindeer?
        if ((pose.leftWrist.x > 0 && pose.leftWrist.x < 150 && pose.leftWrist.y > 330 && pose.leftWrist.y < 480)) {
            kerstbal.laatLos = true;
            reindeerText = 'Pet me with your left hand and I will help you release the ball'
        }
        else {
            kerstbal.laatLos = false;
        }
        text(reindeerText, 20, 290, 150, 80);

    }

    function askSanta() {
        let noseX = pose.nose.x;
        let noseY = pose.nose.y;


        //if you don't hover over Santa
        if (!(noseX > 490 && noseY > 320)) {
            image(imgSanta, 490, 330, 120, 135);
            //image(imgHappySanta, 490, 150, 100, 115);
        }

        //if you do hover over Santa
        if (noseX > 490 && noseY > 320) {
            tsjing2.play();
            image(imgSpeakingSanta, 480, 320, 140, 158);
            speech = true;
            santaText = "You've been a sweet child this year. I will reward you with a special ball. Tell me your favorite colour.";
        }
        else {
            speech = false;
            aanHetPraten = false;
            santaText = "";
        }

        text(santaText, 470, 250, 150, 80);
    }


}