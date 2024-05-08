class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        this.titleText = this.add.text(this.cameras.main.centerX, 150, 'Sky Patrol', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.startGameButton = this.add.text(this.cameras.main.centerX, 250, 'Click Here to Start Game', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.creditsButton = this.add.text(this.cameras.main.centerX, 300, 'Credits', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.tipText = this.add.text(this.cameras.main.centerX, 400, 'Tips:', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.tipText = this.add.text(this.cameras.main.centerX, 450, '1. Use the arrow keys to move and avoid enemies (all things coming to you)', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.tipText = this.add.text(this.cameras.main.centerX, 500, '2. Use the space bar to shoot enemies to score', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.startGameButton.setInteractive();
        this.creditsButton.setInteractive();

        this.startGameButton.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });

        this.creditsButton.on('pointerdown', () => {
            this.scene.start('CreditsScene');
        });
    }
}