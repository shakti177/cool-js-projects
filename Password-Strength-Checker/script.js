const passwordInput = document.getElementById("passwordInput");
const strengthLevel = document.getElementById("strength-level");
const strengthText = document.querySelector("#strength-text strong");
const suggestions = document.getElementById("suggestions");
const togglePassword = document.getElementById("togglePassword");
const copyBtn = document.getElementById("copyBtn");

passwordInput.addEventListener("input", updateStrength);
togglePassword.addEventListener("click", toggleVisibility);
copyBtn.addEventListener("click", copyPassword);

function updateStrength() {
  const pwd = passwordInput.value;
  let score = 0;
  let suggestionList = [];

  if (pwd.length >= 6) score++;
  else suggestionList.push("Use 6+ characters");

  if (pwd.match(/[A-Z]/)) score++;
  else suggestionList.push("Add uppercase letter");

  if (pwd.match(/[0-9]/)) score++;
  else suggestionList.push("Include a number");

  if (pwd.match(/[^A-Za-z0-9]/)) score++;
  else suggestionList.push("Include special characters");

  let width = ["10%", "40%", "70%", "100%"];
  let colors = ["#ff4757", "#ffa502", "#2ed573", "#1e90ff"];
  let texts = ["Very Weak", "Weak", "Strong", "Very Strong 💪"];

  strengthLevel.style.width = width[score];
  strengthLevel.style.background = colors[score];
  strengthText.textContent = texts[score] || "None";

  suggestions.innerHTML = suggestionList.length > 0
    ? "<strong>Suggestions:</strong><br>" + suggestionList.join("<br>")
    : "<span style='color:#2ed573'>Great Password! ✅</span>";
}

function toggleVisibility() {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
}

function copyPassword() {
  navigator.clipboard.writeText(passwordInput.value);
  alert("Password copied!");
}

