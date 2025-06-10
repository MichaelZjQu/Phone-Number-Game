let bird;
let pipes = [];
let phoneNum = [];
let nextDirection = 1;

const RAINBOW = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

// Class to render and update the player (flappy bird)  
class Bird {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.height = height/50; this.width = this.height; 
    this.velocityY = 0;
    this.color = color(255, 255, 255);
  }
  // activates on click
  flap() {
    this.velocityY = -7;
  }
  // updates position using velocity
  update() {
    this.velocityY += 0.4; // acceleration
    this.y += this.velocityY;
    this.y = constrain(this.y, 0, height - this.height);
  }
  draw() {
    fill(this.color);
    noStroke(); // no outline
    rect(this.x, this.y, this.width, this.height);
  }
}

// Class to render and update the obstacles (pipes) 
class Pipe {
  constructor(x, dir) {
    this.x = x;
    this.width = 60;
    this.speed = 2;
    this.passed = false;

    this.visible = 5; // minimum number of visible blocks 
    this.blockH = height / this.visible;
    this.offset = 0;
    this.baseIndex = 0;         
    this.scrollSpeed = 1.5 * dir;

    this.valueMap = {}; // random digits
    this.colorMap = {}; // random colors
  }
  // returns the digit associated with the k-th indexed block  
  getValue(k) {
    if (k % 3 === 0) return null;
    if (!(k in this.valueMap)) {
      this.valueMap[k] = floor(random(0, 10));
    }
    return this.valueMap[k];
  }
  // returns the color associated with the k-th indexed block  
  getColor(k) {
    if (!(k in this.colorMap)) {
      this.colorMap[k] = random(RAINBOW);
    }
    return this.colorMap[k];
  }
 
  update() {
    this.x -= this.speed;
    this.offset += this.scrollSpeed;
    // offset for pipes that move downwards (negative scrollSpeed)
    while (this.offset >= this.blockH) {
      this.offset -= this.blockH;
      this.baseIndex++;
    }
    // offset for pipes that move upwards (positive scrollSpeed)
    while (this.offset < 0) {
      this.offset += this.blockH;
      this.baseIndex--;
    }
  }
  draw() {
    textAlign(CENTER, CENTER);
    textSize(this.blockH * 0.5);
    // draw each visible block of the pipe
    for (let j = -1; j <= this.visible; j++) {
      let y0 = j * this.blockH - this.offset;
      if (y0 + this.blockH > 0 && y0 < height) {
        let k = this.baseIndex + j;
        // color 
        fill(color(this.getColor(k))); 
        noStroke();
        rect(this.x, y0, this.width, this.blockH - 4);
        // digit
        let v = this.getValue(k);
        if (v !== null) {
          fill(255);
          noStroke();
          text(v, this.x + this.width/2, y0 + this.blockH/2);
        }
      }
    }
  }

  // returns a digit if the player exits a block with a number
  checkInput(bird) {
    let midX = this.x + this.width/2;
    if (!this.passed && midX < bird.x + bird.width/2) {
      this.passed = true;
      let j = floor((bird.y + this.offset) / this.blockH);
      let k = this.baseIndex + j;
      bird.color = color(this.getColor(k));
      
      return this.getValue(k);
    }
    return null;
  }
  // returns if the pipe has gone past the screen
  offscreen() {
    return this.x + this.width < 0;
  }
}

function setupFlappy() {

  bird = new Bird(width * 0.2, height / 2);
  // pipes.push(new Pipe(width, nextDirection));
  nextDirection *= -1; // alternate direction
}

function drawFlappy() {
  background('#4A86FF'); 

  // draw bird
  bird.update();
  bird.draw();

  // draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    let p = pipes[i];
    p.update();
    p.draw();
    let d = p.checkInput(bird);
    if (d !== null) phoneNum.push(d);
    if (p.offscreen()) pipes.splice(i, 1);
  }

  // add new pipes
  if (frameCount % 120 === 0) {
    pipes.push(new Pipe(width, nextDirection));
    nextDirection *= -1;
  }

  // phone number display  
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, 0, width, 30);
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text("Confirm Phone Number: " + phoneNum.join(""), 10, 15);


  if(phoneNum.length >= 10) {
    allSprites.remove();
    setupLoading();
    currentScene = 'pool';

  }
}

function mousePressed() {
  bird.flap();
}
