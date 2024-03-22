const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameOver = false;
let cells = [];

// Create game board
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => cellClick(cell));
        board.appendChild(cell);
        cells.push('');
    }
}

// Function to handle cell click
function cellClick(cell) {
    const index = parseInt(cell.getAttribute('data-index'));
    if (!gameOver && !cell.textContent) {
        cell.textContent = currentPlayer;
        cells[index] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to check for a winner
function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            alert(`${cells[a]} wins!`); // Show alert box message
            gameOver = true;
            return;
        }
    }

    if (cells.every(cell => cell)) {
        alert("It's a draw!"); // Show alert box message
        gameOver = true;
    }
}

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');
    const messageElement = document.createElement('p');
    messageElement.classList.add('alert-box-message');
    messageElement.textContent = message;
    alertBox.appendChild(messageElement);
    document.body.appendChild(alertBox);
}
// Function to restart the game
function restart() {
    board.innerHTML = '';
    cells = [];
    createBoard();
    message.textContent = '';
    currentPlayer = 'X';
    gameOver = false;
}

// Initialize game
createBoard();
