var bg, bgImg, player, playerImg, playerShootingImg, enemy, enemyImg, reset_buttonImg, reset 

var bullets = 6
var enemyLife = 3
var level = 1
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var gamestate = fight
var score = 0


function preload(){
  bgImg = loadImage("background.jpeg")
  playerImg = loadImage("playerImg.png")
  playerShootingImg = loadImage("playerShootingImg.png")
  enemyImg = loadImage("enemyImg.png")
  heart1Img = loadImage("heart1.png")
  heart2Img = loadImage("heart2.png")
  heart3Img = loadImage("heart3.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(displayWidth/2-20, displayHeight/2-40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 7

  player = createSprite(displayWidth-1150, displayHeight-200, 50, 50);
  player.addImage(playerImg)
  player.scale = 0.4

  enemy = createSprite(displayWidth-200, displayHeight- 200, 200, 200)
  enemy.addImage(enemyImg)
  enemy.scale = 0.4
  enemy.velocityX = -12

  heart1 = createSprite(displayWidth-150, 40, 20, 20)
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.5

  heart2 = createSprite(displayWidth-100, 40, 20, 20)
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.5

  heart3 = createSprite(displayWidth-150, 40, 20, 20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.5

  edges = createEdgeSprites()
  bullets_group = new Group();
}

function draw() {
  background(255,255,255); 
  if(gamestate === "fight"){
    if(life === 3){
      heart3.visibile = true
      heart2.visiblie = false
      heart1.visiblie = false
    }
    if(life === 2){
      heart3.visibile = false
      heart2.visiblie = true
      heart1.visiblie = false
    }
    if(life === 1){
      heart3.visibile = false
      heart2.visiblie = false
      heart1.visiblie = true
    }
    if(life === 0){
     gamestate = lost
    }
  }
  if(keyDown("UP_ARROW")){
    player.y -= 10
  }

  if(keyDown("RIGHT_ARROW")){
    player.x += 10
  }

  if(keyDown("LEFT_ARROW")){
    player.x -= 10
  }

  if(keyWentDown("SPACE")){
    player.addImage(playerShootingImg)
    bullet = createSprite(displayWidth- 1150, player.y-30, 20, 10)
    bullet.velocityX = 10
    bullets_group.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth+2
    bullet = bullet - 1
  }

  else if(keyWentUp("SPACE")){
    player.addImage(playerImg)
  }

  if(enemy.isTouching(bullets_group)){
    enemy.destroy()
    bullets_group.destroyEach()
    score = score + 2
  }

  if(enemy.isTouching(player)){
    enemy.destroy()
  }

  

  if(bullets == 0){
    enemy.destroy()
    player.destroy()
    bullets_group.destroyEach()
    text("gameover", 200, 200)
  } 

  drawSprites();
  textSize(30)
  fill("red")
  text("bullets:" + bullets, displayWidth - 200, displayHeight/2-300)
  text("Score:" + score, displayWidth - 210, displayHeight/2-250)
  text("lives:" + enemyLife, displayWidth - 220, displayHeight/2-200)
}

