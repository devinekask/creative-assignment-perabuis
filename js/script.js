
//import Vector from "./classes/Vector.js";
//import {random} from "./functions/lib.js"

{
   //  import Particle from "./classes/Particle.js";

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
    function preload() {
        img = loadImage('assets/img/hand.png');
        kerstbal = loadImage('assets/img/kerstbal.png');
    }


    function setup() {
        createCanvas(640, 480);
        // background(0);
        // cnv.position(100, 100);
        video = createCapture(VIDEO);
        video.hide();

        poseNet = ml5.poseNet(video, { flipHorizontal: true }, modelLoaded);
        //poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on('pose', gotPoses);


        // shape1 = new Draggable(xshape1, 100, 50, 50);




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

        //als je deze actief zet werkt de draggable niet meer, maar is wel veel logischer voor de neus te volgen
        //  translate(video.width, 0);
        // scale(-1, 1);

        image(video, 0, 0);


        //Clear of background;
        // clear();
        //background(127, 0, 75, 125);
        background(127, 127, 75);
        //   image(img, 0, 0);


        drawAccessoires();
        getSkeletonpoints();




    }



    function getSkeletonpoints() {
        if (pose) {
            // console.log('ik probeer points te tekenen');
            // console.log(pose);
            let x = pose.nose.x;
            let y = pose.nose.y;
            //  console.log(y);
            //fill(225, 0, 0);
            //ellipse(x, y, 30);
            //X and y for an image are the top left angle of the image
            image(img, x - 20, y - 20, 50, 50);



            // image(x, y, 0);
            //clear();

            /* fill(0, 0, 255);
             ellipse(pose.rightWrist.x, pose.rightWrist.y, 64);
             ellipse(pose.leftWrist.x, pose.leftWrist.y, 64);*/
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



    //    draw();

    /*   const init = () => {
  
  
      };
  
      init(); */
}