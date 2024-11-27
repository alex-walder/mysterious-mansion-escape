let slowmo = false //stes ther slow motion varible to false on startup
let inventory, invUI, invColor //defines the inventory variables
let maxInv = 9
let unknownEntity, uESprites
let ueFrame = 0
let mouseSprite
let mouseOverlap = "none"
let items //group of every item
let setLevel, currentLevel
let selectedItem = 0
let doorArray = []; //keeps track of the doors
let doortest = [0, -1]
let emptyInvSlot
let initdoor = false
let backgroundSprite
let door0, door1, door2, door3, door4, door5, door6, door7, door8, door9
let newgame = true //sets the game to start a new turn on startup
let man, apple, appleImage, pick, pickImage, spade, spadeImage, hammer, hammerImage, sword, swordImage
let doors, doorImage, tilefloor, tilefloorImage, blockImage, blocks, platforms, platformImage, spikes, spikeImage
let manSprites; //defines the character varaibles
let manAnis = {
  moveDown: {
    row: 0,
    frames: 12,
  },
  moveLeft: {
    row: 1,
    frames: 12,
  },
  moveRight: {
    row: 2,
    frames: 12,
  },
  moveUp: {
    row: 3,
    frames: 12,
  }
}; //defines which images (in "man.png") spritesheet belong to which animation
let uEAnis = {
  walk: {
    row: 1,
    frames: 5,
  },
  attack: {
    row: 3,
    frames: 4,
  },
  hurt: {
    row: 4,
    frames: 4,
  },
  die: {
    row: 5,
    frames: 4,
  }
}
let gamestate = "intro" //sets the state of the game to the intro screen on startup
// let level = [
//   "bbbbbbbbbbbbbbbbbbbbbbbbb",
//   "b_______________________1",
//   "b_______________________1",
//   "b_______________________1",
//   "b_______________________b",
//   "b_______________________b",
//   "b_______________________b",
//   "b_______________________b",
//   "b_______________________b",
//   "b_______________________b",
//   "b_______________________b",
//   "b_______________________b",
//   "b_______________________b",
//   "b_______________b__b____b",
//   "b_______________bppb____b",
//   "b_______________________b",
//   "b_____________________bbb",
//   "b_______________________b",
//   "b_______________________b",
//   "bssss_________bbb_______b",
//   "bbbbbbbbbbbbbbbbbbbbbbbbb",

// ] 




function initialise() {
  resetItems()
  inventory = ["", "", "", "", "", "", "", "", ""]
  man.x = 80
  man.y = 160
  man.health = 100
  man.maxHealth = 100
  unknownEntity.health = 50
  unknownEntity.attackSpeed = 100
  unknownEntity.room = 2
  console.log("then why ain't this working")
  backgroundSprite = new Sprite(0, 0, 1000, 1000, "n")
  changeLevel(0)
  gamestate = "runGame"
  backgroundSprite.layer = 0
  backgroundSprite.color = "#88629e"
  newgame = false;
} // this function will reset the game to default startup values when called





