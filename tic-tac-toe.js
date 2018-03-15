const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Board {
  constructor() {
    this.board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    this.symbol = 'O';
    this.placedPieces = 0;
  }

  toggleSymbol() {
    this.symbol = this.symbol === 'O' ? 'X' : 'O';
  }

  checkSquareIfAvail(row, col) {
    return typeof this.board[row][col] === 'number';
  }

  updateBoard (square){

    if (square <= 3) {
      if (this.checkSquareIfAvail(0, square - 1)) {
        this.board[0][square - 1] = this.symbol;
        this.placedPieces++;
        return true;
      }
    } else if (square > 3 && square <= 6) {
      if (this.checkSquareIfAvail(1, square - 4)) {
        this.board[1][square - 4] = this.symbol;
        this.placedPieces++;
        return true;
      }
    } else if (square > 6 && square <= 9) {
      if (this.checkSquareIfAvail(2, square - 7)) {
        this.board[2][square - 7] = this.symbol;
        this.placedPieces++;
        return true;
      }
    } else {
      return false;
    }
  }

  detectGameEnd () {
    return this.placedPieces === 9;
  }

  checkForWinner() {
    return this.checkDiagonalForWinner(this.symbol) || this.checkForColWinner(this.symbol) || this.checkForRowWinner(this.symbol);
  }

  checkDiagonalForWinner (symbol) {
    if (this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol){
      return true;
    }
    return false;
  }

  checkForColWinner(symbol) {
    if (this.board[0][0] === symbol && this.board[1][0] === symbol && this.board[2][0] === symbol ||
      this.board[0][1] === symbol && this.board[1][1] === symbol && this.board[2][1] === symbol ||
      this.board[0][2] === symbol && this.board[1][2] === symbol && this.board[2][2] === symbol) {
      return true;
    }
    return false;
  }

  checkForRowWinner(symbol) {
    if (this.board[0][0] === symbol && this.board[0][1] === symbol && this.board[0][2] === symbol ||
        this.board[1][0] === symbol && this.board[1][1] === symbol && this.board[1][2] === symbol ||
        this.board[2][0] === symbol && this.board[2][1] === symbol && this.board[2][2] === symbol) {
      return true;
    }
    return false;
  }

  printRow(rowNum) {
    return `|${this.board[rowNum][0]}|${this.board[rowNum][1]}|${this.board[rowNum][2]}|`
  }

  printBoard() {
    const output = `+-+-+-+\n${this.printRow(0)}\n+-+-+-+\n${this.printRow(1)}\n+-+-+-+\n${this.printRow(2)}\n+-+-+-+\n`;
    process.stdout.write(output);
  }

}


class Game {
  constructor() {
    this.board = new Board();

    this.init();
  }

  printGameTitle () {
    process.stdout.write([
      '===========\n',
      'TIC TAC TOE\n',
      '===========\n'
    ].join(''));
  }

  init() {
    this.printGameTitle();
    this.board.printBoard();
    this.printMsg('nextTurn');
    this.promptForInput();
  }

  printMsg(msg) {
    const responses = {
      nextTurn: `Player ${this.board.symbol}'s turn`,
      invalidInput: `Invalid selection, Player ${this.board.symbol}'s turn`,
      winner: `Player ${this.board.symbol} wins!`,
      gameOver: `Game is over!`,
    };

    process.stdout.write(responses[msg] + '\n');
  }

  gameWon() {
    this.board.printBoard();
    this.printMsg('winner');
    rl.close();
  }

  gameOver() {
    this.board.printBoard();
    this.printMsg('gameOver');
    rl.close();
  }

  invalidInput() {
    this.board.printBoard();
    this.printMsg('invalidInput');
    this.promptForInput();
  }

  nextTurn() {
    this.board.printBoard();
    this.printMsg('nextTurn');
    this.promptForInput();
  }

  promptForInput() {

    rl.question('Enter Selection:', (answer) => {

      let selection = Number(answer);
      if (selection && selection <= 9 && selection >= 1) {
        if (this.board.updateBoard(selection)) {
          if (this.board.checkForWinner()) return this.gameWon();
          if (this.board.detectGameEnd()) return this.gameOver();
          this.board.toggleSymbol();
          this.nextTurn();
        } else {
          this.invalidInput();
        }
      } else {
        this.invalidInput();
      }

    });
  }

}

const game = new Game();

