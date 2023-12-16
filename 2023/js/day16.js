import { makeGridWithBorder, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/16

runDay(2023, 16)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, 'X');

  return beeeeeam(grid, ['r', 1, 1]);
}

function part2(inp) {
  let grid = makeGridWithBorder(inp, 'X');

  let max = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    let dCnt = beeeeeam(grid, ['d', 1, i]);
    let uCnt = beeeeeam(grid, ['u', grid.length - 2, i]);
    let rCnt = beeeeeam(grid, ['r', i, 1]);
    let lCnt = beeeeeam(grid, ['l', i, grid.length - 2]);

    max = Math.max(max, dCnt, uCnt, rCnt, lCnt);
  }

  return max;
}

function beeeeeam(grid, start) {
  let energized = Array(grid.length * grid[0].length);

  let stack = [start];
  while (stack.length > 0) {
    let [direction, i, j] = stack.pop();
    let cell = grid[i][j];

    if (cell === 'X') continue;

    let key = i * grid.length + j;

    if (energized[key] === direction) {
      continue;
    } else {
      energized[key] = direction;
    }

    if (cell === '.') {
      if (direction === 'r') {
        stack.push(['r', i, j + 1]);
      } else if (direction === 'l') {
        stack.push(['l', i, j - 1]);
      } else if (direction === 'u') {
        stack.push(['u', i - 1, j]);
      } else if (direction === 'd') {
        stack.push(['d', i + 1, j]);
      }
      continue;
    }

    if (cell === '|') {
      if (direction === 'l' || direction === 'r') {
        stack.push(['d', i + 1, j]);
        stack.push(['u', i - 1, j]);
      } else if (direction === 'd') {
        stack.push(['d', i + 1, j]);
      } else if (direction === 'u') {
        stack.push(['u', i - 1, j]);
      }
    } else if (cell === '-') {
      if (direction === 'u' || direction === 'd') {
        stack.push(['r', i, j + 1]);
        stack.push(['l', i, j - 1]);
      } else if (direction === 'l') {
        stack.push(['l', i, j - 1]);
      } else if (direction === 'r') {
        stack.push(['r', i, j + 1]);
      }
    } else if (cell === '\\') {
      if (direction === 'l') {
        stack.push(['u', i - 1, j]);
      } else if (direction === 'u') {
        stack.push(['l', i, j - 1]);
      } else if (direction === 'd') {
        stack.push(['r', i, j + 1]);
      } else if (direction === 'r') {
        stack.push(['d', i + 1, j]);
      }
    } else if (cell === '/') {
      if (direction === 'l') {
        stack.push(['d', i + 1, j]);
      } else if (direction === 'u') {
        stack.push(['r', i, j + 1]);
      } else if (direction === 'd') {
        stack.push(['l', i, j - 1]);
      } else if (direction === 'r') {
        stack.push(['u', i - 1, j]);
      }
    }
  }

  return energized.filter(Boolean).length;
}
