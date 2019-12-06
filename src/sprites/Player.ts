export default class Player extends Phaser.Physics.Arcade.Sprite {
  health: any
  hitDelay: any
  tint: any

  constructor(scene: any, x: any, y: any) {
    super(scene, x, y, 'characters', 325)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.setScale(4)
    this.health = 3
    this.hitDelay = false
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

  enemyCollision(player: any, enemy: any) {
    if (!this.hitDelay) {
      this.loseHealth()
      this.hitDelay = true
      this.tint = 0xff0000
      this.scene.time.addEvent({
        delay: 1200,
        callback: () => {
          this.hitDelay = false
          this.tint = 0xffffff
        },
        callbackScope: this
      })
    }
  }

  loseHealth() {
    console.log(this.health)
    this.health--
    this.scene.events.emit('loseHealth', this.health)
    if (this.health <= 0) {
      // @ts-ignore
      this.scene.loadNextLevel(true)
    }
  }
}
