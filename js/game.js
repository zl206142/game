class Game extends Node {

    constructor(ctx) {
        super();
        this._ctx = ctx;
        this.width = this._ctx.canvas.width;
        this.height = this._ctx.canvas.height;
        this._fps = document.getElementById("fps");
        this.fps = 0;
    }

    run() {
        console.log(this._width, this._height);
        this._last = Date.now();
        this._mouse = new Mouse(this._ctx.canvas);
        this.start();
        this.play();
        setInterval(() => {
            this._fps.innerText = this.fps;
            this.fps = 0;
        }, 1000)

    }

    start() {
        let now = Date.now();
        this._dt = now - this._last;
        this._last = now;
        this._mouse.emitTo(this, now);
        this._ctx.clearRect(0, 0, this._width, this._height);
        this.loop(this._ctx, this._dt);
        requestAnimationFrame(this.start.bind(this));
        this.fps++;
    }

    update(dt) {
        // let c = new Rect(50);
        // c.color = randomColor();
        // c.x = Math.random() * this.width;
        // c.y = Math.random() * this.height;
        // c.ax = 0.5;
        // c.ay = 0.5;
        // this.add(c);
        // c.update = function (dt) {
        //     this.rotate += dt / 5;
        // }
    }

    play() {

        this.on("mousedown", function (evt) {
            let c = new Rect(50);
            c.color = randomColor();
            c.x = evt._x;
            c.y = evt._y;
            c.ax = 0.5;
            c.ay = 0.5;
            let cb = function (evt) {
                this.x += evt._x;
                this.y += evt._y;
            };
            c.on("mousemove", cb);
            this.add(c);
            setTimeout(() => {
                c.off("mousemove", cb)
            }, 5000)
        });


        let imgs = [
            "img/fire/f0.png",
            "img/fire/f1.png",
            "img/fire/f2.png",
            "img/fire/f3.png",
            "img/fire/f4.png",
            "img/fire/f5.png",
            "img/fire/f6.png",
            "img/fire/f7.png"
        ];

        let f = new Frame(imgs);
        this.add(f);
        f.x = 100;
        f.y = 20;
        f.dely = 50;
        f.scaleX = 0.25;
        f.scaleY = 0.25;

        let f2 = new Frame("img/frame/hahaha.png");
        this.add(f2);
        f2.x = 350;
        f2.y = 150;
        f2.xn = 8;
        f2.yn = 5;
        f2.dely = 70;


        let f4 = new Frame("img/frame/235332qd8djnkjni78hyn7.png");
        this.add(f4);
        f4.x = 550;
        f4.y = 150;
        f4.xn = 8;
        f4.yn = 4;
        f4.scaleX = 0.3;
        f4.scaleY = 0.3;
        f4.dely = 30;
        f4.on("mousemove", function (evt) {
            this.x += evt._x;
            this.y += evt._y;
        });

        let c = new Rect(50);
        c.color = randomColor();
        f4.add(c);
        c.on("mousemove", function (evt) {
            this.x += evt._x;
            this.y += evt._y;
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

    }
}