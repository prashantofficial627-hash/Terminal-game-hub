#!/usr/bin/env node

const readline = require('readline');

// ==========================================
// 1. SETUP READLINE FOR USER INPUT
// ==========================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions using async/await
function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ==========================================
// 2. GAME FUNCTIONS (Placeholders)
// ==========================================
async function playTicTacToe() {
  console.log('\n--- Tic Tac Toe ---');
  console.log('Game logic will go here.');
  await ask('\nPress Enter to return to main menu...');
}

async function playRockPaperScissors() {
  console.log('\n--- Rock Paper Scissors ---');
  console.log('Game logic will go here.');
  await ask('\nPress Enter to return to main menu...');
}

// 2. Number Guessing Game (Fully Linked & Playable)
async function playNumberGuessing() {
  console.log('\n================================');
  console.log('     🎯 NUMBER GUESSING GAME     ');
  console.log('================================');
  console.log('I picked a secret number between 1 and 100.');

  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  while (true) {
    const input = (await ask('\nEnter your guess (or "q" to quit): ')).trim().toLowerCase();

    if (input === 'q') {
      console.log(`\nGame exited. The secret number was ${secretNumber}.`);
      break;
    }

    const guess = parseInt(input, 10);

    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
      console.log('⚠️ Please enter a valid number between 1 and 100.');
      continue;
    }

    attempts++;

    // Check guess against secret number
    if (guess === secretNumber) {
      console.log(`\n🎉 Congratulations! You found the number in ${attempts} attempts! 🏆`);
      break;
    } else if (guess < secretNumber) {
      console.log('📈 Too low! Try a higher number.');
    } else {
      console.log('📉 Too high! Try a lower number.');
    }
  }

  await ask('\nPress Enter to return to main menu...');
}

// ==========================================
// 3. MAIN MENU & APPLICATION LOOP
// ==========================================
async function main() {
  let isRunning = true;

  while (isRunning) {
    console.log(`
================================
       🎮 GAME HUB MENU
================================
1. Tic Tac Toe
2. Rock Paper Scissors
3. Number Guessing
4. Exit
`);

    const choice = (await ask('Enter your choice (1-4): ')).trim();

    switch (choice) {
      case '1':
        await playTicTacToe();
        break;
      case '2':
        await playRockPaperScissors();
        break;
      case '3':
        await playNumberGuessing();
        break;
      case '4':
        console.log('\nThanks for playing! Goodbye.\n');
        isRunning = false;
        break;
      default:
        console.log('\nInvalid choice! Please enter a number between 1 and 4.');
        await ask('\nPress Enter to continue...');
        break;
    }
  }

  rl.close();
}

// Start the application
main();

