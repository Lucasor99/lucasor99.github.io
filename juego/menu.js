import { initSpritesheet } from './spritesheet.js'
import { createAnimations } from './animations.js'

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "menu", active: true });
    }

    preload() {
        this.load.atlas('flats', 'assets/Terrain/Ground/Tilemap_Flat.png', 'assets/Terrain/Ground/Tilemap_Flat.json')
        this.load.image('Ribbon_Blue_3Slides', 'assets/UI/Ribbons/Ribbon_Blue_3Slides.png')
        this.load.image('button', 'assets/UI/Buttons/Button_Blue_3Slides.png')
        this.load.image('button_pressed', 'assets/UI/Buttons/Button_Blue_3Slides_Pressed.png')

        initSpritesheet(this)
    }

    create() {
        this.input.setDefaultCursor('url(assets/UI/Pointers/01.png), pointer')
        createAnimations(this)

        this.add.image(64 * 5+32, 64 * 2-12, 'Ribbon_Blue_3Slides').setOrigin(0, 0).setScale(3)

        this.add.text(64 * 9, 64 * 2, 'Menu', { fontSize: '50px', fontFamily: 'Bradley Hand ITC', fill: '#ecf0f1' }).setOrigin(0, 0)

        this.add.text(64 * 8- 16, 64 * 3, 'Press any key to start', { fontSize: '32px', fontFamily: 'Bradley Hand ITC', fill: '#ecf0f1' }).setOrigin(0, 0)

        this.add.sprite(64 * 7, 64 * 5, 'foam').setOrigin(0, 0).play('foam-move').setScale(2)
        this.add.image(64 * 9, 64 * 7, 'flats', 'grass_isle').setOrigin(0, 0).setScale(2)

        this.add.sprite(64 * 7, 64 * 4, 'knight').setOrigin(0, 0).play('knight-idle').setScale(2)


        let button = this.add.image(64 * 10 - 4, 64 * 10, 'button').setInteractive()
        this.add.text(64 * 9 + 32, 64 * 10 -26, 'Play', { fontSize: '28px', fontFamily: 'Bradley Hand ITC', fill: '#f0f0f0f' }).setOrigin(0, 0)


        // Escuchar eventos de clic
        button.on('pointerdown', () => {
            button.destroy()
            this.add.image(64 * 10 - 4,  64 * 10, 'button_pressed')
            this.add.text(64 * 9 + 32, 64 * 10-26, 'Play', { fontSize: '32px', fontFamily: 'Bradley Hand ITC', fill: '#f0f0f0f' }).setOrigin(0, 0)

            this.cameras.main.fadeOut(1000);  // Fundido de entrada

            this.time.delayedCall(1000, () => {
                this.scene.start('nivel0'); 
            });
        });


        this.input.keyboard.on('keydown', (event) => {
           //if (event.key === 'Enter') {
                this.cameras.main.fadeOut(1000);  // Fundido de entrada

                this.time.delayedCall(1000, () => {
                    this.scene.start('nivel0'); 
                });
            //}
        })
    }

    update() {

    }
}