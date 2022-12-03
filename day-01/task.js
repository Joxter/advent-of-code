import fs from 'fs';

// https://adventofcode.com/2022/day/1

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', run(testInput) === 24000);
console.log('answer: ', run(inputData));

console.log('test2 OK: ', runPart2(testInput) === 45000);
console.log('answer2: ', runPart2(inputData));

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

