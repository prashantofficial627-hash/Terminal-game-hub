module.exports = async function playTicTacToe(ask) {
  console.log('\n================================');
  console.log('       ❌ TIC TAC TOE ⭕       ');
  console.log('================================');

  let again = 'y';

  while (again === 'y' || again === 'yes') {
    // 3x3 Board initialized with positions 1 to 9
    let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let currentPlayer = 'X';
    let moves = 0;
    let gameOver = false;

    function printBoard() {
      console.log('\n');
      console.log(`  ${board[0]} | ${board[1]} | ${board[2]}`);
      console.log(' ---+---+---');
      console.log(`  ${board[3]} | ${board[4]} | ${board[5]}`);
      console.log(' ---+---+---');
      console.log(`  ${board[6]} | ${board[7]} | ${board[8]}`);
      console.log('\n');
    }

    function checkWin(p) {
      const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
      return winCombos.some((combo) => combo.every((index) => board[index] === p));
    }

    while (!gameOver) {
      printBoard();

      const input = (await ask(`Player ${currentPlayer}, enter position (1-9) or "q" to quit: `)).trim();

      if (input.toLowerCase() === 'q') {
        console.log('\nGame exited.');
        break;
      }

      const position = parseInt(input, 10);

      // Validate move
      if (isNaN(position) || position < 1 || position > 9 || board[position - 1] === 'X' || board[position - 1] === 'O') {
        console.log('⚠️ Invalid move! Please choose an available number (1-9).');
        continue;
      }

      // Place mark
      board[position - 1] = currentPlayer;
      moves++;

      // Check for winner
      if (checkWin(currentPlayer)) {
        printBoard();
        console.log(`🎉 Player ${currentPlayer} WINS! 🏆\n`);
        gameOver = true;
      } else if (moves === 9) {
        printBoard();
        console.log("🤝 It's a DRAW!\n");
        gameOver = true;
      } else {
        // Switch turn between X and O
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }

    again = (await ask('Play another game of Tic Tac Toe? (y/n): ')).trim().toLowerCase();
  }

  console.log('\nReturning to main menu...\n');
};
