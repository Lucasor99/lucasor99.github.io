export const createAnimations = (game) => {
  game.anims.create({
    key: 'foam-move',
    frames: game.anims.generateFrameNumbers(
      'foam',
      { start: 0, end: 7 }
    ),
    frameRate: 10,
    repeat: -1
  }),
  
  game.anims.create({
    key: 'knight-idle',
    frames: game.anims.generateFrameNumbers(
      'knight',
      { start: 0, end: 5 }
    ),
    frameRate: 10,
    repeat: -1
  }),

  game.anims.create({
    key: 'knight-walk',
    frames: game.anims.generateFrameNumbers(
      'knight',
      { start: 6, end: 11 }
    ),
    frameRate: 10,
    repeat: -1
  }),

  game.anims.create({
    key: 'knight-attack',
    frames: game.anims.generateFrameNumbers(
      'knight',
      { start: 12, end: 23 }
    ),
    frameRate: 10,
    repeat: -1
  }),

  game.anims.create({ 
    key: 'archer-idle',
    frames: game.anims.generateFrameNumbers(
      'archer',
      { start: 0, end: 5 }
    ),
    frameRate: 10,
    repeat: -1
  }),

  game.anims.create({ 
    key: 'archer-walk',
    frames: game.anims.generateFrameNumbers(
      'archer',
      { start: 8, end: 13 }
    ),
    frameRate: 10,
    repeat: -1
  }),

  game.anims.create({ 
    key: 'archer-attack',
    frames: game.anims.generateFrameNumbers(
      'archer',
      { start: 32, end: 39 }
    ),
    frameRate: 10,
    repeat: -1
  }),

  game.anims.create({ 
    key: 'dead',
    frames: game.anims.generateFrameNumbers(
      'dead',
      { start: 0, end: 6 }
    ),
    frameRate: 10,
    repeat: 0 
  }),

  game.anims.create({ 
    key: 'dead-disappear',
    frames: game.anims.generateFrameNumbers(
      'dead',
      { start: 7, end: 13 }
    ),
    frameRate: 10,
    repeat: 0 
  }),

  game.anims.create({
    key: 'enemy-idle',
    frames: game.anims.generateFrameNumbers(
      'enemy',
      { start: 0, end: 6 }
    ),
    frameRate: 10,
    repeat: -1
  }),

  game.anims.create({
    key: 'enemy-walk',
    frames: game.anims.generateFrameNumbers(
      'enemy',
      { start: 7, end: 12 }
    ),
    frameRate: 10,
    repeat: -1
  }),

  game.anims.create({
    key: 'enemy-attack',
    frames: game.anims.generateFrameNumbers(
      'enemy',
      { start: 14, end: 19 }
    ),
    frameRate: 10,
    repeat: -1  
  }),

  game.anims.create({
    key: 'wood-tower',
    frames: game.anims.generateFrameNumbers(
      'wood_tower',
      { start: 0, end: 3 }
    ),
    frameRate: 10,
    repeat: -1
  })
}
