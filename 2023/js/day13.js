import { rotateGrid90, runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/13

console.log(part1(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`));

runDay(2023, 13)
  .part(1, part1)
  .part(2, part2)
  .end();

// Because you have guessed incorrectly 10 times on this puzzle, please wait 10 minutes before trying again. [Return to Day 13]

function part1(inp) {
  let reflections = inp
    .split('\n\n')
    .map((pattern, i) => {
      // console.log('-- Pattern', i);
      return findReflection(pattern);
    });

  return sum(reflections);
}

function findReflection(pattern) {
  let lines = pattern.split('\n');

  let horizontal = symmetry(lines);
  if (horizontal) {
    return horizontal * 100;
  }

  return symmetry(rotateGrid90(lines).map(row => row.join('')));

  function symmetry(lines) {
    for (let i = 1; i < lines.length; i++) {
      let offset = 0;

      while (lines[i - offset] === lines[i - 1 + offset]) {
        if (offset === i || (i + offset) === lines.length) return i;
        offset++;
      }
    }
    return 0;
  }
}

function part2(inp) {
  return 123;
}