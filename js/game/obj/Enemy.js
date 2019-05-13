class Enemy extends Pct {

    constructor() {
        super(G.resources.test);
        this.ax = 0.5;
        this.ay = 0.5;
        this._f = 1;
        this._shootTime = 0;
    }

    byShoot(x, y, dx, dy) {
        let local = this.parentToLocal(x, y);
        let local2 = this.parentToLocal(x + dx, y + dy);
        if (this.in(local.x, local.y)) {
            new Boom(x, y);
            this.add(new Fire(local.x, local.y));
            return true;
        } else if (this.in(local2.x, local2.y)) {
            new Boom(x + dx, y + dy);
            this.add(new Fire(local2.x, local2.y));
            return true;
        } else if (cross(local.x, local.y, local2.x, local2.y, 0, 0, this.width, this.height)) {
            let g = this.localToGlobal(this.width / 2, this.height / 2);
            new Boom(g.x, g.y);
            this.add(new Fire(this.width / 2, this.height / 2));
            return true;
        }
    }

    update(dt) {
        this.x += this._f;
        if (this.x > G.game.width * 0.9) {
            this._f = -1
        } else if (this.x < G.game.width * 0.1) {
            this._f = 1;
        }
        this._shootTime += dt;
        if (this._shootTime > 300) {
            this._shootTime -= 300;
            this.shoot();
        }
    }

    shoot() {
        let g = this.localToGlobal(this.width / 2, this.height);
        G.game.add(new EnemyBullet(10, 20, g.x, g.y))
    }


}