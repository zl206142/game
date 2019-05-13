class ZEvent {
    get btn() {
        return this._btn;
    }

    set btn(value) {
        this._btn = value;
    }

    get btns() {
        return this._btns;
    }

    set btns(value) {
        this._btns = value;
    }

    get mx() {
        return this._mx;
    }

    set mx(value) {
        this._mx = value;
    }

    get my() {
        return this._my;
    }

    set my(value) {
        this._my = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    constructor(name, btn = 0, btns = 1, x, y, mx = 0, my = 0) {
        this._name = name;
        this._x = x;
        this._y = y;
        this._mx = mx;
        this._my = my;
        this._btn = btn;
        this._btns = btns;
    }

    get key() {
        return [this.name, this.btn, this.btns, this.x, this.y, this.mx, this.my].join("_")
    }

    clone() {
        return new ZEvent(this.name, this.btn, this.btns, this.x, this.y, this.mx, this.my);
    }
}

