import { initSpritesheet } from './spritesheet.js'
import { createAnimations } from './animations.js'
import { createWorld } from './world.js'
import { checkControls } from './controls.js'
import { behaviorEnemies } from './behaviorEnemies.js'
import { behaviorArcher } from './behaviorArcher.js'

export default class Nivel0 extends Phaser.Scene {
    constructor() {
        super({ key: "nivel0" });
    }

    preload() {

        this.load.image('water', 'assets/Terrain/Water/water.png')
        // this.load.atlas('flats', 'assets/Terrain/Ground/Tilemap_Flat.png', 'assets/Terrain/Ground/Tilemap_Flat.json')
        this.load.image('flats', 'assets/Terrain/Ground/Tilemap_Flat.png')
        this.load.image('elevation', 'assets/Terrain/Ground/Tilemap_Elevation.png')
        this.load.tilemapTiledJSON('map', 'World0.json')

        this.load.image('tower', 'assets/Factions/Knights/Buildings/Tower/Tower_Blue.png')
        this.load.image('house', 'assets/Factions/Knights/Buildings/House/House_Blue.png')

        this.load.image('shadow', 'assets/Terrain/Ground/shadows.png')

        this.load.image('mushroom_small', 'assets/Deco/01.png')
        this.load.image('mushroom_medium', 'assets/Deco/02.png')
        this.load.image('mushroom_large', 'assets/Deco/03.png')

        this.load.image('stone_small', 'assets/Deco/04.png')
        this.load.image('stone_medium', 'assets/Deco/05.png')
        this.load.image('stone_large', 'assets/Deco/06.png')

        this.load.image('sign', 'assets/Deco/17.png')

        initSpritesheet(this)
    }

