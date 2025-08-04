import { createWorld2 } from './world2.js'
import { checkControls } from './controls.js'
import { behaviorEnemies } from './behaviorEnemies.js'

export default class Nivel1 extends Phaser.Scene {
    constructor() {
        super({ key: "nivel1" });
    }

    preload() {

    }

    create() {
        //createAnimations(this)
        createWorld2(this)
        console.log("nivel 1")


        // Crear grupo de enemigos
        this.enemies = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            createCallback: (enemy) => {
                enemy.setOrigin(1, 1)
                enemy.setCollideWorldBounds(true)
                enemy.setData('life', 3)
                enemy.play('enemy-idle')
                enemy.setCircle(32, 64, 64)
                enemy.setData('isAttacking', false)
                enemy.flipX = true

                // Agregar hitbox de espada al enemigo
                const swordHitbox = this.add.circle(enemy.x - 64 * 2, enemy.y - 64, 50)
                this.physics.add.existing(swordHitbox)
                swordHitbox.body.setCircle(64)
                swordHitbox.enemy = enemy  // Asociar hitbox con el enemigo
                enemy.swordHitbox = swordHitbox
            }

        });

        // Crear varios enemigos
        this.enemies.create(128 * 9, 128 * 4, 'enemy')
        this.enemies.create(128 * 9, 128 * 3, 'enemy')


        this.knight = this.physics.add.sprite(64 * 5, 128 * 4, 'knight')
            .setOrigin(1, 1)
            .setCollideWorldBounds(true)
            .setCircle(32, 64, 64)
            .setData('life', 10)
            .setData('isAttacking', false)


        // Definir el área de la espada (zona de colisión)
        this.swordHitbox = this.add.circle(this.knight.x - 64 * 2, this.knight.y - 64, 50)
        this.physics.add.existing(this.swordHitbox)
        this.swordHitbox.body.setCircle(64)


        this.physics.world.setBounds(0, 0, 1280, this.game.config.height)
        this.cameras.main.setBounds(-500, 0, 200000, this.game.config.height)
        this.cameras.main.startFollow(this.knight)


        this.physics.add.collider(this.knight, this.obstacles)
        this.physics.add.collider(this.enemies, this.obstacles)
        this.physics.add.collider(this.knight, this.enemies)
        this.physics.add.collider(this.enemies, this.enemies)

        this.physics.add.overlap(this.swordHitbox, this.enemies, this.onSwordHitEnemy, null, this)
        this.physics.add.overlap(this.enemies.getChildren().map(e => e.swordHitbox), this.knight, this.onEnemySwordHitKnight, null, this)

        this.keys = this.input.keyboard.addKeys('A,D,W,S,E,left,right,up,down,shift')


        this.add.text(50, 10, 'Nivel 1', { fontSize: '22px', fill: '#ecf0f1' }).setOrigin(0, 0)

        this.attackCooldown = false;

        this.lifeText = this.add.text(50, 30, 'Vida: ' + this.knight.getData("life"), { fontSize: '22px', fill: '#ecf0f1' })
            .setOrigin(0, 0)
            .setScrollFactor(0)



        const btnSize = 24;
        const marginBottom = 50;
        const arrowFontSize = 32;
        const arrowOffsetX = btnSize * 2.9  ; // separación horizontal
        const arrowOffsetY = btnSize * 2.9; // separación vertical
        const leftShift = 60;
        const centerX = this.cameras.main.width / 2 - leftShift;
        const baseY = this.cameras.main.height - marginBottom;
        // Arriba
        const btnUp = this.add.image(centerX, baseY - arrowOffsetY, 'button_sq').setInteractive({ pixelPerfect: true }).setScrollFactor(0).setScale(0.35);
        this.add.text(centerX, baseY - arrowOffsetY, '↑', { fontSize: `${arrowFontSize}px`, fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);
        // Izquierda
        const btnLeft = this.add.image(centerX - arrowOffsetX, baseY, 'button_sq').setInteractive({ pixelPerfect: true }).setScrollFactor(0).setScale(0.35);
        this.add.text(centerX - arrowOffsetX, baseY, '←', { fontSize: `${arrowFontSize}px`, fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);
        // Derecha
        const btnRight = this.add.image(centerX + arrowOffsetX, baseY, 'button_sq').setInteractive({ pixelPerfect: true }).setScrollFactor(0).setScale(0.35);
        this.add.text(centerX + arrowOffsetX, baseY, '→', { fontSize: `${arrowFontSize}px`, fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);
        // Abajo (base de la pirámide, entre los laterales)
        const btnDown = this.add.image(centerX, baseY , 'button_sq').setInteractive({ pixelPerfect: true }).setScrollFactor(0).setScale(0.35);
        this.add.text(centerX, baseY , '↓', { fontSize: `${arrowFontSize}px`, fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);

        // Botón de ataque
        const btnAttack = this.add.image(centerX + arrowOffsetX * 2.5, baseY, 'button_sq').setInteractive({ pixelPerfect: true }).setScrollFactor(0).setScale(0.35);
        this.add.text(centerX + arrowOffsetX * 2.5, baseY, '⚔', { fontSize: `${arrowFontSize+4}px`, fill: '#fff' }).setOrigin(0.5).setScrollFactor(0);

        // Simular pulsaciones de teclas y cambio de aspecto
        btnUp.on('pointerdown', () => {
            this.keys.up.isDown = true;
            btnUp.setTexture('button_pressed_sq');
        });
        btnUp.on('pointerup', () => {
            this.keys.up.isDown = false;
            btnUp.setTexture('button_sq');
        });
        btnDown.on('pointerdown', () => {
            this.keys.down.isDown = true;
            btnDown.setTexture('button_pressed_sq');
        });
        btnDown.on('pointerup', () => {
            this.keys.down.isDown = false;
            btnDown.setTexture('button_sq');
        });
        btnLeft.on('pointerdown', () => {
            this.keys.left.isDown = true;
            btnLeft.setTexture('button_pressed_sq');
        });
        btnLeft.on('pointerup', () => {
            this.keys.left.isDown = false;
            btnLeft.setTexture('button_sq');
        });
        btnRight.on('pointerdown', () => {
            this.keys.right.isDown = true;
            btnRight.setTexture('button_pressed_sq');
        });
        btnRight.on('pointerup', () => {
            this.keys.right.isDown = false;
            btnRight.setTexture('button_sq');
        });

        btnAttack.on('pointerdown', () => {
            this.keys.E.isDown = true;
            btnAttack.setTexture('button_pressed_sq');
        });
        btnAttack.on('pointerup', () => {
            this.keys.E.isDown = false;
            btnAttack.setTexture('button_sq');
        });
    }

    onSwordHitEnemy(swordHitbox, enemy) {
        if (this.knight.getData('isAttacking') && !this.attackCooldown && this.knight.getData('life') > 0) {
            enemy.setTint(0xff0000);
            enemy.setData('life', enemy.getData('life') - 1);
            this.attackCooldown = true;

            console.log(`Enemigo vida: ${enemy.getData('life')}`);

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
                            this.scene.start('end');
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
            }, 200);

            this.time.delayedCall(500, () => {
                enemy.setData('cooldown', false);
            });

        }
    }



    update() {

        checkControls(this)
        behaviorEnemies(this)

        // Actualizar la posición de la hitbox de la espada según la posición del caballero
        this.swordHitbox.x = this.knight.x - 32 * 4 - 12 + (this.knight.flipX ? -0 : 64);  // Ajustar según la dirección
        this.swordHitbox.y = this.knight.y - 32 * 3 - 12;

    }
}