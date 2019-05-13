class Plane extends Pct {

    constructor() {
        super(resources.test);
        this._speed = 500;
        this._shootTime = 0;
    }

    shoot(dt) {
        this._shootTime += dt;
        if (this._shootTime < 200) {
            return;
        }
        this._shootTime -= 200;
        let g = this.localToGlobal(this.width / 2, 0);
        G.game.add(new Bullet(10, 20, g.x, g.y))
    }

    byShoot(x, y, dx, dy) {
        let local = this.parentToLocal(x, y);
        let local2 = this.parentToLocal(x + dx, y + dy);
        if (this.in(local.x, local.y)) {
            this.add(new Fire2(local.x, local.y));
            return true;
        } else if (this.in(local2.x, local2.y)) {
            this.add(new Fire2(local2.x, local2.y));
            return true;
        } else if (cross(local.x, local.y, local2.x, local2.y, 0, 0, this.width, this.height)) {
            this.add(new Fire2(this.width / 2, this.height / 2));
            return true;
        }
    }

    closeTo(x, y) {
        if (y === undefined) {
            y = x.y;
            x = x.x;
        }
        this._closePoint = new Point(x, y);
    }

    update(dt) {
        this.shoot(dt);
        if (!this._closePoint) {
            return;
        }
        let move = closeTo(this._closePoint.clone().sub(this.x, this.y), this._speed * dt / 1000);
        this.x += move.x;
        this.y += move.y;
    }
}