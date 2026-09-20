module.exports = async function playRPS(ask) {
  console.log('\n================================');
  console.log('    ✂️ ROCK PAPER SCISSORS 🪨   ');
  console.log('================================');

  const choices = ['rock', 'paper', 'scissors'];
  const aliases = { r: 'rock', p: 'paper', s: 'scissors' };
  
  let scores = { player: 0, computer: 0, ties: 0 };
  let again = 'y';

  while (again === 'y' || again === 'yes') {
    console.log(`\nScore -> You: ${scores.player} | CPU: ${scores.computer} | Ties: ${scores.ties}`);
    
    let userChoice = (await ask('\nChoose [r]ock, [p]aper, [s]cissors (or "q" to exit): '))
      .trim()
      .toLowerCase();

    if (userChoice === 'q') {
      break;
    }

    // Resolve shorthand alias (e.g. 'r' -> 'rock')
    if (aliases[userChoice]) {
      userChoice = aliases[userChoice];
    }

    if (!choices.includes(userChoice)) {
      console.log('⚠️ Invalid choice! Please pick rock, paper, or scissors.');
      continue;
    }

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log(`\nYou chose:      ${userChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    if (userChoice === computerChoice) {
      console.log("Result: It's a tie! 🤝");
      scores.ties++;
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      console.log('Result: You win! 🎉');
      scores.player++;
    } else {
      console.log('Result: Computer wins! 💻');
      scores.computer++;
    }

    again = (await ask('\nPlay another round? (y/n): ')).trim().toLowerCase();
  }

  console.log(`\nFinal Score -> You: ${scores.player} | CPU: ${scores.computer} | Ties: ${scores.ties}`);
  console.log('Returning to main menu...\n');
};
