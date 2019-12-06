import * as scenes from '@/scenes'

const scene = []
for (let i in scenes) {
  scene.push(scenes[i])
}

const config: any = {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  parent: 'app',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: window.innerWidth,
  height: window.innerHeight,
  scene,
  pixelArt: true,
  roundPixel: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
}

window.game = new Phaser.Game(config)

window.addEventListener('resize', (event: any) => {
  window.game.scale.resize(window.innerWidth, window.innerHeight)
})
