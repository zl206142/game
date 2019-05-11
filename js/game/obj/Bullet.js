class Bullet extends Rect {

    constructor(w, h, x, y) {
        super(w, h);
        this.x = x;
        this.y = y;
    }

    init() {
        this.color = "#ffffff";
        this.ax = 0.5;
        this.ay = 0.5;
        this._speed = 1000;
    }

    update(dt) {
        let n = this._speed * dt / 1000;
        this.y -= n;
        if (this.y < 0) {
            this.removeFromParent();
            return;
        }
        each(G.game._enemys || [], e => {
            if (e.byShoot(this.x, this.y, 0, -n)) {
                this.shoot();
            }
        });
    }

    shoot() {
        this.removeFromParent();
    }

}