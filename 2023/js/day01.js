import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/1

runDay(2023, 1)
  .part(1, part1)
  .part(2, part2);

function part1(inp) {
  return inp
    .split('\n')
    .map((l) => {
      let d = l.replace(/\D/g, '');
      return +(d[0] + d[d.length - 1]);
    })
    .reduce((sum, n) => sum + n, 0);
}

function part2(inp) {
  return inp
    .split('\n')
    .map((l) => {
      return getCode(l);
    })
    .reduce((sum, n) => sum + n, 0);
}

function getCode(line) {
  let numbers1 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  let numbers2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let first = null;
  let min = Infinity;

  numbers1.forEach((textN, i) => {
    let foundN1 = line.indexOf(textN);
    let foundN2 = line.indexOf(numbers2[i]);

    let found = Math.min(...[min, foundN1, foundN2].filter((n) => n > -1));

    if (found < min) {
      min = found;
      first = i + 1;
    }
  });

  let last = null;
  let max = -1;

  numbers1.forEach((textN, i) => {
    let foundN1 = line.lastIndexOf(textN);
    let foundN2 = line.lastIndexOf(numbers2[i]);

    let found = Math.max(max, foundN1, foundN2);

    if (found > max) {
      max = found;
      last = i + 1;
    }
  });

  return first * 10 + last;
}