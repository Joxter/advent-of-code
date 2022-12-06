import fs from 'fs';

// https://adventofcode.com/2022/day/6

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test: ', part1(testInput));
console.log('answer: ', part1(inputData));

console.log('test2: ', part2(testInput));
console.log('answer2: ', part2(inputData));

function part1(inp) {
  return inp.split('\n').map((line) => {
    let marker = line.slice(0, 3).split('');

    for (let j = 3; j < line.length; j++) {
      marker[j % 4] = line[j];
      if (new Set(marker).size === 4) {
        return j + 1;
      }
    }
  });
}

function part2(inp) {
  return inp.split('\n').map((line) => {
    let marker = line.slice(0, 13).split('');

    for (let j = 13; j < line.length; j++) {
      marker[j % 14] = line[j];
      if (new Set(marker).size === 14) {
        return j + 1;
      }
    }
  });
}

