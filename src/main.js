// Guangyang Chen
// Created: 05/06/2024
// Phaser: 3.70.0
//
// Sky Patrol
//
// An aerial combat gallery shooter game.
// Players control a heroic pilot tasked with defending sky from
// an invasion of mischievous cloud creatures and rogue airships.
// 
// 

// game config
let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    // input: {
        // mouse: true
    // },
    width: 800,
    height: 600,
    scene: [Title, Play, Credits, GG],
}

const game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let UPKey, DOWNKey, LEFTKey, RIGHTKey, SPACEKey; // Create Global Key Variables
let score = 0; // initialize score as a global variable