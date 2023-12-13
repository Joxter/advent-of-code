import { rotateGrid90, runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/13

// console.log(part1(`#.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.
//
// #...##..#
// #....#..#
// ..##..###
// #####.##.
// #####.##.
// ..##..###
// #....#..#`));

runDay(2023, 13)
  .part(1, part1, '34772 correct') //
  // .part(1, notMy2input, 'notMy2input') //
  // .part(1, notMy) /////////////// 34772,35554
  // .part(2, spart2)
  .end();
// try 51441, []

// Because you have guessed incorrectly 10 times on this puzzle, please wait 10 minutes before trying again. [Return to Day 13]


function part1(inp) {
  let patterns = (inp).split('\n\n');

  let rowsAndCols = patterns.map((pattern, i) => {
    console.log('-- Pattern', i);
    let my = mySolve(pattern);

    console.log(my, notMy2input(pattern));
    // console.log(pattern, notMy2input(pattern));
    return my;
  });
  console.log(rowsAndCols);

  return sum(rowsAndCols);
}

function mySolve(pattern) {
  let lines = pattern.split('\n');
  // console.log(lines.join('\n'));
  // console.log('');

  let horizontal = symmetry(lines);
  // console.log('horizontal ', horizontal);

  let rotated = rotateGrid90(pattern.split('\n').map(l => l.split('')));
  lines = rotated.map(row => row.join(''));

  let vertical = symmetry(lines);
  // console.log('vertical   ', vertical);

  return horizontal.n * 100 + vertical.n;

  function symmetry(lines) {
    // console.log(lines.join('\n'));
    // console.log('');
    let maxOffset = 0;
    let n = 0;
    let offset = 0;
    for (let i = 1; i < lines.length; i++) {
      offset = 0;
      if (lines[i] === lines[i - 1]) {
        offset = 1;

        while (
          i - offset >= 0 && (i - 1 + offset) < lines.length &&
          lines[i - offset] === lines[i - 1 + offset]
          ) {
          offset++;
        }
      }

      if (offset > maxOffset) {
        maxOffset = offset;
        n = i;
      }
    }

    return { n, maxOffset };
  }
}


function part2(inp) {
  return 123;
}

function notMy2input(pattern) {

  return run(parseInput(pattern))

  function parseInput(input) {
    return input.split(/\n/);
  }

  function checkHorizontal(pattern, row) {
    for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
      if (pattern[i] !== pattern[j]) return false;
    }
    return true;
  }

  function transpose(pattern) {
    const result = Array(pattern[0].length).fill("");
    for (const row of pattern) {
      [...row].forEach((c, i) => result[i] += c);
    }
    return result;
  }

  function run(pattern) {
    for (let i = 1; i < pattern.length; i++) {
      if (checkHorizontal(pattern, i)) {
        return 100 * i;
      }
    }

    const transposed = transpose(pattern);
    for (let i = 1; i < transposed.length; i++) {
      if (checkHorizontal(transposed, i)) {
        return i;
      }
    }
  }
}