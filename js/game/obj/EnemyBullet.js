class EnemyBullet extends Bullet {

    constructor(w, h, x, y, r) {
        super(w, h, x, y, r);
        this.color = "#aa040e";
        this.speed = 500;
        this.enemies = [G.game._player];
    }
}