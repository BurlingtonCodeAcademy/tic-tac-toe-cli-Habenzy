const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
};

let player = 'X'

let squares = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function setUp() {
  player = 'X';
  squares = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  play()
}

function toggle() {
  if(player === 'X') {
    player = 'O'
  }
  else{ player = 'X' }
}

function checkWin() {
  if ((squares[0] === player && squares[1] === player && squares[2] === player) ||
  (squares[3] === player && squares[4] === player && squares[5] === player)||
  (squares[6] === player && squares[7] === player && squares[8] === player)||
  (squares[0] === player && squares[3] === player && squares[6] === player)||
  (squares[1] === player && squares[4] === player && squares[7] === player)||
  (squares[2] === player && squares[5] === player && squares[8] === player)||
  (squares[0] === player && squares[4] === player && squares[8] === player)||
  (squares[2] === player && squares[4] === player && squares[6] === player)) {
    return true
  }
  else {return false}
}

async function play() {

  let board = `${squares[0]} | ${squares[1]} | ${squares[2]}\n---------\n${squares[3]} | ${squares[4]} | ${squares[5]}\n---------\n${squares[6]} | ${squares[7]} | ${squares[8]}`
  let move = await ask(board + `\nIt is player ${player}'s turn. Pick a square. >_`);
  if (!squares.includes(move)) {
    console.log("That's not a valid move!");
    play()
  }
  else {
    squares[(parseInt(move) - 1)] = player;
    if (checkWin()) {

      console.log(board + `\nPlayer ${player} wins!!!`);
      process.exit()
    }
    toggle();
    play()
  }
}

setUp();
