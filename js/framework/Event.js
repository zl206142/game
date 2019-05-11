class Mouse {
    constructor(canvas) {
        this._events = [];
        canvas.onmousedown = this.onmousedown.bind(this);
        canvas.onmouseup = this.onmouseup.bind(this);
        canvas.onmousemove = this.onmousemove.bind(this);
        canvas.ontouchstart = this.ontouchstart.bind(this);
        canvas.ontouchend = this.ontouchend.bind(this);
        canvas.ontouchmove = this.ontouchmove.bind(this);
        canvas.ontouchcancel = this.ontouchcancel.bind(this);
        this._canvas = canvas;
    }

    emitTo(node) {
        let evt = this._events.shift();
        while (evt) {
            node.emit(evt);
            evt = this._events.shift();
        }
    }

    convertMouse(x, y) {
        return new Point(
            x * this._canvas.width / this._canvas.clientWidth,
            y * this._canvas.height / this._canvas.clientHeight
        )
    }

    convertTouch(x, y) {
        return this.convertMouse(
            x - this._canvas.offsetLeft + this._canvas.clientWidth / 2,
            y - this._canvas.offsetTop + this._canvas.clientHeight / 2
        )
    }

    onmousedown(event) {
        let p = this.convertMouse(event.offsetX, event.offsetY);
        this._events.push(new Event("mousedown", p.x, p.y));
    }

    ontouchstart(event) {
        let p = this.convertTouch(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        this._touch = p;
        this._events.push(new Event("mousedown", p.x, p.y));
    }

    onmouseup(event) {
        let p = this.convertMouse(event.offsetX, event.offsetY);
        this._events.push(new Event("mouseup", p.x, p.y));
    }

    ontouchend(event) {
        let p = this.convertTouch(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        this._events.push(new Event("mouseup", p.x, p.y));
    }

    ontouchcancel(event) {
        let p = this.convertTouch(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        this._events.push(new Event("touchcancel", p.x, p.y));
        console.log("touchcancel")
    }


    onmousemove(event) {
        let m = this.convertMouse(event.movementX, event.movementY);
        let p = this.convertMouse(event.offsetX, event.offsetY);
        let evt = this._events[this._events.length - 1];
        if (evt && evt.name === "mousemove") {
            evt.x = p.x;
            evt.y = p.y;
            evt.mx += m.x;
            evt.my += m.y;
        } else {
            this._events.push(new Event("mousemove", p.x, p.y, m.x, m.y));
        }
    }

    ontouchmove(event) {
        let p = this.convertTouch(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        let m = new Point(
            p.x - this._touch.x,
            p.y - this._touch.y
        );
        this._touch = p;
        let evt = this._events[this._events.length - 1];
        if (evt && evt.name === "mousemove") {
            evt.x = p.x;
            evt.y = p.y;
            evt.mx += m.x;
            evt.my += m.y;
        } else {
            this._events.push(new Event("mousemove", p.x, p.y, m.x, m.y));
        }
    }
}

class Event {
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

    constructor(name, x, y, mx = 0, my = 0) {
        this._name = name;
        this._x = x;
        this._y = y;
        this._mx = mx;
        this._my = my;
    }

    get key() {
        return [this.name, this.x, this.y, this.mx, this.my].join("_")
    }

    clone() {
        return new Event(this.name, this.x, this.y, this.mx, this.my);
    }
}

