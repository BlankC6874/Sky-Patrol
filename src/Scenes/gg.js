class GG extends Phaser.Scene {
    constructor() {
        super({ key: 'GGScene' });
    }

    create() {
        this.ggText = this.add.text(this.cameras.main.centerX, 150, 'Game Over', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.scoreText = this.add.text(this.cameras.main.centerX, 200, 'Score: ' + score, { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.returnButton = this.add.text(this.cameras.main.centerX, 250, 'Click Here to Return to Title', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.returnButton.setInteractive();
        this.returnButton.on('pointerdown', () => {
            this.scene.start('TitleScene');
        });
    }
}