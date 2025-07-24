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

const SCALE = 0.8;
const BOXOFFSETX = 950 * SCALE;
const BOXOFFSETY = -10 * SCALE;
let box, door, balls, resetBall, track, end, phoneNumber;

function setupBingo()
{
    textSize(50);
    angleMode('degrees');

    

    world.gravity.y = 20;

   

    box = new Sprite([[(460 + BOXOFFSETX) * SCALE, (300 + BOXOFFSETY) * SCALE], [(300 + BOXOFFSETX) * SCALE, (300 + BOXOFFSETY) * SCALE], [(300 + BOXOFFSETX) * SCALE, (700 + BOXOFFSETY) * SCALE], [(700 + BOXOFFSETX) * SCALE, (700 + BOXOFFSETY) * SCALE], [(700 + BOXOFFSETX) * SCALE, (300 + BOXOFFSETY) * SCALE], [(540 + BOXOFFSETX) * SCALE, (300 + BOXOFFSETY) * SCALE]]);
    box.shape = "chain";
    box.physics="KIN";
    // box.debug = true;
    box.offset.x=-50*SCALE;
    box.offset.y=-200 * SCALE;
    box.color = 'black';

    door = new Sprite([[(460 + BOXOFFSETX) * SCALE, (300 + BOXOFFSETY) * SCALE], [(540 + BOXOFFSETX) * SCALE, (300 + BOXOFFSETY) * SCALE]]);
    door.shape = "chain";
    door.physics = "KIN"
    // door.debug = true;
    door.offset.x= -50 * SCALE;
    door.offset.y= -200 * SCALE;
    door.color = 'red';
    door.open = false;

    balls = new Group();
    balls.radius = 30 * SCALE;
    balls.x = (i) => (350 + BOXOFFSETX + 70 * (i % 3)) * SCALE + Math.random() * 5;
    balls.y = (i) => (120 + BOXOFFSETY + 70 * Math.floor(i / 3)) * SCALE + Math.random() * 5;
    balls.amount = 10;
    balls.text = (i) => displayNumbers[i];
    balls.textSize = 24 * SCALE;
    balls.used = false;
    balls.forEach((ball) => {
        ball.digit = balls.indexOf(ball);
        ball.update = updateBall;
    });

    resetBall = new Sprite();
    resetBall.radius = 30 * SCALE;
    resetBall.x = (350 + BOXOFFSETX + 140) * SCALE;
    resetBall.y = (120 + BOXOFFSETY + 210) * SCALE;
    resetBall.text = 'RESET';
    resetBall.textSize = 15 * SCALE;
    resetBall.update = updateReset;
    resetBall.resetting = false;
    

    track = new Sprite([[1700 * SCALE, 700 * SCALE], [700 * SCALE, 800 * SCALE]]);
    track.shape = 'chain';
    track.physics = "KIN";
    track.color = 'black';

    end = new Sprite([[700 * SCALE, 800 * SCALE], [100 * SCALE, 800 * SCALE], [100 * SCALE, 730 * SCALE]]);
    end.shape = 'chain';
    end.physics = "KIN";
    end.color = 'blue';

    phoneNumber = '';

    balls.collides(end, addDigit);
    function addDigit(ball, end) {
        if (!ball.used) {
            ball.used = true;
            let newBall = new balls.Sprite();
            newBall.x = (400 + BOXOFFSETX) * SCALE;
            newBall.y = (170 + BOXOFFSETY) * SCALE;
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
    submitButton.x = (width/2 + 300);
    submitButton.y = (height/2 + 300);
    submitButton.width = 150 * SCALE;
    submitButton.height = 50 * SCALE;
    submitButton.color = 'green';
    submitButton.text = 'Submit';
    submitButton.textSize = 30 * SCALE;
    submitButton.physics = 'NONE';
    submitButton.collider = 'static';
}

function updateReset() {
        if (this.x < 0 || this.x > canvas.w || this.y < 0 || this.y > canvas.h) {
            this.x = (350 + BOXOFFSETX + 140) * SCALE;
            this.y = (120 + BOXOFFSETY + 210) * SCALE;
            resetBall.resetting = false;
        }
    }

function updateBall() {
    if (this.x < 0 || this.x > canvas.w || this.y < 0 || this.y > canvas.h) {
        if (!this.used) {
            this.x = (400 + BOXOFFSETX) * SCALE;
            this.y = (170 + BOXOFFSETY) * SCALE;
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
    text('Phone number:', 20 * SCALE, 620 * SCALE);
    text(phoneNumber, 200 * SCALE, 700 * SCALE);
    text('[Space] to open/close box door', 100 * SCALE, 160 * SCALE);
    textSize(60 * SCALE);
    text("Please verify your verified phone number", 100 * SCALE, 100 * SCALE);
    textSize(50 * SCALE);

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