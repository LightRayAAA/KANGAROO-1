
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = 1;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisibleGround, shrub1, shrub2, shrub3;

var stonesGroup, stoneImage;
var shrub
var score=0;

var gameOver, gameOverImg, restart, restartImg;

function preload(){
  kangaroo_running = loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
  stoneImage = loadImage("assets/stone.png")
}

function setup() {
  createCanvas(800, 400);
  jungle = createSprite(400,100,400,20);
  kangaroo = createSprite(50,190,20,50);
  invisibleGround = createSprite(400,375,800,25)
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo.addAnimation("running", kangaroo_running)
  kangaroo.addAnimation("collided", kangaroo_collided)
  kangaroo.scale = 0.2
  shrubsGroup = new Group();
  stonesGroup = new Group();
  
  invisibleGround.visible = false

  score = 0;
  kangaroo.setCollider("circle",0,0,300)

  restart = createSprite(400,160)
  restart.addImage("restartImg", restartImg)
  restart.scale = 0.2
  gameOver = createSprite(400,100)
  gameOver.addImage("gameoverImg", gameOverImg)
}

function draw() {
  background(255);
  
if(gameState == 1){
  gameOver.visible = false
  restart.visible = false
  jungle.velocityX = -10
  kangaroo.velocityX = -10
  kangaroo.changeAnimation("running")
if(jungle.x < 100){
jungle.x = 400
}
spawnStones();
spawnShrubs();
if(kangaroo.isTouching(stonesGroup)){
  gameState = 0
}
}


if(gameState == 0){
  gameOver.visible = true
  restart.visible = true
  jungle.velocityX = 0
  kangaroo.changeAnimation("collided")
  stonesGroup.setVelocityXEach(0)
  shrubsGroup.setVelocityXEach(0)
}
  
  if(mousePressedOver(restart)){
  reset();
  }
  kangaroo.x=camera.position.x-270
  kangaroo.velocityY = kangaroo.velocityY + 0.6
  kangaroo.collide(invisibleGround)
  
  drawSprites();

}

function spawnShrubs()
{
if(frameCount % 60==0){
  shrub = createSprite(800,300,40,10);

  shrub.velocityX = -10;
  
  var randnum = Math.round(random(1,3))
  switch(randnum)
  {
  case 1:
  shrub.addImage(shrub1)
  shrub.scale = 0.1
  break;
  
  case 2:
  shrub.addImage(shrub2)
  shrub.scale = 0.1
  break;
  
  case 3:
  shrub.addImage(shrub3)
  shrub.scale = 0.1
  break;
  }
  shrubsGroup.add(shrub)
}
}

function spawnStones()
{
if(frameCount % 80==0){
  var stone = createSprite(800,300,40,10);
  stone.addImage(stoneImage)
  stone.scale = 0.2

  stone.velocityX = -10;
  stonesGroup.add(stone)
}
}

function reset(){
  score = 0
  kangaroo.changeAnimation("running")

  shrubsGroup.destroyEach();
  stonesGroup.destroyEach();
  gameOver.visible = false
  restart.visible = false
  gameState = 1
  }