module.exports = async function playGuessing(ask) {
  console.log('\n--- Number Guessing Game ---');

  let again = 'y';
  while (again === 'y' || again === 'yes') {
    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    console.log("\nI'm thinking of a number between 1 and 100.");

    while (true) {
      const guess = Number((await ask('Enter your guess: ')).trim());

      if (!guess || guess < 1 || guess > 100) {
        console.log('Please enter a valid number between 1 and 100.');
        continue;
      }

      attempts++;

      if (guess < target) {
        console.log('Too Low!');
      } else if (guess > target) {
        console.log('Too High!');
      } else {
        console.log(`\nCorrect! The number was ${target}.`);
        console.log(`You guessed it in ${attempts} attempt${attempts === 1 ? '' : 's'}.`);
        break;
      }
    }

    again = (await ask('\nPlay again? (y/n): ')).trim().toLowerCase();
  }

  console.log('\nReturning to main menu...\n');
};
