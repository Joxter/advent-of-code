import fs from 'fs';
import { runSolution } from '../../utils.js';

// https://adventofcode.com/2022/day/1

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

runSolution('test  ', () => run(testInput), 24000)
runSolution('part_1', () => run(inputData), 74711)

runSolution('test  ', () => runPart2(testInput), 45000)
runSolution('part_2', () => runPart2(inputData), 209481)

function run(inp) {
  let totals = inp.split('\n\n').map((calories) => {
    return calories.split('\n').reduce((sum, cnt) => sum + +cnt, 0)
  })

  return Math.max(...totals)
}

function runPart2(inp) {
  let totals = inp.split('\n\n').map((calories) => {
    return calories.split('\n').reduce((sum, cnt) => sum + +cnt, 0)
  })
  totals.sort((a, b) => b - a)

  return totals[0] + totals[1] + totals[2]
}

