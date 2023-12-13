import { rotateGrid90, runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/13

console.log(part1(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`));

runDay(2023, 13)
  // .part(1, part1, '34772 correct') //
  // .part(1, notMy) /////////////// 34772,35554
  // .part(2, spart2)
  .end();
// try 51441, []

// Because you have guessed incorrectly 10 times on this puzzle, please wait 10 minutes before trying again. [Return to Day 13]


function part1(inp) {
  let patterns = (inp).split('\n\n');

  let rowsAndCols = patterns.map((pattern, i) => {
    // console.log('-- Pattern', i);
    let my = mySolve(pattern);

    console.log(my, sss(pattern, 0));
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
  console.log('horizontal ', horizontal);

  let rotated = rotateGrid90(pattern.split('\n').map(l => l.split('')));
  lines = rotated.map(row => row.join(''));

  let vertical = symmetry(lines);
  console.log('vertical   ', vertical);

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

function sss(pattern, part) {
  let grid = pattern.split("\n").map((l) => l.split(""));

  let ressss = [grid, transpose(grid)].map((grid) => {
    let d, j, I, J;

    (d = 0), (I = 0), (J = 0);
    for (let i = 0.5; i < grid.length; i++) {
      (j = 0.5), (d = 0);
      while (true) {
        if (i - j < 0 || i + j >= grid.length) break;
        d += diff(grid[i - j], grid[i + j]);
        if (d > part) break;
        j++;
      }
      if (j > 0.5 && (i - j === -1 || i + j === grid.length) && d === part) {
        I = i + 0.5;
        J = j;
      }
    }
    return I;
  });
  console.log(ressss);

  return ressss[0] * 100 + ressss[1];

  function diff(a, b) {
    return a.filter((c, i) => c !== b[i]).length;
  }

  function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

}

function notMy(input) {
  return [process(parse(input), 0), process(parse(input), 1)];

  function parse(input) {

    const data = input
      .trim()
      .split("\n\n")
      .map((grid) => grid.split("\n").map((l) => l.split("")));
    return data;
  }

  function process(data, part) {
    let d, j, I, J;
    return data
      .map((grid) => [grid, transpose(grid)])
      .map((grids) => {
        return grids.map((grid) => {
          (d = 0), (I = 0), (J = 0);
          for (let i = 0.5; i < grid.length; i++) {
            (j = 0.5), (d = 0);
            while (true) {
              if (i - j < 0 || i + j >= grid.length) break;
              d += diff(grid[i - j], grid[i + j]);
              if (d > part) break;
              j++;
            }
            if (j > 0.5 && (i - j === -1 || i + j === grid.length) && d === part) {
              (I = i + 0.5), (J = j);
            }
          }
          return I;
        });
      })
      .reduce((acc, cur) => acc + cur[0] * 100 + cur[1], 0);
  }

  function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

  function diff(a, b) {
    return a.filter((c, i) => c !== b[i]).length;
  }
}