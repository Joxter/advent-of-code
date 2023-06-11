import fs from 'fs';
import { runSolution } from "../../utils.js";

// https://adventofcode.com/2022/day/4

let folder = '../inputs/d04/';
let testInput = fs.readFileSync(folder + 'test.txt').toString();
let inputData = fs.readFileSync(folder + 'input.txt').toString();

runSolution('test  ', () => run(testInput), 2);
runSolution('part_1', () => run(inputData), 507);

runSolution('test  ', () => runPart2(testInput), 4);
runSolution('part_2', () => runPart2(inputData), 897);

function run(inp) {
  return inp.split('\n').filter((line) => {
    let [a, b] = line.split(',');
    let [a1, a2] = a.split('-').map((it) => +it);
    let [b1, b2] = b.split('-').map((it) => +it);

    return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2);
  }).length;
}

function runPart2(inp) {
  return inp.split('\n').filter((line) => {
    let [a, b] = line.split(',');
    let [a1, a2] = a.split('-').map((it) => +it);
    let [b1, b2] = b.split('-').map((it) => +it);

    return a2 >= b1 && b2 >= a1;
  }).length;
}

