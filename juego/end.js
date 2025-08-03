import { initSpritesheet } from './spritesheet.js'

export default class End extends Phaser.Scene {
    constructor() {
        super({ key: "end"});
    }

    preload() {
        this.load.atlas('flats', 'assets/Terrain/Ground/Tilemap_Flat.png', 'assets/Terrain/Ground/Tilemap_Flat.json')

    }

    create() {

        this.add.image(64*7 -12+20, 64*2 - 20, 'Ribbon_Blue_3Slides').setOrigin(0, 0).setScale(2)
        this.add.text(64*9 +20, 64*2, 'End', { fontSize: '50px', fontFamily: 'Bradley Hand ITC', fill: '#ecf0f1' }).setOrigin(0, 0)


        this.add.sprite(64*7, 64*5, 'foam').setOrigin(0, 0).play('foam-move').setScale(2)
        this.add.image(64*9, 64*7, 'flats', 'grass_isle').setOrigin(0, 0).setScale(2)

        this.add.sprite(64*7, 64*4, 'knight').setOrigin(0, 0).play('knight-idle').setScale(2)


        this.input.keyboard.on('keydown', (event) => {
            //if (event.key === 'Enter') {
                 this.cameras.main.fadeOut(1000);  // Fundido de entrada
 
                 this.time.delayedCall(1000, () => {
                     this.scene.start('menu'); 
                 });
             //}
         })
    }

    update() {

    }
}