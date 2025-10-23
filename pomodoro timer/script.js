// Minimal Pomodoro logic
const timeEl = document.getElementById('time');
const statusEl = document.getElementById('status');
const barEl = document.getElementById('bar');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const modes = document.querySelectorAll('.mode');

let totalSeconds = 25 * 60;
let remaining = totalSeconds;
let timer = null;
let running = false;
let currentMode = 'Work';

function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function render() {
    timeEl.textContent = formatTime(remaining);
    const progress = 100 * (totalSeconds - remaining) / totalSeconds;
    barEl.style.width = progress + '%';
    statusEl.textContent = (running ? 'Running — ' : 'Ready — ') + currentMode;
}

function start() {
    if (running) return;
    running = true;
    render();
    timer = setInterval(() => {
        if (remaining > 0) {
            remaining--;
            render();
        } else {
            clearInterval(timer);
            running = false;
            render();
            // simple alert sound (short beep)
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'sine'; o.frequency.value = 880; g.gain.value = 0.05;
                o.start(); setTimeout(() => { o.stop(); ctx.close() }, 250);
            } catch (e) {/* ignore if audio not allowed */ }
        }
    }, 1000);
}

function pause() {
    if (!running) return;
    running = false;
    clearInterval(timer);
    render();
}

function reset() {
    pause();
    remaining = totalSeconds;
    render();
}

function setMode(buttonEl) {
    modes.forEach(m => m.classList.remove('active'));
    buttonEl.classList.add('active');
    const minutes = Number(buttonEl.dataset.min) || 25;
    totalSeconds = minutes * 60;
    remaining = totalSeconds;
    currentMode = buttonEl.textContent.trim();
    reset();
}

// attach events
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
modes.forEach(m => m.addEventListener('click', () => setMode(m)));

// keyboard shortcuts
window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault();
        running ? pause() : start();
    }
    if (e.key.toLowerCase() === 'r') reset();
    if (e.key === '1') setMode(document.getElementById('workMode'));
    if (e.key === '2') setMode(document.getElementById('shortBreak'));
    if (e.key === '3') setMode(document.getElementById('longBreak'));
});

// initial render
render();