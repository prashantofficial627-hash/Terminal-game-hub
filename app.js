#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

// ==========================================
// GAME PLACEHOLDERS (Add your logic here)
// ==========================================
async function playTicTacToe() {
  console.log('\n--- Tic Tac Toe ---');
  console.log('Game logic will go here.');
  await ask('\nPress Enter to return to main menu...');
}

async function playRPS() {
  console.log('\n--- Rock Paper Scissors ---');
  console.log('Game logic will go here.');
  await ask('\nPress Enter to return to main menu...');
}

async function playGuessing() {
  console.log('\n--- Number Guessing ---');
  console.log('Game logic will go here.');
  await ask('\nPress Enter to return to main menu...');
}

// ==========================================
// MAIN MENU
// ==========================================
async function main() {
  while (true) {
    console.log(`
================================
          GAME HUB
================================

1. Tic Tac Toe
2. Rock Paper Scissors
3. Number Guessing
4. Exit
`);
    const choice = (await ask('Enter your choice (1-4): ')).trim();

    if (choice === '1') {
      await playTicTacToe();
    } else if (choice === '2') {
      await playRPS();
    } else if (choice === '3') {
      await playGuessing();
    } else if (choice === '4') {
      console.log('\nThanks for visiting Game Hub! Goodbye.\n');
      break;
    } else {
      console.log('\nInvalid choice. Please enter a number between 1 and 4.');
    }
  }

  rl.close();
}

main();
