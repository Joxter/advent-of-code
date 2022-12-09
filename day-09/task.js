import fs from 'fs';

// https://adventofcode.com/2022/day/9

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 13);
console.log('answer: ', part1(inputData));

// console.log('test2 OK: ', part2(testInput) === 8);
// console.log('answer2: ', part2(inputData));

function part1(inp) {
  let head = [0, 0]; // x, y
  let tail = [0, 0]; // x, y
  let delta = {
    'U': [1, 0],
    'D': [-1, 0],
    'R': [0, 1],
    'L': [0, -1],
  };

  let history = new Set();
  history.add(tail.join(','))

  inp.split('\n').map((line) => {
    let [direction, steps] = line.split(' ');
    steps = +steps;

    while (steps--) {
      let prevStep = [...head];
      head[0] += delta[direction][0];
      head[1] += delta[direction][1];

      if (lengthBetween(head, tail) > 1) {
        history.add(prevStep.join(','));
        tail = prevStep;
      }
    }
  });

  return history.size;
}

function part2(inp) {
  // WTF???
}

function lengthBetween(a, b) {
  return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
}