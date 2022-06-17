//constante que controla a velocidade de movimentação do player
const SPEED = 10;
const TAM = 5;
var mapOne;
var player;
var keyOne,keyImg; 
var doorOne, doorOpen, doorClose, doorAnimation;
var dialogue;
var buttonEAnimation, buttonE;
var textDialogue;
var inventory = [];

var variable = true;
var inventoryOne = false;
var inDoor = false;
var NPC, npcImg;

var idleRight, idleLeft, walkingRight, walkingLeft;
var lastAnimation;

var ground, wallLeft,wallRight,wallTop, groupPlatform;


function preload(){
  //carregar as animações
  idleRight = loadAnimation("assets/player/idle-1.png",
                        "assets/player/idle-2.png",
                        "assets/player/idle-3.png",
                        "assets/player/idle-4.png",
                        "assets/player/idle-5.png",
                        "assets/player/idle-6.png",
                        "assets/player/idle-7.png",
                        "assets/player/idle-8.png",
                        "assets/player/idle-9.png");

  idleLeft = loadAnimation("assets/player/idleLeft-1.png",
                        "assets/player/idleLeft-2.png",
                        "assets/player/idleLeft-3.png",
                        "assets/player/idleLeft-4.png",
                        "assets/player/idleLeft-5.png",
                        "assets/player/idleLeft-6.png",
                        "assets/player/idleLeft-7.png",
                        "assets/player/idleLeft-8.png",
                        "assets/player/idleLeft-9.png");


  walkingLeft = loadAnimation("assets/player/walkingLeft-1.png",
                              "assets/player/walkingLeft-2.png",
                              "assets/player/walkingLeft-3.png",
                              "assets/player/walkingLeft-4.png",
                              "assets/player/walkingLeft-5.png",
                              "assets/player/walkingLeft-6.png",
                              "assets/player/walkingLeft-7.png",
                              "assets/player/walkingLeft-8.png");

walkingRight = loadAnimation("assets/player/walkingRight-1.png",
                              "assets/player/walkingRight-2.png",
                              "assets/player/walkingRight-3.png",
                              "assets/player/walkingRight-4.png",
                              "assets/player/walkingRight-5.png",
                              "assets/player/walkingRight-6.png",
                              "assets/player/walkingRight-7.png",
                              "assets/player/walkingRight-8.png");

  mapOne = loadImage("assets/cenario/mapa1.png");
  doorAnimation = loadAnimation("assets/cenario/door-1.png","assets/cenario/door-2.png");
  doorClose = loadAnimation("assets/cenario/door-1.png");
  doorOpen = loadAnimation("assets/cenario/door-2.png");

  npcImg = loadImage("assets/NPC/NPC.png");

  keyImg = loadImage("assets/item/key.png");

  dialogue = loadImage("assets/NPC/dialogue.png");

  buttonEAnimation = loadAnimation("assets/item/teclaE-1.png", "assets/item/teclaE-2.png");

  textDialogue = loadJSON("assets/NPC/dialogue.json");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(120);

  groupPlatform = new Group();

  //aumentar a velocidade da animação
  walkingLeft.frameDelay = 2;
  walkingRight.frameDelay = 2;

  for(var i = 0; i < TAM; i++){
    var box = new Inventory(width/2 + 100 - (100*i), height - 50, 1.5);
    inventory.push(box);
  }



  doorAnimation.frameDelay = 50;
  doorOne = createSprite(width-150,height-210,100,200);
  doorOne.addAnimation("close",doorClose);
  doorOne.addAnimation("open", doorOpen);
  doorOne.addAnimation("openTheDoor", doorAnimation);
  doorOne.scale = 0.5

 /* keyOne = createSprite(200,height-170,20,50);
  keyOne.addImage(keyImg);
  keyOne.scale = 0.09;
  //keyOne.debug = true;
  keyOne.setCollider("rectangle", 0, 0, 500,500);
*/
  keyOne = new Key(4,keyImg,0.09);
  ground = createSprite(width/2,height-120,width-150,30);
  ground.visible = false;

  wallLeft = createSprite(75,height/2,20,height-150);
  wallLeft.visible = false;

  wallRight = createSprite(width-70,height/2,20,height-150);
  wallRight.visible = false;

  wallTop = createSprite(width/2,200,width-150,30);
  wallTop.visible = false;

  NPC = createSprite(width-400,height-180,50,50);
  NPC.addImage(npcImg);
  NPC.scale = 0.42;

  buttonEAnimation.frameDelay = 20;
  buttonE = createSprite(NPC.x,NPC.y-100);
  buttonE.addAnimation("press",buttonEAnimation);
 

  //definir o player como um objeto sprite (Propriedade e Funções de Sprite)
  player = createSprite(width/2,height-170,50,50);
  //player.debug = true;
  player.setCollider("rectangle",0,0,35,70)
  //Adicionar todas as aniamações ao sprite player
  player.addAnimation("idleRight", idleRight);
  player.addAnimation("idleLeft", idleLeft);
  player.addAnimation("walkingLeft", walkingLeft);
  player.addAnimation("walkingRight", walkingRight);

  groupPlatform.add(ground);
  groupPlatform.add(wallLeft);
  groupPlatform.add(wallRight);

}

