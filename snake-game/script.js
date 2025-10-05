const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const box = 20;
  let score = 0;

  let snake = [{ x: 9 * box, y: 10 * box }];
  let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };

  let direction;

  document.addEventListener("keydown", setDirection);

  function setDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  }

  function collision(head, array) {
    return array.some(part => head.x === part.x && head.y === part.y);
  }

  function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 400, 400);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "#00ff9d" : "#00b36b";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
      ctx.strokeStyle = "#111";
      ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Check if food eaten
    if (headX === food.x && headY === food.y) {
      score++;
      document.getElementById("score").innerText = "Score: " + score;
      food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
      };
    } else {
      snake.pop();
    }

    let newHead = { x: headX, y: headY };

    // Game over conditions
    if (
      headX < 0 ||
      headY < 0 ||
      headX >= 400 ||
      headY >= 400 ||
      collision(newHead, snake)
    ) {
      clearInterval(game);
      alert("Game Over! Final Score: " + score);
    }

    snake.unshift(newHead);
  }

  function resetGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = null;
    score = 0;
    document.getElementById("score").innerText = "Score: 0";
    clearInterval(game);
    game = setInterval(draw, 100);
  }

  let game = setInterval(draw, 100);