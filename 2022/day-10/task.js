import fs from 'fs';

// https://adventofcode.com/2022/day/10

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 13140);
console.log('answer: ', part1(inputData));

let res = part2(testInput);
console.log('test2:\n' + res);
res = part2(inputData);
console.log('answer2:\n' + res);
// B J F R H R F U
/*
###....##.####.###..#..#.###..####.#..#.
#..#....#.#....#..#.#..#.#..#.#....#..#.
###.....#.###..#..#.####.#..#.###..#..#.
#..#....#.#....###..#..#.###..#....#..#.
#..#.#..#.#....#.#..#..#.#.#..#....#..#.
###...##..#....#..#.#..#.#..#.#.....##..
*/

console.log('clean part1 OK:', part1(inputData) === part1_clean(inputData));
console.log('clean part2 OK:', part2(inputData) === part2_clean(inputData));

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

  while (i < 19) xValue += commands[i++];
  result += 20 * xValue;

  while (i < 59) xValue += commands[i++];
  result += 60 * xValue;

  while (i < 99) xValue += commands[i++];
  result += 100 * xValue;

  while (i < 139) xValue += commands[i++];
  result += 140 * xValue;

  while (i < 179) xValue += commands[i++];
  result += 180 * xValue;

  while (i < 219) xValue += commands[i++];
  result += 220 * xValue;

  return result;
}

function part2(inp) {
  let commands = [];
  let result = '';
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
  for (let j = 0; j < 40; j++) {
    result += j - 1 <= xValue && j + 1 >= xValue ? '#' : '.';
    xValue += commands[i++];
  }

  result += '\n';
  xValue += 40;

  for (let j = 40; j < 80; j++) {
    result += j - 1 <= xValue && j + 1 >= xValue ? '#' : '.';
    xValue += commands[i++];
  }

  result += '\n';
  xValue += 40;

  for (let j = 80; j < 120; j++) {
    result += j - 1 <= xValue && j + 1 >= xValue ? '#' : '.';
    xValue += commands[i++];
  }

  result += '\n';
  xValue += 40;

  for (let j = 120; j < 160; j++) {
    result += j - 1 <= xValue && j + 1 >= xValue ? '#' : '.';
    xValue += commands[i++];
  }

  result += '\n';
  xValue += 40;

  for (let j = 160; j < 200; j++) {
    result += j - 1 <= xValue && j + 1 >= xValue ? '#' : '.';
    xValue += commands[i++];
  }

  result += '\n';
  xValue += 40;

  for (let j = 200; j < 240; j++) {
    result += j - 1 <= xValue && j + 1 >= xValue ? '#' : '.';
    xValue += commands[i++];
  }

  return result;
}

function part1_clean(inp) {
  let commands = parseCommands(inp);
  const signalStrength = [20, 60, 100, 140, 180, 220];

  let xValue = 1;
  let tick = 0;
  let result = 0;

  signalStrength.forEach((strength) => {
    while (tick < (strength - 1)) xValue += commands[tick++];
    result += strength * xValue;
  });

  return result;
}

function part2_clean(inp) {
  let commands = parseCommands(inp);
  const signalStrength = [40, 80, 120, 160, 200, 240];

  let xValue = 1;
  let tick = 0;
  let resultLines = [];

  signalStrength.forEach((strength) => {
    let resLine = '';
    for (let i = strength - 40; i < strength; i++) {
      resLine += i - 1 <= xValue && i + 1 >= xValue ? '#' : '.';
      xValue += commands[tick++];
    }

    xValue += 40;
    resultLines.push(resLine);
  });

  return resultLines.join('\n');
}

function parseCommands(inp) {
  let commands = [];
  inp.split('\n').map((line) => {
    let [command, value] = line.split(' ');
    if (command === 'addx') {
      commands.push(0, +value);
    } else {
      commands.push(0);
    }
  });

  return commands;
}