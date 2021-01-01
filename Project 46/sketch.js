var obstaclesGroup, EobstaclesGroup
var score
function preload(){
walk=loadImage("walk.png")
bone=loadImage("bone.png")
coin=loadImage("coin.jpg")   
rock=loadImage("rock.png") 
car =loadImage("car.jpg")
good=loadSound("score.mp3")
die=loadSound("die.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  walker= createSprite(50,windowHeight/2,75,100)
  floor=createSprite(windowWidth/2,windowHeight,windowWidth,20)
  floor2=createSprite(windowWidth/2,0,windowWidth,20)
  walker.addImage(walk)
  walker.scale=.3
  obstaclesGroup = createGroup();
  EobstaclesGroup = createGroup();
  score=0
}

function draw() {
  background("black")
  drawSprites()
  walker.collide(floor)
   walker.collide(floor2)
  if(keyDown("w")){
    walker.velocityY=-((4+score)*2) 
     }
  if(keyDown("s")){
    walker.velocityY=((4+score)*2) 
     }
     spawnObstacles()
     if(walker.isTouching(obstaclesGroup)){
      score=score+1
      obstaclesGroup.destroyEach()
      good.play()
    }
    if(score>=5){
    spawnEvilObstacles()
    }
    if(walker.isTouching(EobstaclesGroup)){
      score=score-1
      EobstaclesGroup.destroyEach()
      die.play()
      }
     text("Score:"+score,windowWidth/2,windowHeight/25)
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(windowWidth,height-87,20,30);
    obstacle.velocityX = -((4+score)*4)
    obstacle.y = Math.round(random(100,windowHeight-100));
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
      case 1: obstacle.addImage(bone);
      obstacle.scale=.2
              break;
      case 2: obstacle.addImage(coin);
      obstacle.scale=.2
              break;
      default: break;
     }
    
     //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 350;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }
 function spawnEvilObstacles(){
  if (frameCount % 120 === 0){
    var Eobstacle = createSprite(windowWidth,height-87,20,30);
    Eobstacle.velocityX = -((4+score)*3)
    Eobstacle.y = Math.round(random(100,windowHeight-100));
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: Eobstacle.addImage(rock);
       Eobstacle.scale=.2
               break;
       case 2: Eobstacle.addImage(car);
       Eobstacle.scale=.3
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     Eobstacle.lifetime = 350;
    
    //add each obstacle to the group
     EobstaclesGroup.add(Eobstacle);
  }
 }