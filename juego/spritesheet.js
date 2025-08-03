const INIT_SPRITESHEETS = [
  {
    key: 'foam',
    path: 'assets/Terrain/Water/Foam/foam.png',
    frameWidth: 64*3,
    frameHeight: 64*3
  },

  {
    key: 'knight',
    path: 'assets/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png',
    frameWidth: 64*3,
    frameHeight: 64*3
  },

  {
    key: 'archer',
    path: 'assets/Factions/Knights/Troops/Archer/Blue/Archer_Blue.png',
    frameWidth: 64*3,
    frameHeight: 64*3
  },

  {
    key: 'arrow',
    path: 'assets/Factions/Knights/Troops/Archer/Arrow/Arrow.png',
    frameWidth: 64*1,
    frameHeight: 64*1
  },

  {
    key: 'enemy',
    path: 'assets/Factions/Goblins/Troops/Torch/Red/Torch_Red.png',
    frameWidth: 64*3,
    frameHeight: 64*3
  },

  { key: 'dead',
    path: 'assets/Factions/Knights/Troops/Dead/Dead.png',
    frameWidth: 64*2, 
    frameHeight: 64*2 
  },

  {
    key: 'wood_tower',
    path: 'assets/Factions/Goblins/Buildings/Wood_Tower/Wood_Tower_Red.png',
    frameWidth: 64*4,
    frameHeight: 64*3
  },

]

export const initSpritesheet = ({ load }) => {
  INIT_SPRITESHEETS.forEach(({ key, path, frameWidth, frameHeight }) => {
    load.spritesheet(key, path, { frameWidth, frameHeight })
  })
}
