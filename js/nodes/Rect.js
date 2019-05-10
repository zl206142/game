class Rect extends Node {

    constructor(width) {
        super();
        this._width = width;
        this._height = width;
        this._fillStyle = "#ffffff";
    }

    set color(value) {
        this._fillStyle = value;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this._fillStyle;
        ctx.rect(-this.ax * this.width, -this.ay * this.height, this._width, this._height);
        ctx.fill();
    }
}