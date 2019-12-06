export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(world: any, scene: any, children: any) {
    super(world, scene)
    this.scene = scene

    this.createMultiple({
      frameQuantity: 5,
      key: 'bullet',
      active: false,
      visible: false
    })
  }
}
