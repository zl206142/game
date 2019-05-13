class Boom extends Frame {

    constructor(x, y) {
        super(G.resources.boom);
        this.xn = 8;
        this.yn = 5;
        this.daley = 80;
        this.anchorCenter();
        this.x = x;
        this.y = y;
        G.game.add(this);
    }

    frameEnd() {
        // new Fire(this.x, this.y);
    }
}