class Frame extends Pct {
    get daley() {
        return this._daley;
    }

    set daley(value) {
        this._daley = value;
    }

    get xc() {
        return this._xc;
    }

    set xc(value) {
        if (this.loopTime === 0) {
            return;
        }
        while (value >= this.xn) {
            this.yc++;
            value -= this.xn;
        }
        this._xc = value;
        if (this._array) {
            super.src = this._srcs[this.xc];
        } else {
            this.sx = value * this.width;
        }
    }

    get yc() {
        return this._yc;
    }

    set yc(value) {
        if (value >= this.yn) {
            this._frameEnd();
            value -= this.yn;
        }
        if (!this._array) {
            this._yc = value;
            this.sy = value * this.height;
        }
    }

    get yn() {
        return this._yn;
    }

    set yn(value) {
        this._yn = value;
        if (this._img && this._img.height) {
            this.height = this._img.height;
        }
    }

    set width(value) {
        if (!this._array) {
            value /= this.xn;
        }
        super.width = value;
    }

    get width() {
        return this._width;
    }

    get xn() {
        return this._xn;
    }

    set xn(value) {
        this._xn = value;
        if (this._img && this._img.width) {
            this.width = this._img.width;
        }
    }

    set height(value) {
        value /= this.yn;
        super.height = value;
    }

    get height() {
        return this._height;
    }


    set loopTime(value) {
        this._loopTime = value;
    }

    get loopTime() {
        return this._loopTime;
    }

    set src(value) {
        this._srcs = value;
        this._array = value instanceof Array;
        if (this._array) {
            this.xn = value.length;
            super.src = value[0];
        } else {
            super.src = value;
        }
    }

    get src() {
        return this._srcs;
    }

    constructor(src = []) {
        super();
        this._xn = 1;
        this._yn = 1;
        this.src = src;
        this._xc = 0;
        this._yc = 0;
        this._stime = 0;
        this._daley = 100;
        this._loopTime = 1;
    }

    loop(ctx, dt) {
        super.loop(ctx, dt);
        this._stime += dt;
        if (this._stime < this.daley) {
            return;
        }
        this._stime -= this.daley;
        try {
            this.xc++;
        } catch (e) {

        }
    }

    _frameEnd() {
        this.frameEnd();
        this.loopTime--;
        if (this.loopTime === 0) {
            this.frameAllEnd()
            throw "end";
        }
    }

    frameEnd() {
    }

    frameAllEnd() {
        this.removeFromParent();
    }

    onload() {
    }

}