let startTime;
let isLoading = false;
let loadingGroup;

function setupLoading() {
    startTime = millis();
    isLoading = true;

    loadingGroup = new Group();

    let loadingText = new loadingGroup.Sprite(0, 0, 0, 0);
    loadingText.x = width/2;
    loadingText.y = height/2;
    loadingText.text = "processing...";
    loadingText.textSize = 50;
    loadingText.collider = 'none';
    loadingText.color = color(0);

}

function drawLoading() {
    if (!isLoading) return;
    
    background(12, 200, 255);
    
    
    if (millis() - startTime >= 2000) {
        isLoading = false;
        loadingGroup.remove();

        if (currentScene == 'initial') {
            setupInitial();
        }
        else if(currentScene == 'puzzle'){
            setupPuzzle();
        }
        else if(currentScene == 'bingo'){
            setupBingo();
        }
        else if(currentScene == 'pool'){
            setupPool();
        }
        else if (currentScene == 'flappy'){
            setupFlappy();
        }
        else if (currentScene == 'end') {
            setupEnd();
        }
    }
}