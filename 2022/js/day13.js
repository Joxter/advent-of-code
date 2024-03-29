import fs from 'fs';
import { runSolution } from "../../utils.js";

// https://adventofcode.com/2022/day/13

let folder = '../inputs/d13/';
let testInput = fs.readFileSync(folder + 'test.txt').toString();
let inputData = fs.readFileSync(folder + 'input.txt').toString();

runSolution('test  ', () => part1(testInput), 13);
runSolution('part_1', () => part1(inputData), 5938);

runSolution('test  ', () => part2(testInput), 140);
runSolution('part_2', () => part2(inputData), 29025);


function part1(inp) {
  return inp.split('\n\n').map((blocks, i) => {
    let [_left, _right] = blocks.split('\n');
    let left = JSON.parse(_left);
    let right = JSON.parse(_right);

    let isCorrect = compare(left, right);
    return isCorrect === 1 ? i + 1 : 0;
  }).reduce((sum, n) => sum + n, 0);
}

function part2(inp) {
  let arr = inp.split('\n\n').map((blocks, i) => {
    let [_left, _right] = blocks.split('\n');
    let left = JSON.parse(_left);
    let right = JSON.parse(_right);
    return [left, right];
  }).flat();

  arr.push([[2]], [[6]]);
  arr.sort(compare).reverse();

  let indexOf2 = arr.findIndex((it) => it.length === 1 && it[0].length === 1 && it[0][0] === 2) + 1;
  let indexOf6 = arr.findIndex((it) => it.length === 1 && it[0].length === 1 && it[0][0] === 6) + 1;

  return indexOf2 * indexOf6;
}

function compare(left, right) {
  left = [...left];
  right = [...right];

  while (left.length > 0 && right.length > 0) {
    let l = left.shift();
    let r = right.shift();

    if (Array.isArray(l) || Array.isArray(r)) {
      let res = compare(
        Array.isArray(l) ? l : [l],
        Array.isArray(r) ? r : [r]
      );

      if (res !== 0) return res;
    }

    if (l > r) return -1;
    if (l < r) return 1;
  }

  if (left.length < right.length) return 1;
  if (left.length > right.length) return -1;
  return 0;
}
