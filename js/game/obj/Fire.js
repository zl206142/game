class Fire extends Frame {

    constructor(x, y) {
        super(resources.big_fire);
        this.x = x;
        this.y = y;
        this.xn = 8;
        this.yn = 4;
        this.ax = 0.5;
        this.ay = 0.9;
        this.scale = 0.2 + Math.random() * 0.2;
        this.daley = 30;
        this.loopTime = 10;
    }
}