import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/10

// console.log(part1(`..F7.
// .FJ|.
// SJ.L7
// |F--J
// LJ...`));

runDay(2023, 10)
  .part(1, part1)
  .part(2, part2);

function part1(inp) {
  let start = [0, 0]; // row, col
  let grid = inp
    .split('\n')
    .map((row, rowI) => {
      let scol = row.indexOf('S');
      if (scol > -1) start = [rowI, scol];

      return row.split('');
    });

  grid[start[0]][start[1]] = 0;
  let max = 0;

  function go(current) {
    let cPipe = grid[current[0]][current[1]];
    console.log(current, { cPipe });
    // console.log('grid before:');
    // console.log(grid);

    // if (current[0] === start[0] && current[1] === start[1]) {
    //   cPipe = 'F';
    // }

    if (cPipe === '-') {
      let left = grid[current[0]][current[1] - 1];
      let right = grid[current[0]][current[1] + 1];
      if (isNumber(left) && !isNumber(right)) {
        grid[current[0]][current[1]] = left + 1;
        max = left + 1;
        go([current[0], current[1] + 1]);
      }
      if (isNumber(right) && !isNumber(left)) {
        grid[current[0]][current[1]] = right + 1;
        max = right + 1;
        go([current[0], current[1] - 1]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === '|') {
      let top = grid[current[0] - 1]?.[current[1]];
      let down = grid[current[0] + 1]?.[current[1]];

      if (isNumber(top) && !isNumber(down)) {
        grid[current[0]][current[1]] = top + 1;
        max = top + 1;
        go([current[0] + 1, current[1]]);
      }
      if (isNumber(down) && !isNumber(top)) {
        grid[current[0]][current[1]] = down + 1;
        max = down + 1;
        go([current[0] - 1, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === 'J') {
      let top = grid[current[0] - 1]?.[current[1]];
      let left = grid[current[0]][current[1] - 1];

      if (isNumber(top) && !isNumber(left)) {
        grid[current[0]][current[1]] = top + 1;
        max = top + 1;
        go([current[0], current[1] - 1]);
      }
      if (isNumber(left) && !isNumber(top)) {
        grid[current[0]][current[1]] = left + 1;
        max = left + 1;
        go([current[0] - 1, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === 'F') {
      let down = grid[current[0] + 1]?.[current[1]];
      let right = grid[current[0]][current[1] + 1];
      console.log({ down, right });

      if (isNumber(down) && !isNumber(right)) {
        grid[current[0]][current[1]] = down + 1;
        max = down + 1;
        go([current[0], current[1] + 1]);
      }
      if (isNumber(right) && !isNumber(down)) {
        grid[current[0]][current[1]] = right + 1;
        max = right + 1;
        go([current[0] + 1, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === 0 && max === 0) { // START (like "7")
      let down = grid[current[0] + 1]?.[current[1]];
      let left = grid[current[0]][current[1] - 1];
      // console.log({ down, left });
      go([current[0] + 1, current[1]]);
      // go([current[0] + 1, current[1]]);
      return;
    }

    if (cPipe === '7') {
      let down = grid[current[0] + 1]?.[current[1]];
      let left = grid[current[0]][current[1] - 1];
      // console.log({down, left});

      if (isNumber(down) && !isNumber(left)) {
        grid[current[0]][current[1]] = down + 1;
        max = down + 1;
        go([current[0], current[1] - 1]);
      }
      if (isNumber(left) && !isNumber(down)) {
        grid[current[0]][current[1]] = left + 1;
        max = left + 1;
        go([current[0] + 1, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === 'L') {
      let top = grid[current[0] - 1]?.[current[1]];
      let right = grid[current[0]][current[1] + 1];

      if (isNumber(top) && !isNumber(right)) {
        grid[current[0]][current[1]] = top + 1;
        max = top + 1;
        go([current[0], current[1] + 1]);
      }
      if (isNumber(right) && !isNumber(top)) {
        grid[current[0]][current[1]] = right + 1;
        max = right + 1;
        go([current[0] - 1, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    console.log('something is wrong at', current, { cPipe });
    return;
  }

  // console.log(start);
  // grid[start[0]][start[1]] = 0;
  // console.log(grid);

  // go([start[0], start[1] + 1]);

  try {
    go(start);
  } catch (e) {
    console.log(e);
    console.log(grid.map((row) => row.join(',')).join('\n'));
  }

  // console.log(grid);


  return Math.ceil((max + 1) / 2);
}

function part2(inp) {
  return 123;
}

function isNumber(it) {
  return typeof it === "number";
}