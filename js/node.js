const ap = {_axv: 0, _ayv: 0};

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
            let p = (this._parent) || ap;
            this._matrix = mixt(this.x - p._axv, this.y - p._ayv, this.rotatePI, this.scaleX, this.scaleY);
            this._axv = this.ax * this.width;
            this._ayv = this.ay * this.height;
            each(this._children, c => {
                c._change = true
            })
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
        this._change = false;
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

    eventBefore() {
        this._localEvent = {}
    }

    eventAfter() {
        delete this._localEvent;
    }

    emit(event) {
        this.eventBefore();
        if (eachR(this._children, c => c.emit(this.localEvent(event).clone()), true) === true) {
            return true;
        }
        if (!this._event) {
            return;
        }
        let n = this.localEvent(event);
        n.mx = event.mx;
        n.my = event.my;
        event = n;
        let pin = this.in(event.x, event.y);
        let cbs = this._events[event.name] || [];
        if (event.name === "mousedown") {
            this._mousedown = pin;
            if (pin) {
                each(cbs, cb => cb.call(this, event));
                return true;
            }
        } else if (event.name === "mouseup" && this._mousedown) {
            if (!pin) {
                event.name = "mousecancel";
                cbs = this._events["mousecancel"] || []
            }
            this._mousedown = false;
            return each(cbs, cb => cb.call(this, event));
        } else if (event.name === "mousemove" && this._mousedown) {
            return each(cbs, cb => cb.call(this, event));
        }
        this.eventAfter();
    }

    in(x, y) {
        return x > 0 && x < this._width && y > 0 && y < this._height;
    }

    localEvent(evt) {
        let key = evt.key;
        if (this._localEvent[key]) {
            return this._localEvent[key];
        }
        let m = this.toLocal(evt.mx, evt.my);
        let p = this.parentToLocal(evt.x, evt.y);
        this._localEvent[key] = new Event(evt.name, p.x, p.y, m.x, m.y);
        return this._localEvent[key];
    }

    globalToLocal(x, y) {
        if (this._parent) {
            let pl = this._parent.globalToLocal(x, y);
            x = pl.x;
            y = pl.y;
        }
        return this.parentToLocal(x, y);
    }

    parentToLocal(x, y) {
        x -= this.x;
        y -= this.y;
        return this.toLocal(x, y).add(this.ax * this.width, this.ay * this.height);
    }

    toLocal(x, y) {
        return rotation(x, y, this.rotatePI).div(this.scaleX, this.scaleY);
    }

    localToParent(x, y) {
        x -= this.ax * this.width;
        y -= this.ay * this.height;
        x *= this.scaleX;
        y *= this.scaleY;
        return rotation(x, y, -this.rotatePI).add(this.x, this.y);
    }

    localToGlobal(x, y) {
        let pg = this.localToParent(x, y);
        if (this._parent) {
            return this._parent.localToGlobal(pg.x, pg.y);
        } else {
            return pg;
        }
    }
}


