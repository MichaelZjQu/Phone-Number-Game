const displayNumbers = {
    0: 'O',
    1: 'un',
    2: 'II',
    3: '3',
    4: '4',
    5: 'V',
    6: 'SIX',
    7: '7',
    8: '8',
    9: 'NINE',
};

const BOXOFFSETX = 950;
const BOXOFFSETY = -10;
let box, door, balls, resetBall, track, end, phoneNumber;

function setupBingo()
{
    textSize(50);
    angleMode('degrees');

    

    world.gravity.y = 20;

   

    box = new Sprite([[460 + BOXOFFSETX,300 + BOXOFFSETY],[300 + BOXOFFSETX,300 + BOXOFFSETY],[300 + BOXOFFSETX,700 + BOXOFFSETY],[700 + BOXOFFSETX,700 + BOXOFFSETY],[700 + BOXOFFSETX,300 + BOXOFFSETY],[540 + BOXOFFSETX,300 + BOXOFFSETY]]);
    box.shape = "chain";
    box.physics="KIN";
    // box.debug = true;
    box.offset.x=-50;
    box.offset.y=-200;
    box.color = 'black';

    door = new Sprite([[460 + BOXOFFSETX, 300 + BOXOFFSETY], [540 + BOXOFFSETX, 300 + BOXOFFSETY]]);
    door.shape = "chain";
    door.physics = "KIN"
    // door.debug = true;
    door.offset.x=-50;
    door.offset.y=-200;
    door.color = 'red';
    door.open = false;

    balls = new Group();
    balls.radius = 30;
    balls.x = (i) => 350 + BOXOFFSETX + 70 * (i % 3) + Math.random() * 5;
    balls.y = (i) => 120 + BOXOFFSETY + 70 * Math.floor(i / 3) + Math.random() * 5;
    balls.amount = 10;
    balls.text = (i) => displayNumbers[i];
    balls.textSize = 24;
    balls.used = false;
    balls.forEach((ball) => {
        ball.digit = balls.indexOf(ball);
        ball.update = updateBall;
    });

    resetBall = new Sprite();
    resetBall.radius = 30;
    resetBall.x = 350 + BOXOFFSETX + 140;
    resetBall.y = 120 + BOXOFFSETY + 210;
    resetBall.text = 'RESET';
    resetBall.textSize = 15;
    resetBall.update = updateReset;
    resetBall.resetting = false;
    

    track = new Sprite([[1700, 700], [700, 800]]);
    track.shape = 'chain';
    track.physics = "KIN";
    track.color = 'black';

    end = new Sprite([[700, 800], [100, 800], [100, 730]]);
    end.shape = 'chain';
    end.physics = "KIN";
    end.color = 'blue';

    phoneNumber = '';

    balls.collides(end, addDigit);
    function addDigit(ball, end) {
        if (!ball.used) {
            ball.used = true;
            let newBall = new balls.Sprite();
            newBall.x = 400 + BOXOFFSETX;
            newBall.y = 170 + BOXOFFSETY;
            newBall.digit = ball.digit;
            newBall.text = displayNumbers[newBall.digit];
            newBall.update = updateBall;
            if (phoneNumber.length === 3 || phoneNumber.length === 7) {
                phoneNumber += '-';
            }
            phoneNumber += ball.digit;
        }
    }


    submitButton = new Sprite();
    submitButton.x = width/2 + 300;
    submitButton.y = height/2 + 400;
    submitButton.width = 150;
    submitButton.height = 50;
    submitButton.color = 'green';
    submitButton.text = 'Submit';
    submitButton.textSize = 30;
    submitButton.physics = 'NONE';
    submitButton.collider = 'static';
}

function updateReset() {
        if (this.x < 0 || this.x > canvas.w || this.y < 0 || this.y > canvas.h) {
            this.x = 350 + BOXOFFSETX + 140;
            this.y = 120 + BOXOFFSETY + 210;
            resetBall.resetting = false;
        }
    }

function updateBall() {
    if (this.x < 0 || this.x > canvas.w || this.y < 0 || this.y > canvas.h) {
        if (!this.used) {
            this.x = 400 + BOXOFFSETX;
            this.y = 170 + BOXOFFSETY;
        } else {
            this.remove();
        }
    }
}



function reset() {
    door.collides(balls);
    door.collides(resetBall);
    door.color = 'red';
    end.rotate(360, -1);
    phoneNumber = '';
}

function drawBingo() {
    clear();
    background('white');
    box.rotateTowards(mouse, 0.1, 0);
    door.rotateTowards(mouse, 0.1, 0);

    if (kb.presses(' ')) {
        door.open = !door.open
        if (door.open) {
            door.overlaps(balls);
            door.overlaps(resetBall);
            door.color = 'green';
        } else {
            door.collides(balls);
            door.collides(resetBall);
            door.color = 'red';
        }
    }

    if (resetBall.collides(end) && !resetBall.resetting) {
        resetBall.resetting = true;
        reset();
    }
    text('Phone number:', 200, 620);
    text(phoneNumber, 200, 700);
    text('[Space] to open/close box door', 100, 160);
    textSize(60);
    text("Please verify your verified phone number", 100, 100);
    textSize(50);

    if(submitButton.mouse.hovering()){
        submitButton.color = color(0, 200, 0);
        if(mouse.pressed()){
            allSprites.remove();
            if(phoneNumber.replaceAll('-', '') !== realNumber) allCorrect = false;
            setupLoading();
            currentScene = 'flappy'; 
        }
    } else {
        submitButton.color = 'green';
    }
}