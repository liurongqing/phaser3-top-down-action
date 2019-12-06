export default class Coins extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world: any, scene: any, children: any, spriteArray: any) {
    super(world, scene)
    this.scene = scene

    spriteArray.forEach((coin: any) => {
      coin.setOrigin(0)
      this.world.enableBody(coin, 1)
      coin.setScale(0.2)
      coin.body.setSize(
        coin.width * coin.scaleX,
        coin.height * coin.scaleY,
        true
      )
      this.add(coin)
    })

    this.refresh()
  }
  collectCoin(player: any, coin: any) {
    this.remove(coin)
    coin.destroy()
    this.scene.events.emit('coinCollected')
  }
}
