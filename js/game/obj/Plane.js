class Plane extends Pct {
    init() {
        this.on("mousedown", this.shoot);
    }

    shoot(event) {
        let g = this.localToGlobal(event.x, 0);
        G.game.add(new Bullet(10, 20, g.x, g.y))
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
}