import fs from 'fs';

// https://adventofcode.com/2022/day/**********

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 123);
console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part2(testInput) === 123);
// console.log('answer2:', part2(inputData));

function part1(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result
}

function part2(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result
}