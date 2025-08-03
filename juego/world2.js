export const createWorld2 = (game) => {
  const blockSize = 64

  // Poner espuma solo en los bordes
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 8; j++) {
      // Si estamos en un borde, agregamos el sprite
      if (i === 0 || i === 9 - 1 || j === 0 || j === 8 - 1) {
        game.add.sprite(j * blockSize, i * blockSize, 'foam').setOrigin(0, 0).play('foam-move')
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 10; j < 18; j++) {
      // Si estamos en un borde, agregamos el sprite
      if (i === 0 || i === 9 - 1 || j === 10 || j === 18 - 1) {
        game.add.sprite(j * blockSize, i * blockSize, 'foam').setOrigin(0, 0).play('foam-move')
      }
    }
  }

  for (let i = 3; i < 6; i++) {
    for (let j = 6; j < 10; j++) {
      game.add.sprite(j * blockSize, i * blockSize, 'foam').setOrigin(0, 0).play('foam-move')

    }
  }

  // ┍-----------┑
  game.add.image(64, 64, 'flats', 'grass_upper_left').setOrigin(0, 0)
  for (let j = 0; j < 6; j++) {
    game.add.image(j * blockSize + (blockSize * 2), blockSize, 'flats', 'grass_upper_center').setOrigin(0, 0)
  }
  game.add.image(64 * 8, 64, 'flats', 'grass_upper_right').setOrigin(0, 0)

  // │ ######### │
  for (let i = 0; i < 7; i++) {
    game.add.image(blockSize, (i * blockSize) + blockSize * 2, 'flats', 'grass_middle_left').setOrigin(0, 0)
  }
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      game.add.image(j * blockSize + (blockSize * 2), (i * blockSize) + blockSize * 2, 'flats', 'grass_middle_center').setOrigin(0, 0)
    }
  }
  for (let i = 0; i < 2; i++) {
    game.add.image(blockSize * 8, (i * blockSize) + blockSize * 2, 'flats', 'grass_middle_right').setOrigin(0, 0)
  }

  for (let i = 5; i < 7; i++) {
    game.add.image(blockSize * 8, (i * blockSize) + blockSize * 2, 'flats', 'grass_middle_right').setOrigin(0, 0)
  }

  // ┕-----------┛
  game.add.image(64, 64 * 9, 'flats', 'grass_lower_left').setOrigin(0, 0)
  for (let j = 0; j < 6; j++) {
    game.add.image(j * blockSize + (blockSize * 2), blockSize * 9, 'flats', 'grass_lower_center').setOrigin(0, 0)
  }
  game.add.image(64 * 8, 64 * 9, 'flats', 'grass_lower_right').setOrigin(0, 0)



  // ┍-----------┑
  game.add.image(64 * 11, 64, 'flats', 'grass_upper_left').setOrigin(0, 0)
  for (let j = 10; j < 16; j++) {
    game.add.image(j * blockSize + (blockSize * 2), blockSize, 'flats', 'grass_upper_center').setOrigin(0, 0)
  }
  game.add.image(64 * 18, 64, 'flats', 'grass_upper_right').setOrigin(0, 0)

  // │ ######### │
  for (let i = 0; i < 2; i++) {
    game.add.image(blockSize * 11, (i * blockSize) + blockSize * 2, 'flats', 'grass_middle_left').setOrigin(0, 0)
  }
  for (let i = 5; i < 7; i++) {
    game.add.image(blockSize * 11, (i * blockSize) + blockSize * 2, 'flats', 'grass_middle_left').setOrigin(0, 0)
  }
  for (let i = 0; i < 7; i++) {
    for (let j = 10; j < 16; j++) {
      game.add.image(j * blockSize + (blockSize * 2), (i * blockSize) + blockSize * 2, 'flats', 'grass_middle_center').setOrigin(0, 0)
    }
  }
  for (let i = 0; i < 7; i++) {
    game.add.image(blockSize * 18, (i * blockSize) + blockSize * 2, 'flats', 'grass_middle_right').setOrigin(0, 0)
  }

  // ┕-----------┛
  game.add.image(64 * 11, 64 * 9, 'flats', 'grass_lower_left').setOrigin(0, 0)
  for (let j = 10; j < 16; j++) {
    game.add.image(j * blockSize + (blockSize * 2), blockSize * 9, 'flats', 'grass_lower_center').setOrigin(0, 0)
  }

  game.add.image(6 * blockSize + (blockSize * 2), blockSize * 6, 'flats', 'grass_middle_center').setOrigin(0, 0)
  for (let j = 7; j < 9; j++) {
    game.add.image(j * blockSize + (blockSize * 2), blockSize * 6, 'flats', 'grass_lower_center').setOrigin(0, 0)
  }
  game.add.image(9 * blockSize + (blockSize * 2), blockSize * 6, 'flats', 'grass_middle_center').setOrigin(0, 0)

  game.add.image(6 * blockSize + (blockSize * 2), blockSize * 5, 'flats', 'grass_middle_center').setOrigin(0, 0)
  game.add.image(7 * blockSize + (blockSize * 2), blockSize * 5, 'flats', 'grass_middle_center').setOrigin(0, 0)
  game.add.image(8 * blockSize + (blockSize * 2), blockSize * 5, 'flats', 'grass_middle_center').setOrigin(0, 0)
  game.add.image(9 * blockSize + (blockSize * 2), blockSize * 5, 'flats', 'grass_middle_center').setOrigin(0, 0)

  game.add.image(6 * blockSize + (blockSize * 2), blockSize * 4, 'flats', 'grass_middle_center').setOrigin(0, 0)
  for (let j = 7; j < 9; j++) {
    game.add.image(j * blockSize + (blockSize * 2), blockSize * 4, 'flats', 'grass_upper_center').setOrigin(0, 0)
  }
  game.add.image(9 * blockSize + (blockSize * 2), blockSize * 4, 'flats', 'grass_middle_center').setOrigin(0, 0)


  game.add.image(64 * 18, 64 * 9, 'flats', 'grass_lower_right').setOrigin(0, 0)



  game.obstacles = game.physics.add.staticGroup()

  let tower = game.obstacles.create(64 * 2, 0, 'tower').setOrigin(0, 0).refreshBody()
  tower.body.setSize(64, 64 + 16, 0, 0)
  tower.body.setOffset(32, 64 * 2 - 16)

  let house = game.obstacles.create(64 * 6, 0, 'house').setOrigin(0, 0).refreshBody()
  house.body.setSize(64, 64, 0, 0)
  house.body.setOffset(32, 64)

  let wood_tower = game.obstacles.create(64 * 15, 64, 'wood_tower').setSize(1, 1).setOrigin(0, 0).play('wood-tower').refreshBody()
  wood_tower.body.setSize(100, 100, 0, 0)
  wood_tower.body.setOffset(64 * 3 + 12, 64 * 2)

  const wall = game.obstacles.create(64*10, 64*1+32, null)
  .setSize(20, 200)
  .setVisible(false)

  const wall2 = game.obstacles.create(64*10, 64*9-10, null)
  .setSize(20, 200)
  .setVisible(false)



}