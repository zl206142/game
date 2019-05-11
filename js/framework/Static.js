function each(arr, cb) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i]);
    }
}

function eachR(arr, cb) {
    for (let i = arr.length - 1; i > -1; i--) {
        cb(arr[i]);
    }
}

function mixt(x, y, rotate, scaleX, scaleY) {
    let r = [
        Math.cos(rotate), -Math.sin(rotate), 0,
        Math.sin(rotate), Math.cos(rotate), 0,
        0, 0, 1
    ];
    let m = [
        1, 0, x,
        0, 1, y,
        0, 0, 1
    ];
    let s = [
        scaleX, 0, 0,
        0, scaleY, 0,
        0, 0, 1
    ];
    let mm = mm3(mm3(m, r), s);
    return [mm[0], mm[3], mm[1], mm[4], mm[2], mm[5]];
}

function mm3(m1, m2) {
    let r = [];
    let w = 3;
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < w; j++) {
            let rr = 0;
            for (let k = 0; k < w; k++) {
                rr += m1[i * w + k] * m2[j + w * k];
            }
            r.push(rr)
        }
    }
    return r;
}

function rotation(x, y, r) {
    return new Point(
        Math.cos(r) * x + Math.sin(r) * y,
        -Math.sin(r) * x + Math.cos(r) * y
    )
}

function randomColor() {
    return "#" + randomRGB() + randomRGB() + randomRGB();
}

function randomRGB() {
    let r = "00" + Math.round(Math.random() * 0xff).toString(16);
    return r.substr(r.length - 2, 2);
}

function between(a, b, i) {
    return a < i && b > i || a > i && b < i;
}

function getRotate(x, y) {
    return Math.atan2(y, x);
}

function cross(x1, y1, x2, y2, rx, ry, rw, rh) {
    x2 -= x1;
    y2 -= y1;
    rx -= x1;
    ry -= y1;
    let rx2 = rx + rw, ry2 = ry + rh;
    let ro = getRotate(x2, y2);
    let t = rotation(x2, y2, ro);
    let p1 = rotation(rx, ry, ro);
    let p2 = rotation(rx, ry2, ro);
    let p3 = rotation(rx2, ry, ro);
    let p4 = rotation(rx2, ry2, ro);
    return (between(0, t.x, p1.x) || between(0, t.x, p2.x) || between(0, t.x, p3.x) || between(0, t.x, p4.x)) && !((p1.y > 0 && p2.y > 0 && p3.y > 0 && p4.y > 0) || (p1.y < 0 && p2.y < 0 && p3.y < 0 && p4.y < 0));
}

function closeTo(x, y, v) {
    if (v === undefined) {
        v = y;
        y = x.y;
        x = x.x;
    }
    let z = Math.sqrt(x * x + y * y);
    let b = v / z;
    if (b > 1) {
        b = 1;
    }
    return new Point(x * b, y * b);
}

class Point {
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

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    add(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    div(x, y) {
        this.x /= x;
        this.y /= y;
        return this;
    }

    mul(x, y) {
        this.x *= x;
        this.y *= y;
        return this;
    }

    sub(x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    }

    clone() {
        return new Point(this.x, this.y);
    }
}