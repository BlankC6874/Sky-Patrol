class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
    }

    preload() {
        // Load the background image
        this.load.image('background', 'assets/starfield.png');

        // Load the player's related assets
        this.load.image('aircraft', 'assets/ship_0000.png');
        this.load.image('bullet', 'assets/tile_0000.png');
        this.load.image('explosion1', 'assets/tile_0004.png');
        this.load.image('explosion2', 'assets/tile_0005.png');

        // Load the enemy's related assets
        this.load.image('rogue_aircraft1', 'assets/ship_0016.png');
        this.load.image('rogue_aircraft2', 'assets/ship_0017.png');
        this.load.image('rogue_aircraft3', 'assets/ship_0018.png');
        this.load.image('cloud', 'assets/tile_0008.png');

        // Load audio assets
        this.load.audio('explosionSFX', './assets/explosionCrunch_000.ogg');
        this.load.audio('engine', './assets/engineCircular_004.ogg');
        this.load.audio('laser', './assets/laserRetro_000.ogg');
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability
        
        // Assign Key Objects
        // UPKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // DOWNKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        LEFTKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        RIGHTKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create the properties of the scene
        this.background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0, 0);
        this.isShooting = false;

        // Create main sprites and their properties
        this.player = new Player(this, this.cameras.main.centerX, 500, 'aircraft', 0, LEFTKey, RIGHTKey).setOrigin(0.5, 0.5);
        this.player.setScale(2.0);

        this.bullet = new Bullet(this, this.player.x, this.player.y, 'bullet', 0).setOrigin(0.5, 0.5);
        this.bullet.visible = false;

        this.cloudCreature = new Enemy_Cloud(this, Phaser.Math.Between(0, 700), 0, 'cloud', 0);
        this.cloudCreature.setScale(2.0);

        this.rogueAircraft1 = new Enemy_Rogue(this, Phaser.Math.Between(0, 700), 0, 'rogue_aircraft1', 0, 1);
        this.rogueAircraft1.setScale(2.0);
        this.rogueAircraft1.flipY = true;

        this.rogueAircraft2 = new Enemy_Rogue(this, Phaser.Math.Between(0, 700), 0, 'rogue_aircraft2', 0, 1.5);
        this.rogueAircraft2.setScale(2.0);
        this.rogueAircraft2.flipY = true;

        this.rogueAircraft3 = new Enemy_Rogue(this, Phaser.Math.Between(0, 700), 0, 'rogue_aircraft3', 0, 2.0);
        this.rogueAircraft3.setScale(2.0);
        this.rogueAircraft3.flipY = true;

        // Create the visual effects
        this.anims.create({
            key: 'explosion',
            frames: [
                { key: 'explosion1' },
                { key: 'explosion2' }
            ],
            frameRate: 20,
            repeat: 0
        });

        // Create the sound effects
        this.shootSFX = this.sound.add('laser');
        this.explosionSFX = this.sound.add('explosionSFX');

        // HP and score tracking
        this.lives = 3;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });
        this.livesText = this.add.text(16, 48, 'Lives: 3', { fontSize: '32px', fill: '#FFFFFF' });   
    }

    update() {
        let my = this.my; // create an alias to this.my for readability
        
        // background scrolling logic
        this.background.tilePositionY -= 2;
        
        if (LEFTKey.isDown) {
            this.background.tilePositionX += 1;
        }
        if (RIGHTKey.isDown) {
            this.background.tilePositionX -= 1;
        }

        // Update score and lives display
        this.scoreText.setText('Score: ' + score);
        this.livesText.setText('Lives: ' + this.lives);

        // Update sprites
        this.player.update();
        this.cloudCreature.update();
        this.rogueAircraft1.update();
        this.rogueAircraft2.update();
        this.rogueAircraft3.update();

        // bullet position Update logic
        if (this.isShooting == true) {
            this.bullet.update();
        } else {
            this.bullet.x = this.player.x;
        }

        if (this.bullet.y < 0) {
            this.bullet.x = this.player.x;
            this.bullet.y = this.player.y;
            // this.bullet.visible = false;
            this.isShooting = false;
        }
        
        if (SPACEKey.isDown && this.isShooting == false) { // Shooting logic
            this.bullet.visible = true;
            this.isShooting = true;
            this.shootSFX.play();
        }
        
        // Collision detection and actions
        
        // Player and Enemy collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.cloudCreature.getBounds())) {
            this.loseLife();
            let boom = this.add.sprite(this.player.x, this.player.y, 'explosion1').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            this.cloudCreature.y = 0;
            this.cloudCreature.x = Phaser.Math.Between(0, 700);
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.rogueAircraft1.getBounds())) {
            this.loseLife();
            let boom = this.add.sprite(this.player.x, this.player.y, 'explosion1').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            this.rogueAircraft1.y = 0;
            this.rogueAircraft1.x = Phaser.Math.Between(0, 700);
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.rogueAircraft2.getBounds())) {
            this.loseLife();
            let boom = this.add.sprite(this.player.x, this.player.y, 'explosion1').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            this.rogueAircraft2.y = 0;
            this.rogueAircraft2.x = Phaser.Math.Between(0, 700);
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.rogueAircraft3.getBounds())) {
            this.loseLife();
            let boom = this.add.sprite(this.player.x, this.player.y, 'explosion1').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            this.rogueAircraft3.y = 0;
            this.rogueAircraft3.x = Phaser.Math.Between(0, 700);
        }

        // Bullet and Enemy collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.bullet.getBounds(), this.cloudCreature.getBounds())) {
            this.addScore(100);
            let boom = this.add.sprite(this.cloudCreature.x, this.cloudCreature.y, 'explosion1').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            this.cloudCreature.y = 0;
            this.cloudCreature.x = Phaser.Math.Between(0, 700);
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.bullet.getBounds(), this.rogueAircraft1.getBounds())) {
            this.addScore(200);
            let boom = this.add.sprite(this.rogueAircraft1.x, this.rogueAircraft1.y, 'explosion1').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            this.rogueAircraft1.y = 0;
            this.rogueAircraft1.x = Phaser.Math.Between(0, 700);
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.bullet.getBounds(), this.rogueAircraft2.getBounds())) {
            this.addScore(300);
            let boom = this.add.sprite(this.rogueAircraft2.x, this.rogueAircraft2.y, 'explosion1').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            this.rogueAircraft2.y = 0;
            this.rogueAircraft2.x = Phaser.Math.Between(0, 700);
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.bullet.getBounds(), this.rogueAircraft3.getBounds())) {
            this.addScore(400);
            let boom = this.add.sprite(this.rogueAircraft3.x, this.rogueAircraft3.y, 'explosion1').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            this.rogueAircraft3.y = 0;
            this.rogueAircraft3.x = Phaser.Math.Between(0, 700);
        }
    }

    // Call this method when the player loses a life
    loseLife() {
        this.lives -= 1;
        if (this.lives <= 0) {
            this.scene.start('GGScene');
        }
    }

    // Call this method when an enemy is destroyed
    addScore(points) {
        score += points;
    }
}