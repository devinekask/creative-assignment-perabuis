{
    //variables for motion tracking
    let video;
    let poseNet;
    let pose;




    let laatLos = false;

    let ballX = 20;
    let ballY = 50;

    let imgKerstbal;
    let imgHand;

    let widthBall = 50;
    let heightBall = 50;

    let rollover = false;

    function preload() {
        imgHand = loadImage('assets/img/hand.png');
        imgKerstbal = loadImage('assets/img/kerstbal.png');
    }

    function setup() {
        createCanvas(640, 480);
        console.log(imgHand)
        console.log(imgKerstbal);

        image(imgHand, 0, 0)


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

        if (pose) {
            getSkeletonpoints();
            showKerstbal();

            // nieuwe kerstbal klaarzetten 
            if(laatLos){

            }
        }
    }

    function mousePressed() {
        laatLos = !laatLos;
    }


    function getSkeletonpoints() {
        x = pose.nose.x;
        y = pose.nose.y;
        //handje op neus
        image(imgHand, x - 20, y - 20, 50, 50);


    }

    function showKerstbal() {          
        if (!rollover) {
            checkOver();
            image(imgKerstbal, ballX, ballY, widthBall, heightBall)
        } else {
            if (!laatLos) {
                image(imgKerstbal, pose.nose.x, pose.nose.y, widthBall, heightBall);
                ballX = pose.nose.x;
                ballY = pose.nose.y;
            } else {
                image(imgKerstbal, ballX, ballY, widthBall, heightBall);
                rollover = false;
                
            }
        }
    }

    function checkOver() {
        // Is nose over object
        let noseX = pose.nose.x;
        let noseY = pose.nose.y;

        if (noseX <= ballX + widthBall && noseX >= ballX && noseY <= ballY + heightBall && noseY >= ballY) {
            rollover = true;
        }
    }

}