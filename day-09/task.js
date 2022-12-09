import fs from 'fs';

// https://adventofcode.com/2022/day/9

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 13);
console.log('answer: ', part1(inputData));

console.log('test_actual OK: ', part1_correct(testInput, 1) === 13);
console.log('answer_actual: ', part1_correct(inputData, 1));

let test2Input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
console.log('test2 OK: ', part2(test2Input) === 36);
console.log('answer2: ', part2(inputData)); // 491 is wrong????

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
  history.add(tail.join(','));

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

function part1_correct(inp) {
  return correct_approach_actually(inp, 1);
}

function part2(inp) {
  return correct_approach_actually(inp, 9);
}

function correct_approach_actually(inp, ropeLen) {
  let history = new Set();
  let rope = Array.from({length: ropeLen + 1}, () => {
    return [0, 0];
  });
  let delta = {'U': [1, 0], 'D': [-1, 0], 'R': [0, 1], 'L': [0, -1],};

  inp.split('\n').map((line) => {
    let [direction, steps] = line.split(' ');
    steps = +steps;

    while (steps--) {
      rope[0][0] += delta[direction][0];
      rope[0][1] += delta[direction][1];

      for (let i = 1; i < rope.length; i++) {
        rope[i] = follow(rope[i], rope[i - 1]);
      }
      history.add(rope[ropeLen].join(','));
    }
  });

  return history.size;
}

function lengthBetween(a, b) {
  return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
}

function follow(a, b) {
  let res = [...a];

  if (a[0] + 2 === b[0]) {
    res[0]++;
    if (a[1] + 1 === b[1]) res[1]++;
    if (a[1] - 1 === b[1]) res[1]--;
    return res;
  } else if (a[0] - 2 === b[0]) {
    res[0]--;
    if (a[1] + 1 === b[1]) res[1]++;
    if (a[1] - 1 === b[1]) res[1]--;
    return res;
  } else if (a[1] + 2 === b[1]) {
    res[1]++;
    if (a[0] + 1 === b[0]) res[0]++;
    if (a[0] - 1 === b[0]) res[0]--;
    return res;
  } else if (a[1] - 2 === b[1]) {
    res[1]--;
    if (a[0] + 1 === b[0]) res[0]++;
    if (a[0] - 1 === b[0]) res[0]--;
    return res;
  }

  return res;
}