let attackRadius //defines the attacking radius variable
//------------------------------
function preload() {
  uESprites = loadImage("unknownentity.png")
  emptyInvSlot = loadImage("nothing.png")
  swordImage = loadImage("sword.png")
  spadeImage = loadImage("spade.png")
  hammerImage = loadImage("hammer.png")
  pickImage = loadImage("pick.png")
  appleImage = loadImage("apple.png")
  doorImage = loadImage("door.png")
  tilefloorImage = loadImage("tilefloor.png")
  manSprites = loadImage("man.png")
  blockImage = loadImage("block.png")
  platformImage = loadImage("platform.png")
  spikeImage = loadImage("spike.png")
} //loads all images and assets of the game before startup
//-----------------------------
function setup() {
  new Canvas(200, 200, "pixelated");


  blocks = new Group();
  blocks.image = blockImage;
  blocks.tile = "b";
  blocks.collider = "static";
  blocks.layer = 10 //assigns the attributes to walls

  mouseSprite = new Sprite();
  mouseSprite.visible = false
  mouseSprite.collider = "none"
  mouseSprite.width = 1;
  mouseSprite.height = 1;

  platforms = new Group();
  platforms.image = platformImage;
  platforms.tile = "p";
  platforms.collider = "none";
  platforms.layer = 10; //assigns the attributes to platforms

  doors = new Group();
  doors.image = doorImage;
  door0 = new doors.Group();
  door1 = new doors.Group();
  door2 = new doors.Group();
  door3 = new doors.Group();
  door4 = new doors.Group();
  door5 = new doors.Group();
  door6 = new doors.Group();
  door7 = new doors.Group();
  door8 = new doors.Group();
  door9 = new doors.Group();
  door0.tile = "0"
  door1.tile = "1"
  door2.tile = "2"
  door3.tile = "3"
  door4.tile = "4"
  door5.tile = "5"
  door6.tile = "6"
  door7.tile = "7"
  door8.tile = "8"
  door9.tile = "9"
  doorArray.push(door0)
  doorArray.push(door1)
  doorArray.push(door2)
  doorArray.push(door3)
  doorArray.push(door4)
  doorArray.push(door5)
  doorArray.push(door6)
  doorArray.push(door7)
  doorArray.push(door8)
  doorArray.push(door9)
  for (let i = 0; i < 10; i++) {
    doorArray[i].image = doorImage
  }

  doors.collider = "none"
  doors.layer = 9;
  tilefloor = new Group();
  tilefloor.image = tilefloorImage;
  tilefloor.tile = "_";
  tilefloor.collider = "none";
  tilefloor.layer = 1; //assigns the attributes to background sprites


  spikes = new Group();
  spikes.image = spikeImage;
  spikes.tile = "s";
  spikes.collider = "static";
  spikes.layer = 9; //assigns the attributes to spikes


  allSprites.autoDraw = false;
  allSprites.autoUpdate = false;
  world.autoStep = false;
  //------------------------------------------------------------
  items = new Group();
  //------------------------------------------------------------------------
  //allSprites.debug=true;
  drawInv()
  man = new Sprite(80, 160);
  man.spriteSheet = manSprites;
  man.anis.w = 95.5;
  man.anis.h = 160
  man.addAnis(manAnis);
  man.w = 50;
  man.h = 150
  man.anis.offset.y = 0
  man.rotationLock = true
  man.scale = 0.3
  man.layer = 9; //assigns all attributes to the character
  manSensor = new Sprite();
  manSensor.x = man.x
  manSensor.y = man.y + man.h / 2
  manSensor.w = 13
  manSensor.h = 6
  manSensor.collider = "none"
  manSensor.visible = false;
  let j = new GlueJoint(manSensor, man)
  j.visible = false


  unknownEntity = new Sprite(180, 260);
  unknownEntity.spriteSheet = uESprites;
  unknownEntity.addAnis(uEAnis)
  unknownEntity.w = 10
  unknownEntity.h = 30
  unknownEntity.layer = 8
  unknownEntity.visible = false
  unknownEntity.dead = false
  setLevel = new Tiles(level[0].layout, 0, 0, 16, 16);


  // apple = new items.Sprite();
  // apple.scale = 0.24
  // apple.image = appleImage
  // apple.collider = "none"
  // apple.layer = 8;


  attackRadius = new Sprite()
  attackRadius.d = 75
  attackRadius.x = man.x
  attackRadius.y = man.y
  attackRadius.collider = "none"
  attackRadius.visible = false
  let arj = new GlueJoint(man, attackRadius)
  arj.visible = false
}

//-----------------------------
function draw() {
  if (gamestate == "intro") intro();
  if (gamestate == "runGame") runGame();
  if (gamestate == "gameOver") gameOver();

}

function intro() {
  cursor(HAND)
  camera.off()
  background("red")
  text("click the screen to start", 100, 100)
  textAlign(CENTER, CENTER)
  if (mouse.presses()) {
    gamestate = "runGame"
  }
}
function gameOver() {

  allSprites.pixelPerfect = false;
  cursor(ARROW)
  camera.off()
  background("red")
  text("GAME OVER\n press enter to play again", 100, 100)
  textAlign(CENTER, CENTER)
  if (kb.presses("enter")) {
    apple.image.scale = 1
    pick.image.scale = 1
    spade.image.scale = 1
    sword.image.scale = 1
    hammer.image.scale = 1
    initialise()
  }
  world.step()
}

