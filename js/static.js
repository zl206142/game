function each(arr, cb, rt) {
    for (let i = 0; i < arr.length; i++) {
        if (cb(arr[i]) === true && rt) {
            return true;
        }
    }
}

function eachR(arr, cb, rt) {
    for (let i = arr.length - 1; i > -1; i--) {
        if (cb(arr[i]) === true && rt) {
            return true;
        }
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
        x, y, 1
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

function randomColor() {
    return "#" + randomRGB() + randomRGB() + randomRGB();
}

function randomRGB() {
    let r = "00" + Math.round(Math.random() * 0xff).toString(16);
    return r.substr(r.length - 2, 2);
}