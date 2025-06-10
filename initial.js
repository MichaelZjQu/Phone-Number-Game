let initialValues = [0,0,0,0,0,0,0,0,0,0]
let resetButton, submitButton;
let upButtons = [];
let downButtons = [];

function setupInitial(){
    textFont(font);
    textSize(100);

    textAlign(LEFT, BASELINE);

    
    for(let i = 0; i < 10; i++){
        let adjustment = -500 + width/2 + Math.floor(i == 9 ? 2 : i/3) * 50;

        let up = new Sprite([[100*(i) + adjustment, height/2 - 80], [100*(i)+50+ adjustment, height/2 - 80], [100*(i) + 25 + adjustment, height/2 - 100], [100*(i)+ adjustment, height/2 - 80]]);
        up.hovering = false;
        up.index = i;
        upButtons.push(up);
        
        let down = new Sprite([[100*(i) + adjustment, height/2 + 20], [100*(i)+50+ adjustment, height/2 + 20], [100*(i) + 25 + adjustment, height/2 + 40], [100*(i)+ adjustment, height/2 + 20]])
        down.hovering = false;
        down.index = i;
        downButtons.push(down);
    }

    resetButton = new Sprite();
    resetButton.x = width/2 - 100;
    resetButton.y = height/2 + 200;
    resetButton.width = 150;
    resetButton.height = 50;
    resetButton.color = 'red';
    resetButton.text = 'Reset';
    resetButton.textSize = 30;

    
    submitButton = new Sprite();
    submitButton.x = width/2 + 100;
    submitButton.y = height/2 + 200;
    submitButton.width = 150;
    submitButton.height = 50;
    submitButton.color = 'green';
    submitButton.text = 'Submit';
    submitButton.textSize = 30;

}

function drawInitial(){
    background(12,200,255);

    textSize(100);
    
    textAlign(CENTER);
    text("Please enter your phone number:", width/2, height/2 - 200);
    
    textAlign(LEFT);
    
    for(let num = 0; num < 10; num++){
        let adjustment = -500 + width/2 + Math.floor(num == 9 ? 2 : num/3) * 50;
        text(initialValues[num], adjustment + num*100, height/2);
    }

    for(const tri of upButtons){
        if(tri.mouse.hovering()){
            if(mouse.pressed()){
                initialValues[tri.index] = (initialValues[tri.index] + 1) % 10;
            }
            if(!tri.hovering){
                tri.color = color(255-red(tri.color), 255-green(tri.color), 255-blue(tri.color));
                tri.hovering = true;
            }      
        } else {
            if(tri.hovering){
                tri.color = color(255-red(tri.color), 255-green(tri.color), 255-blue(tri.color));
            }
            tri.hovering = false;
        }
    }

    for(const tri of downButtons){
        if(tri.mouse.hovering()){
            if(mouse.pressed()){
                let result = initialValues[tri.index] - 1;
                initialValues[tri.index] = result < 0 ? 9 : result;
            }
            if(!tri.hovering){
                tri.color = color(255-red(tri.color), 255-green(tri.color), 255-blue(tri.color));
                tri.hovering = true;
            }      
        } else {
            if(tri.hovering){
                tri.color = color(255-red(tri.color), 255-green(tri.color), 255-blue(tri.color));
            }
            tri.hovering = false;
        }
    }

    if(resetButton.mouse.hovering()){
        resetButton.color = color(200, 0, 0);
        if(mouse.pressed()){
            initialValues = [0,0,0,0,0,0,0,0,0,0];
        }
    } else {
        resetButton.color = 'red';
    }

    if(submitButton.mouse.hovering()){
        submitButton.color = color(0, 200, 0);
        if(mouse.pressed()){
            allSprites.remove();
            setupLoading();
            currentScene = 'puzzle'; 
        }
    } else {
        submitButton.color = 'green';
    }


}