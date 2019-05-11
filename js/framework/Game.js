class Game extends Node {

    constructor(ctx) {
        super();
        this._ctx = ctx;
        this.width = this._ctx.canvas.width;
        this.height = this._ctx.canvas.height;
        this._fps = document.getElementById("fps");
        this.fps = 0;
    }

    onresize(w, h) {
        let b = w / h;
        let bt = this.width / this.height;
        if (b > bt) {
            this._ctx.canvas.style.width = "auto";
            this._ctx.canvas.style.height = "90%"
        } else {
            this._ctx.canvas.style.width = "90%";
            this._ctx.canvas.style.height = "auto"
        }
    }

    run() {
        console.log(this._width, this._height);
        this._mouse = new Mouse(this._ctx.canvas);
        this.start();
        this.play();
        setInterval(() => {
            this._fps.innerText = this.fps;
            this.fps = 0;
        }, 1000);
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

        // this.on("mousedown", function (evt) {
        //     let c = new Rect(50);
        //     c.color = randomColor();
        //     c.x = evt._x;
        //     c.y = evt._y;
        //     c.ax = 0.5;
        //     c.ay = 0.5;
        //     let cb = function (evt) {
        //         this.x += evt._x;
        //         this.y += evt._y;
        //     };
        //     c.on("mousemove", cb);
        //     this.add(c);
        //     setTimeout(() => {
        //         c.off("mousemove", cb)
        //     }, 5000)
        // });


        // let imgs = [
        //     "img/fire/f0.png",
        //     "img/fire/f1.png",
        //     "img/fire/f2.png",
        //     "img/fire/f3.png",
        //     "img/fire/f4.png",
        //     "img/fire/f5.png",
        //     "img/fire/f6.png",
        //     "img/fire/f7.png"
        // ];
        //
        // let f = new Frame(imgs);
        // this.add(f);
        // f.x = 100;
        // f.y = 130;
        // f.dely = 50;
        // f.scaleX = 0.25;
        // f.scaleY = 0.25;

        // let f2 = new Frame("img/frame/hahaha.png");
        // this.add(f2);
        // f2.x = 350;
        // f2.y = 150;
        // f2.xn = 8;
        // f2.yn = 5;
        // f2.dely = 70;


        let f4 = new Frame("img/frame/235332qd8djnkjni78hyn7.png");
        this.add(f4);
        f4.x = 550;
        f4.y = 300;
        f4.xn = 8;
        f4.yn = 4;
        f4.scaleX = 0.8;
        f4.scaleY = 0.8;
        f4.ax = 0.5;
        f4.ay = 0.5;
        f4.dely = 30;
        f4.update = function () {
            // console.log(this.width, this.height);
        };
        // f4.on("mousemove", function (evt) {
        //     this.x += evt.mx;
        //     this.y += evt.my;
        // });

        let c = new Rect(50);
        c.color = randomColor();
        c.ax = 0.5;
        c.ay = 0.5;
        c.scaleX = 3;
        c.scaleY = 3;
        f4.add(c);
        c.on("mousemove", function (evt) {
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
        // t.ax = 0.5;
        // t.ay = 0.5;
        this.add(t);


        let ccc = new Rect(50);
        ccc.color = randomColor();
        ccc.x = 200;
        ccc.y = 200;
        ccc.ax = 0.5;
        ccc.ay = 0.5;
        ccc.rotate = 45;
        // ccc.scaleX = 0.5;
        // ccc.scaleY = 0.5;
        this.add(ccc);
        ccc.on("mousemove", function (evt) {
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