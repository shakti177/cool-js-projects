// Dice — Player vs Computer (Auto computer roll)
// Features: PvC + PvP, auto computer roll after player in PvC, scoring (6 => +2), history, best scores (localStorage)

const playerDice = document.getElementById('playerDice');
const computerDice = document.getElementById('computerDice');
const rollBtn = document.getElementById('rollBtn');
const holdBtn = document.getElementById('holdBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const bestPlayerEl = document.getElementById('bestPlayer');
const bestComputerEl = document.getElementById('bestComputer');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const exportBtn = document.getElementById('exportBtn');
const modeSelect = document.getElementById('modeSelect');
const targetInput = document.getElementById('target');

const sndRoll = document.getElementById('sndRoll');
const sndWin = document.getElementById('sndWin');

let scores = { player: 0, computer: 0 };
let currentPlayer = 'player'; // 'player' or 'computer' or 'p2' in PvP
let history = JSON.parse(localStorage.getItem('dice_history') || '[]');
let best = JSON.parse(localStorage.getItem('dice_best') || '{"player":0,"computer":0}');

function getDiceUrl(n){
  const map = {
    1: '2/2c/Alea_1.png',
    2: 'b/b8/Alea_2.png',
    3: '2/2f/Alea_3.png',
    4: '8/8d/Alea_4.png',
    5: '5/55/Alea_5.png',
    6: 'f/f4/Alea_6.png'
  };
  return `https://upload.wikimedia.org/wikipedia/commons/${map[n]}`;
}

function saveBest(){
  localStorage.setItem('dice_best', JSON.stringify(best));
  bestPlayerEl.textContent = best.player || '—';
  bestComputerEl.textContent = best.computer || '—';
}

function pushHistory(txt){
  history.unshift(txt);
  if(history.length > 100) history.pop();
  localStorage.setItem('dice_history', JSON.stringify(history));
  renderHistory();
}

function renderHistory(){
  historyList.innerHTML = '';
  if(history.length === 0){
    const li = document.createElement('li');
    li.textContent = 'No rolls yet';
    li.style.opacity = 0.7;
    historyList.appendChild(li);
    return;
  }
  history.forEach(h=>{
    const li = document.createElement('li');
    li.innerHTML = h;
    historyList.appendChild(li);
  });
}

function playSound(el){
  try{ if(el) { el.currentTime = 0; el.play(); } }catch(e){}
}

function rollSingle(side){
  return Math.floor(Math.random()*6) + 1;
}

function applyScore(side, who){
  const points = (side === 6) ? 2 : 1;
  if(who === 'player') scores.player += points;
  else if(who === 'computer') scores.computer += points;
  else if(who === 'p2') scores.computer += points; // in PvP we use computer as p2
  updateScoresUI();
}

function updateScoresUI(){
  playerScoreEl.textContent = scores.player;
  computerScoreEl.textContent = scores.computer;
}

function checkWin(){
  const target = Math.max(1, Number(targetInput.value) || 20);
  if(scores.player >= target || scores.computer >= target){
    const winner = (scores.player >= target) ? 'Player' : 'Computer';
    message.innerHTML = `🎉 ${winner} wins!`;
    playSound(sndWin);
    // update bests
    if(scores.player > (best.player || 0)) { best.player = scores.player; }
    if(scores.computer > (best.computer || 0)) { best.computer = scores.computer; }
    saveBest();
    rollBtn.disabled = true;
  }
}

// PvC flow: player clicks Roll -> player rolls -> computer auto-rolls after 500ms
function pvcRoll(){
  // Player roll
  rollBtn.disabled = true;
  playerDice.classList.add('roll');
  playSound(sndRoll);
  setTimeout(()=>{
    const p = rollSingle();
    playerDice.src = getDiceUrl(p);
    playerDice.classList.remove('roll');
    pushHistory(`${new Date().toLocaleTimeString()} — Player rolled ${p} (${p===6?'Bonus +2':'+1'})`);
    applyScore(p, 'player');
    message.innerHTML = `Player rolled ${p} — Computer rolling...`;
    // Computer auto-roll
    setTimeout(()=>{
      computerDice.classList.add('roll');
      playSound(sndRoll);
      setTimeout(()=>{
        const c = rollSingle();
        computerDice.src = getDiceUrl(c);
        computerDice.classList.remove('roll');
        pushHistory(`${new Date().toLocaleTimeString()} — Computer rolled ${c} (${c===6?'Bonus +2':'+1'})`);
        applyScore(c, 'computer');
        message.innerHTML = `Computer rolled ${c}`;
        updateScoresUI();
        checkWin();
        rollBtn.disabled = false;
      }, 520);
    }, 500);
  }, 520);
}

// PvP flow: player 1 roll then player 2 roll (using hold to pass or auto alternate)
let pvpWaiting = false;
let pvpTurn = 1;
function pvpRoll(){
  // when in PvP, a single Roll button acts for current player and alternates
  rollBtn.disabled = true;
  const who = (pvpTurn === 1) ? 'player' : 'p2';
  const targetImg = (pvpTurn === 1) ? playerDice : computerDice;
  targetImg.classList.add('roll');
  playSound(sndRoll);
  setTimeout(()=>{
    const val = rollSingle();
    targetImg.src = getDiceUrl(val);
    targetImg.classList.remove('roll');
    pushHistory(`${new Date().toLocaleTimeString()} — P${pvpTurn} rolled ${val} (${val===6?'Bonus +2':'+1'})`);
    applyScore(val, who);
    message.innerHTML = `P${pvpTurn} rolled ${val}`;
    pvpTurn = (pvpTurn === 1) ? 2 : 1;
    updateScoresUI();
    checkWin();
    rollBtn.disabled = false;
  }, 520);
}

function resetGame(){
  scores = { player:0, computer:0 };
  rollBtn.disabled = false;
  playerDice.src = getDiceUrl(1);
  computerDice.src = getDiceUrl(1);
  message.innerHTML = 'Game reset — press Roll';
  pushHistory(`[${new Date().toLocaleTimeString()}] — Reset game`);
  updateScoresUI();
}

// export history as txt
function exportHistory(){
  if(!history || history.length === 0){ alert('No history to export'); return; }
  const blob = new Blob([history.join('\n')], {type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'dice-history.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

// event wiring
rollBtn.addEventListener('click', ()=> {
  if(modeSelect.value === 'pvc') pvcRoll();
  else pvpRoll();
});
holdBtn.addEventListener('click', ()=> {
  if(modeSelect.value === 'pvp'){
    // simply pass turn in PvP: switch pvpTurn
    pvpTurn = (pvpTurn === 1) ? 2 : 1;
    message.innerHTML = `Turn passed. P${pvpTurn}'s turn.`;
  } else {
    message.innerHTML = 'Hold only available in PvP mode.';
  }
});
resetBtn.addEventListener('click', resetGame);
clearHistoryBtn.addEventListener('click', ()=>{
  history = [];
  localStorage.setItem('dice_history', JSON.stringify(history));
  renderHistory();
});
exportBtn.addEventListener('click', exportHistory);
modeSelect.addEventListener('change', ()=>{
  resetGame();
  // reset PvP turn
  pvpTurn = 1;
});
window.addEventListener('load', ()=>{
  renderHistory();
  // load best
  bestPlayerEl.textContent = best.player || '—';
  bestComputerEl.textContent = best.computer || '—';
});