function runGame() {
  if (newgame) {
    initialise()
  }
  allSprites.pixelPerfect = true;
  camera.on()
  mouseSprite.x = mouse.x
  mouseSprite.y = mouse.y

  if (man.overlapping(doors)) {
    doortest = [frameCount, currentLevel]
    // console.log(man.overlaps(doors))
    if (man.x < 92 - 100 || man.x > 292 + 100) {
      console.log(doorArray)
      for (let i = 0; i < 10; i++) {
        console.log(i)
        if (man.overlapping(doorArray[i]) > 0) {
          console.log("overlap success", i)
          changeLevel(i)
        }
      }
    }
  }
  if ((frameCount - doortest[0]) > 10 && man.x > 380 && doortest[1] == currentLevel && !initdoor) {
    console.log("failed to enter door")
    man.x += 5
    // if ((frameCount - doortest[0]) > 20) man.x -= 5
    initdoor = true
    changeLevel(1)
  }

  for (let i = 0; i < items.length; i++) {
    if (items[i].overlapping(mouseSprite) && items[i].visible) {
      mouseOverlap = "item"

      break
    }
    else if (doors.overlapping(mouseSprite)) {
      mouseOverlap = "door"
      break
    }
    else mouseOverlap = "none"
  }
  //console.log(man.x, man.y, manSensor.overlapping(doors))
  man.vel.x = 0;
  man.vel.y = 0;
  man.ani.stop()
  background("slategray")
  if (kb.pressed("e")) {
    if (man.overlapping(apple) && apple.visible == true) {
      pickUp(apple)
    }
    else if (man.overlapping(pick) && pick.visible == true) {
      pickUp(pick)
    }
    else if (man.overlapping(sword) && sword.visible == true) {
      pickUp(sword)
    }
    else if (man.overlapping(hammer) && hammer.visible == true) {
      pickUp(hammer)
    }
    else if (man.overlapping(spade) && spade.visible == true) {
      pickUp(spade)
    }

  } else if (kb.released("q")) drop(selectedItem)

  if ((kb.pressing("right") || kb.pressing("d")) && !(kb.pressing("left") || kb.pressing("a"))) {
    if (man.x < 292.5 + 100) {
      man.ani.play()
      man.changeAni("moveRight")
      if (kb.pressing("shift") && !slowmo && !manSensor.overlapping(doors)) {
        man.vel.x = 2.5
      } else man.vel.x = 1.5;
    }
  }
  else if ((kb.pressing("left") || kb.pressing("a")) && !(kb.pressing("right") || kb.pressing("d"))) {
    man.ani.play()
    man.changeAni("moveLeft")
    if (kb.pressing("shift") && !slowmo && !manSensor.overlapping(doors)) {
      man.vel.x = -2.5
    } else man.vel.x = -1.5;
  }
  else if (kb.pressing("up") || kb.pressing("w")) {
    man.ani.play()
    man.changeAni("moveUp")
    if (kb.pressing("shift") && !slowmo && !manSensor.overlapping(doors)) {
      man.vel.y = -2.5
    } else man.vel.y = -1.5;
  }
  else if ((kb.pressing("down") || kb.pressing("s")) && !manSensor.overlapping(blocks) && !manSensor.overlapping(platforms)) {
    man.ani.play()
    man.changeAni("moveDown")
    if (kb.pressing("shift") && !slowmo && !manSensor.overlapping(doors)) {
      man.vel.y = 2.5
    } else man.vel.y = 1.5;
  }

  if (manSensor.overlapping(spikes)) {
    man.health -= 0.21
  }
  if (unknownEntity.overlapping(spikes)) {
    unknownEntity.health -= 0.21
  }
  if (kb.pressing("c")) {
    world.timeScale = 0
    man.ani.frameDelay = 15
    slowmo = true
  } else {
    world.timeScale = 1
    man.ani.frameDelay = 4
    slowmo = false
  }
  if (man.health <= 0) {
    gamestate = "gameOver"
  }
  noCursor()
  // async function practice() {
  //   await man.changeAni('moveDown');
  //   man.changeAni('moveLeft');
  //   await man.move(60, 180, 1);

  //   await man.changeAni('moveUp');
  //   man.changeAni('moveLeft');
  //   man.ani.frame = 1;
  //   await man.move(60, 0, 1);

  // }
  //cursor("cursor.png",16.5,16)
  invColor.color = "black";
  invColor[selectedItem].color = "red";
  // if (invUI[selectedItem].image !== emptyInvSlot) {
  //   cursor(invUI[selectedItem].image.url)
  // } else noCursor()


  drawItems();
  drawEnemies();
  allSprites.update();
  allSprites.draw()
  //spriteOrder()

  camera.off()
  invColor.draw()
  invUI.draw()
  strokeWeight(1)
  push()
  fill(154, 161, 156)
  rect(150, 1, man.maxHealth / 2, 10)
  pop()
  push()
  if (man.health > 60) {
    fill(66, 255, 8)
  }
  else if (man.health > 25) {
    fill(255, 193, 8)
  } else fill(255, 0, 0)
  rect(150, 1, man.health / 2, 10)
  pop()
  camera.on()
  world.step();
  if (kb.pressing("z")) {
    camera.zoom = 1.5
    camera.x = constrain(man.x, 59, 325)
    camera.y = constrain(man.y, 59, 261)
    if (mouseOverlap == "door") {
      fill("blue")
    }
    else if (mouseOverlap == "item") {
      fill("yellow")
    }
    circle(mouse.x, mouse.y, 5 / 1.3)
    strokeWeight(0)
  }
  else {
    camera.zoom = 1
    camera.x = constrain(man.x, 92, 292)
    camera.y = constrain(man.y, 92, 228)
    if (mouseOverlap == "door") {
      fill("blue")
    }
    else if (mouseOverlap == "item") {
      fill("yellow")
    }
    circle(mouse.x, mouse.y, 5)
    strokeWeight(4)

  }


}


