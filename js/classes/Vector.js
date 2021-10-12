class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    static add(vector1, vector2) {
        return vector1.clone().add(vector2);
    }
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    static subtract(vector1, vector2) {
        return vector1.clone().subtract(vector2);
    }
    multiply(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }
    static multiply(vector1, n) {
        return vector1.clone().multiply(n);
    }
    divide(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }
    static divide(vector1, n){
        return vector1.clone().divide(n);
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    normalize() {
        const l = this.length();
        if (l !== 0) {
            this.divide(l);
        }
        return this;
    }
    limit(max) {
        if (this.length() > max) {
            this.normalize();
            this.multiply(max);
        }
    }
}

export default Vector;