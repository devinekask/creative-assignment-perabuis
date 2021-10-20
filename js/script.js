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
        imgHand = loadImage('assets/img/hand.png');
        imgReindeer = loadImage('assets/img/reindeer.png');
        imgSanta = loadImage('assets/img/santa.png');
        imgTree = loadImage('assets/img/tree.png');

        imgDecoration0 = loadImage('assets/img/ball0.png');
        imgDecoration1 = loadImage('assets/img/ball1.png');
        imgDecoration2 = loadImage('assets/img/ball2.png');

        decorationsArr = maakArray();
    }


    function setup() {
        //canvas = createCanvas(640, 480);
        canvas = createCanvas(960 , 720);
        canvas.center('horizontal');
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
        scale(1.5);

        image(video, 0, 0);
        background(0, 0, 0);

        //rect(x, y, w, [h], [tl], [tr], [br], [bl])
        fill(255);
      
        //dit is waar de kerstman komt
        //rect(490, 0, 150, 150);
        image(imgSanta, 490, 0, 150, 172);
        //CHRISTMAS TREE
       // rect(195,66, 250, 348);
        image(imgTree, 195, 66, 250, 348);
        //REINDEER
        //rect(0, 300, 150, 150);
        image(imgReindeer, 0, 330, 160, 150);
    
       
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
        //image(imgHand, x - 20, y - 20, 50, 50);
        fill(255, 0 , 0);
        ellipse(x, y, 30);
        fill(0, 0, 255);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 64);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 64);
    }


    function showKerstbal() {
        decorationsArr.forEach(kerstbal => {
            //als je er niet over gaat
            if (!kerstbal.rollover) {
                checkOver(kerstbal);
                image(kerstbal.image, kerstbal.ballX, kerstbal.ballY, kerstbal.widthBall, kerstbal.heightBall)
            }
            //als je er wel over gaat
            else {
                checkLaatlos(kerstbal);
                //als je hem vastneemt
                if (!kerstbal.laatLos) {
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

    function checkOver(kerstbal) {
        // Is nose over object
        let noseX = pose.nose.x;
        let noseY = pose.nose.y;

        if (noseX <= kerstbal.ballX + kerstbal.widthBall && noseX >= kerstbal.ballX && noseY <= kerstbal.ballY + kerstbal.heightBall && noseY >= kerstbal.ballY) {
            kerstbal.rollover = true;
        }
    }

    function checkLaatlos(kerstbal) {
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

        if (noseX > 490 && noseY < 150) {
            speech = true;
        }
        else {
            speech = false;
            aanHetPraten = false;
        }
    }


}