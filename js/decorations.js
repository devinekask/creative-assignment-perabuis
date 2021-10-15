// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>


class Ball {
    constructor(kerstbal, x, y, w, h) {
/*         this.dragging = false; // Is the object being dragged? Is the lift wrist in the left of the canvas?
        this.rollover = false; //Does the nose touch the ball? */
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = kerstbal;
    }



    move(ballX, ballY){
        this.x = ballX;
        this.y = ballY;
    }


    show() {
        stroke(0);
        image(this.img, this.x, this.y, this.w, this.h);
    }



}