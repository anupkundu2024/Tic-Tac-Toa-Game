let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Initialize the game board
function initBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
  }
}

// Handle cell click event
function handleCellClick(index) {
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  const cell = document.querySelector(`[data-index="${index}"]`);
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    document.getElementById(
      "status"
    ).textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    document.getElementById("status").textContent = "Game ended in a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById(
    "status"
  ).textContent = `Player ${currentPlayer}'s turn`;
}

// Check for win condition
function checkWin() {
  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      combination.forEach((index) => {
        document
          .querySelector(`[data-index="${index}"]`)
          .classList.add("winning-cell");
      });
      return true;
    }
    return false;
  });
}

// Check for draw condition
function checkDraw() {
  return gameState.every((cell) => cell !== "");
}

// Reset game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.getElementById(
    "status"
  ).textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
  });
}

// Initialize the game when page loads
initBoard();
