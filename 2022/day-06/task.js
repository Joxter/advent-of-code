import fs from 'fs';
import { runSolution } from '../../utils.js';

// https://adventofcode.com/2022/day/6

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

runSolution('test  ', () => part1(testInput), 7);
runSolution('part_1', () => part1(inputData), 1134);

runSolution('test  ', () => part2(testInput), 19);
runSolution('part_2', () => part2(inputData), 2263);

runSolution('alter(4) ', () => part1alter(inputData), 1134);
runSolution('alter(14)', () => part2alter(inputData), 2263);

function part1(line) {
  let marker = line.slice(0, 3).split('');

  for (let j = 3; j < line.length; j++) {
    marker[j % 4] = line[j];
    if (new Set(marker).size === 4) {
      return j + 1;
    }
  }
}

function part2(line) {
  let marker = line.slice(0, 13).split('');

  for (let j = 13; j < line.length; j++) {
    marker[j % 14] = line[j];
    if (new Set(marker).size === 14) {
      return j + 1;
    }
  }
}

function part1alter(inp) {
  return noSetSolution(4, inp);
}

function part2alter(inp) {
  return noSetSolution(14, inp);
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