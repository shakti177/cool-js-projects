const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
const colorHex = {
  Red: "#e74c3c",
  Blue: "#3498db",
  Green: "#2ecc71",
  Yellow: "#f1c40f",
  Purple: "#9b59b6",
  Orange: "#e67e22"
};

let score = 0;
let time = 30;
let correctColor = "";

const wordDisplay = document.getElementById("color-word");
const buttonContainer = document.getElementById("color-buttons");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const resultDisplay = document.getElementById("result");

function getRandomColorName() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function setNewChallenge() {
  const word = getRandomColorName();
  const textColor = getRandomColorName();
  correctColor = word;

  wordDisplay.textContent = word;
  wordDisplay.style.color = colorHex[textColor];

  buttonContainer.innerHTML = "";
  const shuffled = [...colors].sort(() => 0.5 - Math.random());

  shuffled.forEach(color => {
    const btn = document.createElement("button");
    btn.classList.add("color-button");
    btn.style.backgroundColor = colorHex[color];
    btn.textContent = color;
    btn.onclick = () => handleAnswer(color);
    buttonContainer.appendChild(btn);
  });
}

function handleAnswer(selectedColor) {
  if (selectedColor === correctColor) {
    score += 1;
    resultDisplay.textContent = "Correct!";
  } else {
    resultDisplay.textContent = "Wrong!";
  }
  scoreDisplay.textContent = `Score: ${score}`;
  setNewChallenge();
}

function startTimer() {
  const interval = setInterval(() => {
    time -= 1;
    timeDisplay.textContent = `Time: ${time}`;
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  wordDisplay.textContent = "";
  buttonContainer.innerHTML = "";
  resultDisplay.textContent = `Game Over! Final Score: ${score}`;
}

function startGame() {
  score = 0;
  time = 30;
  scoreDisplay.textContent = `Score: ${score}`;
  timeDisplay.textContent = `Time: ${time}`;
  resultDisplay.textContent = "";
  setNewChallenge();
  startTimer();
}

startGame();
