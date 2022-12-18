import fs from 'fs';

// https://adventofcode.com/2022/day/6

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test: ', part1(testInput));
console.log('answer: ', part1(inputData));

console.log('test2: ', part2(testInput));
console.log('answer2: ', part2(inputData));

console.log('alter(4) OK: ', part1alter(inputData));
console.log('alter(14) OK: ', part2alter(inputData));

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

function part1alter(inp) {
  return inp.split('\n').map((line) => {
    return noSetSolution(4, line);
  });
}

function part2alter(inp) {
  return inp.split('\n').map((line) => {
    return noSetSolution(14, line);
  });
}

function noSetSolution(len, line) {
  let marker = Array('z'.charCodeAt(0) + 1).fill(0);
  let unique = 0;

  for (let i = 0; i < len; i++) {
    let charCode = line[i].charCodeAt(0);

    if (marker[charCode] === 0) unique++;
    if (marker[charCode] === 1) unique--;
    marker[charCode]++;
  }
  if (unique === len) return len;

  for (let i = len; i < line.length; i++) {
    let charCode = line[i].charCodeAt(0);
    if (marker[charCode] === 0) unique++;
    if (marker[charCode] === 1) unique--;
    marker[charCode]++;

    let lastCarCode = line[i - len].charCodeAt(0);
    if (marker[lastCarCode] === 2) unique++;
    if (marker[lastCarCode] === 1) unique--;
    marker[lastCarCode]--;

    if (unique === len) return i + 1;
  }
}