class Text extends Node {

    constructor(text) {
        super();
        this._text = text;
    }

    set color(value) {
        this._fillStyle = value;
    }

    set fontSize(value) {
        this._fontSize = value;
        this.height = this._fontSize;
        this._change = true;
    }

    set fontName(value) {
        this._fontName = value;
        this._change = true;
    }

    draw(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this._fillStyle;
        ctx.textBaseline = "top";
        this.textWidth(ctx);
        ctx.fillText(this._text, -this.ax, -this.ay);
    }

    textWidth(ctx) {
        if (this._change) {
            this.width = ctx.measureText(this._text);
        }
    }

    get font() {
        return `${this._fontSize || 20}px ${this._fontName || "Georgia"}`;
    }
}