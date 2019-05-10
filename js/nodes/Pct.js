class Pct extends Node {
    get sh() {
        return this._sh;
    }

    set sh(value) {
        this._sh = value;
        this.height = value;
    }

    get sw() {
        return this._sw;
    }

    set sw(value) {
        this._sw = value;
        this.width = value;
    }

    get sy() {
        return this._sy || 0;
    }

    set sy(value) {
        this._sy = value;
    }

    get sx() {
        return this._sx || 0;
    }

    set sx(value) {
        this._sx = value;
    }

    constructor(src = "") {
        super();
        this.src = src;
        this._sx = 0;
        this._sy = 0;
        this._sw = 0;
        this._sh = 0;
    }

    //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    draw(ctx) {
        if (this._img) {
            ctx.drawImage(this._img, this.sx, this.sy, this.width, this.height, -this.ax * this.width, -this.ay * this.height, this.width, this.height);
        }
    }

    set src(src) {
        this._src = src;
        if (src) {
            this._img = new Image();
            this._img.src = this._src;
            this._img.onload = () => {
                this.sw = this._img.width;
                this.sh = this._img.height;
            }
        }
    }
}