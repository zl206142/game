class ZNodeBase {
    get ay() {
        return this._ay;
    }

    set ay(value) {
        this._ay = value;
    }

    get ax() {
        return this._ax;
    }

    set ax(value) {
        this._ax = value;
    }

    get rotate() {
        return this._rotate;
    }

    set rotate(value) {
        this._rotate = value;
        this._rotatePI = this._rotate * Math.PI / 180;
        this._change = true;
    }

    get scaleY() {
        return this._scaleY;
    }

    set scaleY(value) {
        this._scaleY = value;
        this._change = true;
    }

    get scaleX() {
        return this._scaleX;
    }

    set scaleX(value) {
        this._scaleX = value;
        this._change = true;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
        this._change = true;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
        this._change = true;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
        this._change = true;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
        this._change = true;
    }

    get rotatePI() {
        return this._rotatePI || 0;
    }

    constructor() {
        this._x = 0;//位置
        this._y = 0;
        this._ax = 0;//锚点
        this._ay = 0;
        this._width = 0;//尺寸
        this._height = 0;
        this._scaleX = 1;//缩放
        this._scaleY = 1;
        this._rotate = 0;//旋转
        this._change = true;
    }

}