    create() {
        createWorld(this)

        // const blockSize = 64
        // // Poner espuma solo en los bordes
        // for (let i = 0; i < 9; i++) {
        //     for (let j = 0; j < 18; j++) {
        //         // Si estamos en un borde, agregamos el sprite
        //         if (i === 0 || i === 9 - 1 || j === 0 || j === 18 - 1) {
        //             this.add.sprite(j * blockSize, i * blockSize, 'foam').setOrigin(0, 0).play('foam-move')
        //         }
        //     }
        // }
        // this.map = this.make.tilemap({ key: 'map' })
        // this.FlatTileset = this.map.addTilesetImage('Flat', 'flats')
        // this.ElevationTileset = this.map.addTilesetImage('Elevation', 'elevation')
        // this.deco = this.map.addImageColle

        // //this.layer = this.map.createLayer('Foam', this.tileset)
        // this.Flat = this.map.createLayer('Flat', this.FlatTileset)
        // this.Elevation = this.map.createLayer('Elevation', this.ElevationTileset)
        // this.Flat2 = this.map.createLayer('Flat2', this.FlatTileset)
        // const decoLayer = this.map.createLayer('Deco');

        // decoLayer.forEachTile(tile => {
        //     if (tile.index === 74) {
        //         this.add.image(tile.pixelX, tile.pixelY, 'mushroom_small').setOrigin(0, 0);
        //     } else if (tile.index === 75) {
        //         this.add.image(tile.pixelX, tile.pixelY, 'mushroom_medium').setOrigin(0, 0);
        //     } else if (tile.index === 76) {
        //         this.add.image(tile.pixelX, tile.pixelY, 'mushroom_large').setOrigin(0, 0);
        //     } else if (tile.index === 77) {
        //         this.add.image(tile.pixelX, tile.pixelY, 'stone_small').setOrigin(0, 0);
        //     } else if (tile.index === 78) { 
        //         this.add.image(tile.pixelX, tile.pixelY, 'stone_medium').setOrigin(0, 0);
        //     } else if (tile.index === 79) {
        //         this.add.image(tile.pixelX, tile.pixelY, 'stone_large').setOrigin(0, 0);
        //     }
        // });


        // // Hacer que el personaje colisione con los objetos de la capa Deco
        // this.physics.add.collider(this.knight, 'Deco');


        //this.layer.setCollisionByProperty({ collides: true })

        console.log("nivel 0")

        // Crear grupo de enemigos
        this.enemies = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            createCallback: (enemy) => {
                enemy.setOrigin(1, 1)
                enemy.setCollideWorldBounds(true)
                enemy.setData('life', 3)
                enemy.setData('isAttacking', false)
                enemy.setData('cooldown', false)
                enemy.play('enemy-idle')
                enemy.setCircle(32, 64, 64)
                enemy.flipX = true

                // Agregar hitbox de espada al enemigo
                const swordHitbox = this.add.circle(enemy.x - 64 * 2, enemy.y - 64, 50)
                this.physics.add.existing(swordHitbox)
                swordHitbox.body.setCircle(64)
                swordHitbox.enemy = enemy  // Asociar hitbox con el enemigo
                enemy.swordHitbox = swordHitbox

            }

        });

        // Crear enemigos
        this.enemies.create(128 * 9, 128 * 4, 'enemy')


        this.knight = this.physics.add.sprite(64 * 5, 128 * 4, 'knight')
            .setOrigin(1, 1)
            .setCollideWorldBounds(true)
            .setCircle(32, 64, 64)
            .setData('life', 40)
            .setData('isAttacking', false)
        
        this.archer = this.physics.add.sprite(64 * 4+32, 64 * 2+36, 'archer')
            .setOrigin(1, 1)
            .setCollideWorldBounds(true)
            .setCircle(32, 64, 64)
            .setData('life', 10)
            .setData('isAttacking', false)

        // Agregar hitbox de arco
        this.bowHitbox = this.add.circle(this.archer.x- 64*8, this.archer.y-64*8)
        this.physics.add.existing(this.bowHitbox)
        this.bowHitbox.body.setCircle(64*8)


        // Definir el área de la espada (zona de colisión)
        this.swordHitbox = this.add.circle(this.knight.x - 64 * 2, this.knight.y - 64, 50);
        this.physics.add.existing(this.swordHitbox);
        this.swordHitbox.body.setCircle(64);

        this.physics.world.setBounds(0, 0, 1280, this.game.config.height)
        this.cameras.main.setBounds(-500, 0, 200000, this.game.config.height)
        this.cameras.main.startFollow(this.knight)


        this.physics.add.collider(this.knight, this.obstacles)
        this.physics.add.collider(this.enemies, this.obstacles)
        this.physics.add.collider(this.knight, this.enemies)
        this.physics.add.collider(this.archer, this.enemies)
        this.physics.add.collider(this.enemies, this.enemies)


        this.physics.add.overlap(this.swordHitbox, this.enemies, this.onSwordHitEnemy, null, this)
        this.physics.add.overlap(this.bowHitbox, this.enemies, this.onBowHitEnemy, null, this)
        this.physics.add.overlap(this.enemies.getChildren().map(e => e.swordHitbox), this.knight, this.onEnemySwordHitKnight, null, this)

        this.keys = this.input.keyboard.addKeys('A,D,W,S,E,left,right,up,down,shift')

        this.add.text(50, 10, 'Nivel 0', { fontSize: '22px', fill: '#ecf0f1' }).setOrigin(0, 0)

        this.attackCooldown = false

        this.lifeText = this.add.text(50, 30, 'Vida: ' + this.knight.getData("life"), { fontSize: '22px', fill: '#ecf0f1' })
            .setOrigin(0, 0)
            .setScrollFactor(0)

    }

    onSwordHitEnemy(swordHitbox, enemy) {
        if (this.knight.getData('isAttacking') && !this.attackCooldown && this.knight.getData('life') > 0) {
            enemy.setTint(0xff0000);
            enemy.setData('life', enemy.getData('life') - 1)
            this.attackCooldown = true;

            console.log(`Enemigo vida: ${enemy.getData('life')}`)

            setTimeout(() => {
                enemy.clearTint();
            }, 200);

            setTimeout(() => {
                this.attackCooldown = false;
            }, 500);

            if (enemy.getData('life') <= 0) {
                enemy.setVelocityX(0).setOrigin(1, 1.3);
                enemy.swordHitbox.destroy()
                enemy.anims.play('dead', true);
                enemy.setCircle(15, 44, 64)

                setTimeout(() => {
                    enemy.anims.play('dead-disappear', true)
                }, 2000)

                setTimeout(() => {
                    enemy.destroy();
                }, 2600);

                setTimeout(() => {
                    if (this.enemies.getChildren().length === 0) {
                        this.cameras.main.fadeOut(1000);
                        this.time.delayedCall(1000, () => {
                            this.scene.start('nivel1');
                        });
                    }
                }, 3500)
            }
        }
    }

    onBowHitEnemy(bowHitbox, enemy) {
        if (this.archer.getData('isAttacking') && !this.attackCooldown && this.archer.getData('life') > 0) {
            const angle = Math.atan2(enemy.y - this.archer.y, enemy.x - this.archer.x);
            this.arrow = this.physics.add.sprite( this.archer.x - 64, this.archer.y - 64-32, 'arrow').setOrigin(0, 0).setRotation(angle)
            this.physics.add.collider(this.arrow, enemy)
            this.physics.moveToObject(this.arrow, enemy, 500)
            enemy.setTint(0xff0000);
            enemy.setData('life', enemy.getData('life') - 0.5)

            this.attackCooldown = true;

            console.log(`Enemigo vida: ${enemy.getData('life')}`)

            setTimeout(() => {
                enemy.clearTint();
            }, 200);

            setTimeout(() => {
                this.attackCooldown = false;
            }, 600);

            if (enemy.getData('life') <= 0) {
                enemy.setVelocityX(0).setOrigin(1, 1.3);
                enemy.swordHitbox.destroy()
                enemy.anims.play('dead', true);
                enemy.setCircle(15, 44, 64)

                setTimeout(() => {
                    enemy.anims.play('dead-disappear', true)
                }, 2000)

                setTimeout(() => {
                    enemy.destroy();
                }, 2600);

                setTimeout(() => {
                    if (this.enemies.getChildren().length === 0) {
                        this.cameras.main.fadeOut(1000);
                        this.time.delayedCall(1000, () => {
                            this.scene.start('nivel1');
                        });
                    }
                }, 3500)
            }
        }
    }

    onEnemySwordHitKnight(swordHitbox, knight) {
        const enemy = swordHitbox.enemy;
        if (knight.getData('life') <= 0) {
            swordHitbox.destroy()
            knight.setMaxVelocity(0);
            this.add.text(64 * 8, 64 * 4, 'Game Over', { fontSize: '50px', fill: '#ecf0f1' }).setOrigin(0, 0).setScrollFactor(0)

            setTimeout(() => {
                this.cameras.main.fadeOut(1000);
                this.time.delayedCall(1000, () => {
                    this.scene.start('end');
                });
            }, 3500)

        } else if (enemy && enemy.getData('isAttacking') && !enemy.getData('cooldown')) {

            knight.setData('life', knight.getData('life') - 1);
            this.lifeText.setText('Vida: ' + knight.getData('life'));

            console.log(`Caballero vida: ${knight.getData('life')}`);

            knight.setTint(0xff0000);
            enemy.setData('cooldown', true);

            setTimeout(() => {
                knight.clearTint();
            }, 100);

            this.time.delayedCall(500, () => {
                enemy.setData('cooldown', false);
            });

        }
    }


    update() { // 3. continuamente
        // const { knight } = this

        checkControls(this)
        behaviorEnemies(this)
        behaviorArcher(this)

        // Actualizar la posición de la hitbox de la espada según la posición del caballero
        this.swordHitbox.x = this.knight.x - 32 * 4 - 12 + (this.knight.flipX ? -0 : 64);  // Ajustar según la dirección
        this.swordHitbox.y = this.knight.y - 32 * 3 - 12;

        if (this.arrow) {
            if (!this.arrow.body.touching.none) {
                this.arrow.destroy()
                this.arrow = null
                return
            }
        }

    }
}