export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  timeEvent: any
  constructor(scene: any, x: any, y: any, frame: any) {
    super(scene, x, y, 'characters', frame)
    this.scene = scene

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
    this.setVelocityX(100)
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        if (this.active) this.setVelocity(0)
      },
      callbackScope: this
    })
  }
}
