import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/4

runDay(2023, 4)
  .part(1, part1)
  .part(2, part2)
  .part(2, part2Recursive, 'recursive');

function part1(inp) {
  let score = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512];

  let points = inp
    .split('\n')
    .map((line) => {
      let parts = line.split(':')[1];
      let [winning, numbers] = parts.split('|');
      winning = winning.trim().split(/\s+/);
      numbers = numbers.trim().split(/\s+/);

      let matches = winning.filter((n) => numbers.includes(n));
      return score[matches.length];
    });

  return sum(points);
}

function part2(inp) {
  let points = inp
    .split('\n')
    .map((line) => {
      let parts = line.split(':')[1];
      let [winning, numbers] = parts.split('|');
      winning = winning.trim().split(/\s+/);
      numbers = numbers.trim().split(/\s+/);

      let matches = winning.filter((n) => numbers.includes(n));
      return matches.length;
    });

  let cards = Array(points.length).fill(1);

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i]; j++) {
      cards[i + j + 1] += cards[i];
    }
  }

  return sum(cards);
}

function part2Recursive(inp) {
  let points = inp
    .split('\n')
    .map((line) => {
      let parts = line.split(':')[1];
      let [winning, numbers] = parts.split('|');
      winning = winning.trim().split(/\s+/);
      numbers = numbers.trim().split(/\s+/);

      let matches = winning.filter((n) => numbers.includes(n));
      return matches.length;
    });

  // let cache = {}; cache makes the solution as fast as the original one
  function play(i) {
    // if (cache[i]) return cache[i];
    let t = 1;
    for (let j = 0; j < points[i]; j++) {
      t += play(i + j + 1);
    }
    // cache[i] = t;
    return t;
  }

  let total = 0;
  for (let i = 0; i < points.length; i++) {
    total += play(i);
  }
  return total;
}
