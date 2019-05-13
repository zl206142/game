class Enemy extends Plane {

    constructor() {
        super(G.resources.test);
        this._f = 1;
        this.speed = 200;
        this.shootDaley = 500;
        this.rotate = 180;
    }


    afterByShoot(x, y, bullet) {
        this.add(new Fire(x, y));
    }

    bullet(x, y) {
        return new EnemyBullet(10, 20, x, y, this.rotate);
    }

    move(dt) {
        this.x += this._f * this.speed * dt / 1000;
        if (this.x > G.game.width * 0.9) {
            this._f = -1
        } else if (this.x < G.game.width * 0.1) {
            this._f = 1;
        }
    }

}