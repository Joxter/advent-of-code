import fs from 'fs';

// https://adventofcode.com/2022/day/**********

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 64);
console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part1(testInput) === 123);
// console.log('answer2:', part1(inputData));

function part1(inp) {
  let result = 0;
  let map = {};

  inp.trim().split('\n').forEach((line) => {
    map[line] = true;
  });

  console.log(map);

  return Object.keys(map).map((position) => {
    let [x, y, z] = position.split(',').map(it => +it);

    let open = 6;

    if (map[[x + 1, y, z].join(',')]) {
      // console.log('> 1');
      open--;
    }
    if (map[[x, y + 1, z].join(',')]) {
      // console.log('> 2');
      open--;
    }
    if (map[[x, y, z + 1].join(',')]) {
      // console.log('> 3');
      open--;
    }

    if (map[[x - 1, y, z].join(',')]) {
      // console.log('> 4');
      open--;
    }
    if (map[[x, y - 1, z].join(',')]) {
      // console.log('> 5');
      open--;
    }
    if (map[[x, y, z - 1].join(',')]) {
      // console.log('> 6');
      open--;
    }

    // console.log(open);
    return open;
  }).reduce((sum, it) => sum + it, 0);
}

function part2(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result;
}