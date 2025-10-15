const gameArea = document.getElementById("game-area");
const input = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const restartBtn = document.getElementById("restart");
const startBtn = document.getElementById("start");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "apple", "banana", "grape", "cherry", "orange",
  "train", "cloud", "moon", "star", "river",
  "plane", "peach", "mountain", "music", "dream",
  "sun", "sky", "storm", "fire", "rain"
];

let score = 0;
let lives = 3;
let activeWords = [];
let gameInterval;
let spawnInterval;
let gameRunning = false;

// Difficulty settings
const difficulties = {
  easy: { fallSpeed: 2, spawnRate: 2000 },
  medium: { fallSpeed: 3, spawnRate: 1300 },
  hard: { fallSpeed: 4, spawnRate: 800 }
};

let currentSettings = difficulties.easy;

// Start the game
function startGame() {
  const level = difficultySelect.value;
  currentSettings = difficulties[level];

  score = 0;
  lives = 3;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  gameRunning = true;

  input.disabled = false;
  input.value = "";
  input.focus();

  clearGameArea();

  spawnInterval = setInterval(spawnWord, currentSettings.spawnRate);
  gameInterval = setInterval(moveWords, 100);
}

// Spawn new word
function spawnWord() {
  if (!gameRunning) return;
  const word = document.createElement("div");
  word.classList.add("word");
  word.textContent = words[Math.floor(Math.random() * words.length)];
  word.style.left = Math.random() * 80 + "%";
  word.style.top = "0px";
  word.style.animationDuration = Math.random() * 3 + 3 + "s";
  gameArea.appendChild(word);
  activeWords.push(word);
}

// Move words downward
function moveWords() {
  activeWords.forEach((word, i) => {
    let top = parseFloat(word.style.top);
    top += currentSettings.fallSpeed;
    word.style.top = top + "px";

    if (top > 370) {
      gameArea.removeChild(word);
      activeWords.splice(i, 1);
      loseLife();
    }
  });
}

// Check typed word
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && gameRunning) {
    const typed = input.value.trim().toLowerCase();
    const found = activeWords.find((w) => w.textContent === typed);

    if (found) {
      score++;
      scoreDisplay.textContent = score;
      gameArea.removeChild(found);
      activeWords = activeWords.filter((w) => w !== found);
    }

    input.value = "";
  }
});

// Lose life
function loseLife() {
  lives--;
  livesDisplay.textContent = lives;
  if (lives <= 0) {
    endGame();
  }
}

// End game
function endGame() {
  gameRunning = false;
  clearInterval(spawnInterval);
  clearInterval(gameInterval);
  input.disabled = true;
  alert(`💀 Game Over! Final Score: ${score}`);
}

// Restart game
restartBtn.addEventListener("click", () => {
  if (gameRunning) endGame();
  startGame();
});

// Clear game area
function clearGameArea() {
  gameArea.innerHTML = "";
  activeWords = [];
}

// Start button
startBtn.addEventListener("click", () => {
  if (gameRunning) endGame();
  startGame();
});
