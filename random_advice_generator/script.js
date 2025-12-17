const adviceText = document.getElementById('advice');
const btn = document.getElementById('getAdvice');

async function fetchAdvice() {
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    adviceText.textContent = `"${data.slip.advice}"`;
  } catch (e) {
    adviceText.textContent = 'Error fetching advice. Try again.';
  }
}

btn.addEventListener('click', fetchAdvice);