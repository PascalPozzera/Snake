

//get canvas
let canvas = document.getElementById("canvas");
//get context 2d
let ctx = canvas.getContext("2d");



//get score div
let scoreDisplay = document.getElementById("score");

//size of playground
let rows = 30;
let columns = 30;

//json snake
let snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];

//json food
let food = { x: canvas.width / 2, y: canvas.height / 2 };

//food collected
let foodCollected = false;

//cell width and cell height
//
let cellWidth = canvas.width / columns;
let cellHeight = canvas.height / rows;

//direction
let direction = "LEFT";

//game difficulty
let difficultyOfGame = 'Black Mamba'

//score
let score = 0;

//player name
let playername = "Hugo";

//top three score's
let topScores = [0];


//Intervall gameloop
setInterval(gameLoop, 100);

//Intervall game over
setInterval(checkGameOver, 10);

//check keydown ?
document.addEventListener("keydown", keyDown);

//
//call function draw
//
draw();

//
//call function placeFood
//
placeFood();

//
//function draw
//
function draw() {
    //Set color rectangle
    ctx.fillStyle = "transparent";
    //create rectangle x-achse ,y-achse
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //foreach snake element create a new one
    snake.forEach((part) => addSnake(part.x, part.y));

    //create snake
    addSnake(snake.x, snake.y);

    //create food
    addFood(food.x, food.y);

    //recall draw function
    requestAnimationFrame(draw);
}

//
//place food
//
function placeFood() {
    //Get random number, muliply with col/row and round off result
    let randomX = Math.floor(Math.random() * columns);
    let randomY = Math.floor(Math.random() * rows);

    //set random x and y coordinate to food
    food = { x: randomX, y: randomY };
}

//
//add snake element
//
function addSnake(x, y) {
    //Set color snake
    ctx.fillStyle = "black";
    //create new rectangle as snake
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);

}

//
//add food element
//
function addFood(x, y) {
    //set color food
    ctx.fillStyle = "green";
    //create new rectangle as food
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

//get keyboard input
function keyDown(e) {
    if (e.keyCode == 37) {
        direction = "LEFT";
    }
    if (e.keyCode == 38) {
        direction = "UP";
    }
    if (e.keyCode == 39) {
        direction = "RIGHT";
    }
    if (e.keyCode == 40) {
        direction = "DOWN";
    }
}

//shift collected food to snake
function shiftSnake() {

    //add new element to snake
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];

        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

//gameloop
function gameLoop() {


    if (foodCollected) {
        snake = [{ x: snake[0].x, y: snake[0].y }, ...snake];

        //Check difficulty
        if (difficultyOfGame == "Black Mamba") {
            score = score + 20;
        }
        if (difficultyOfGame == "Worm") {
            score = score + 15;
        }
        if (difficultyOfGame == "slug") {
            score = score + 10;
        }

        //score
        scoreDisplay.innerHTML = score;
        //reste food collected
        foodCollected = false;
    }

    //
    //shift snake
    //
    shiftSnake();

    if (direction == "LEFT") {
        snake[0].x--;
    }
    if (direction == "RIGHT") {
        snake[0].x++;
    }
    if (direction == "UP") {
        snake[0].y--;
    }
    if (direction == "DOWN") {
        snake[0].y++;
    }

    if (snake[0].x == food.x && snake[0].y == food.y) {
        //food collected
        foodCollected = true;

        //place food
        placeFood();
    }
}

//
//check game over
//
function checkGameOver() {

    //first part of snake
    let firstPart = snake[0];
    //other parts of snake
    let otherParts = snake.slice(1);
    //snake in snake ?
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

    //snake at wall?
    if (snake[0].x < 0 || snake[0].x > columns - 1 || snake[0].y < 0 || snake[0].y > rows - 1 || duplicatePart) {


        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //reset snake
        snake = [{ x: columns / 2, y: rows / 2 }];
        //score
        score = 0;
        //reste food
        placeFood();
        scoreDisplay.innerHTML = score;
    }
}
