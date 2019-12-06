export default class Portal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: any, x: any, y: any) {
    super(scene, x, y, 'portal')
    this.scene = scene

    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }

  update() {}
}
