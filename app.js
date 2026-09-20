#!/usr/bin/env node

const readline = require('readline');

// Import modular game functions
const playTicTacToe = require('./games/tictactoe');
const playRPS = require('./games/rps');
const playGuessing = require('./games/guessing');

// ==========================================
// 1. INPUT HELPER (for game text prompts)
// ==========================================
function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// ==========================================
// 2. ARROW-KEY SELECTION MENU
// ==========================================
function selectMenu(title, options) {
  return new Promise((resolve) => {
    let selectedIndex = 0;

    // Enable keypress events on terminal input
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();

    function render() {
      console.clear();
      console.log(title);

      options.forEach((opt, idx) => {
        if (idx === selectedIndex) {
          console.log(` > [ ${opt} ]`);
        } else {
          console.log(`     ${opt}`);
        }
      });

      console.log('\nUse UP/DOWN arrows to navigate, Enter to select.\n');
    }

    function onKeyPress(str, key) {
      if (!key) return;

      if (key.ctrl && key.name === 'c') {
        cleanup();
        console.clear();
        console.log('Session ended. Goodbye!\n');
        process.exit(0);
      } else if (key.name === 'up') {
        selectedIndex = (selectedIndex - 1 + options.length) % options.length;
        render();
      } else if (key.name === 'down') {
        selectedIndex = (selectedIndex + 1) % options.length;
        render();
      } else if (key.name === 'return' || key.name === 'enter') {
        cleanup();
        resolve(selectedIndex);
      }
    }

    function cleanup() {
      process.stdin.removeListener('keypress', onKeyPress);
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
      process.stdin.pause();
    }

    process.stdin.on('keypress', onKeyPress);
    render();
  });
}

// ==========================================
// 3. MAIN APPLICATION LOOP
// ==========================================
async function main() {
  const menuTitle = `
================================
       🎮 GAME HUB MENU
================================`;

  const menuOptions = [
    'Tic Tac Toe',
    'Rock Paper Scissors',
    'Number Guessing',
    'Exit'
  ];

  let isRunning = true;

  while (isRunning) {
    const selected = await selectMenu(menuTitle, menuOptions);

    console.clear();

    switch (selected) {
      case 0:
        await playTicTacToe(ask);
        break;
      case 1:
        await playRPS(ask);
        break;
      case 2:
        await playGuessing(ask);
        break;
      case 3:
        console.log('\nThanks for playing Game Hub! Goodbye.\n');
        isRunning = false;
        break;
    }
  }
}

// Start application
main();







