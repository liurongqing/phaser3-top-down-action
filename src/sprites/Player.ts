export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: any, x: any, y: any) {
    super(scene, x, y, 'characters', 325)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.setScale(4)
  }

  update(cursors: any) {
    this.setVelocity(0)
    if (cursors.up.isDown) {
      this.setVelocityY(-150)
    } else if (cursors.down.isDown) {
      this.setVelocityY(150)
    }

    if (cursors.left.isDown) {
      this.setVelocityX(-150)
    } else if (cursors.right.isDown) {
      this.setVelocityX(150)
    }
  }
}
