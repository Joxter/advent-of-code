import fs from 'fs';

// https://adventofcode.com/2022/day/10

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// fs.writeFileSync('./testDataALT.txt', testInput.replaceAll('addx ', 'noop\naddx '));
// fs.writeFileSync('./inputALT.txt', inputData.replaceAll('addx ', 'noop\naddx '));

console.log('test OK: ', part1(testInput) === 13140);
// console.log('answer: ', part1(inputData));

// console.log('test2 OK: ', part2(test2Input) === 36);
// console.log('answer2: ', part2(inputData), 2619); // 491 is wrong???? correct 2619 O_o

function part1(inp) {
  let commands = [];
  let result = 0;
  inp.split('\n').map((line) => {
    let [command, value] = line.split(' ');
    if (command === 'addx') {
      commands.push(0, +value);
    } else {
      commands.push(0);
    }
  });

  let xValue = 1;
  let i = 0;

  while (i < 20) xValue += commands[i++];
  result += (20 * xValue);
  // console.log(result, xValue, 20 * xValue, [420]);

// 20th, 60th, 100th, 140th, 180th, and 220th cycles.
  while (i < 60) xValue += commands[i++];
  result += (60 * xValue);

  // console.log(result, xValue, 60 * xValue, [1140]);

  while (i < 100) xValue += commands[i++];
  result += (100 * xValue);

  // console.log(result, xValue, 100 * xValue, [1800]);

  while (i < 140) xValue += commands[i++];
  result += (140 * xValue);

  // console.log(xValue, 140 * xValue, [2940]);

  while (i < 180) xValue += commands[i++];
  result += (180 * xValue);
  console.log({xValue});
  //  420 + 1140 + 1800 + 2940 + (2880 + 3960)

  // console.log(xValue, 180 * xValue, [2880]);

  while (i < 220) xValue += commands[i++]; // 219 for test data
  result += (220 * xValue);
  console.log({xValue});

  // console.log(xValue, 220 * xValue, [3960]);

  // console.log(result, [13140]); // 13122 !== 13140

  console.log(commands.length);


  console.log('wrong:', 15080);
  return result;
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
  // renderHistory(13, 30, [5, 11], history)

  return history.size;
}

function renderHistory(height, width, focus, history) {
  let field = Array.from({length: height}, () => {
    return Array.from({length: width}, () => {
      return '.';
    });
  });

  history.forEach((cell) => {
    const [x, y] = cell.split(',').map(it => +it);

    if (field[x + focus[0]] && field[x + focus[0]][y + focus[1]]) {
      field[x + focus[0]][y + focus[1]] = '#';
    }
  });

  field.reverse();

  field.forEach((row) => {
    console.log(row.join(''));
  });
}