export default class UI extends Phaser.Scene {
  scoreText: any
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

    this.mainScene = this.scene.get('mainScene')
    this.mainScene.events.on('coinCollected', () => {
      this.coinsCollected++
      this.scoreText.setText(`Score: ${this.coinsCollected}`)
    })
  }
}
