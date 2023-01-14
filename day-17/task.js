import fs from 'fs';
import { runSolution } from '../utils.js';

// https://adventofcode.com/2022/day/17

let rocks = [
  `####`,
  `.#.
###
.#.`,
  `..#
..#
###`,
  `#
#
#
#`,
  `##
##`
]; // 5

let testInput = fs.readFileSync('./testData.txt').toString(); // 40
let inputData = fs.readFileSync('./input.txt').toString(); // 10091 (prime)

runSolution('test  ', () => part1(testInput), 3068)
runSolution('part_1', () => part1(inputData), 3153)

runSolution('test  ', () => part2test(testInput), 1_514_285_714_288)
runSolution('part_2', () => part2data(inputData), 1_553_665_689_155)

function part1(inp, rocklimit = 2022) {
  let result = 0;
  let jet = inp.trim().split(''); // "<" left, ">" right

  let currentRockN = 0;

  let tower = [
    '#######'.split(''), // 0
  ];

  let jetCnt = 0;

  while (currentRockN < rocklimit) {
    // if (currentRockN % 500 === 0) {
    //   let progress = (currentRockN * 100 / rocklimit).toFixed(2);
    //   console.log(`${progress}% ${currentRockN}/${rocklimit}`);
    // }
    currentRockN++;
    let rockId = (currentRockN - 1) % rocks.length;
    let currentRock = createRock(rocks[rockId], 2, tower.length + 3);

    while (true) {
      let jetAction = jet[jetCnt++ % jet.length] === '<' ? moveLeft : moveRight;
      let jetMovedCurrentRock = jetAction(currentRock) || currentRock;

      if (isOverlaps(tower, jetMovedCurrentRock)) {
        jetMovedCurrentRock = currentRock;
      }

      let movedDownRock = moveDown(jetMovedCurrentRock) || jetMovedCurrentRock;

      if (isOverlaps(tower, movedDownRock)) {
        saveRock(tower, jetMovedCurrentRock, rockId + 1);
        break;
      } else {
        currentRock = movedDownRock;
      }
    }
  }
  // render(tower, null, [0, tower.length])

  return tower.length - 1;
}

function isOverlaps(tower, rock) {
  for (let i = tower.length - 1; i >= 0; i--) {
    for (let j = 0; j < 7; j++) {
      let towerChar = tower[i][j];
      let rockChar = rock?.find(([row, col]) => {
        return row === i && col === j;
      });

      if (towerChar && rockChar) {
        return true;
      }
    }
  }

  return false;
}

function saveRock(tower, rock, rockId) {
  rock.forEach(([row, col]) => {
    if (!tower[row]) {
      tower[row] = Array(7).fill(null);
    }
    tower[row][col] = rockId;
  });
}

function render(tower, rock, [min, max] = [0, 5]) {
  let result = '';

  for (let i = min; i <= max; i++) {

    let line = '';
    for (let j = 0; j < 7; j++) {
      let towerChar = tower[i]?.[j] ?? null;
      let rockChar = rock?.find(([row, col]) => {
        return row === i && col === j;
      }) && 'R' || null;

      line += towerChar && rockChar
        ? 'X'
        : (towerChar || rockChar || '.');
    }

    result = `${line} ${i}\n` + result;
    // result = `${line}\n` + result;
  }

  // console.clear();
  // fs.writeFileSync('./tower.txt', result);
  console.log(result);
  // hardWait(300)
}

function hardWait(mSec = 1000) {
  let start = Date.now();

  while (Date.now() - start < mSec) {
    // wait
  }
}

function moveLeft(rock) {
  let result = [];
  for (const [row, col] of rock) {
    if (col > 0) {
      result.push([row, col - 1]);
    } else {
      return null;
    }
  }
  return result;
}

function moveRight(rock) {
  let result = [];
  for (const [row, col] of rock) {
    if (col < 6) {
      result.push([row, col + 1]);
    } else {
      return null;
    }
  }
  return result;
}

function moveDown(rock) {
  let result = [];
  for (const [row, col] of rock) {
    result.push([row - 1, col]);
  }
  return result;
}

function createRock(str, colOffset = 0, rowOffset = 0) {
  let rock = []; // [row, col][]

  str.split('\n').reverse().forEach((line, row) => {
    line.split('').forEach((char, col) => {
      if (char === '#') {
        rock.push([row + rowOffset, col + colOffset]);
      }
    });
  });

  return rock;
}

function part2test(inp) {
  let rockLimit = 1_000_000_000_000;

  let noLoopRocks = 15;
  let noLoopHeight = 25;
  let loopRocks = 35;
  let loopHeight = 53;

  let amountOfLoops = Math.floor((rockLimit - noLoopRocks) / loopRocks);

  let newLimit = rockLimit - amountOfLoops * loopRocks;
  let renderedHeit = part1(inp, newLimit);

  return renderedHeit + (amountOfLoops) * loopHeight;
}

function part2data(inp) {
  let rockLimit = 1_000_000_000_000;

  let noLoopRocks = 632;
  let noLoopHeight = 1006;

  let loopRocks = 2337 - noLoopRocks;
  let loopHeight = 3655 - noLoopHeight;

  let amountOfLoops = Math.floor((rockLimit - noLoopRocks) / loopRocks);

  let newLimit = rockLimit - amountOfLoops * loopRocks;
  let renderedHeit = part1(inp, newLimit);

  return renderedHeit + (amountOfLoops) * loopHeight;
}