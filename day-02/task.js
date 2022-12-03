import fs from 'fs';

// https://adventofcode.com/2022/day/2

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', run(testInput) === 15);
console.log('answer: ', run(inputData));

console.log('test2 OK: ', runPart2(testInput) === 12);
console.log('answer2: ', runPart2(inputData));

function run(inp) {
  const scores = {
    // rock
    'A X': ROCK + DRAW,
    'A Y': PAPER + WIN,
    'A Z': SCISSORS + LOSE,

    // paper
    'B X': ROCK + LOSE,
    'B Y': PAPER + DRAW,
    'B Z': SCISSORS + WIN,

    // scissors
    'C X': ROCK + WIN,
    'C Y': PAPER + LOSE,
    'C Z': SCISSORS + DRAW,
  };

  let total = inp.split('\n')
    .reduce((sum, set) => {
      return sum + (scores[set] || 0)
    }, 0)

  return total
}

// X means you need to lose,
// Y means you need to end the round in a draw,
// and Z means you need to win"
function runPart2(inp) {
  const scores2 = {
    // rock
    'A X': SCISSORS + LOSE,
    'A Y': ROCK + DRAW,
    'A Z': PAPER + WIN,

    // paper
    'B X': ROCK + LOSE,
    'B Y': PAPER + DRAW,
    'B Z': SCISSORS + WIN,

    // scissors
    'C X': PAPER + LOSE,
    'C Y': SCISSORS + DRAW,
    'C Z': ROCK + WIN,
  };

  let total = inp.split('\n')
    .reduce((sum, set) => {
      return sum + (scores2[set] || 0)
    }, 0)

  return total
}

