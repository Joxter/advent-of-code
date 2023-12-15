import { forEachInGrid, formatTime, printGrid, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/14

runDay(2023, 14)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = inp.split('\n').map(l => l.split(''));
  let round = 'O';

  forEachInGrid(grid, (cell, i, j) => {
    if (cell === round) {
      grid[i][j] = '.';
      while (grid[i - 1]?.[j] === '.') {
        i--;
      }
      grid[i][j] = round;
    }
  });
  let height = grid.length;

  let total = 0;
  forEachInGrid(grid, (cell, i) => {
    if (cell === round) {
      total += height - i;
    }
  });

  return total;
}

function part2(inp) {
  let grid = inp.split('\n').map(l => l.split(''));
  let rock = 'O';
  let limit = 1_000_000_000;

  let gridsHistory = {};
  let loopFound = false;

  let width = grid[0].length;
  let height = grid.length;

  for (let i = 1; i <= limit; i++) {
    // to top
    for (let j = 0; j < width; j++) {
      let jSlow = 0;
      let jFast = 0;

      while (jFast < height) {
        while (jSlow < height - 1 && grid[jSlow][j] !== '.') {
          jSlow++;
        }
        let l = jSlow;

        jFast = Math.max(jSlow + 1, jFast);

        while (grid[jFast]?.[j]) {
          if (grid[jFast][j] === rock) break;
          if (grid[jFast][j] === '#') {
            jFast++;
            jSlow = jFast;
            l = jFast;
            break;
          }

          jFast++;
        }
        let r = jFast;

        if (grid[l]?.[j] === '.' && grid[r]?.[j] === rock) {
          grid[l][j] = rock;
          grid[r][j] = '.';
          jSlow++;
          jFast++;
        }
      }
    }

    // to left
    for (let i = 0; i < height; i++) {
      let row = grid[i];
      let jSlow = 0;
      let jFast = 0;

      while (jFast < width) {
        while (jSlow < height && row[jSlow] !== '.') {
          jSlow++;
        }
        let slow = jSlow;

        jFast = Math.max(jSlow + 1, jFast);

        while (row[jFast]) {
          if (row[jFast] === rock) break;
          if (row[jFast] === '#') {
            jFast++;
            jSlow = jFast;
            slow = jFast;
            break;
          }

          jFast++;
        }
        let fast = jFast;

        if (row[slow] === '.' && row[fast] === rock) {
          row[slow] = rock;
          row[fast] = '.';
          jSlow++;
          jFast++;
        }
      }
    }

    // to bottom
    for (let j = 0; j < width; j++) {
      let jFast = height - 1;
      let jSlow = height - 1;

      while (jFast >= 0) {
        while (jSlow > 0 && grid[jSlow][j] !== '.') {
          jSlow--;
        }
        let slow = jSlow;

        jFast = Math.min(jSlow - 1, jFast);

        while (jFast >= 0) {
          if (grid[jFast][j] === rock) break;
          if (grid[jFast][j] === '#') {
            jSlow = jFast;
            slow = jFast;
            break;
          }

          jFast--;
        }
        let fast = jFast;

        if (grid[fast]?.[j] === rock && grid[slow]?.[j] === '.') {
          grid[fast][j] = '.';
          grid[slow][j] = rock;
          jFast--;
          jSlow--;
        }
      }
    }

    // to right
    for (let i = 0; i < height; i++) {
      let row = grid[i];
      let jFast = width - 1;
      let jSlow = width - 1;

      while (jFast >= 0) {
        while (jSlow > 0 && row[jSlow] !== '.') {
          jSlow--;
        }
        let slow = jSlow;

        jFast = Math.min(jSlow - 1, jFast);

        while (jFast >= 0) {
          if (row[jFast] === rock) break;
          if (row[jFast] === '#') {
            jSlow = jFast;
            slow = jFast;
            break;
          }

          jFast--;
        }
        let fast = jFast;

        if (row[fast] === rock && row[slow] === '.') {
          row[fast] = '.';
          row[slow] = rock;
          jFast--;
          jSlow--;
        }
      }
    }

    if (!loopFound) {
      let currentGrid = printGrid(grid);
      if (gridsHistory[currentGrid]) {
        loopFound = true;

        let loopLen = i - gridsHistory[currentGrid];
        let cyclesCnt = Math.floor((limit - gridsHistory[currentGrid]) / loopLen);

        i = gridsHistory[currentGrid] + loopLen * cyclesCnt;
      } else {
        gridsHistory[currentGrid] = i;
      }
    }
  }

  let total = 0;
  forEachInGrid(grid, (cell, i) => {
    if (cell === rock) {
      total += height - i;
    }
  });

  return total;
}
