export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  timeEvent: any
  health: any
  constructor(scene: any, x: any, y: any, frame: any) {
    super(scene, x, y, 'characters', frame)
    this.scene = scene
    this.health = 3

    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.setScale(4)

    this.timeEvent = this.scene.time.addEvent({
      delay: 3000,
      callback: this.move,
      loop: true,
      callbackScope: this
    })
  }

  move() {
    const randNumber = Math.floor(Math.random() * 4 + 1)
    switch (randNumber) {
      case 1:
        this.setVelocityX(100)
        break
      case 2:
        this.setVelocityX(-100)
        break
      case 3:
        this.setVelocityY(100)
        break
      case 4:
        this.setVelocityY(-100)
        break
      default:
        this.setVelocityX(100)
        break
    }
    // 500ms 后停止
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        if (this.active) this.setVelocity(0)
      },
      callbackScope: this
    })
  }
}
