const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;
let food = randomFood();
let score = 0;
let game;

document.addEventListener("keydown", directionHandler);

function directionHandler(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
  };
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, 400, 400);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff66" : "#00cc66";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Movement
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Eat food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreDisplay.innerText = "Score: " + score;
    food = randomFood();
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  // Game over conditions
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= 400 ||
    snakeY >= 400 ||
    snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
    return;
  }

  snake.unshift(newHead);
}

function resetGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null;
  score = 0;
  scoreDisplay.innerText = "Score: 0";
  clearInterval(game);
  game = setInterval(draw, 100);
}

resetGame();


// --- TOUCH & BUTTON CONTROLS ---

// Button controls
document.getElementById("up").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});
document.getElementById("down").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});
document.getElementById("left").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("right").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});

// Swipe controls
let startX, startY;

canvas.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

canvas.addEventListener("touchmove", e => {
  if (!startX || !startY) return;

  const touch = e.touches[0];
  const diffX = touch.clientX - startX;
  const diffY = touch.clientY - startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // horizontal
    if (diffX > 0 && direction !== "LEFT") direction = "RIGHT";
    else if (diffX < 0 && direction !== "RIGHT") direction = "LEFT";
  } else {
    // vertical
    if (diffY > 0 && direction !== "UP") direction = "DOWN";
    else if (diffY < 0 && direction !== "DOWN") direction = "UP";
  }

  startX = null;
  startY = null;
});
