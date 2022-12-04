import fs from 'fs';

// https://adventofcode.com/2022/day/4

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', run(testInput) === 2);
console.log('answer: ', run(inputData));

console.log('test2 OK: ', runPart2(testInput) === 4);
console.log('answer2: ', runPart2(inputData));

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

