class Game extends Node {

    constructor(ctx) {
        super();
        this._ctx = ctx;
        this.width = this._ctx.canvas.width;
        this.height = this._ctx.canvas.height;
        this.fps = 0;
    }

    run() {
        console.log(this._width, this._height);
        this._mouse = new Mouse(this._ctx.canvas);
        this.start();
        this.play();
        return this;
    }

    start() {
        let now = Date.now();
        this._dt = now - this.now;
        this.now = now;

        this._mouse.emitTo(this);
        this._ctx.clearRect(0, 0, this._width, this._height);
        this.loop(this._ctx, this._dt);
        requestAnimationFrame(this.start.bind(this));
        this.fps++;
    }

    play() {

        let f4 = new Frame("img/frame/big_fire.png");
        this.add(f4);
        f4.x = 550;
        f4.y = 300;
        f4.xn = 8;
        f4.yn = 4;
        f4.scaleX = 0.8;
        f4.scaleY = 0.8;
        f4.ax = 0.5;
        f4.ay = 0.5;
        f4.daley = 30;
        f4.loopTime = -1;

        let c = new Rect(50);
        c.color = randomColor();
        c.ax = 0.5;
        c.ay = 0.5;
        c.scaleX = 3;
        c.scaleY = 3;
        f4.add(c);
        c.on("mousemove", function (evt) {
            if (!this._mousedown) {
                return;
            }
            this.x += evt.mx;
            this.y += evt.my;
        });
        c.on("mousedown", function (evt) {
            console.log("down");
        });


        let cc = new Rect(50);
        cc.x = 400;
        cc.y = 300;
        cc.color = randomColor();
        this.add(cc);

        let t = new Text("hello");
        t.color = randomColor();
        t.x = 400;
        t.y = 300;
        this.add(t);


        let ccc = new Rect(50);
        ccc.color = randomColor();
        ccc.x = 200;
        ccc.y = 200;
        ccc.ax = 0.5;
        ccc.ay = 0.5;
        ccc.rotate = 45;
        this.add(ccc);
        ccc.on("mousemove", function (evt) {
            if (!this._mousedown) {
                return;
            }
            this.x += evt.mx;
            this.y += evt.my;
        });
        ccc.on("mousedown", function (evt) {
            let g = this.localToGlobal(evt._x, evt._y);
        });
        let cccc = new Rect(50);
        cccc.color = randomColor();
        cccc.x = 100;
        cccc.y = 100;
        cccc.ax = 0.5;
        cccc.ay = 0.5;
        cccc.rotate = 45;
        cccc.scaleX = 1.5;
        cccc.scaleY = 2;
        ccc.add(cccc);
        cccc.on("mousemove", function (evt) {
            if (!this._mousedown) {
                return;
            }
            this.x += evt.mx;
            this.y += evt.my;
        });
        cccc.on("mousedown", function (evt) {
            let g = this.localToGlobal(evt._x, evt._y);
        });
        this.on("mousedown", function (evt) {
            let g = this.localToGlobal(evt._x, evt._y);
        });
    }
}