function draw() {
  background(0); 
  
  push();
  imageMode(CENTER);
  image(mapOne,width/2-30,height/2,width+100,height);
  pop();



  if((keyDown("w") || keyDown("UP")) && player.collide(groupPlatform)){
    player.velocityY = -(SPEED+6);
  }

  else if(keyDown("a") || keyDown("LEFT")){
    player.x = player.x - SPEED;
    player.changeAnimation("walkingLeft");
    lastAnimation = "walkingLeft";
  }

  else if(keyDown("d") || keyDown("RIGHT")){
    player.x = player.x + SPEED;
    player.changeAnimation("walkingRight")
    lastAnimation = "walkingRight";
  }

  else if(lastAnimation == "walkingRight"){
    player.changeAnimation("idleRight")
  }
  else if(lastAnimation == "walkingLeft"){
    player.changeAnimation("idleLeft")
  }

  if((player.isTouching(keyOne.sprite) && keyDown("e")) && variable){
    //keyOne.x = width/2 - 200;
    //keyOne.y = height - 50;
    keyOne.sprite.x = inventory[inventory.length-1].x;
    keyOne.sprite.y = inventory[inventory.length-1].y;
    inventoryOne = true
  }
  //gravidade artificial
  player.velocityY += 0.5;
 
  if(keyOne.sprite.isTouching(doorOne)){
    keyOne.sprite.x = doorOne.x;
    keyOne.sprite.y = doorOne.y - 70;
    inDoor = true;
  }

  if(inDoor){
    doorOne.changeAnimation("openTheDoor");
    setTimeout(() => {
      doorOne.changeAnimation("open");
    }, 1000);
  }

  interaction(NPC,buttonE, "e",textDialogue.NPC);

  player.collide(groupPlatform);
  player.collide(wallTop);
 
  drawSprites();
}

function mouseDragged() {
  if((inventoryOne && !keyOne.sprite.isTouching(doorOne)) && mousePressedOver(keyOne.sprite)){
    keyOne.sprite.x = mouseX;
    keyOne.sprite.y = mouseY; 
  }
}

function mouseReleased(){
  if(inventoryOne && !keyOne.sprite.isTouching(doorOne)){
    keyOne.sprite.x = inventory[inventory.length-1].x;
    keyOne.sprite.y = inventory[inventory.length-1].y;
  }
}

function interaction(sprite,button,press,texto){
  let count = 0;
  if(player.isTouching(sprite)){
    button.x = sprite.x;
    button.y = sprite.y - 150;
    button.visible = true;

    if(keyDown(press)){
      push();
      imageMode(CENTER);
      image(dialogue,sprite.x,sprite.y-200+50,500,150);
      fill("white");
      textSize(26);
      text(texto[count].talk, width/2 + 150,height/2+20);
      count += 1;
      pop();
    
      button.x = sprite.x;
      button.y = sprite.y - 150;
      button.visible = false;
    }
  }
  else{
    button.visible = false;
  }

}