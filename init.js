let files = {
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

let pct = {
    "img": {
        "/fire": {},
        "/frame": {},
        "/":[

        ]
    }
};

async function load(path, files) {
    for (let k in files) {
        let path2 = path + k;
        let v = files[k];
        if (typeof v === "string") {
            await script(path2 + v);
        } else if (v instanceof Array) {
            for (let i = 0; i < v.length; i++) {
                let v2 = v[i];
                await script(path2 + v2);
            }
        } else {
            await load(path2, v);
        }
    }
}

async function script(path) {
    let script = window.document.createElement("script");
    script.src = path;
    window.document.body.append(script);
    return new Promise(resolve => {
        script.onload = function () {
            resolve();
        };
    });
}
