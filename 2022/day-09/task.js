import fs from 'fs';
import { runSolution } from '../../utils.js';

// https://adventofcode.com/2022/day/9

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

runSolution('test  ', () => part1(testInput), 96);
// runSolution('part_1', () => part1(inputData), 6018);

// runSolution('test  ', () => part2(testInput), 38);
// runSolution('part_2', () => part2(inputData), 2619);

function part1(inp) {
  return correct_approach_actually(inp, 1);
}

function part2(inp) {
  return correct_approach_actually(inp, 9);
}

function correct_approach_actually(inp, ropeLen) {
  let history = new Set();
  let rope = Array.from({ length: ropeLen + 1 }, () => {
    return [0, 0];
  });
  let delta = { 'U': [1, 0], 'D': [-1, 0], 'R': [0, 1], 'L': [0, -1], };

  inp.split('\n').map((line) => {
    let [direction, steps] = line.split(' ');
    steps = +steps;

    while (steps--) {
      rope[0][0] += delta[direction][0];
      rope[0][1] += delta[direction][1];

      for (let i = 1; i < rope.length; i++) {
        rope[i] = follow(rope[i], rope[i - 1]);
      }
      console.log(rope[ropeLen].join(','));
      history.add(rope[ropeLen].join(','));
    }
  });

  return history.size;
}

function lengthBetween(a, b) {
  return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
}

function follow(tail, head) {
  let res = [...tail];
  if (lengthBetween(tail, head) < 2) return res;

  if (tail[0] === head[0]) {
    if (tail[1] < head[1]) res[1]++;
    if (tail[1] > head[1]) res[1]--;
    return res;
  }

  if (tail[1] === head[1]) {
    if (tail[0] < head[0]) res[0]++;
    if (tail[0] > head[0]) res[0]--;
    return res;
  }

  if (tail[0] < head[0]) {
    res[0]++;
  } else {
    res[0]--;
  }

  if (tail[1] < head[1]) {
    res[1]++;
  } else {
    res[1]--;
  }
  return res;
}

function renderHistory(height, width, focus, history, rope) {
  let field = Array.from({ length: height }, () => {
    return Array.from({ length: width }, () => {
      return '.';
    });
  });

  history.forEach((cell) => {
    const [x, y] = cell.split(',').map(it => +it);

    if (field[x + focus[0]] && field[x + focus[0]][y + focus[1]]) {
      field[x + focus[0]][y + focus[1]] = '#';
    }
  });

  rope.forEach(([x, y], i) => {
    if (field[x + focus[0]] && field[x + focus[0]][y + focus[1]]) {
      field[x + focus[0]][y + focus[1]] = i;
    }
  });

  field.reverse();

  let res = field.map((row) => {
    return row.join('');
  }).join('\n');
  console.log(res);

  // fs.appendFileSync('./out.txt', res);
  // fs.appendFileSync('./out.txt', '\n');
}
