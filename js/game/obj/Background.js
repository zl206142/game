class Background extends ZNode {
    constructor() {
        super();
        let a = new Pct(G.resources.bg);
        let b = new Pct(G.resources.bg);
        this._pcts = [a, b];
        this.add(a);
        this.add(b);
    }

    set speed(value) {
        this._speed = value;
    }

    update(dt) {
        this._pcts[0].y += (this._speed || 1) * dt / 1000;
        if (this._pcts[0].y >= this._pcts[0].height) {
            this._pcts[0].y = -this._pcts[0].height;
        }
        if (this._pcts[0].y >= 0) {
            this._pcts[1].y = this._pcts[0].y - this._pcts[1].height;
        } else {
            this._pcts[1].y = this._pcts[0].y + this._pcts[0].height;
        }
    }
}