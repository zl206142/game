const ap = {_axv: 0, _ayv: 0};

class ZNode extends ZNodeBase {
    get eventable() {
        return this._eventable;
    }

    set eventable(value) {
        this._eventable = value;
        if (value) {
            EventManager.index();
        } else {
            EventManager.remove(this);
        }
    }


    constructor() {
        super();
        this._parent = null;
        this._children = [];
        this._events = null;
        this._eventable = false;
    }

    get matrix() {
        let p = (this._parent) || ap;
        if (this._change || p._change) {
            this._matrix = mixt(this.x - p._axv, this.y - p._ayv, this.rotatePI, this.scaleX, this.scaleY);
            if (this._change) {
                this._axv = this.ax * this.width;
                this._ayv = this.ay * this.height;
            }
        }
        return this._matrix;
    }

    loop(ctx, dt) {
        this.initAndUpdate(dt);
        ctx.save();
        ctx.transform(...this.matrix);
        this.draw(ctx);
        this.eachChildren(ctx, dt);
        ctx.restore();
        this._change = false;
    }

    initAndUpdate(dt) {
        this.init();
        this.update(dt);
        this.initAndUpdate = this.update;
    }

    init() {
        // console.log("init");
    }

    update(dt) {

    }

    draw(ctx) {

    }

    eachChildren(ctx, dt) {
        each(this._children, function (child) {
            child.loop(ctx, dt);
        });
    }


    add(node, i = this._children.length) {
        if (node._parent) {
            node.removeFromParent();
        }
        this._children.splice(i, 0, node);
        node._parent = this;
        if (node.eventable) {
            EventManager.index();
        }
    }

    remove(node) {
        let i = this._children.indexOf(node);
        if (i !== -1) {
            this._children.splice(i, 1);
            node._parent = null;
        }
        if (node.eventable) {
            EventManager.remove(node);
        }
    }

    removeFromParent() {
        if (this._parent) {
            this._parent.remove(this);
            this._parent = null;
        }
    }


    on(name, cb) {
        this._events = this._events || {};
        this._events[name] = this._events[name] || [];
        this._events[name].push(cb);
        this.eventable = true;
    }

    off(name, cb) {
        if (!this._events) {
            return;
        }
        let arr = this._events[name];
        if (arr) {
            if (cb) {
                arr = arr.filter(c => c !== cb);
                if (!arr.length) {
                    delete this._events[name];
                }
            } else {
                delete this._events[name]
            }
        }
        let i = 0;
        for (let k in this._events) {
            i++;
        }
        if (!i) {
            this._events = null;
            this.eventable = false;
        }
    }

    emit(event) {
        this._localEvent = {};
        if (!this._eventable) {
            return;
        }
        event = this.localEvent(event);
        let pin = this.in(event.x, event.y);
        if (event.name === "mousedown") {
            this._mousedown = pin;
            if (pin) {
                each(this.events(event.name), cb => cb.call(this, event));
                throw "jump";
            }
        } else if (event.name === "mouseup" && this._mousedown) {
            if (!pin) {
                event.name = "mousecancel";
            }
            this._mousedown = false;
            each(this.events(event.name), cb => cb.call(this, event));
        } else if (event.name === "mousemove") {
            each(this.events(event.name), cb => cb.call(this, event));
        }
    }

    events(name) {
        return this._events && this._events[name] || [];
    }

    in(x, y) {
        return x > 0 && x < this._width && y > 0 && y < this._height;
    }

    localEvent(evt) {
        let key = evt.key;
        if (this._localEvent[key]) {
            return this._localEvent[key];
        }
        let m = this._parent ? this._parent.globalToLocalMovement(evt.mx, evt.my) : new Point(evt.mx, evt.my);
        let p = this.globalToLocal(evt.x, evt.y);
        this._localEvent[key] = new ZEvent(evt.name, evt.btn, evt.btns, p.x, p.y, m.x, m.y);
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

    globalToLocalMovement(x, y) {
        if (this._parent) {
            let pl = this._parent.globalToLocalMovement(x, y);
            x = pl.x;
            y = pl.y;
        }
        return this.toLocal(x, y);
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

    anchorCenter() {
        this.ax = this.ay = 0.5;
    }

    set scale(value) {
        this.scaleX = this.scaleY = value;
    }

    indexEvent(obj) {
        obj = obj || [];
        eachR(this._children, c => c.indexEvent(obj));
        if (this.eventable) {
            obj.push(this);
        }
        return obj;
    }
}


