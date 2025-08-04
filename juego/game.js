/* global Phaser */

import Menu from './menu.js'
import Nivel0 from './nivel0.js'
import Nivel1 from './nivel1.js'

import End from './end.js'

const config = {
  autoFocus: false,
  type: Phaser.AUTO, // webgl, canvas
  width: 1280,
  height: 704,
  backgroundColor: '#47aba9',
  parent: 'game',
  scene: [Menu, Nivel0, Nivel1, End],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
}

const game = new Phaser.Game(config)
// this -> game -> el juego que estamos construyendo




