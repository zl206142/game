let script = {
    "js": {
        "/framework": {
            "/nodes": {
                "/": [
                    "Node.js",
                    "Pct.js",
                    "Frame.js",
                    "Rect.js",
                    "Text.js",
                ]
            },
            "/": [
                "Event.js",
                "Game.js",
                "Static.js",
            ]
        },
        "/game": {
            "/obj": {
                "/": [
                    "Background.js",
                    "Plane.js",
                    "Bullet.js",
                    "Enemy.js",
                    "Boom.js",
                    "Fire.js",
                    "EnemyBullet.js",
                ]
            },
            "/": [
                "Main.js"
            ]
        }
    },

};

let imgs = {
    fire: [
        "img/fire/f0.png",
        "img/fire/f1.png",
        "img/fire/f2.png",
        "img/fire/f3.png",
        "img/fire/f4.png",
        "img/fire/f5.png",
        "img/fire/f6.png",
        "img/fire/f7.png",
    ],
    big_fire: "img/frame/big_fire.png",
    boom: "img/frame/hahaha.png",
    bg: "img/bg.jpg",
    test: "img/test.jpg",
};

async function preLoad() {
    await loadScripts("", script);
    await loadImgs(imgs);
    console.log("load end");
}

async function loadScripts(path, files) {
    for (let k in files) {
        let path2 = path + k;
        let v = files[k];
        if (typeof v === "string") {
            await loadScript(path2 + v);
        } else if (v instanceof Array) {
            for (let i = 0; i < v.length; i++) {
                let v2 = v[i];
                await loadScript(path2 + v2);
            }
        } else {
            await loadScripts(path2, v);
        }
    }
}

async function loadImgs(files) {
    for (let k in files) {
        let v = files[k];
        if (typeof v === "string") {
            await loadImg(v);
        } else if (v instanceof Array) {
            for (let i = 0; i < v.length; i++) {
                let v2 = v[i];
                await loadImg(v2);
            }
        } else {
            await loadImgs(v);
        }
    }
}

async function loadScript(path) {
    await loadPath("script", path);
}

async function loadImg(path) {
    await loadPath("img", path);
}

async function loadPath(name, path, attr = "src") {
    let node = window.document.createElement(name);
    node[attr] = path;
    window.document.body.append(node);
    return new Promise(resolve => {
        node.onload = function () {
            node.remove();
            resolve();
        };
    });
}
