import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/16

runDay(2023, 16)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = inp.split('\n').map((line) => line.split(''));

  let energized = {};

  function goBeam(direction, i, j) {
    let cell = grid[i]?.[j];

    if (cell) {
      let key = i + ',' + j;

      if (energized[key] === direction) {
        return;
      } else {
        energized[key] = direction;
      }
    } else {
      return;
    }
    if (cell === '.') {
      if (direction === 'r') {
        goBeam(direction, i, j + 1);
      } else if (direction === 'l') {
        goBeam(direction, i, j - 1);
      } else if (direction === 'u') {
        goBeam(direction, i - 1, j);
      } else if (direction === 'd') {
        goBeam(direction, i + 1, j);
      }
      return;
    }

    if (cell === '|') {
      if (direction === 'l' || direction === 'r') {
        goBeam('d', i + 1, j);
        goBeam('u', i - 1, j);
      } else if (direction === 'd') {
        goBeam('d', i + 1, j);
      } else if (direction === 'u') {
        goBeam('u', i - 1, j);
      }
    } else if (cell === '-') {
      if (direction === 'u' || direction === 'd') {
        goBeam('r', i, j + 1);
        goBeam('l', i, j - 1);
      } else if (direction === 'l') {
        goBeam('l', i, j - 1);
      } else if (direction === 'r') {
        goBeam('r', i, j + 1);
      }
    } else if (cell === '\\') {
      if (direction === 'l') {
        goBeam('u', i - 1, j);
      } else if (direction === 'u') {
        goBeam('l', i, j - 1);
      } else if (direction === 'd') {
        goBeam('r', i, j + 1);
      } else if (direction === 'r') {
        goBeam('d', i + 1, j);
      }
    } else if (cell === '/') {
      debugger
      if (direction === 'l') {
        goBeam('d', i + 1, j);
      } else if (direction === 'u') {
        goBeam('r', i, j + 1);
      } else if (direction === 'd') {
        goBeam('l', i, j - 1);
      } else if (direction === 'r') {
        goBeam('u', i - 1, j);
      }
    }
  }

  goBeam('r', 0, 0);

  return Object.keys(energized).length;
}

function part2(inp) {
  let grid = inp.split('\n').map((line) => line.split(''));

  let energized = {};

  function goBeam(direction, i, j) {
    let cell = grid[i]?.[j];

    if (cell) {
      let key = i + ',' + j;

      if (energized[key] === direction) {
        return;
      } else {
        energized[key] = direction;
      }
    } else {
      return;
    }
    if (cell === '.') {
      if (direction === 'r') {
        goBeam(direction, i, j + 1);
      } else if (direction === 'l') {
        goBeam(direction, i, j - 1);
      } else if (direction === 'u') {
        goBeam(direction, i - 1, j);
      } else if (direction === 'd') {
        goBeam(direction, i + 1, j);
      }
      return;
    }

    if (cell === '|') {
      if (direction === 'l' || direction === 'r') {
        goBeam('d', i + 1, j);
        goBeam('u', i - 1, j);
      } else if (direction === 'd') {
        goBeam('d', i + 1, j);
      } else if (direction === 'u') {
        goBeam('u', i - 1, j);
      }
    } else if (cell === '-') {
      if (direction === 'u' || direction === 'd') {
        goBeam('r', i, j + 1);
        goBeam('l', i, j - 1);
      } else if (direction === 'l') {
        goBeam('l', i, j - 1);
      } else if (direction === 'r') {
        goBeam('r', i, j + 1);
      }
    } else if (cell === '\\') {
      if (direction === 'l') {
        goBeam('u', i - 1, j);
      } else if (direction === 'u') {
        goBeam('l', i, j - 1);
      } else if (direction === 'd') {
        goBeam('r', i, j + 1);
      } else if (direction === 'r') {
        goBeam('d', i + 1, j);
      }
    } else if (cell === '/') {
      if (direction === 'l') {
        goBeam('d', i + 1, j);
      } else if (direction === 'u') {
        goBeam('r', i, j + 1);
      } else if (direction === 'd') {
        goBeam('l', i, j - 1);
      } else if (direction === 'r') {
        goBeam('u', i - 1, j);
      }
    }
  }

  let max = 0;

  for (let i = 0; i < grid[0].length; i++) {
    energized = {};
    goBeam('d', 0, i);
    let en = Object.keys(energized).length;
    max = Math.max(max, en);
  }

  for (let i = 0; i < grid[0].length; i++) {
    energized = {};
    goBeam('u', grid.length - 1, i);
    let en = Object.keys(energized).length;
    max = Math.max(max, en);
  }

  for (let i = 0; i < grid.length; i++) {
    energized = {};
    goBeam('r', i, 0);
    let en = Object.keys(energized).length;
    max = Math.max(max, en);
  }

  for (let i = 0; i < grid.length; i++) {
    energized = {};
    goBeam('l', i, grid[0].length - 1);
    let en = Object.keys(energized).length;
    max = Math.max(max, en);
  }

  return max;
}
