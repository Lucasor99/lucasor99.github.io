export const behaviorArcher = (game) => {
    game.enemies.getChildren().forEach((enemy) => {
        if (game.archer.getData('life') > 0) {
            let distance = Phaser.Math.Distance.Between(
                game.archer.x, game.archer.y,
                enemy.x, enemy.y
            );

            if (distance < 500 && enemy.getData('life') > 0) {
                game.archer.play('archer-attack', true);
                setTimeout(() => {
                game.archer.setData('isAttacking', true)
                }, 600);

                if (game.archer.x < enemy.x) {
                    game.archer.flipX = false;  // Se mueve hacia la izquierda
                } else {
                    game.archer.flipX = true;  // Se mueve hacia la derecha
                }
            } else {
                game.archer.setVelocity(0)
                game.archer.play('archer-idle', true);
                game.archer.setData('isAttacking', false)
            }
        }


    });
}