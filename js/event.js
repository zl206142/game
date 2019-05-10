class Mouse {
    constructor(canvas) {
        this._events = [];
        canvas.onmousedown = this.onmousedown.bind(this);
        canvas.onmouseup = this.onmouseup.bind(this);
        canvas.onmousemove = this.onmousemove.bind(this);
    }

    emitTo(node, now) {
        let evt = this._events.shift();
        while (evt) {
            node.emit(evt._name, evt, now);
            evt = this._events.shift();
        }
    }

    onmousedown(event) {
        this._events.push(new Event("mousedown", event.offsetX, event.offsetY));
    }

    onmouseup(event) {
        this._events.push(new Event("mouseup", event.offsetX, event.offsetY));
    }

    onmousemove(event) {
        let evt = this._events[this._events.length - 1];
        if (evt && evt._name === "mousemove") {
            evt._x += event.movementX;
            evt._y += event.movementY;
        } else {
            this._events.push(new Event("mousemove", event.movementX, event.movementY));
        }
    }
}

class Event {
    constructor(name, x, y) {
        this._name = name;
        this._x = x;
        this._y = y;
    }
}

