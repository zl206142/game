class Boom extends Frame {

    constructor(x, y) {
        super("img/frame/hahaha.png");
        this.xn = 8;
        this.yn = 5;
        this.dely = 70;
        this.anchorCenter();
        this.x = x;
        this.y = y;
        G.game.add(this);
    }

    frameEnd() {
        // new Fire(this.x, this.y);
    }
}