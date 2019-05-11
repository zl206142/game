class Main extends Game {

    play() {
        // super.play();
        this._enemys = [];

        this.bg();
        this._player = this.player();
        this.enemy();

    }

    bg() {
        let bg = new Background("img/bg.jpg");
        this.add(bg);
        bg.scaleX = 1.8;
        bg.scaleY = 1.8;
        bg.speed = 100;
        return bg;
    }

    player() {
        let plane = new Plane("img/test.jpg");
        plane.ax = 0.5;
        plane.ay = 0.5;
        plane.scaleX = 0.5;
        plane.scaleY = 0.5;
        plane.x = this.width / 2;
        plane.y = this.height * 0.8;
        this.add(plane);
        this.on("mousemove", plane.closeTo.bind(plane));
        this.on("mousedown", plane.closeTo.bind(plane));
        return plane;
    }

    enemy() {
        let enemy = new Enemy("img/test.jpg");
        enemy.x = 400;
        enemy.y = 200;
        enemy.scale = 0.3;
        this.add(enemy);
        this._enemys.push(enemy);
    }
}