function pickUp(item) {
  for (let i = 0; i < maxInv; i++) {
    if (inventory[i] == "") {
      console.log(inventory)
      inventory[i] = item
      item.visible = false;
      item.update()
      invUI[i].image = item.image
      invUI[i].image.scale = 0.2
      break
    }
  }
}

function drop(loc) {
  if (inventory[loc] != "") {
    console.log("this will drop item in location", loc)
    inventory[loc].update()
    inventory[loc].x = man.x
    inventory[loc].y = man.y
    inventory[loc].room = currentLevel
    inventory[loc].visible = true;
    inventory[loc].scale = 1.2
    inventory[loc] = ""
    invUI[loc].image = emptyInvSlot
  }

  // console.log(inventory)


}

function use(loc) {
  if (inventory[loc] != "") {
    if (inventory[loc].consumable) {
      console.log("this will use item in location", loc)
      if (man.health < man.maxHealth) {
        inventory[loc].update()
        man.health += inventory[loc].health
        if (man.health > man.maxHealth) man.health = man.maxHealth
        inventory[loc].room = -1
        inventory[loc].visible = false;
        inventory[loc] = ""
        invUI[loc].image = emptyInvSlot
      }
    }
  }

}
// function spriteOrder(){
//   tilefloor.draw();
//   platforms.draw();
//   blocks.draw();
//   spikes.draw();
//   if (apple){apple.draw()}
//   man.draw();
// }


function drawInv() {
  invUI = new Group()
  invUI.collider = "none"
  invUI.image = emptyInvSlot
  for (let i = 0; i < maxInv; i++) {
    new invUI.Sprite(40 + i * 16, 190, 15, 15,)
    invUI.layer = -1
  }
  invColor = new Group()
  invColor.collider = "none"
  invColor.color = "black"
  for (let i = 0; i < maxInv; i++) {
    new invColor.Sprite(40 + i * 16, 190, 15, 15,)
    invColor.layer = -1
  }

}

