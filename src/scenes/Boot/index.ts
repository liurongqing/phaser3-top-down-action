import { BASE_URL, PATH_URL } from '@/const'
export default class Boot extends Phaser.Scene {
  constructor() {
    super('bootScene')
  }

  preload() {
    this.load.setBaseURL(BASE_URL)
    this.load.setPath(PATH_URL)
    this.load.tilemapTiledJSON('level1', 'tilemaps/level1.json')
    this.load.tilemapTiledJSON('level2', 'tilemaps/level2.json')
    this.load.spritesheet('RPGpack_sheet', 'images/RPGpack_sheet.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet(
      'characters',
      'images/roguelikeChar_transparent.png',
      { frameWidth: 17, frameHeight: 17 }
    )
    this.load.image('portal', 'images/raft.png')
    this.load.image('coin', 'images/coin_01.png')
    this.load.image('bullet', 'images/ballBlack_04.png')
  }

  create() {
    this.scene.start('mainScene', {
      level: 1,
      newGame: true,
      levels: {
        1: 'level1',
        2: 'level2'
      }
    })
  }
}
