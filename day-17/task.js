import fs from 'fs';

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
];

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput), [3068]);
console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part1(testInput) === 123);
// console.log('answer2:', part1(inputData));

function part1(inp) {
  let result = 0;
  let jet = inp.trim().split(''); // "<" left, ">" right

  let currentRockN = 0;

  let tower = [
    '#######'.split(''), // 0
  ];

  // let rock1 = createRock(rocks[0], 2, tower.length + 3);
  // render(tower, moveRight(rock1), [0, 8]);
  // render(tower, moveRight(moveRight(rock1)), [0, 8]);
  // render(tower, moveLeft(moveRight(moveRight(rock1))), [0, 8]);

  let jetCnt = 0;

  while (currentRockN < 2022) {
    currentRockN++;
    let currentRock = createRock(rocks[(currentRockN - 1) % rocks.length], 2, tower.length + 3);

    while (true) {
      let jetAction = jet[jetCnt++ % jet.length] === '<' ? moveLeft : moveRight;
      let jetMovedCurrentRock = jetAction(currentRock) || currentRock;

      if (isOverlaps(tower, jetMovedCurrentRock)) {
        jetMovedCurrentRock = currentRock
      }

      let movedDownRock = moveDown(jetMovedCurrentRock) || jetMovedCurrentRock;

      if (isOverlaps(tower, movedDownRock)) {
        saveRock(tower, jetMovedCurrentRock)
        break;
      } else {
        currentRock = movedDownRock;
      }
    }
  }

  return tower.length - 1;
}

function isOverlaps(tower, rock) {
  for (let i = tower.length - 1; i >= 0; i--) { // row
    for (let j = 0; j < 7; j++) { // col
      let towerChar = tower[i][j];
      let rockChar = rock?.find(([row, col]) => {
        return row === i && col === j;
      });

      // console.log(towerChar && rockChar)
      if (towerChar && rockChar) {
        return true;
      }
    }
  }

  return false;
}

function saveRock(tower, rock) {
  rock.forEach(([row, col]) =>{
    if (!tower[row]) {
      tower[row] = Array(7).fill(null);
    }
    tower[row][col] = '#'
  })
}

function render(tower, rock, [min, max] = [0, 5]) {
  let result = '';

  for (let i = min; i <= max; i++) {    // row

    let line = '';
    for (let j = 0; j < 7; j++) { // col
      let towerChar = tower[i]?.[j] ?? null;
      let rockChar = rock?.find(([row, col]) => {
        return row === i && col === j;
      }) && 'R' || null;

      line += towerChar && rockChar
        ? 'X'
        : (towerChar || rockChar || '.');
    }

    result = `${line} ${i}\n` + result;
  }

  // console.clear();
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

function part2(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result;
}