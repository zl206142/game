class Rect extends ZNode {

    constructor(width, height = width) {
        super();
        this._width = width;
        this._height = height;
    }

    set color(value) {
        this._fillStyle = value;
    }

    get color() {
        return this._fillStyle;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this._fillStyle || "#ffffff";
        ctx.rect(-this.ax * this.width, -this.ay * this.height, this._width, this._height);
        ctx.fill();
    }
}