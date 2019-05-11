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
        this.add(plane);
        this.on("mousemove", function (event) {
            plane.x = event.x;
            plane.y = event.y;
        })
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