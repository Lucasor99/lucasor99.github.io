export const behaviorEnemies = (game) => {
    game.enemies.getChildren().forEach((enemy) => {
        if (enemy.getData('life') > 0) {
            // Calcular distancia entre el jugador y el enemigo
            let distance = Phaser.Math.Distance.Between(
                game.knight.x, game.knight.y,
                enemy.x, enemy.y
            );

            // Si está cerca pero no lo suficiente para atacar, el enemigo sigue al jugador
            if (distance < 300 && distance > 100) {
                game.physics.moveToObject(enemy, game.knight, 100);
                enemy.play('enemy-walk', true);
                enemy.setData('isAttacking', false)

                if (game.knight.x < enemy.x) {
                    enemy.flipX = true;  // Se mueve hacia la izquierda
                } else {
                    enemy.flipX = false;  // Se mueve hacia la derecha
                }
            }
            // Si el enemigo está muy cerca, ataca
            else if (distance <= 100 && game.knight.getData('life') > 0) {
                enemy.setVelocity(0)
                enemy.play('enemy-attack', true) 
                setTimeout(() => {
                    enemy.setData('isAttacking', true)
                }, 400)
            } else {
                enemy.setVelocity(0)
                enemy.play('enemy-idle', true)
                enemy.setData('isAttacking', false)
            }
        }

        // Actualizar la posición de las hitboxes de las espadas de los enemigos
        if (enemy.swordHitbox) {
            enemy.swordHitbox.x = enemy.x - 64 - 64 - 12 + (enemy.flipX ? -0 : 64);
            enemy.swordHitbox.y = enemy.y - 64 - 32 - 12;
        }

    });
}