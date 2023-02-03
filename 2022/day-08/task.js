import fs from 'fs';
import { runSolution } from '../../utils.js';

// https://adventofcode.com/2022/day/8

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

runSolution('test  ', () => part1(testInput), 21);
runSolution('part_1', () => part1(inputData), 1708);

runSolution('test  ', () => part2(testInput), 8);
runSolution('part_2', () => part2(inputData), 504000);

function part1(inp) {
  let result = new Map();

  inp = inp.split('\n').map((line) => {
    return line.split('').map((n) => +n);
  });

  let width = inp[0].length;
  let height = inp.length;

  for (let i = 0; i < height; i++) {
    result.set(i, new Map());

    // left -> right
    let max = -1;
    for (let j = 0; j < width; j++) {
      let curr = inp[i][j];
      if (curr > max) {
        result.get(i).set(j, curr);
        max = curr;
        if (max === 9) break;
      }
    }

    // right -> left
    max = -1;
    for (let j = width - 1; j >= 0; j--) {
      let curr = inp[i][j];
      if (curr > max) {
        result.get(i).set(j, curr);
        max = curr;
        if (max === 9) break;
      }
    }
  }

  for (let j = 0; j < width; j++) {
    // top -> down
    let max = -1;
    for (let i = 0; i < height; i++) {
      let curr = inp[i][j];
      if (curr > max) {
        result.get(i).set(j, curr);
        max = curr;
        if (max === 9) break;
      }
    }

    // down -> top
    max = -1;
    for (let i = height - 1; i >= 0; i--) {
      let curr = inp[i][j];
      if (curr > max) {
        result.get(i).set(j, curr);
        max = curr;
        if (max === 9) break;
      }
    }
  }

  let total = 0;
  [...result.values()].forEach((row) => {
    total += row.size;
  });

  return total;
}

function part2(inp) {
  let result = 0;

  inp = inp.split('\n').map((line) => {
    return line.split('').map((n) => +n);
  });

  let width = inp[0].length;
  let height = inp.length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let currentTree = inp[i][j];

      let leftScore = 0;
      for (let a = j - 1; a >= 0; a--) {
        leftScore++;
        if (currentTree <= inp[i][a]) break;
      }

      let rightScore = 0;
      for (let a = j + 1; a < width; a++) {
        rightScore++;
        if (currentTree <= inp[i][a]) break;
      }

      let topScore = 0;
      for (let a = i - 1; a >= 0; a--) {
        topScore++;
        if (currentTree <= inp[a][j]) break;
      }

      let bottomScore = 0;
      for (let a = i + 1; a < height; a++) {
        bottomScore++;
        if (currentTree <= inp[a][j]) break;
      }

      result = Math.max(result, leftScore * rightScore * topScore * bottomScore);
    }
  }

  return result;
}
