/*import Vector from './Vector.js';
import { random } from '../functions/lib.js';

export default class Particle {
    constructor(x, y) {
        this.lifespan = 200;
        this.location = new Vector(x, y);
        //this.velocity = new Vector(0, 0);
        this.velocity = new Vector(random(-1, 1), random(-1, 1));
        this.acceleration = new Vector(random(-0.001,0.001), 0.05);
    }
    get isAlive() {
        return this.lifespan > 0;
    }
    draw(ctx) {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.lifespan--;

        ctx.fillStyle = `rgba(255,255,255,${this.lifespan / 100})`;
        ctx.fillRect(this.location.x - 1, this.location.y - 1, 2, 2);
    }
}*/