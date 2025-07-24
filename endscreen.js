let retryButton;

function setupEnd() {
    
    retryButton = new Sprite();
    retryButton.x = width/2 + 100;
    retryButton.y = height/2 + 50;
    retryButton.width = 150;
    retryButton.height = 50;
    retryButton.color = 'blue';
    retryButton.text = 'Try Again';
    retryButton.textSize = 30;
    retryButton.physics = 'NONE';
    retryButton.collider = 'static';
}

function drawEnd() {
    background(12, 200, 255);
    
    fill(0);
    textAlign(CENTER);
    textSize(50);
    endText = allCorrect ? "You have verified your phone number" : "Verification Failed!";
    text(endText, width/2, height/2 - 100);

    textSize(30);
    textAlign(RIGHT);
    text("try again?", width/2 - 20, height/2 + 60);

    if(retryButton.mouse.hovering()) {
        retryButton.color = color(0, 0, 200);
        if(mouse.pressed()) {
            allSprites.remove();
            currentScene = 'initial';
            setupInitial();
        }
    } else {
        retryButton.color = 'blue';
    }
    

}