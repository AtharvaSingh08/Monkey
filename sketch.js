//Global Variables
var monkey,screen,ground;
var bananaImg, obstacleImg, obstacleGroup, bg,score,monkeyImg;
var groundImg, foodGroup, obstaclesGroup;

function preload(){
    bananaImg=loadImage("banana.png");
    obstacleImg=loadImage("stone.png");
    bg=loadImage("jungle.jpg");
    monkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
    createCanvas(600,300);

    screen=createSprite(300,0,600,300);
    screen.addImage(bg);
    screen.scale = 1.75;
    screen.x=screen.width/2;
    screen.velocityX=-2;

    monkey=createSprite(40,280,10,20);
    monkey.addAnimation("running",monkeyImg);
    monkey.scale=0.1;

    ground=createSprite(300,290,600,20);
    ground.visible=false;
  
    foodGroup = new Group();
    obstaclesGroup = new Group();

    score=0;
}


function draw(){
    background(255); 

    if(screen.x<0){
        screen.x = screen.width/2;
    }

    if(keyDown("space") && monkey.y>240){
       monkey.velocityY = -10;
    }     
    
    monkey.velocityY += 0.5; 


    spawnFood();
    spawnObstacles();
  
    if(foodGroup.isTouching(monkey))
    {
        score=score+2;
        foodGroup.destroyEach();
    }

    switch(score){
        case 10:monkey.scale = 0.15;
        break;
        case 20:monkey.scale = 0.2;
        break;
        case 30:monkey.scale = 0.25;
        break;
        case 40:monkey.scale = 0.3;
        break;
        default:break;
    }
      
    if(monkey.isTouching(obstaclesGroup)){
      monkey.scale = 0.11
    }

    monkey.collide(ground);

    drawSprites();

    stroke(255);
    textSize(20);
    fill(255);
    text("Score: "+ score, 450,50);
}

function spawnFood() {
  
    if (frameCount % 80 === 0) {
      var banana = createSprite(600,250,40,10);
      banana.addImage(bananaImg);
      banana.scale=0.05;
      
      banana.y = random(120,200);    
      
      banana.velocityX = -5;
      
      banana.lifetime = 120;
      
      monkey.depth = banana.depth + 1;
    
      foodGroup.add(banana);
    }
  }

  function spawnObstacles() {
    if(frameCount % 200 === 0) {
      var obstacle = createSprite(600,280,10,40);
      obstacle.addImage(obstacleImg);
      obstacle.scale=0.175;
      
      obstacle.velocityX = -6;
         
      obstacle.lifetime = 120;
      
      obstaclesGroup.add(obstacle);
    }
  }