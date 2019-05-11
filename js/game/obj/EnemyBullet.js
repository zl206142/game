class EnemyBullet extends Bullet {

    constructor(w, h, x, y) {
        super(w, h);
        this.x = x;
        this.y = y;
    }

    init() {
        this.color = "#aa040e";
        this.ax = 0.5;
        this.ay = 0.5;
        this._speed = -500;
    }

    update(dt) {
        let n = this._speed * dt / 1000;
        this.y -= n;
        if (this.y < 0 || this.y > G.game.height) {
            this.removeFromParent();
            return;
        }
        if (G.game._player && G.game._player.byShoot(this.x, this.y, 0, -n)) {
            this.shoot();
        }
    }

    shoot() {
        this.removeFromParent();
    }

}