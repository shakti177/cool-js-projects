const gameContainer = document.getElementById("gameContainer");
const bird = document.getElementById("bird");
const scoreBoard = document.getElementById("scoreBoard");
const highScoreBoard = document.getElementById("highScoreBoard");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const pauseButton = document.getElementById("pauseButton");
const finalScore = document.getElementById("finalScore");
const finalHighScore = document.getElementById("finalHighScore");

let birdY = 250;
let birdVelocity = 0;
let gravity = 0.5;
let jumpStrength = -9;
let score = 0;
let highScore = 0;
let gameActive = false;
let gamePaused = false;
let pipes = [];
let pipeGap = 150;
let pipeWidth = 60;
let pipeSpeed = 3;
let frameCount = 0;
let gameLoop;

function init() {
  birdY = 250;
  birdVelocity = 0;
  score = 0;
  pipes = [];
  frameCount = 0;
  updateScore();
  bird.style.top = birdY + "px";
  bird.style.left = "80px";

  // Clear existing pipes
  document.querySelectorAll(".pipe").forEach((pipe) => pipe.remove());
}

function startGame() {
  init();
  gameActive = true;
  gamePaused = false;
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  pauseButton.style.display = "block";
  gameLoop = setInterval(update, 1000 / 60);
}

function togglePause() {
  if (!gameActive) return;

  gamePaused = !gamePaused;
  pauseButton.textContent = gamePaused ? "Resume" : "Pause";

  if (gamePaused) {
    clearInterval(gameLoop);
  } else {
    gameLoop = setInterval(update, 1000 / 60);
  }
}

function update() {
  if (!gameActive || gamePaused) return;

  // Update bird physics
  birdVelocity += gravity;
  birdY += birdVelocity;
  bird.style.top = birdY + "px";

  // Rotate bird based on velocity
  let rotation = Math.min(Math.max(birdVelocity * 3, -30), 90);
  bird.style.transform = `rotate(${rotation}deg)`;

  // Check ground and ceiling collision
  if (birdY > 560 || birdY < 0) {
    endGame();
    return;
  }

  // Generate pipes
  frameCount++;
  if (frameCount % 90 === 0) {
    createPipe();
  }

  // Update pipes
  pipes.forEach((pipe, index) => {
    pipe.x -= pipeSpeed;
    pipe.topPipe.style.left = pipe.x + "px";
    pipe.bottomPipe.style.left = pipe.x + "px";

    // Check if pipe passed bird
    if (!pipe.scored && pipe.x + pipeWidth < 80) {
      score++;
      pipe.scored = true;
      updateScore();
    }

    // Remove off-screen pipes
    if (pipe.x < -pipeWidth) {
      pipe.topPipe.remove();
      pipe.bottomPipe.remove();
      pipes.splice(index, 1);
    }

    // Collision detection
    if (pipe.x < 120 && pipe.x + pipeWidth > 80) {
      if (birdY < pipe.gapTop || birdY + 40 > pipe.gapTop + pipeGap) {
        endGame();
      }
    }
  });
}

function createPipe() {
  let gapTop = Math.random() * (400 - pipeGap - 100) + 50;

  let topPipe = document.createElement("div");
  topPipe.className = "pipe pipe-top";
  topPipe.style.height = gapTop + "px";
  topPipe.style.left = "400px";

  let bottomPipe = document.createElement("div");
  bottomPipe.className = "pipe pipe-bottom";
  bottomPipe.style.height = 600 - gapTop - pipeGap + "px";
  bottomPipe.style.left = "400px";

  gameContainer.appendChild(topPipe);
  gameContainer.appendChild(bottomPipe);

  pipes.push({
    x: 400,
    gapTop: gapTop,
    topPipe: topPipe,
    bottomPipe: bottomPipe,
    scored: false,
  });
}

function jump() {
  if (!gameActive || gamePaused) return;
  birdVelocity = jumpStrength;
}

function updateScore() {
  scoreBoard.textContent = "Score: " + score;
  if (score > highScore) {
    highScore = score;
    highScoreBoard.textContent = "High Score: " + highScore;
  }
}

function endGame() {
  gameActive = false;
  clearInterval(gameLoop);
  pauseButton.style.display = "none";
  finalScore.textContent = "Score: " + score;
  finalHighScore.textContent = "High Score: " + highScore;
  gameOverScreen.style.display = "flex";
}

// Event listeners
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();
    if (!gameActive && !gamePaused) {
      if (
        startScreen.style.display !== "none" ||
        gameOverScreen.style.display === "flex"
      ) {
        startGame();
      }
    } else {
      jump();
    }
  }
  if (e.code === "KeyP") {
    togglePause();
  }
});

highScoreBoard.textContent = "High Score: " + highScore;
