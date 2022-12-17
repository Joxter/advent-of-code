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
let rockHeight = rocks.map(r => r.split('\n').length);

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 3068);
// console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part1(testInput) === 123);
// console.log('answer2:', part1(inputData));

function part1(inp) {
  let result = 0;
  let jet = inp.trim().split(''); // "<" left, ">" right

  let currentRockN = 0;

  let tower = [
    '#######'.split(''), // 0
    '..###..'.split(''), // 1
  ];

  // let rock1 = createRock(rocks[0], 2, tower.length + 3);
  // let rock2 = createRock(rocks[1], 2, tower.length + 3);
  // let rock3 = createRock(rocks[2], 2, tower.length + 3);
  // let rock4 = createRock(rocks[3], 2, tower.length + 3);
  // let rock5 = createRock(rocks[4], 2, tower.length + 3);
  // render(tower, rock3, [0, 8]);
  // render(tower, moveLeft(rock3), [0, 8]);
  // render(tower, moveLeft(rock3), [0, 8]);
  // render(tower, moveRight(rock3), [0, 8]);
  // render(tower, moveDown(rock3), [0, 8]);

  while (currentRockN <= 2022) {
    currentRockN++;

  }


  return result;
}

function isCollides(rock) {
  // rock;
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

    result = `${line}\n` + result;
  }

  console.log(result);
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
    if (col < 7) {
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