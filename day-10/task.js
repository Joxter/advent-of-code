import fs from 'fs';

// https://adventofcode.com/2022/day/10

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// fs.writeFileSync('./testDataALT.txt', testInput.replaceAll('addx ', 'noop\naddx '));
// fs.writeFileSync('./inputALT.txt', inputData.replaceAll('addx ', 'noop\naddx '));

console.log('test OK: ', part1(testInput) === 13140);
console.log('answer: ', part1(inputData));

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

  while (i < 19) xValue += commands[i++];
  result += (20 * xValue);

  while (i < 59) xValue += commands[i++];
  result += (60 * xValue);

  while (i < 99) xValue += commands[i++];
  result += (100 * xValue);

  while (i < 139) xValue += commands[i++];
  result += (140 * xValue);

  while (i < 179) xValue += commands[i++];
  result += (180 * xValue);

  while (i < 219) xValue += commands[i++];
  result += (220 * xValue);

  return result;
}

function part2(inp) {
  //
}
