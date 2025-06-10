let numValues;




function setupPuzzle(){
    
    

    numValues = initialValues.slice();
    //mod bug workaround
    numValues[9] = (((numValues[9] -1 ) % 10)+10)%10
    upButtons = [];
    downButtons = [];
    textFont(font);
    textSize(100);

    for(let i = 0; i < 10; i++){
        adjustment = -500 + width/2 + Math.floor(i == 9 ? 2 : i/3) * 50;

        let up = new Sprite([[100*(i) + adjustment, height/2 - 80], [100*(i)+50+ adjustment, height/2 - 80], [100*(i) + 25 + adjustment, height/2 - 100], [100*(i)+ adjustment, height/2 - 80]]);
        up.hovering = false;
        up.index = i; 

        upButtons.push(up);
        
        let down = new Sprite([[100*(i) + adjustment, height/2 + 20], [100*(i)+50+ adjustment, height/2 + 20], [100*(i) + 25 + adjustment, height/2 + 40], [100*(i)+ adjustment, height/2 + 20]])
        down.hovering = false;
        down.index = i;
        downButtons.push(down);

    }

    submitButton = new Sprite();
    submitButton.x = width/2 + 100;
    submitButton.y = height/2 + 200;
    submitButton.width = 150;
    submitButton.height = 50;
    submitButton.color = 'green';
    submitButton.text = 'Submit';
    submitButton.textSize = 30;


}

function drawPuzzle() {
    clear();
    background(12,200,255);

    
    textAlign(CENTER);
    text("Please verify your phone number", width/2, height/2 - 200);

    textAlign(LEFT);
    for(let num = 0; num < 10; num++){
        text(numValues[num], -500 + width/2 + num*100 + Math.floor(num == 9 ? 2 : num/3) * 50, height/2);
    }
    for(const tri of upButtons){
        if(tri.mouse.hovering()){
        if(mouse.pressed()){
            numValues[tri.index] = (numValues[tri.index] + 1) % 10;
            numValues[(tri.index+1)%10] = (numValues[(tri.index+1)%10] + 2) % 10;
        }
        if(!tri.hovering){
            tri.color = color(255-red(tri.color), 255-green(tri.color), 255-blue(tri.color));
            tri.hovering = true;
            console.log(numValues[0]);
        }      
        
        }else{
        if(tri.hovering){
            tri.color = color(255-red(tri.color), 255-green(tri.color), 255-blue(tri.color));
        }
        tri.hovering = false;
        }

    }
    for(const tri of downButtons){
        if(tri.mouse.hovering()){
        if(mouse.pressed()){
            //modulo bug workaround
            let result = (numValues[tri.index] - 1)
            numValues[tri.index] = ((result % 10) + 10) %10;
            result = (numValues[(tri.index+1)%10] - 2)
            numValues[(tri.index+1)%10] = ((result % 10) + 10) %10;
        }
        if(!tri.hovering){
            tri.color = color(255-red(tri.color), 255-green(tri.color), 255-blue(tri.color));
            tri.hovering = true;
        }      
        
        }else{
        if(tri.hovering){
            tri.color = color(255-red(tri.color), 255-green(tri.color), 255-blue(tri.color));
        }
        tri.hovering = false;
        }
    }

    if(submitButton.mouse.hovering()){
        submitButton.color = color(0, 200, 0);
        if(mouse.pressed()){
            allSprites.remove();
            setupLoading();
            currentScene = 'bingo'; 
        }
    } else {
        submitButton.color = 'green';
    }
}