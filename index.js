var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const paddle_thickness = 10;
const paddle_height = 100;

var player1Score = 0;
var player2Score = 0;


//this function is used to get the co-ordinates of mouse
function calculateMousePos( e ) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    return {
        x : mouseX,
        y : mouseY
    };
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas'); //made the canvas 
    canvasContext = canvas.getContext('2d');
    //this var is used for determining time interval for frame
    var fps = 30;
    setInterval(function (){
        moveEverything();
        drawEverything();
    }, 1000/fps);

    //this listen to the change in position of mouse to change the position the player paddle
    canvas.addEventListener( 'mousemove', e => {
        var mousePos = calculateMousePos(e);
        paddle1Y = mousePos.y - (paddle_height / 2);
    });
};

//this funtion resets the ball to center
function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (paddle_height / 2);

    if (paddle2YCenter < ballY - 35){
        paddle2Y += 6;
    } else if(paddle2YCenter > ballY + 35 ){
        paddle2Y -= 6;
    }
}

// this function is used to move the ball in the game
function moveEverything(){
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddle_height){
            ballSpeedX = -ballSpeedX;
        }else{
            ballReset();
            player2Score++;
        }
    }
    if(ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddle_height){
            ballSpeedX = -ballSpeedX;
        }else{
            ballReset();
            player1Score++;
        }
    }

    if(ballY > canvas.height || ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

//this function is used to draw everything on the browser
function drawEverything(){
    // This is used to draw black background
    colorRect(0,0,canvas.width, canvas.height,'black');

    // this used to make left player paddle
    colorRect(0, paddle1Y, paddle_thickness, paddle_height, 'white');

    // this uset to make right player paddle
    colorRect(canvas.width - paddle_thickness, paddle2Y, paddle_thickness, paddle_height, 'white');

    // this makes the ball for us
    colorCircle(ballX, ballY, 10, 'white');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);
}


//this function makes the actual component which we call in drawEverything to make those.
function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

//this fuction makes the circular ball 
function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}