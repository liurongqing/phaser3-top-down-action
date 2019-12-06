import { BASE_URL, PATH_URL } from '@/const'
import Player from '@/sprites/Player'
import Portal from '@/sprites/Portal'
import Coins from '@/groups/Coins'
import Enemies from '@/groups/Enemies'
import Bullets from '@/groups/Bullets'

export default class Main extends Phaser.Scene {
  map: any
  tiles: any
  backgroundLayer: any
  blockedLayer: any
  player: any
  portal: any
  cursors: any
  _LEVEL: any
  _LEVELS: any
  _NEWGAME: any
  loadingLevel: any
  coins: any
  coinsGroup: any
  enemies: any
  enemiesGroup: any
  bullets: any
  spaceKey: any
  constructor() {
    super('mainScene')
  }

  init(data: any) {
    this._LEVEL = data.level
    this._LEVELS = data.levels
    this._NEWGAME = data.newGame
    this.loadingLevel = false
    this._NEWGAME && this.events.emit('newGame')
  }

  create() {
    this.scale.on('resize', this.resize, this)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )
    this.createMap()
    this.createPlayer()
    this.createPortal()

    // 金币
    this.coins = this.map.createFromObjects('Coins', 'Coin', { key: 'coin' })
    this.coinsGroup = new Coins(this.physics.world, this, [], this.coins)

    // 敌人
    this.enemies = this.map.createFromObjects('Enemies', 'Enemy', {})
    this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies)

    // 子弹
    this.bullets = new Bullets(this.physics.world, this, [])

    this.addCollisions()
    this.cameras.main.startFollow(this.player)
  }

  update() {
    this.player.update(this.cursors)
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.bullets.fireBullet(
        this.player.x,
        this.player.y,
        this.player.direction
      )
    }
  }

  addCollisions() {
    this.physics.add.collider(
      [this.player, this.enemiesGroup],
      this.blockedLayer
    )

    // 玩家与敌人碰撞
    this.physics.add.overlap(
      this.player,
      this.enemiesGroup,
      this.player.enemyCollision.bind(this.player)
    )

    // 玩家与传送门碰撞
    this.physics.add.overlap(
      this.player,
      this.portal,
      this.loadNextLevel.bind(this, false)
    )

    // 玩家与金币碰撞
    this.physics.add.overlap(
      this.coinsGroup,
      this.player,
      this.coinsGroup.collectCoin.bind(this.coinsGroup)
    )

    // 子弹与敌人碰撞
    this.physics.add.overlap(
      this.bullets,
      this.enemiesGroup,
      this.bullets.enemyCollision
    )
  }

  loadNextLevel(endGame?: any) {
    if (!this.loadingLevel) {
      this.cameras.main.fade(500, 0, 0)
      this.cameras.main.on('camerafadeoutcomplete', () => {
        if (endGame) {
          this.scene.restart({
            level: 1,
            levels: this._LEVELS,
            newGame: true
          })
        } else if (this._LEVEL === 1) {
          this.scene.restart({
            level: 2,
            levels: this._LEVELS,
            newGame: false
          })
        } else if (this._LEVEL === 2) {
          this.scene.restart({
            level: 1,
            levels: this._LEVELS,
            newGame: false
          })
        }
      })
      this.loadingLevel = true
    }
  }

  createMap() {
    // 添加水背景
    this.add.tileSprite(0, 0, 8000, 8000, 'RPGpack_sheet', 31)

    // 创建地图
    this.map = this.make.tilemap({ key: 'level1' })
    this.tiles = this.map.addTilesetImage('RPGpack_sheet')

    // 背景
    this.backgroundLayer = this.map.createStaticLayer(
      'Background',
      this.tiles,
      0,
      0
    )

    // 阻塞物
    this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0)
    this.blockedLayer.setCollisionByExclusion([-1])
  }

  // 创建玩家
  createPlayer() {
    this.map.findObject('Player', (obj: any) => {
      // console.log('obj', obj)
      if (this._NEWGAME && this._LEVEL === 1) {
        console.log('new', obj.type)
        if (obj.type === 'StartingPositionPortal') {
          this.player = new Player(this, obj.x, obj.y)
        }
      } else {
        console.log('old', obj.type)
        this.player = new Player(this, obj.x, obj.y)
      }
    })
  }

  // 创建竹排
  createPortal() {
    this.map.findObject('Portal', (obj: any) => {
      if (this._LEVEL === 1) {
        this.portal = new Portal(this, obj.x, obj.y - 68)
      } else if (this._LEVEL === 2) {
        this.portal = new Portal(this, obj.x, obj.y)
      }
    })
  }

  resize(gameSize: any, baseSize: any, displaySize: any, resolution: any) {
    let width = gameSize.width
    let height = gameSize.height
    if (width === undefined) {
      width = this.sys.game.config.width
    }
    if (height === undefined) {
      height = this.sys.game.config.height
    }
    this.cameras.resize(width, height)
  }
}
