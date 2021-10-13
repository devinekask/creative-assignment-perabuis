// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>


class Ball {
    constructor(pose, kerstbal, x, y, w, h) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse? Doet the nose touch the ball
        this.pose = pose;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.offsetX = 0;
        this.offsetY = 0;
        this.img = kerstbal;
        //this.img = 'assets/img/kerstbal2.jpg'

    }

    over() {
        // Is nose over object
        //dit werkt :)
        if (this.pose.nose.x < this.x + this.w && this.pose.nose.x > this.x && this.pose.nose.y < this.y + this.h && this.pose.nose.y > this.y) {
            this.rollover = true;
            this.dragging = true;
        } else {
            this.rollover = false;
            this.dragging = false;
        }
    }

    update() {
        // Adjust location if being dragged
        if (this.dragging) {
            this.x = this.pose.nose.x + this.offsetX;
            this.y = this.pose.nose.y + this.offsetY;
        }
    }

    show() {
        stroke(0);
        // Different fill based on state
        if (this.dragging) {
            fill(50);
        } else if (this.rollover) {
            fill(100);
        } else {
            fill(175, 200);
            
        }
        rect(this.x, this.y, this.w, this.h);
        console.log(this.x);

        //I added this
        // loadImage(this.img, img => {

        //});
        image(this.img, this.x, this.y, this.w, this.h);
    }

    /* pressed() {
         //hier ga ik een timer moeten kunnen zetten dat als de neus een paar seconden erop staat dragging true moet zijn
         // Did I click on the rectangle?
         if (mouseX > this.x && mouseX < this.x && mouseY > this.y && mouseY < this.y + this.h) {
             this.dragging = true;
             // If so, keep track of relative location of click to corner of rectangle
             this.offsetX = this.x - mouseX;
             this.offsetY = this.y - mouseY;
         }
     }
 
     released() {
         // Quit dragging
         this.dragging = false;
     }*/
}