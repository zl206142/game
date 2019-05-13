"use strict";
window.onload = async function () {
    window.G = window.G || window;

    let fpsNode = fps();

    let ctx = cctx();

    await preLoad(ctx);

    G.game = new Main(ctx).run();

    setInterval(() => {
        fpsNode.innerText = G.game.fps;
        G.game.fps = 0;
    }, 1000);

    async function preLoad(ctx) {

        await loadScripts("", await loadJson("scripts.json"));
        console.log("scripts load finish");

        G.resources = await loadJson("resources.json");
        await loadImgs(G.resources, path => {
            let img = new Image();
            img.src = path;
            return new Promise(resolve => {
                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                    resolve();
                };
            });
        });
        console.log("resources load finish");
        console.log("load end");
    }

    async function loadJson(url) {
        return await (await fetch(url)).json();
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

    async function loadImgs(files, loadImg) {
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
                await loadImgs(v, loadImg);
            }
        }
    }

    async function loadScript(path) {
        await loadPath("script", path);
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


    function cctx() {
        const e = document.createElement("canvas");
        e.width = 750;
        e.height = 1334;
        e.className = "center";
        e.id = "game";
        window.document.body.appendChild(e);
        sizeInit(e);
        return e.getContext("2d");
    }

    function fps() {
        const fps = document.createElement("span");
        fps.id = "fps";
        fps.className = "tr";
        window.document.body.appendChild(fps);
        return fps;
    }

    function sizeInit(e) {
        window.onresize = function () {
            if (window.innerWidth / window.innerHeight > e.width / e.height) {
                e.style.width = "auto";
                e.style.height = "90%"
            } else {
                e.style.width = "90%";
                e.style.height = "auto"
            }
        };
        window.onresize();
    }

    oncontextmenu = function () {
        return false
    };
};