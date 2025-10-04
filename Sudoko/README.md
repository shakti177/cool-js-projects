# Sudoku Game

A classic Sudoku puzzle game built with HTML, CSS, and JavaScript. This interactive web-based game offers multiple difficulty levels and real-time validation.

## Features

- Interactive 9x9 Sudoku grid
- Three difficulty levels:
  - Easy (40 empty cells)
  - Medium (50 empty cells)
  - Hard (60 empty cells)
- Real-time input validation
- Solution checking
- New game generation
- Clean and responsive design

## How to Play

1. Open `index.html` in your web browser
2. Select your preferred difficulty level from the dropdown menu
3. Click on any empty cell to input a number (1-9)
4. Use the "Check Solution" button to verify your progress
5. Click "New Game" to start a fresh puzzle at any time

## Game Rules

1. Fill the 9×9 grid with numbers from 1-9
2. Each row must contain numbers 1-9 without repetition
3. Each column must contain numbers 1-9 without repetition
4. Each 3×3 box must contain numbers 1-9 without repetition
5. The puzzle starts with some numbers already filled in (fixed numbers)
6. Fixed numbers cannot be changed

## Technical Details

- Built using vanilla JavaScript with an object-oriented approach
- Uses CSS Grid for the game board layout
- Implements a backtracking algorithm for puzzle generation
- Features responsive design for different screen sizes

## Controls

- Left click or tap a cell to select it
- Type a number (1-9) to fill the selected cell
- Use the difficulty dropdown to change the game's difficulty
- "New Game" button generates a fresh puzzle
- "Check Solution" button validates your current progress

## Development

The game is built with:
- HTML5
- CSS3
- JavaScript (ES6+)

No external libraries or frameworks are required to run this game.
