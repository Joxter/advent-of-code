import { printGrid, runDay, waitHard } from '../../utils.js';

// https://adventofcode.com/2023/day/10

// console.log(part2(`..........
// .S------7.
// .|F----7|.
// .||OOOO||.
// .||OOOO||.
// .|L-7F-J|.
// .|II||II|.
// .L--JL--J.
// ..777.....`));

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
  let r = '.'.repeat(inp.indexOf('\n') * 2 + 1);

  let wideInp = inp
    .split('\n')
    .map((row) => {
      return '.' + row.split('').join('.') + '.';
    })
    .join('\n' + r + '\n'); // len of

  wideInp = r + '\n' + wideInp + '\n' + r;

  // console.log(inp);
  // console.log('');
  // console.log(wideInp);
  // return;

  let start = [0, 0]; // row, col
  let grid = wideInp
    .split('\n')
    .map((row, rowI) => {
      let scol = row.indexOf('S');
      if (scol > -1) start = [rowI, scol];

      return row.split('');
    });

  grid[start[0]][start[1]] = 8;

  console.log(start);
  console.log('INIT');
  console.log(printGrid(grid));

  function go(current) {
    if (current[0] === 5 && current[1] === 5) {
      debugger
    }
    // console.log(printGrid(grid));
    // waitHard(300);


    let cPipe = grid[current[0]][current[1]];
    // console.log(current, { cPipe });
    // console.log('grid before:');
    // console.log(grid);

    if (cPipe === '-') {
      let left = grid[current[0]][current[1] - 2];
      let right = grid[current[0]][current[1] + 2];
      if (isNumber(left) && !isNumber(right)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] + 1] = 8;
        go([current[0], current[1] + 2]);
      }
      if (isNumber(right) && !isNumber(left)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] - 1] = 8;
        go([current[0], current[1] - 2]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === '|') {
      let top = grid[current[0] - 2]?.[current[1]];
      let down = grid[current[0] + 2]?.[current[1]];
      console.log({ top, down });

      if (isNumber(top) && !isNumber(down)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] + 1][current[1]] = 8;
        go([current[0] + 2, current[1]]);
      }
      if (isNumber(down) && !isNumber(top)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] - 1][current[1]] = 8;
        go([current[0] - 2, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === 'J') {
      let top = grid[current[0] - 2]?.[current[1]];
      let left = grid[current[0]][current[1] - 2];

      if (isNumber(top) && !isNumber(left)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] - 1] = 8;
        go([current[0], current[1] - 2]);
      }
      if (isNumber(left) && !isNumber(top)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] - 1][current[1]] = 8;
        go([current[0] - 2, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === 'F') {
      let down = grid[current[0] + 2]?.[current[1]];
      let right = grid[current[0]][current[1] + 2];
      console.log({ down, right });

      if (isNumber(down) && !isNumber(right)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] + 1] = 8;
        go([current[0], current[1] + 2]);
      }
      if (isNumber(right) && !isNumber(down)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] + 1][current[1]] = 8;
        go([current[0] + 2, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === 8) { // START (like "7") (TEST - F)
      console.log('!!!');
      let down = grid[current[0] + 2]?.[current[1]];
      let left = grid[current[0]][current[1] - 2];
      grid[current[0] + 1][current[1]] = 8;
      grid[current[0]][current[1] - 1] = 8;
      // grid[current[0]][current[1] - 2] = 8; // leftovers input
      go([current[0] + 2, current[1]]);

      // TEST: (F)
      // let down = grid[current[0] + 2]?.[current[1]];
      // let right = grid[current[0]][current[1] + 2];
      // grid[current[0] + 1][current[1]] = 8;
      // grid[current[0]][current[1] + 1] = 8;
      // // grid[current[0]][current[1] + 2] = 8; // leftovers test
      // go([current[0] + 2, current[1]]);

      return;
    }

    if (cPipe === '7') {
      let down = grid[current[0] + 2]?.[current[1]];
      let left = grid[current[0]][current[1] - 2];
      // console.log({down, left});

      if (isNumber(down) && !isNumber(left)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] - 1] = 8;
        go([current[0], current[1] - 2]);
      }
      if (isNumber(left) && !isNumber(down)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] + 1][current[1]] = 8;
        go([current[0] + 2, current[1]]);
      } else {
        console.log('something is wrong at', current, { cPipe });
      }
      return;
    }

    if (cPipe === 'L') {
      let top = grid[current[0] - 2]?.[current[1]];
      let right = grid[current[0]][current[1] + 2];

      if (isNumber(top) && !isNumber(right)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] + 1] = 8;
        go([current[0], current[1] + 2]);
      }
      if (isNumber(right) && !isNumber(top)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] - 1][current[1]] = 8;
        go([current[0] - 2, current[1]]);
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
    // TODO:
    // + пометить трубы (и промежуточные ) буквой "8"
    go(start);
    // grid[start[0]][start[1] + 2] = 8; // leftovers (test)
    grid[start[0]][start[1] - 2] = 8; // leftovers input

    let stack = [[0, 0]];

    // console.log('PIPES GRID');
    // console.log(printGrid(grid));

    // начиная с [0,0] заполнить точками "." все соседние клетки (если они не "8")
    while (stack.length) {
      let [i, j] = stack.pop();
      let cell = grid[i]?.[j];

      if (cell === 8 || cell === 'z') continue;
      if (cell === undefined) continue;

      grid[i][j] = 'z';
      if (cell === '.') {
        stack.push([i, j + 1]);
        stack.push([i, j - 1]);
        stack.push([i + 1, j]);
        stack.push([i - 1, j]);
      }
    }

    // удалить все добавленные строки и столбцы

    let cleanGrid = [];

    for (let i = 1; i < grid.length; i += 2) {
      let row = grid[i];
      let newRow = [];
      for (let j = 1; j < grid[0].length; j += 2) {
        newRow.push(row[j]);
      }
      cleanGrid.push(newRow);
    }

    console.log('CLEAN GRID');
    console.log(printGrid(cleanGrid));

    let gridLine = printGrid(cleanGrid).replace(/\s/g, '')

    // посчитать площадь всей повехрности, вычесть количество "8" и количество "z"

    let total = gridLine.length
    let pipesCnt = gridLine.replace(/[^8]/g, '')?.length || 0
    let zCnt = gridLine.replace(/[^z]/g, '')?.length || 0

    return total - pipesCnt - zCnt;


  } catch (e) {
    console.log(e);
    // console.log(grid.map((row) => row.join(',')).join('\n'));
  }

  // console.log('FINAL GRID');
  // console.log(printGrid(grid));


  return 123;
}

function isNumber(it) {
  return typeof it === "number";
}