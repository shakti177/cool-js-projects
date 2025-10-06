<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Card Game</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 800px;
            width: 100%;
        }

        header {
            text-align: center;
            margin-bottom: 30px;
        }

        h1 {
            color: #333;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #666;
            font-size: 1.1rem;
        }

        .game-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
        }

        .stats {
            display: flex;
            gap: 20px;
        }

        .stat {
            text-align: center;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
        }

        .stat-label {
            font-size: 0.9rem;
            color: #666;
        }

        .controls {
            display: flex;
            gap: 10px;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5a6fd8;
            transform: translateY(-2px);
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn-secondary:hover {
            background: #5a6268;
            transform: translateY(-2px);
        }

        .difficulty-selector {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .difficulty-btn {
            padding: 8px 15px;
            border: 2px solid #dee2e6;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .difficulty-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .game-board {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }

        /* Difficulty-based grid layouts */
        .game-board.easy {
            grid-template-columns: repeat(4, 1fr);
        }

        .game-board.medium {
            grid-template-columns: repeat(6, 1fr);
        }

        .game-board.hard {
            grid-template-columns: repeat(8, 1fr);
        }

        .card {
            aspect-ratio: 1;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 10px;
            cursor: pointer;
            transform-style: preserve-3d;
            transition: transform 0.6s ease;
            position: relative;
        }

        .card.flipped {
            transform: rotateY(180deg);
        }

        .card.matched {
            transform: rotateY(180deg);
            cursor: default;
        }

        .card-front, .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
        }

        .card-front {
            background: white;
            transform: rotateY(180deg);
            color: #333;
        }

        .card-back {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }

        .message {
            text-align: center;
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            font-size: 1.2rem;
            font-weight: bold;
            display: none;
        }

        .message.success {
            background: #d4edda;
            color: #155724;
            display: block;
        }

        .instructions {
            background: #e7f3ff;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            margin-top: 20px;
        }

        .instructions h3 {
            color: #667eea;
            margin-bottom: 10px;
        }

        .instructions ul {
            list-style: none;
            padding-left: 0;
        }

        .instructions li {
            padding: 5px 0;
            color: #495057;
        }

        .instructions li:before {
            content: "🎯";
            margin-right: 10px;
        }

        /* Animations */
        @keyframes celebrate {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .celebrate {
            animation: celebrate 0.5s ease-in-out;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .game-board.easy {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .game-board.medium {
                grid-template-columns: repeat(4, 1fr);
            }
            
            .game-board.hard {
                grid-template-columns: repeat(5, 1fr);
            }
            
            .game-info {
                flex-direction: column;
                gap: 15px;
            }
            
            .stats {
                order: 2;
            }
            
            .controls {
                order: 1;
            }
            
            h1 {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 15px;
            }
            
            .game-board {
                gap: 10px;
            }
            
            .card-front, .card-back {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🧠 Memory Game</h1>
            <p class="subtitle">Match pairs of cards to win!</p>
        </header>

        <div class="game-info">
            <div class="stats">
                <div class="stat">
                    <div class="stat-value" id="moves">0</div>
                    <div class="stat-label">Moves</div>
                </div>
                <div class="stat">
                    <div class="stat-value" id="timer">00:00</div>
                    <div class="stat-label">Time</div>
                </div>
                <div class="stat">
                    <div class="stat-value" id="matches">0</div>
                    <div class="stat-label">Matches</div>
                </div>
            </div>

            <div class="controls">
                <div class="difficulty-selector">
                    <button class="difficulty-btn active" data-difficulty="easy">Easy</button>
                    <button class="difficulty-btn" data-difficulty="medium">Medium</button>
                    <button class="difficulty-btn" data-difficulty="hard">Hard</button>
                </div>
                <button class="btn btn-primary" id="restartBtn">Restart</button>
                <button class="btn btn-secondary" id="newGameBtn">New Game</button>
            </div>
        </div>

        <div class="message" id="message"></div>

        <div class="game-board easy" id="gameBoard"></div>

        <div class="instructions">
            <h3>How to Play:</h3>
            <ul>
                <li>Click on cards to flip them and find matching pairs</li>
                <li>Match all pairs with the fewest moves and fastest time</li>
                <li>Choose difficulty level for more challenge</li>
                <li>Track your moves, time, and matches above</li>
            </ul>
        </div>
    </div>

    <script>
        class MemoryGame {
            constructor() {
                this.cards = [];
                this.flippedCards = [];
                this.moves = 0;
                this.matches = 0;
                this.gameStarted = false;
                this.startTime = null;
                this.timerInterval = null;
                this.difficulty = 'easy';
                this.difficultySettings = {
                    easy: { pairs: 8, columns: 4 },
                    medium: { pairs: 12, columns: 6 },
                    hard: { pairs: 16, columns: 8 }
                };
                
                this.icons = ['🌟', '🎯', '🎨', '🚀', '🎵', '🎮', '🏆', '❤️', '⭐', '🔥', '💎', '🎪', '🎭', '⚡', '🌈', '🎲'];
                
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.generateCards();
                this.renderBoard();
                this.updateDisplay();
            }

            setupEventListeners() {
                // Game controls
                document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
                document.getElementById('newGameBtn').addEventListener('click', () => this.newGame());
                
                // Difficulty buttons
                document.querySelectorAll('.difficulty-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.setDifficulty(e.target.dataset.difficulty);
                    });
                });
            }

            setDifficulty(level) {
                this.difficulty = level;
                
                // Update active button
                document.querySelectorAll('.difficulty-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.difficulty === level);
                });
                
                // Update game board class
                const board = document.getElementById('gameBoard');
                board.className = 'game-board ' + level;
                
                this.newGame();
            }

            generateCards() {
                const settings = this.difficultySettings[this.difficulty];
                const usedIcons = this.icons.slice(0, settings.pairs);
                this.cards = [];
                
                // Create pairs of cards
                usedIcons.forEach(icon => {
                    this.cards.push({ icon, flipped: false, matched: false });
                    this.cards.push({ icon, flipped: false, matched: false });
                });
                
                // Shuffle cards
                this.shuffleCards();
            }

            shuffleCards() {
                for (let i = this.cards.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
                }
            }

            renderBoard() {
                const board = document.getElementById('gameBoard');
                board.innerHTML = '';
                
                this.cards.forEach((card, index) => {
                    const cardElement = document.createElement('div');
                    cardElement.className = 'card';
                    cardElement.innerHTML = `
                        <div class="card-front">${card.icon}</div>
                        <div class="card-back">?</div>
                    `;
                    
                    cardElement.addEventListener('click', () => this.flipCard(index));
                    board.appendChild(cardElement);
                });
            }

            flipCard(index) {
                const card = this.cards[index];
                
                // Ignore if card is already flipped, matched, or two cards are already flipped
                if (card.flipped || card.matched || this.flippedCards.length === 2) {
                    return;
                }
                
                // Start timer on first move
                if (!this.gameStarted) {
                    this.startGame();
                }
                
                // Flip the card
                card.flipped = true;
                this.flippedCards.push(index);
                
                // Update display
                this.updateCardDisplay(index);
                
                // Check for match if two cards are flipped
                if (this.flippedCards.length === 2) {
                    this.moves++;
                    this.updateDisplay();
                    this.checkMatch();
                }
            }

            checkMatch() {
                const [index1, index2] = this.flippedCards;
                const card1 = this.cards[index1];
                const card2 = this.cards[index2];
                
                if (card1.icon === card2.icon) {
                    // Match found
                    card1.matched = true;
                    card2.matched = true;
                    this.matches++;
                    
                    this.flippedCards = [];
                    this.updateDisplay();
                    
                    // Check for game completion
                    if (this.matches === this.difficultySettings[this.difficulty].pairs) {
                        this.endGame();
                    }
                } else {
                    // No match - flip cards back after delay
                    setTimeout(() => {
                        card1.flipped = false;
                        card2.flipped = false;
                        this.flippedCards = [];
                        this.updateCardDisplay(index1);
                        this.updateCardDisplay(index2);
                    }, 1000);
                }
            }

            updateCardDisplay(index) {
                const cardElements = document.querySelectorAll('.card');
                const cardElement = cardElements[index];
                const card = this.cards[index];
                
                if (card.flipped || card.matched) {
                    cardElement.classList.add('flipped');
                } else {
                    cardElement.classList.remove('flipped');
                }
                
                if (card.matched) {
                    cardElement.classList.add('matched');
                    cardElement.classList.add('celebrate');
                    setTimeout(() => {
                        cardElement.classList.remove('celebrate');
                    }, 500);
                }
            }

            updateDisplay() {
                document.getElementById('moves').textContent = this.moves;
                document.getElementById('matches').textContent = this.matches;
            }

            startGame() {
                this.gameStarted = true;
                this.startTime = new Date();
                this.timerInterval = setInterval(() => this.updateTimer(), 1000);
            }

            updateTimer() {
                if (!this.startTime) return;
                
                const now = new Date();
                const diff = Math.floor((now - this.startTime) / 1000);
                const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
                const seconds = (diff % 60).toString().padStart(2, '0');
                
                document.getElementById('timer').textContent = `${minutes}:${seconds}`;
            }

            endGame() {
                clearInterval(this.timerInterval);
                
                const time = document.getElementById('timer').textContent;
                const message = document.getElementById('message');
                message.textContent = `🎉 Congratulations! You won in ${this.moves} moves and ${time} time!`;
                message.className = 'message success';
                
                // Add celebration effect to all cards
                document.querySelectorAll('.card').forEach(card => {
                    card.classList.add('celebrate');
                });
            }

            restartGame() {
                clearInterval(this.timerInterval);
                
                this.flippedCards = [];
                this.moves = 0;
                this.matches = 0;
                this.gameStarted = false;
                this.startTime = null;
                
                this.cards.forEach(card => {
                    card.flipped = false;
                    card.matched = false;
                });
                
                this.shuffleCards();
                this.renderBoard();
                this.updateDisplay();
                
                document.getElementById('timer').textContent = '00:00';
                document.getElementById('message').className = 'message';
            }

            newGame() {
                clearInterval(this.timerInterval);
                
                this.flippedCards = [];
                this.moves = 0;
                this.matches = 0;
                this.gameStarted = false;
                this.startTime = null;
                
                this.generateCards();
                this.renderBoard();
                this.updateDisplay();
                
                document.getElementById('timer').textContent = '00:00';
                document.getElementById('message').className = 'message';
            }
        }

        // Initialize the game when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new MemoryGame();
        });
    </script>
</body>
</html>
