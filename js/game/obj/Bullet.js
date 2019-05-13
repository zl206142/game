class Bullet extends Rect {
    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
        this._ds = value / 1000;
    }

    get enemies() {
        return this._enemies;
    }

    set enemies(value) {
        this._enemies = value;
    }

    constructor(w, h, x, y, r) {
        super(w, h);
        this.x = x;
        this.y = y;
        this.color = "#ffffff";
        this.ax = 0.5;
        this.ay = 0.5;
        this.speed = 1000;
        this.rotate = r || 0;
        this.enemies = G.game._enemies;
    }

    update(dt) {
        let v = rotation(0, -this._ds * dt, this.rotatePI);
        each(this.enemies || [], e => {
            let sp = e.byShootPoint(this.x, this.y, v.x, v.y, this);
            if (sp) {
                e.afterByShoot(sp.x, sp.y, this);
                this.shoot(e, sp);
            }
        });
        this.checkOut();
        this.x += v.x;
        this.y += v.y;
    }

    checkOut() {
        if (!G.game.in(this.x, this.y)) {
            this.removeFromParent();
        }
    }

    shoot(e, sp) {
        let g = e.localToGlobal(sp.x, sp.y);
        new Boom(g.x, g.y);
        this.removeFromParent();
    }

}