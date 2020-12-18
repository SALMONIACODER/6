var gameState="play"
var monkey , monkey_running,monkeyGroup
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,danger,dangerGroup;
var bananaGroup,dangerImage;
var score,yaySound,loosingSound;
var backgroundImage;
var restart,restartImage,monkeySound;
var num=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage=loadImage("OIP (14).jpg")
  restartImage=loadImage("OIP (25).jpg")
  dangerImage=loadImage("danger.png")
  monkeySound=loadSound("monkey.mp3")
  yaySound=loadSound("yay.mp3")
  loosingSound=loadSound("loosing.mp3")
}



function setup() {
  
  createCanvas(800,500)
  bananaGroup=new Group();
  obstacleGroup=new Group();
  monkeyGroup= new Group();
  dangerGroup=new Group();
  monkeySound.loop()
  
  bg=createSprite(200,180,600,600);
  bg.addImage("background",backgroundImage)
  bg.scale=4.5;
  bg.x=bg.width/2;
  bg.velocityX=-4
  
   monkey=createSprite(80,200,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.15;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.visible=false;
  ground.x=ground.width/2;
  
  restart=createSprite(400,50,20,80)
  restart.addImage(restartImage)
  restart.scale=0.2
  
   score=0;
   survivalTime=0;
}


function draw() {
  
if(gameState==="play"){
  restart.visible=false;
  
  if(bg.x<0){
    bg.x= bg.width/2;
  }
   if(ground.x<0){ 
    ground.x= ground.width/2;
  }
  if(keyDown("space")){
    monkey.velocityY=-12; 
  }
  monkey.velocityY=monkey.velocityY+0.8
  
  banana();
  obstacles();
  danger();
  
  if(bananaGroup.isTouching(monkey)){
        bananaGroup.destroyEach();
    score=score+2;
    yaySound.play();
    
    switch(score){ 
    case 10:monkey.scale= 1.1;
      break;
    case 20:monkey.scale=1.2;
      break;
      case 30:monkey.scale=1.35;
      break;
      case 40:player.scale=1.5;
      break;
      default:break;
     
  }
}
  
   
  if(dangerGroup.isTouching(monkey)){
    if(num<=1){
      obstacleGroup.destroyEach()
      dangerGroup.destroyEach()
       num+=1
      
       }
    if (num===2){
        monkey.scale=0.1;
        gameState="end"
        loosingSound.play();
        } 
   
    
  }
  if(obstacleGroup.isTouching(monkey)){
   // monkey.scale=0.1;
   // gameState="end"
   // loosingSound.play();
    console.log(num)
     if(num<=0){
       num+=1
      obstacleGroup.destroyEach()
      dangerGroup.destroyEach()
       }
    console.log(num)
    if (num===2){
        monkey.scale=0.1;
       gameState="end"
        loosingSound.play();
        } 
  }
 
  
  bg.velocityX=-4;
    restart.visible=false;
    monkey.visible=true;
    dangerGroup.visible=true;
    obstacleGroup.visible=true;
    score.visible=true;
    bananaGroup.visible=true;
  
}if(gameState==="end"){
    //stop background velocity here
   restart.visible=true;
   // loosingSound.play();
  bg.velocityX=0;
  bananaGroup.setVelocityXEach(0)
  obstacleGroup.setVelocityXEach(0);
  dangerGroup.setVelocityXEach(0)
  obstacleGroup.setLifetimeEach(-1)
  bananaGroup.setLifetimeEach(-1)
  dangerGroup.setLifetimeEach(-1)
  if(mousePressedOver(restart)){
    reset();
 // gameState="play"
}
  
    }

  
 
  
monkey.collide(ground);
   
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
 // survivalTime=Math.ceil(frameCount/frameRate());
  text("Score:"+score,100,50);
  
}
function banana(){
 if (frameCount % 80 === 0) {
     var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    banana.scale=0.1;
     //assign lifetime to the variable
    banana.lifetime = 204;
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    bananaGroup.add(banana);
    //adding cloud to the group
   
  }
}

function obstacles(){
 if (frameCount % 300 === 0) {
     var obstacles = createSprite(400,340,40,10);
   // obstacles.y = Math.round(random(120,200));
    obstacles.addImage(obstaceImage);
    obstacles.scale = 0.5;
    obstacles.velocityX = -3;
    obstacles.scale=0.1;
     //assign lifetime to the variable
    obstacles.lifetime = 200;
    //adjust the depth
    obstacles.depth = monkey.depth;
    obstacles.depth = monkey.depth + 1;
    obstacleGroup.add(obstacles)
    //adding cloud to the group
   
  }
}

function danger(){
 if (frameCount % 400 === 0) {
     var danger = createSprite(400,340,40,10);
   // obstacles.y = Math.round(random(120,200));
    danger.addImage(dangerImage);
    danger.scale = 0.5;
    danger.velocityX = -3;
   danger.scale=0.1;
     //assign lifetime to the variable
    danger.lifetime = 200;
    //adjust the depth
    danger.depth = monkey.depth;
    danger.depth = monkey.depth + 1;
    dangerGroup.add(danger)
    //adding cloud to the group
   
  }
}
function reset(){
  gameState="play"
  bananaGroup.destroyEach()
  obstacleGroup.destroyEach()
  dangerGroup.destroyEach()
} 

