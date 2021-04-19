var PLAY = 1;
var END = 0;
var gameState = PLAY;

var astroid, astroidImage, astroidG;
var arrowGroup, arrowImage,arrow; 

var r, fuel, fuelGroup, fuelImage, fuel2Image;
var ship, shipImage;

var backGrd, backgroundImage, invisibleGround;
var gameOver, gameOverImg, invisibleGround2;

var restart, resetImage;
var arrow, arrowImage, arrowGroup;


var score=0;
var fuel = 0;
 
function preload(){
  
  backgroundImage = loadImage("starry_sky_milky_way_glitter_123917_938x1668-576x1024.jpg");
  
  arrowImage = loadImage("up-arrow-design_PM.jpg");
  shipImage = loadImage("astraship.png");
  
  astroidImage = loadImage("meteor-file-meteorit-wikimedia-commons-23.png");
  
  fuelImage = loadImage("kisspng-gasoline-filling-station-fuel-dispenser-petroleum-fuel-vakanzi-clipart-5d168ccbe08131.5323747815617589239196.jpg");
  
    fuel2Image = loadImage("fuel2.png");

  gameOverImage = loadImage("gameover.png");
  resetImage = loadImage("reseticon.png");
  arrowImage = loadImage("up-arrow-design_PM.jpg");
  
}

function setup() {
  createCanvas(600, 600);
  
  backGrd = createSprite(0,0,600,600);
  backGrd.addImage(backgroundImage);
  backGrd.scale = 2.5;
  backGrd.velocityY= +(6 + 3*score/50);
  
  ship = createSprite(300,400,20,50);
  ship.addImage(shipImage); 
  ship.scale = 0.22;
  ship.setCollider("circle",0,0,40);
  //ship.visible = true;  
  
  gameOver = createSprite(300,300,600,600);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.245;
  gameOver.visible = false;
  
  restart = createSprite(325,500,10,10);
  restart.addImage(resetImage);
  restart.scale = 0.24;
  restart.visible = false;
  
  invisibleGround = createSprite(300,530,700,10);
 invisibleGround.visible = false;
  
 astroidGroup = new Group();
 fuelGroup = new Group();
 arrowGroup = new Group();
  
  score=0;
  fuel=0;
 
}

function draw() {
   background("black");
 
if (gameState === PLAY){
  
   score = score + Math.round(getFrameRate()/60.50 ); 
   backGrd.velocityY= +(6 + 3*score/50);

  if (keyDown("space")) {
    var temp_arrow = createArrow();
    temp_arrow.addImage(arrowImage);
     temp_arrow.y = ship.y;
    temp_arrow.x = ship.x;
  }
  
  if(keyDown("up_arrow")) {
      ship.velocityY = -12;
    }
   ship.velocityY = ship .velocityY + 0.8;
  
  if(keyDown("left_arrow")) {
       ship.x = ship.x -5;
    } 
  if(keyDown("right_arrow")) {
     ship.x = ship.x +5;
    }   
   if(backGrd.y > 600){
      backGrd.y = 5;
    }
   if(arrowGroup.isTouching(astroidGroup)){
    astroidGroup.destroyEach();
    arrowGroup.destroyEach();
    fuel=fuel+1;
  }
  
  if(fuelGroup.isTouching(ship)){
      fuel=fuel+2;
      fuelGroup.destroyEach();
    }
  
   ship.collide(invisibleGround);
   edges= createEdgeSprites();
   ship.collide(edges);
  spawnAstroid();
  
  if(astroidGroup.isTouching(ship)){
        gameState = END;
    }
}
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ship.velocityY = 0;
    
    astroidGroup.setVelocityXEach(0);
    fuelGroup.setVelocityXEach(0);
    
    astroidGroup.destroyEach();
    fuelGroup.destroyEach();
    
    astroidGroup.setLifetimeEach(-1);
    fuelGroup.setLifetimeEach(-1);
    
   if(mousePressedOver(restart)) {
     reset();
    }
  }
  
  drawSprites();
      textSize(21);
   fill("yellow");
  text("Fuel : "+fuel,20,22);
 text("Score : "+score,20,44);
}
function spawnAstroid() {
  if (frameCount % 60 === 0) {
    var astroid = createSprite(600,80,10,10);
    astroid.x = Math.round(random(30,580));
    astroid.addImage(astroidImage);
    astroid.scale = 0.1;
    astroid.velocityY = +(9+3*fuel/5);
    
    astroid.lifetime = 600;
    astroidGroup.add(astroid);
    
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  astroidGroup.destroyEach();
  fuelGroup.destroyEach();
  
  score=0;
  fuel=0;
}
function createArrow() {
  arrow= createSprite(300, 380, 5, 10);
  arrow.velocityY = -6;
  arrow.scale = 0.04;
  arrow.lifetime=100 ;
  arrowGroup.add(arrow);
  return arrow;
}
function spawnFuel(){
 if(World.frameCount%200===0){
     position =Math.round(random(1,2));
    fuel=createSprite(400,200,20,20);
    
    if(position==1){
       fuel.x=600;
       fuel.velocityX = -(9+3*score/27);   
      
    }else 
      
  {   if(position==2){
      fuel.x=0; 
      fuel.velocityX = -(9+1*score/27);       
    }
  }
     fuel.scale=1;
     r=Math.round(random(1,2));
    if (r == 1) {
      fuel.addImage(fuelImage);
    } else if (r == 2) {
      fuel.addImage(fuel2Image);
    } 
    
    fuel.y=Math.round(random(100,550));
    
    fuel.setLifetime=100;
    
    fuelGroup.add(fuel);
  }
}