function keyPressed() {
  if (key >= 1 && key <= 9) {
    selectedItem = key - 1
  }
}

function mouseWheel(event) {
  selectedItem = (selectedItem + (event.delta / 100)) % 9
  if (selectedItem < 0) {
    selectedItem = 8
  }
}

function mousePressed() {


  if ((mouseY >= 180) && (mouseY <= 205) && (mouseX >= 35) && (mouseX <= 173)) {
    selectedItem = Math.floor((mouseX - 35) / 16)
  }
  if (mouseButton === RIGHT) {
    drop(selectedItem)
  }
  if (mouseButton === LEFT) {
    use(selectedItem)
  }

}

function changeLevel(x) {
  // console.log("player changed at", man.x, man.y, manSensor.overlapping(doors))
  // console.log(level)
  setLevel.removeAll()
  setLevel = new Tiles(level[x].layout, 0, 0, 16, 16)
  if (man.x > 291 + 100) {

    man.x = 16
    man.y = 30
  }
  else if (man.x < 93 - 100) {
    man.x = 370
    man.y = 30
    // console.log(man.x, man.y)
  }
  currentLevel = x

}


function resetItems() {
  invUI.image = emptyInvSlot
  for (i = 0; i < invUI.length; i++) {
    invUI[i].image = emptyInvSlot
  }
  spriteSetup()
  apple.visible = true
  apple.consumable = true
  apple.x = 200;
  apple.y = 100;
  apple.health = floor(random(25, 35))
  apple.room = 0;
  pick.consumable = false
  pick.x = 200;
  pick.y = 100;
  pick.dmg = floor(random(10, 12))
  pick.room = 1;
  pick.visible = true
  spade.x = 50;
  spade.consumable = false
  spade.y = 150;
  spade.dmg = floor(random(4, 7))
  spade.room = 1;
  spade.visible = true;

  hammer.x = 100;
  hammer.consumable = false
  hammer.y = 250;
  hammer.dmg = floor(random(13, 17))
  hammer.room = 0;
  hammer.visible = true;

  sword.x = 250;
  sword.consumable = false
  sword.y = 150;
  sword.dmg = floor(random(15, 21)) //() =>
  sword.room = 2;
  sword.visible = true;

  console.log("is this worlk")
  console.log("pick", pick.dmg, "hammer", hammer.dmg, "spade", spade.dmg, "sword", sword.dmg, "apple", apple.health)
}

function spriteSetup() {
  items.removeAll()
  items = new Group();
  apple = new items.Sprite();
  apple.scale = 0.24
  apple.image = appleImage
  pick = new items.Sprite()
  pick.image = pickImage;
  pick.scale = 0.24
  spade = new items.Sprite();
  spade.image = spadeImage;
  spade.scale = 0.24;

  hammer = new items.Sprite();
  hammer.image = hammerImage;
  hammer.scale = 0.24;

  sword = new items.Sprite();
  sword.image = swordImage;
  sword.scale = 0.24;
  items.collider = "none"
  items.layer = 8;
}

function drawItems() {
  for (let i = 0; i < items.length; i++) {
    // console.log(i, items[i], items[i].room)
    if (items[i].room == currentLevel && inventory.indexOf(items[i]) == -1) {
      items[i].visible = true;
    }
    else items[i].visible = false;
  }


  // console.log(items[0].room, "e")

}

function drawEnemies() {
  if (unknownEntity.health > 0 && unknownEntity.room == currentLevel) {
    unknownEntity.visible = true
    unknownEntity.collider = "dynamic"
    unknownEntity.changeAni('walk')
    unknownEntity.moveTowards(man.x, man.y, 0.01)
    if (unknownEntity.overlapping(man)) {
      if (frameCount - ueFrame > unknownEntity.attackSpeed) {
        unknownEntity.changeAni('attack')
        man.health -= 20
        ueFrame = frameCount
      }
    }
  }
  else {
    unknownEntity.visible = false
    unknownEntity.collider = "none"
  }
  unknownEntity.rotation = 0
}