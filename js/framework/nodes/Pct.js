class Pct extends ZNode {
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
    }

    draw(ctx) {
        if (this._img) {
            ctx.drawImage(this._img, this.sx, this.sy, this.width, this.height, -this.ax * this.width, -this.ay * this.height, this.width, this.height);
        }
    }

    set src(src) {
        this._src = src;
        if (src) {
            this._img = new Image();
            this._img.src = src;
            this._img.onload = () => {
                this.width = this._img.width;
                this.height = this._img.height;
                this.onload();
            }
        }
    }

    get src() {
        return this._src;
    }

    onload() {

    }
}