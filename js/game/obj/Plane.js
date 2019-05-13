class Plane extends Pct {
    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }

    get shootDaley() {
        return this._shootDaley;
    }

    set shootDaley(value) {
        this._shootDaley = value;
    }

    constructor() {
        super(G.resources.test);
        this._shootTime = 0;
        this.speed = 500;
        this.shootDaley = 200;
        this.ax = this.ay = 0.5;
    }

    checkShoot(dt) {
        this._shootTime += dt;
        if (this._shootTime < this.shootDaley) {
            return;
        }
        this._shootTime -= this.shootDaley;
        this.shoot(dt)
    }

    shoot(dt) {
        let g = this.localToGlobal(this.width / 2, 0);
        G.game.add(this.bullet(g.x, g.y))
    }

    bullet(x, y) {
        return new Bullet(10, 20, x, y, this.rotate);
    }

    byShootPoint(x, y, dx, dy) {
        let local = this.parentToLocal(x, y);
        let local2 = this.parentToLocal(x + dx, y + dy);
        if (this.in(local.x, local.y)) {
            return local;
        } else if (this.in(local2.x, local2.y)) {
            return local2;
        } else if (cross(local.x, local.y, local2.x, local2.y, 0, 0, this.width, this.height)) {
            return new Point(this.width / 2, this.height / 2);
        }
    }

    afterByShoot(x, y, bullet) {
        this.add(new Fire2(x, y));
    }


    closeTo(x, y) {
        if (y === undefined) {
            y = x.y;
            x = x.x;
        }
        this._closePoint = new Point(x, y);
    }

    update(dt) {
        this.checkShoot(dt);
        this.move(dt);
    }

    move(dt) {
        if (!this._closePoint) {
            return;
        }
        let move = closeTo(this._closePoint.clone().sub(this.x, this.y), this._speed * dt / 1000);
        this.x += move.x;
        this.y += move.y;
    }
}