import { forEachInGrid, formatTime, printGrid, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/14

// console.log(part2(`O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....`));

runDay(2023, 14)
  .part(1, part1, '110677')// 110677
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
  // let limit = 3;
  let stat = Date.now();
  // console.log(printGrid(grid));

  for (let i = 1; i <= limit; i++) {
    if (i % 10_000 === 0) {
      console.log('Progress %', ((i / limit) * 100).toFixed(3), 'time:', formatTime(Date.now() - stat));
    }
    // console.log(i);
    // console.log();

    // to top
    for (let j = 0; j < grid[0].length; j++) {
      let jl = 0;
      let jr = 0;

      while (jr < grid.length) {
        while (grid[jl]?.[j] && grid[jl][j] !== '.') {
          jl++;
        }
        let l = jl;

        jr = Math.max(jl + 1, jr);

        while (grid[jr]?.[j]) {
          if (grid[jr][j] === rock) break;
          if (grid[jr][j] === '#') {
            jr++;
            jl = jr;
            l = jr;
            break;
          }

          jr++;
        }
        let r = jr;

        if (grid[l]?.[j] === '.' && grid[r]?.[j] === rock) {
          grid[l][j] = rock;
          grid[r][j] = '.';
          jl++;
          jr++;
        }
      }
    }

    // to left
    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];
      let jl = 0;
      let jr = 0;

      while (jr < row.length) {
        while (row[jl] && row[jl] !== '.') {
          jl++;
        }
        let l = jl;

        jr = Math.max(jl + 1, jr);

        while (row[jr]) {
          if (row[jr] === rock) break;
          if (row[jr] === '#') {
            jr++;
            jl = jr;
            l = jr;
            break;
          }

          jr++;
        }
        let r = jr;

        if (row[l] === '.' && row[r] === rock) {
          row[l] = rock;
          row[r] = '.';
          jl++;
          jr++;
        }
      }
    }

    // to bottom
    for (let j = 0; j < grid[0].length; j++) {
      let jl = grid.length - 1;
      let jr = grid.length - 1;

      while (jl >= 0) {
        while (grid[jr]?.[j] && grid[jr][j] !== '.') {
          jr--;
        }
        let r = jr;

        jl = Math.min(jr - 1, jl);

        while (jl >= 0) {
          if (grid[jl][j] === rock) break;
          if (grid[jl][j] === '#') {
            jr = jl;
            r = jl;
            break;
          }

          jl--;
        }
        let l = jl;

        if (!grid[l] || !grid[r]) break;

        if (grid[l][j] === rock && grid[r][j] === '.') {
          grid[l][j] = '.';
          grid[r][j] = rock;
          jl--;
          jr--;
        }
      }
    }

    // to right
    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];
      let jl = row.length - 1;
      let jr = row.length - 1;

      while (jl >= 0) {
        while (row[jr] && row[jr] !== '.') {
          jr--;
        }
        let r = jr;

        jl = Math.min(jr - 1, jl);

        while (jl >= 0) {
          if (row[jl] === rock) break;
          if (row[jl] === '#') {
            jr = jl;
            r = jl;
            break;
          }

          jl--;
        }
        let l = jl;

        if (row[l] === rock && row[r] === '.') {
          row[l] = '.';
          row[r] = rock;
          jl--;
          jr--;
        }
      }
    }
  }

  let height = grid.length;

  let total = 0;
  forEachInGrid(grid, (cell, i) => {
    if (cell === rock) {
      total += height - i;
    }
  });

  return total;
}
