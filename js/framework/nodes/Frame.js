class Frame extends Pct {
    get xc() {
        return this._xc;
    }

    set xc(value) {
        while (value >= this.xn) {
            value -= this.xn;
            this.yc++;
        }
        this._xc = value;
        this.sx = value * this.width;
    }

    get yc() {
        return this._yc;
    }

    set yc(value) {
        if (value >= this.yn) {
            value -= this.yn;
        }
        this._yc = value;
        this.sy = value * this.height;
    }

    get yn() {
        return this._yn;
    }

    set yn(value) {
        this._yn = value;
        if (this._img && this._img.height) {
            this.sh = this._img.height / value;
        }
    }

    set sw(value) {
        value /= this.xn;
        super.sw = value;
    }

    get xn() {
        return this._xn;
    }

    set xn(value) {
        this._xn = value;
        if (this._img && this._img.width) {
            this.sw = this._img.width / value;
        }
    }

    set sh(value) {
        value /= this.yn;
        super.sh = value;
    }

    set dely(value) {
        this._dely = value;
    }

    constructor(srcs = []) {
        if (typeof srcs === "string") {
            super(srcs);
            this._ht = true;
        } else {
            super(srcs[0] || "");
        }
        this._imgs = srcs;
        this._xn = 1;
        this._yn = 1;
        this._xc = 0;
        this._yc = 0;
        this._stime = 0;
        this._dely = 100;
    }

    loop(ctx, dt) {
        super.loop(ctx, dt);
        this._stime += dt;
        if (this._stime < this._dely) {
            return;
        }
        this._stime -= this._dely;
        this.next();
    }

    next() {
        if (!this._ht) {
            this.nextD();
        } else {
            this.nextA();
        }
    }

    nextD() {
        if (!this._imgs || !this._imgs.length) {
            return "";
        }
        this._xc++;
        if (this._xc >= this._imgs.length) {
            this._xc = 0;
        }
        this.src = this._imgs[this._xc];
    }

    nextA() {
        this.xc++;
    }

}