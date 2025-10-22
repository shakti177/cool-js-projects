// --- DOM Elements ---
const resultDisplay = document.getElementById('result-display');
const copyBtn = document.getElementById('copy-btn');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');

// --- Character Sets ---
const charSets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// --- Functions ---

/**
 * Gets a random character from a given character set.
 * @param {string} charSet - The string of characters to choose from.
 * @returns {string} A single random character.
 */
function getRandomChar(charSet) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
}

/**
 * Generates the password based on user settings.
 */
function generatePassword() {
    const length = +lengthEl.value; // Convert to number
    const includeLowercase = lowercaseEl.checked;
    const includeUppercase = uppercaseEl.checked;
    const includeNumbers = numbersEl.checked;
    const includeSymbols = symbolsEl.checked;

    let availableChars = '';
    let generatedPassword = '';

    // Build the string of all available characters
    if (includeLowercase) availableChars += charSets.lowercase;
    if (includeUppercase) availableChars += charSets.uppercase;
    if (includeNumbers) availableChars += charSets.numbers;
    if (includeSymbols) availableChars += charSets.symbols;

    // Check if at least one option is selected
    if (availableChars.length === 0) {
        resultDisplay.innerText = "Select options";
        return;
    }

    // Ensure password contains at least one of each selected type
    // This makes the password stronger and meets the criteria
    let mandatoryChars = '';
    if (includeLowercase) mandatoryChars += getRandomChar(charSets.lowercase);
    if (includeUppercase) mandatoryChars += getRandomChar(charSets.uppercase);
    if (includeNumbers) mandatoryChars += getRandomChar(charSets.numbers);
    if (includeSymbols) mandatoryChars += getRandomChar(charSets.symbols);

    // Fill the rest of the password length
    for (let i = mandatoryChars.length; i < length; i++) {
        generatedPassword += getRandomChar(availableChars);
    }

    // Add the mandatory characters and shuffle the final password
    generatedPassword = mandatoryChars + generatedPassword;
    resultDisplay.innerText = shuffleString(generatedPassword.slice(0, length));
}

/**
 * Shuffles a string.
 * @param {string} s - The string to shuffle.
 * @returns {string} The shuffled string.
 */
function shuffleString(s) {
    const arr = s.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
    return arr.join('');
}

/**
 * Copies the generated password to the clipboard.
 */
async function copyToClipboard() {
    const password = resultDisplay.innerText;
    if (!password || password === "Select options") {
        return; // Don't copy placeholder text
    }

    try {
        await navigator.clipboard.writeText(password);
        // Visual feedback
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-clipboard"></i>';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy password.');
    }
}

// --- Event Listeners ---
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// --- Initial Generation ---
generatePassword();