export default class UI extends Phaser.Scene {
  scoreText: any
  healthText: any
  mainScene: any
  coinsCollected: any
  constructor() {
    super({ key: 'UI', active: true })
  }
  init() {
    this.coinsCollected = 0
  }
  create() {
    this.scoreText = this.add.text(12, 12, `Score: ${this.coinsCollected}`, {
      fontSize: '32px',
      fill: '#fff'
    })

    this.healthText = this.add.text(12, 50, `Health: 3`, {
      fontSize: '32px',
      fill: '#fff'
    })

    this.mainScene = this.scene.get('mainScene')

    // 监听吃金币
    this.mainScene.events.on('coinCollected', () => {
      this.coinsCollected++
      this.scoreText.setText(`Score: ${this.coinsCollected}`)
    })

    // 监听被敌人碰到
    this.mainScene.events.on('loseHealth', (health: any) => {
      this.healthText.setText(`Health: ${health}`)
    })

    // 监听健康值重置
    this.mainScene.events.on('newGame', (health: any) => {
      this.coinsCollected = 0
      this.scoreText.setText(`Score: ${this.coinsCollected}`)
      this.healthText.setText(`Health: 3`)
    })
  }
}
