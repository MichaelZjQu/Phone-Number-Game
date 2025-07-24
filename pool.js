let phone_number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
 
let hole_width = 100;
let half_hw = hole_width/2;
let hole_angle = 60;
let wall_thickness = 50;

let level, cue_ball, pool_balls, digits;

function setupPool(){

    world.gravity.y = 0;

    stroke('black');

    let halfWidth = width/2;
    let halfHeight = height/2;

    level = new Group()
    level.physics = STATIC;
    level.color = "brown";
    let a = new level.Sprite([[0, hole_width/Math.sqrt(2)], [wall_thickness, hole_width/Math.sqrt(2) + wall_thickness*(1/Math.tan(45 * Math.PI/180))], [wall_thickness, height/2 - hole_width/2 - wall_thickness*(1/Math.tan(hole_angle * Math.PI/180))], [0, height/2 - hole_width / 2], [0, hole_width/Math.sqrt(2)]]);
    let b = new level.Sprite([[0, height - hole_width/Math.sqrt(2)], [0, height/2 + hole_width/2], [wall_thickness, height/2 + hole_width/2 + (1/Math.tan(hole_angle * Math.PI/180)) * wall_thickness], [wall_thickness, height - hole_width/Math.sqrt(2) - wall_thickness*(1/Math.tan(45 * Math.PI/180))], [0, height - hole_width/Math.sqrt(2)]]);
    let c = new level.Sprite([[hole_width/Math.sqrt(2), height], [hole_width/Math.sqrt(2) + wall_thickness*(1/Math.tan(45 * Math.PI/180)), height - wall_thickness], [width/3 - hole_width/2 - wall_thickness*(1/Math.tan(hole_angle * Math.PI/180)), height - wall_thickness], [width/3 - hole_width/2, height], [hole_width/Math.sqrt(2), height]]);
    let d = new level.Sprite([[width/3 + hole_width/2, height], [width/3 + hole_width/2 + 1/Math.tan(hole_angle * Math.PI/180)*wall_thickness, height - wall_thickness], [2*width/3 - hole_width/2 - wall_thickness*(1/Math.tan(hole_angle * Math.PI/180)), height - wall_thickness], [2*width/3 - hole_width/2, height], [width/3 + hole_width/2, height]])
    let e = new level.Sprite([[2*width/3 + hole_width/2, height], [2*width/3 + hole_width/2 + 1/Math.tan(hole_angle * Math.PI/180)*wall_thickness, height - wall_thickness], [width - wall_thickness*(1/Math.tan(45 * Math.PI/180)) - hole_width/Math.sqrt(2), height - wall_thickness], [width - hole_width/Math.sqrt(2), height], [2*width/3 + hole_width/2, height]])
    let f = new level.Sprite([[width, hole_width/Math.sqrt(2)], [width - wall_thickness, hole_width/Math.sqrt(2) + wall_thickness*(1/Math.tan(45 * Math.PI/180))], [width - wall_thickness, height/2 - hole_width/2 - wall_thickness*(1/Math.tan(hole_angle * Math.PI/180))], [width, height/2 - hole_width / 2], [width, hole_width/Math.sqrt(2)]]);
    let g = new level.Sprite([[width, height - hole_width/Math.sqrt(2)], [width, height/2 + hole_width/2], [width - wall_thickness, height/2 + hole_width/2 + (1/Math.tan(hole_angle * Math.PI/180)) * wall_thickness], [width - wall_thickness, height - hole_width/Math.sqrt(2) - wall_thickness*(1/Math.tan(45 * Math.PI/180))], [width, height - hole_width/Math.sqrt(2)]]);
    let h = new level.Sprite([[hole_width/Math.sqrt(2), 0], [hole_width/Math.sqrt(2) + wall_thickness*(1/Math.tan(45 * Math.PI/180)), wall_thickness], [width/3 - hole_width/2 - wall_thickness*(1/Math.tan(hole_angle * Math.PI/180)), wall_thickness], [width/3 - hole_width/2, 0], [hole_width/Math.sqrt(2), 0]]);
    let i = new level.Sprite([[width/3 + hole_width/2, 0], [width/3 + hole_width/2 + 1/Math.tan(hole_angle * Math.PI/180)*wall_thickness, wall_thickness], [2*width/3 - hole_width/2 - wall_thickness*(1/Math.tan(hole_angle * Math.PI/180)), wall_thickness], [2*width/3 - hole_width/2, 0], [width/3 + hole_width/2, 0]])
    let j = new level.Sprite([[2*width/3 + hole_width/2, 0], [2*width/3 + hole_width/2 + 1/Math.tan(hole_angle * Math.PI/180)*wall_thickness, wall_thickness], [width - wall_thickness*(1/Math.tan(45 * Math.PI/180)) - hole_width/Math.sqrt(2), wall_thickness], [width - hole_width/Math.sqrt(2), 0], [2*width/3 + hole_width/2, 0]])
    
    cue_ball = new Sprite();
    cue_ball.x = width/4;
    cue_ball.y = height/2;
    cue_ball.diameter = 50;
    cue_ball.bounciness = 1;
    cue_ball.drag = 0.5;
    cue_ball.color = "white";
    ball_coords = [[halfWidth+5, halfHeight], [halfWidth+50, halfHeight-25], [halfWidth+50, halfHeight+25], [halfWidth+100-5, halfHeight-50], [halfWidth+100-5, halfHeight], [halfWidth+100-5, halfHeight+50], [halfWidth+150-10, halfHeight-75], [halfWidth+150-10, halfHeight-25], [halfWidth+150-10, halfHeight+25], [halfWidth+150-10, halfHeight+75]]
    ball_colors = [color(200, 175, 0), color(200, 0, 0), color(0, 0, 125), color(125, 0, 175), color(255, 125, 0), "green", color(255, 150, 150), color(50, 50, 50), color(100, 50, 0), color(0, 125, 125)]
    
    textSize(30);
    
    pool_balls = new Group();
    digits = new Group();
    digits.physics = STATIC;
    
    for (let i = 0; i < ball_coords.length; i++) {
        let b = new pool_balls.Sprite();
        b.x = ball_coords[i][0];
        b.y = ball_coords[i][1];
        b.diameter = 50;
        b.drag = 0.75;
        b.bounciness = 1;
        b.color = ball_colors[i];
        b.textSize = 20;
        b.index = i;
    
        let d = new digits.Sprite();
        d.x = width/2 - textWidth("0")*5 + textWidth("0")/2 + i*textWidth("0");
        d.y = 25;
        d.width = textWidth("0");
        d.height = 50;
        d.color = ball_colors[i];
    }
    
    fill("white");

}


 
function drawPool() {
    background("darkgreen");

    //check if the cue ball is out of bounds
    if(cue_ball.x < 0 || cue_ball.x > width || cue_ball.y < 0 || cue_ball.y > height){
        cue_ball.x = width / 4;
        cue_ball.y = height / 2;
        cue_ball.vel.x = 0;
        cue_ball.vel.y = 0;
    }
    
    text("0", 30, 60);
    text("1", width/3 - textWidth("1")/2, 60);
    text("2", 2*width/3 - textWidth("2")/2, 60);
    text("3", width-50, 60);
    text("4", width-50, height/2 + 25);
    text("5", width-50, height-25);
    text("6", 2*width/3 - textWidth("6")/2, height - 25);
    text("7", width/3 - textWidth("7")/2, height - 25);
    text("8", 25, height - 25);
    text("9", textWidth("9")/2, height/2 + 20);
 
    pool_balls.forEach((ball) => {
        console.log(ball.x);
        console.log(ball.y);
        if (width/3-half_hw < ball.x && ball.x < width/3+half_hw && ball.y < 0) {
            digits[ball.index].text = 1;
            phone_number[ball.index] = 1;
            ball.remove();
        }
        if (2*width/3-half_hw < ball.x && ball.x < 2*width/3+half_hw && ball.y < 0) {
            digits[ball.index].text = 2;
            phone_number[ball.index] = 2;
            ball.remove();
        }
        if (ball.x > width && ball.y > height/2-half_hw && ball.y < height/2+half_hw) {
            digits[ball.index].text = 4;
            phone_number[ball.index] = 4;
            ball.remove();
        }
        if (width/3-half_hw < ball.x && ball.x < width/3+half_hw && ball.y > height) {
            digits[ball.index].text = 7;
            phone_number[ball.index] = 7;
            ball.remove();
        }
        if (2*width/3-half_hw < ball.x && ball.x < 2*width/3+half_hw && ball.y > height) {
            digits[ball.index].text = 6;
            phone_number[ball.index] = 6;
            ball.remove();
        }
        if (ball.x < 0 && ball.y > height/2-half_hw && ball.y < height/2+half_hw) {
            digits[ball.index].text = 9;
            phone_number[ball.index] = 9;
            ball.remove();
        }
        if ((ball.x < 0 && ball.y < hole_width/Math.sqrt(2)) || (ball.y < 0 && ball.x < hole_width/Math.sqrt(2))) {
            digits[ball.index].text = 0;
            phone_number[ball.index] = 0;
            ball.remove();
        }
        if ((ball.x > width - hole_width/Math.sqrt(2) && ball.y < 0) || (ball.y < hole_width/Math.sqrt(2) && ball.x > width)) {
            digits[ball.index].text = 3;
            phone_number[ball.index] = 3;
            ball.remove();
        }
        if ((ball.x > width && ball.y > height - hole_width/Math.sqrt(2)) || (ball.y > height && ball.x > width - hole_width/Math.sqrt(2))) {
            digits[ball.index].text = 5;
            phone_number[ball.index] = 5;
            ball.remove();
        }
        if ((ball.x < 0 && ball.y < width - hole_width/Math.sqrt(2)) || (ball.y > height && ball.x < hole_width/Math.sqrt(2))) {
            digits[ball.index].text = 8;
            phone_number[ball.index] = 8;
            ball.remove();
        }
    });
 
    if (pool_balls.length == 0) {
        // PHONE NUMBER ENTERED
        // console.log(phone_number);
        allSprites.remove();
        if(phone_number.join('') !== realNumber) allCorrect = false;
        setupLoading();
        currentScene = 'end'; 
    }
 
    line(cue_ball.x, cue_ball.y, mouse.x, mouse.y);
 
    if (mouse.presses()) {
        cue_ball.bearing = cue_ball.angleTo(mouse);
        cue_ball.applyForce(-10 * dist(cue_ball.x, cue_ball.y, mouse.x, mouse.y));
    }
}