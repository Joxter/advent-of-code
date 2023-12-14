import { forEachInGrid, printGrid, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/14

console.log(part2(`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`));

runDay(2023, 14)
  // .part(1, part1, '110677')// 110677
  // .part(2, part2)
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
  let round = 'O';
  // let limit = 1_000_000_000;
  let limit = 3;

  for (let i = 1; i <= limit; i++) {
    if (i % 10_000 === 0) {
      console.log('Progress %', i / 1_000_000_000 * 100);
    }
    // console.log(i);
    // console.log();

    // up
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        let cell = grid[i][j];
        if (cell === round) {
          let currI = i;
          while (grid[currI - 1]?.[j] === '.') {
            currI--;
          }
          grid[i][j] = '.';
          grid[currI][j] = round;
        }
      }
    }
    // console.log(printGrid(grid));
    // left
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        let cell = grid[i][j];
        if (cell === round) {
          let currJ = j;
          while (grid[i][currJ - 1] === '.') {
            currJ--;
          }
          grid[i][j] = '.';
          grid[i][currJ] = round;
        }
      }
    }
    // console.log(printGrid(grid));

    // bottom
    for (let i = grid.length - 1; i >= 0; i--) {
      for (let j = 0; j < grid[0].length; j++) {
        let cell = grid[i][j];
        if (cell === round) {
          let currI = i;
          while (grid[currI + 1]?.[j] === '.') {
            currI++;
          }
          grid[i][j] = '.';
          grid[currI][j] = round;
        }
      }
    }
    // console.log(printGrid(grid));

    // right
    for (let i = 0; i < grid.length; i++) {
      for (let j = grid[0].length - 1; j >= 0; j--) {
        let cell = grid[i][j];
        if (cell === round) {
          let currJ = j;
          while (grid[i][currJ + 1] === '.') {
            currJ++;
          }
          grid[i][j] = '.';
          grid[i][currJ] = round;
        }
      }
    }
    console.log(printGrid(grid));
  }


  let height = grid.length;

  let total = 0;
  forEachInGrid(grid, (cell, i) => {
    if (cell === round) {
      total += height - i;
    }
  });

  return total;
}
