#!/usr/bin/env node

const readline = require('readline');

// Import modular games
const playRPS = require('./games/rps');
const playGuessing = require('./games/guessing');

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
// 2. PLACEHOLDER GAMES (To be modularized)
// ==========================================
async function playTicTacToe() {
  console.log('\n--- Tic Tac Toe ---');
  console.log('Game logic will go here.');
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
        await playRPS(ask);
        break;
      case '3':
        await playGuessing(ask);
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


