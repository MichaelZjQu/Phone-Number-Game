let currentScene = 'initial'


function preload() {
  font = loadFont('assets/SourceSans3-VariableFont_wght.ttf');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  setupInitial();
}

function draw(){
  if(isLoading) {
    drawLoading();
  }
  else if (currentScene == 'initial') {
    drawInitial();
  }
  else if (currentScene == 'puzzle') {
    drawPuzzle();
  } 
  else if (currentScene == 'bingo') {
    drawBingo();
  } 
  else if (currentScene == 'pool') {
    drawPool();
  } 
  else if (currentScene == 'flappy') {
    drawFlappy();
  }
  else if (currentScene == 'end') {
    drawEnd();
  }

}