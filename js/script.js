{
    //import { random } from "./functions/lib.js"

    //variables for motion tracking
    let video;
    let poseNet;
    let pose;

    //variables voor images
    let img;
    let kerstbal;
    let xkerstbal = 100;
    let ykerstbal = 100;



    //preload function for images
    async function preload() {
        img = await loadImage('assets/img/hand.png');
        kerstbal = await loadImage('assets/img/kerstbal.png');

        poseNet.on('pose', gotPoses);

    }


    function setup() {
        preload();
        createCanvas(640, 480);
        video = createCapture(VIDEO);
        video.hide();

        poseNet = ml5.poseNet(video, { flipHorizontal: true }, modelLoaded);


        //shape1 = new Ball(kerstbal, 100, 100, 50, 50);
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
        image(video, 0, 0);
        background(127, 127, 75);

        /*  shape1.over();
          shape1.update();
          shape1.show();*/

        drawChristmasBalls();

        //  drawAccessoires();
        getSkeletonpoints();
    }

    function drawChristmasBalls() {
        if (pose) {
            let shape1 = new Ball(pose, kerstbal, 150, 100, 50, 50);
            shape1.over();
            shape1.update();
            shape1.show();
        }
    }


    function drawAccessoires() {
        image(kerstbal, xkerstbal, ykerstbal, 70, 50);
        if (pose) {
            if (pose.nose.x > xkerstbal - 20 && pose.nose.x < xkerstbal + 20 && pose.nose.y > ykerstbal - 20 && pose.nose.y < ykerstbal + 20) {
                image(kerstbal, pose.nose.x, pose.nose.y, 70, 50);
                xkerstbal = pose.nose.x;
                ykerstbal = pose.nose.y;
            }
        }

    }



    function getSkeletonpoints() {
        if (pose) {
            let x = pose.nose.x;
            let y = pose.nose.y;
            //handje op neus
            image(img, x - 20, y - 20, 50, 50);
            // image(x, y, 0);
            //clear();

            /* fill(0, 0, 255);
             ellipse(pose.rightWrist.x, pose.rightWrist.y, 64);
             ellipse(pose.leftWrist.x, pose.leftWrist.y, 64);*/
        }
    }




}