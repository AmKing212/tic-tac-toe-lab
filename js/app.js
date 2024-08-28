const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#resetGame");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X"; // Set the initial turn to 'X'
  winner = null;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  for (let i = 0; i < board.length; i++) {
    const currCell = board[i];
    const currSqrElement = squareEls[i];
    currSqrElement.innerText = currCell;
  }
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.innerText = `Current turn: ${turn}`;
  } else if (!winner && tie) {
    messageEl.innerText = "It's a tie!";
  } else {
    messageEl.innerText = `Congratulations! ${turn} wins!`;
  }
}

function handleClick(e) {
  const squareIndex = e.target.id;
  if (board[squareIndex] === "X" || board[squareIndex] === "O" || winner) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  winningCombos.forEach((combo) => {
    if (
      board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true;
    }
  });
}

function checkForTie() {
  if (winner) return;
  tie = board.every((cell) => cell !== "");
}

function switchPlayerTurn() {
  if (winner) return;
  turn = turn === "X" ? "O" : "X";
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);

init(); // Initialize the game when the script loads
