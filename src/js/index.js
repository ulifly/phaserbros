
const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 960},
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

new Phaser.Game(config)

function preload(){

  this.load.spritesheet(
    'mario',
    'assets/entities/mario.png',
    {frameWidth: 18, frameHeight: 16}
  );
    
  this.load.image(
    'cloud1',
    'assets/scenery/overworld/cloud1.png'
  );

  this.load.image(
    'floorbricks',
    'assets/scenery/overworld/floorbricks.png'
  )
};

function create() {
  
  //  this.mario = this.add.sprite(50, 210, 'mario')
  //  .setOrigin(0, 1)
  this.floor = this.physics.add.staticGroup()

  this.floor
    .create(0, config.height -16 , 'floorbricks')
    .setOrigin(0 , 0.5)
    .refreshBody();

  this.floor
    .create(150, config.height -16 , 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.mario = this.physics.add.sprite(50, 100, 'mario')
  .setOrigin(0, 1)
  .setCollideWorldBounds(true);
  
  this.physics.world.setBounds(0, 0, 2000, config.height);
  this.physics.add.collider(this.mario, this.floor);

  this.cameras.main.setBounds(0, 0, 2000, config.height);
  this.cameras.main.startFollow(this.mario);

  this.anims.create({
    key: 'mario-walk',
    frames: this.anims.generateFrameNumbers(
      'mario', 
      {start: 3, end: 1}
    ),
    frameRate: 12,
    repeat: -1
  })


  this.anims.create({
    key: 'mario-jump',
    frames: [{key: 'mario', frame: 5}],
    frameRate: 1,
    repeat: -1
  });

  this.add.image(100, 50, 'cloud1')
  .setOrigin(0,0)
  .setScale(0.15);
  

  this.keys = this.input.keyboard.createCursorKeys()
}  

function update(){
  if (this.keys.right.isDown) {
    this.mario.anims.play('mario-walk', true)
    this.mario.x += 2
    this.mario.flipX = false
  } else if (this.keys.left.isDown) {
    this.mario.anims.play('mario-walk', true)
    this.mario.x -= 2
    this.mario.flipX = true
  } else if (this.mario.body.touching.down) {
    this.mario.anims.stop('mario-walk')
    this.mario.setFrame(0)
  }

  if (this.keys.up.isDown && this.mario.body.touching.down) {
    this.mario.setVelocityY(-300)
    this.mario.anims.play('mario-jump', true)
  }
}