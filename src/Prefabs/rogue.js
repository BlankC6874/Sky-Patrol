class Enemy_Rogue extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.scene = scene;
        // Properties
        this.speed = speed;
    }

    update() {
        this.y += this.speed;
        if (this.y > this.scene.game.config.height) {
            this.y = 0;
            this.x = Phaser.Math.Between(0, this.scene.game.config.width - 100);
        }
    }
}
