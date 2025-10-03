const phrases = ["a Web Developer", "a Designer", "a Creator", "Nova"];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  isEnd = false;
  document.getElementById('typewriter').innerHTML = currentPhrase.join('');

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
      document.getElementById('typewriter').innerHTML = currentPhrase.join('');
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop();
      j--;
      document.getElementById('typewriter').innerHTML = currentPhrase.join('');
    }

    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }

  const speedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (150 - 100) + 100;
  const time = isEnd ? 1000 : isDeleting ? speedUp : normalSpeed;
  setTimeout(loop, time);
}

loop();
