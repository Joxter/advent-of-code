import fs from 'fs';
import { runSolution } from '../utils.js';

// https://adventofcode.com/2022/day/2

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

runSolution('test  ', () => part1(testInput), 15);
runSolution('part_1', () => part1(inputData), 10310);

runSolution('test  ', () => part2(testInput), 12);
runSolution('part_2', () => part2(inputData), 14859);

runSolution('[no advent] test  ', () => part1noAdvent(testInput), 15);
runSolution('[no advent] part_1', () => part1noAdvent(inputData), 10310);

runSolution('[no advent] test  ', () => part2noAdvent(testInput), 12);
runSolution('[no advent] part_2', () => part2noAdvent(inputData), 14859);

function part1(inp) {
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
      return sum + (scores[set] || 0);
    }, 0);

  return total;
}

function part2(inp) {
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
      return sum + (scores2[set] || 0);
    }, 0);

  return total;
}

// inspired https://www.youtube.com/watch?v=lNFMyI3JBeY
function part1noAdvent(inp) {
  let total = 0;

  inp.split('\n')
    .forEach((line) => {
      let [x, y] = line.split(' ');
      x = x.charCodeAt(0) - 'A'.charCodeAt(0);
      y = y.charCodeAt(0) - 'X'.charCodeAt(0);

      if (x === y) {
        total += 3;
      } else if ((y - x + 3) % 3 === 1) {
        total += 6;
      }
      total += y + 1;
    });

  return total;
}

// X means you need to lose,
// Y means you need to end the round in a draw,
// and Z means you need to win
function part2noAdvent(inp) {
  return  4; // todo IMPLEMENT
  let total = 0;

  // A X
  // B Y
  // C Z
  inp.split('\n')
    .forEach((line) => {
      let [x, y] = line.split(' ');
      x = x.charCodeAt(0) - 'A'.charCodeAt(0);
      y = y.charCodeAt(0) - 'X'.charCodeAt(0);

      if (x === y) {
        total += 3;
      } else if ((y - x + 3) % 3 === 1) {
        total += 6;
      }
      total += y + 1;
    });

  return total;
}
