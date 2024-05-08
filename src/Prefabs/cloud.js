class Enemy_Cloud extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.scene = scene;
    }

    update() {
        this.y += 1;
        this.x += Math.sin(this.y / 50) * 2;
        if (this.y > this.scene.game.config.height) {
            this.y = 0;
            this.x = Phaser.Math.Between(0, this.scene.game.config.width - 100);
        }
    }
}
