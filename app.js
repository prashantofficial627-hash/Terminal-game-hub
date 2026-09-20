#!/usr/bin/env node

const readline = require('readline');

// ==========================================
// TERMINAL STYLING & UTILITIES (Zero-dependency)
// ==========================================
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[0f');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

async function pause(message = 'Press Enter to return to main menu...') {
  await ask(`\n${colors.dim}${message}${colors.reset}`);
}

// ==========================================
// GAME REGISTRY & PLACEHOLDERS
// ==========================================
async function playTicTacToe() {
  clearScreen();
  console.log(`${colors.cyan}${colors.bold}=== Tic Tac Toe ===${colors.reset}\n`);
  console.log(`${colors.yellow}Game module is loaded. Game logic will go here.${colors.reset}`);
  await pause();
}

async function playRPS() {
  clearScreen();
  console.log(`${colors.magenta}${colors.bold}=== Rock Paper Scissors ===${colors.reset}\n`);
  console.log(`${colors.yellow}Game module is loaded. Game logic will go here.${colors.reset}`);
  await pause();
}

async function playGuessing() {
  clearScreen();
  console.log(`${colors.green}${colors.bold}=== Number Guessing ===${colors.reset}\n`);
  console.log(`${colors.yellow}Game module is loaded. Game logic will go here.${colors.reset}`);
  await pause();
}

const games = [
  { id: '1', name: 'Tic Tac Toe', description: 'Classic 2-player grid game', handler: playTicTacToe },
  { id: '2', name: 'Rock Paper Scissors', description: 'Classic quick duel vs CPU', handler: playRPS },
  { id: '3', name: 'Number Guessing', description: 'Guess the hidden secret number', handler: playGuessing },
];

// ==========================================
// MAIN MENU & ROUTER
// ==========================================
function displayBanner() {
  console.log(`${colors.cyan}${colors.bold}==========================================`);
  console.log(`           🎮 TERMINAL GAME HUB           `);
  console.log(`==========================================${colors.reset}`);
  console.log(`${colors.dim}Select a game from the registry below:${colors.reset}\n`);

  games.forEach((game) => {
    console.log(`  ${colors.green}${game.id}.${colors.reset} ${colors.bold}${game.name}${colors.reset} ${colors.dim}- ${game.description}${colors.reset}`);
  });

  console.log(`  ${colors.red}4.${colors.reset} ${colors.bold}Exit${colors.reset}\n`);
}

async function main() {
  process.on('SIGINT', () => {
    console.log(`\n\n${colors.yellow}Session terminated. Goodbye! 👋${colors.reset}\n`);
    rl.close();
    process.exit(0);
  });

  while (true) {
    clearScreen();
    displayBanner();

    const input = (await ask(`${colors.bold}Enter your choice (1-${games.length + 1}): ${colors.reset}`)).trim();

    if (input === String(games.length + 1)) {
      clearScreen();
      console.log(`\n${colors.green}Thanks for visiting Terminal Game Hub! Goodbye. 👋${colors.reset}\n`);
      break;
    }

    const selectedGame = games.find((g) => g.id === input);
    if (selectedGame) {
      await selectedGame.handler();
    } else {
      console.log(`\n${colors.red}Invalid choice! Please enter a number between 1 and ${games.length + 1}.${colors.reset}`);
      await pause('Press Enter to try again...');
    }
  }

  rl.close();
}

main();

