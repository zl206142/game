class Node {
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

    constructor() {
        this._x = 0;
        this._y = 0;
        this._ax = 0;
        this._ay = 0;
        this._width = 0;
        this._height = 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotate = 0;
        this._parent = null;
        this._children = [];
        this._events = {};
        this._change = true;
    }

    get rotatePI() {
        return this._rotatePI || 0;
    }

    get matrix() {
        if (this._change) {
            this._matrix = mixt(this._x, this._y, this.rotatePI, this._scaleX, this._scaleY);
            this._change = false;
        }
        return this._matrix;
    }


    loop(ctx, dt) {
        this.update(dt);
        ctx.save();
        ctx.transform(...this.matrix);
        this.draw(ctx);
        this.drawChildren(ctx, dt);
        ctx.restore();
    }

    draw(ctx) {

    }

    drawChildren(ctx, dt) {
        each(this._children, function (child) {
            child.loop(ctx, dt);
        });
    }


    add(node, i = this._children.length) {
        this._children.splice(i, 0, node);
        node._parent = this;
    }

    remove(node) {
        this._children = this._children.filter(n => {
            if (n === node) {
                n.parent = null;
                return false
            }
            return true;
        });
    }

    removeFromParent() {
        if (this._parent) {
            this._parent.remove(this);
        }
    }

    update(dt) {

    }

    on(name, cb) {
        this._events[name] = this._events[name] || [];
        this._events[name].push(cb);
        this._event = true;
    }

    off(name, cb) {
        if (cb && this._events[name]) {
            this._events[name] = this._events[name].filter(c => c !== cb);
            if (!this._events[name].length) {
                delete this._events[name];
            }
        } else {
            delete this._events[name]
        }
        let i = 0;
        for (let k in this._events) {
            i++;
        }
        if (!i) {
            this._event = false;
        }
    }


    emit(name, event, now) {
        if (eachR(this._children, c => c.emit(name, new Event(name, this.transformPoint(event).x, this.transformPoint(event).y), now), true) === true) {
            return true;
        }
        if (!this._event) {
            return;
        }
        let pin = this.in(this.transformPoint(event).x, this.transformPoint(event).y);
        let cbs = this._events[name] || [];
        if (name === "mousedown") {
            this._mousedown = pin;
            if (pin) {
                each(cbs, cb => cb.call(this, event));
                return true;
            }
        } else if (event._name === "mouseup" && this._mousedown) {
            if (!pin) {
                event._name = "mousecancel";
                cbs = this._events["mousecancel"] || []
            }
            this._mousedown = false;
            return each(cbs, cb => cb.call(this, event));
        } else if (name === "mousemove" && this._mousedown) {
            return each(cbs, cb => cb.call(this, event));
        }
    }

    in(x, y) {
        x += this.ax * this.width;
        y += this.ay * this.height;
        return x > 0 && x < this._width && y > 0 && y < this._height;
    }

    transformPoint(evt) {
        if (this._evt === evt) {
            return this._transformPoint;
        }
        let x = evt._x, y = evt._y;
        let _x = x;
        let _y = y;
        if (evt._name !== "mousemove") {
            _x = x - this.x;
            _y = y - this.y;
        }
        this._transformPoint = {
            x: (Math.cos(this.rotatePI) * _x + Math.sin(this.rotatePI) * _y) / this._scaleX,
            y: (-Math.sin(this.rotatePI) * _x + Math.cos(this.rotatePI) * _y) / this._scaleY
        };
        this._evt = evt;
        return this._transformPoint;
    }
}
