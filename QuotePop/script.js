const quotes = [
  "The best way to predict the future is to invent it. – Alan Kay",
  "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll",
  "Do not watch the clock. Do what it does. Keep going. – Sam Levenson",
  "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
  "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis"
];

const quoteEl = document.getElementById("quote");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const copyMsg = document.getElementById("copy-msg");

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function showQuote() {
  const quote = getRandomQuote();
  quoteEl.textContent = quote;
  copyMsg.textContent = "";
}

function copyQuote() {
  const text = quoteEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyMsg.textContent = "Copied!";
  }).catch(err => {
    copyMsg.textContent = "Failed to copy.";
    console.error("Copy failed", err);
  });
}

newQuoteBtn.addEventListener("click", showQuote);
copyBtn.addEventListener("click", copyQuote);

showQuote();
