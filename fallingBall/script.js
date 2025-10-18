const basket = document.getElementById('basket');
const game = document.getElementById('game');
const scoreEl = document.getElementById('score');

let basketPos = 180;
let score = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    basketPos -= 20;
    if (basketPos < 0) basketPos = 0;
  } else if (e.key === 'ArrowRight') {
    basketPos += 20;
    if (basketPos > game.offsetWidth - basket.offsetWidth) basketPos = game.offsetWidth - basket.offsetWidth;
  }
  basket.style.left = basketPos + 'px';
});

function createBall() {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.left = Math.random() * (game.offsetWidth - 20) + 'px';
  ball.style.top = '0px';
  game.appendChild(ball);
  moveBall(ball);
}

function moveBall(ball) {
  let ballInterval = setInterval(() => {
    let ballTop = parseInt(ball.style.top);
    if (ballTop > game.offsetHeight - 30 &&
        parseInt(ball.style.left) + 20 > basketPos &&
        parseInt(ball.style.left) < basketPos + 60) {
      score++;
      scoreEl.textContent = score;
      ball.remove();
      clearInterval(ballInterval);
    } else if (ballTop > game.offsetHeight - 20) {
      alert('Game Over! Your score: ' + score);
      location.reload();
    } else {
      ball.style.top = ballTop + 5 + 'px';
    }
  }, 50);
}

// Create a ball every 1 second
setInterval(createBall, 1000);
