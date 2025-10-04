class Sudoku {
    constructor() {
        this.board = Array(9).fill().map(() => Array(9).fill(0));
        this.solution = Array(9).fill().map(() => Array(9).fill(0));
    }

    // Generate a valid Sudoku puzzle
    generate(difficulty) {
        // Clear the board
        this.board = Array(9).fill().map(() => Array(9).fill(0));
        
        // Fill diagonal 3x3 boxes
        for (let i = 0; i < 9; i += 3) {
            this.fillBox(i, i);
        }
        
        // Fill remaining cells
        this.fillRemaining(0, 3);
        
        // Copy solution
        this.solution = this.board.map(row => [...row]);
        
        // Remove numbers based on difficulty
        let cellsToRemove;
        switch(difficulty) {
            case 'easy':
                cellsToRemove = 40;
                break;
            case 'medium':
                cellsToRemove = 50;
                break;
            case 'hard':
                cellsToRemove = 60;
                break;
            default:
                cellsToRemove = 40;
        }
        
        this.removeNumbers(cellsToRemove);
    }

    // Fill a 3x3 box with numbers
    fillBox(row, col) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const randIndex = Math.floor(Math.random() * nums.length);
                this.board[row + i][col + j] = nums[randIndex];
                nums.splice(randIndex, 1);
            }
        }
    }

    // Check if it's safe to place a number
    isSafe(row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (this.board[row][x] === num) return false;
        }
        
        // Check column
        for (let x = 0; x < 9; x++) {
            if (this.board[x][col] === num) return false;
        }
        
        // Check 3x3 box
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i + startRow][j + startCol] === num) return false;
            }
        }
        
        return true;
    }

    // Fill remaining cells
    fillRemaining(row, col) {
        if (col >= 9 && row < 8) {
            row++;
            col = 0;
        }
        if (row >= 9 && col >= 9) return true;
        if (row < 3) {
            if (col < 3) col = 3;
        } else if (row < 6) {
            if (col === parseInt(row/3)*3) col += 3;
        } else {
            if (col === 6) {
                row++;
                col = 0;
                if (row >= 9) return true;
            }
        }
        
        for (let num = 1; num <= 9; num++) {
            if (this.isSafe(row, col, num)) {
                this.board[row][col] = num;
                if (this.fillRemaining(row, col + 1)) return true;
                this.board[row][col] = 0;
            }
        }
        return false;
    }

    // Remove numbers to create puzzle
    removeNumbers(count) {
        let cellsRemoved = 0;
        while (cellsRemoved < count) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (this.board[row][col] !== 0) {
                this.board[row][col] = 0;
                cellsRemoved++;
            }
        }
    }

    // Check if current board state is valid
    isValid() {
        // Check rows
        for (let row = 0; row < 9; row++) {
            const nums = new Set();
            for (let col = 0; col < 9; col++) {
                const num = this.board[row][col];
                if (num !== 0) {
                    if (nums.has(num)) return false;
                    nums.add(num);
                }
            }
        }

        // Check columns
        for (let col = 0; col < 9; col++) {
            const nums = new Set();
            for (let row = 0; row < 9; row++) {
                const num = this.board[row][col];
                if (num !== 0) {
                    if (nums.has(num)) return false;
                    nums.add(num);
                }
            }
        }

        // Check 3x3 boxes
        for (let box = 0; box < 9; box++) {
            const nums = new Set();
            const rowStart = Math.floor(box / 3) * 3;
            const colStart = (box % 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const num = this.board[rowStart + i][colStart + j];
                    if (num !== 0) {
                        if (nums.has(num)) return false;
                        nums.add(num);
                    }
                }
            }
        }

        return true;
    }
}

// Game UI
document.addEventListener('DOMContentLoaded', () => {
    const game = new Sudoku();
    const board = document.getElementById('board');
    const newGameBtn = document.getElementById('new-game');
    const checkBtn = document.getElementById('check');
    const difficultySelect = document.getElementById('difficulty');
    const statusDiv = document.getElementById('status');
    let initialBoard = [];

    function createBoard() {
        board.innerHTML = '';
        initialBoard = game.board.map(row => [...row]);
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '1';
                input.max = '9';
                
                if (game.board[i][j] !== 0) {
                    input.value = game.board[i][j];
                    input.readOnly = true;
                    cell.classList.add('fixed');
                }
                
                input.addEventListener('input', (e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (value >= 0 && value <= 9) {
                        game.board[i][j] = value;
                    }
                });
                
                cell.appendChild(input);
                board.appendChild(cell);
            }
        }
    }

    function startNewGame() {
        const difficulty = difficultySelect.value;
        game.generate(difficulty);
        createBoard();
        statusDiv.textContent = '';
        statusDiv.className = '';
    }

    function checkSolution() {
        if (game.isValid()) {
            // Check if the board is complete
            const isComplete = game.board.every(row => row.every(cell => cell !== 0));
            if (isComplete) {
                statusDiv.textContent = 'Congratulations! Puzzle solved correctly!';
                statusDiv.className = 'success';
            } else {
                statusDiv.textContent = 'So far so good, but the puzzle is not complete yet!';
                statusDiv.className = '';
            }
        } else {
            statusDiv.textContent = 'There are some errors in your solution.';
            statusDiv.className = 'error';
        }
    }

    newGameBtn.addEventListener('click', startNewGame);
    checkBtn.addEventListener('click', checkSolution);
    difficultySelect.addEventListener('change', startNewGame);

    // Start first game
    startNewGame();
});
