const emojis = document.querySelectorAll('.emoji');
const moodBoard = document.getElementById('mood-board');
const clearBtn = document.getElementById('clear-btn');

emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    const newEmoji = document.createElement('div');
    newEmoji.textContent = emoji.textContent;
    newEmoji.classList.add('mood-emoji');
    newEmoji.style.left = `${Math.random() * 90}%`;
    newEmoji.style.top = `${Math.random() * 80}%`;
    moodBoard.appendChild(newEmoji);

    // remove emoji after animation
    setTimeout(() => newEmoji.remove(), 4000);
  });
});

clearBtn.addEventListener('click', () => {
  moodBoard.innerHTML = '';
});
