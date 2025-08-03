const KNIGHT_ANIMATIONS = {
  idle: 'knight-idle',
  walk: 'knight-walk',
  attack: 'knight-attack'
}
export function checkControls({ knight, keys, time }) {

  const isLeftKeyDown = keys.left.isDown
  const isRightKeyDown = keys.right.isDown
  const isUpKeyDown = keys.up.isDown
  const isDownKeyDown = keys.down.isDown

  const isAKeyDown = keys.A.isDown
  const isDKeyDown = keys.D.isDown
  const isWKeyDown = keys.W.isDown
  const isSKeyDown = keys.S.isDown
  const isEKeyDown = keys.E.isDown

  const isShiftKeyDown = keys.shift.isDown

  let velocity = 100

  if (isShiftKeyDown) {
    velocity = 180
  }

  knight.setVelocityX(0)
  knight.setVelocityY(0)
  
  if (isLeftKeyDown || isAKeyDown) {
    knight.setVelocityX(-velocity)
    knight.flipX = true
  } 
  if (isRightKeyDown || isDKeyDown) {
    knight.setVelocityX(velocity)
    knight.flipX = false
  } 
  if (isUpKeyDown || isWKeyDown) {
    knight.setVelocityY(-velocity)
  } 
  if (isDownKeyDown || isSKeyDown) {
    knight.setVelocityY(velocity)
  } 
  
  if(knight.body.velocity.x !== 0 || knight.body.velocity.y !== 0) {
    knight.anims.play(KNIGHT_ANIMATIONS.walk, true)
  }
  else {
    if (isEKeyDown && knight.getData('life') > 0) {
      knight.anims.play(KNIGHT_ANIMATIONS.attack, true)
  
      time.delayedCall(500, () => {
        knight.setData('isAttacking', true);
      });
  
  
    } else {
      knight.anims.play(KNIGHT_ANIMATIONS.idle, true)
      knight.setData('isAttacking', false);
  
    }
  }



}
