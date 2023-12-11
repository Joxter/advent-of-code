import { forEachInGrid, printGrid, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/10

runDay(2023, 10)
  .part(1, part1)
  .part(2, part2);

// todo add better solution to build the pipe
//  where you decide the next step by looking at the values of the previous and current cell
//  no more isNumber and left/right/top/down boilerplate

function part1(inp) {
  let current = [0, 0];
  let grid = inp
    .split('\n')
    .map((row, rowI) => {
      let scol = row.indexOf('S');
      if (scol > -1) current = [rowI, scol];

      return row.split('');
    });

  grid[current[0]][current[1]] = 0;
  let max = 0;

  while (true) {
    let cPipe = grid[current[0]][current[1]];
    max++;

    if (cPipe === '-') {
      let left = grid[current[0]][current[1] - 1];
      let right = grid[current[0]][current[1] + 1];

      if (isNumber(left) && !isNumber(right)) {
        grid[current[0]][current[1]] = left + 1;
        current[1]++;
      } else if (isNumber(right) && !isNumber(left)) {
        grid[current[0]][current[1]] = right + 1;
        current[1]--;
      } else {
        break;
      }
    }

    if (cPipe === '|') {
      let top = grid[current[0] - 1]?.[current[1]];
      let down = grid[current[0] + 1]?.[current[1]];

      if (isNumber(top) && !isNumber(down)) {
        grid[current[0]][current[1]] = top + 1;
        current[0]++;
      } else if (isNumber(down) && !isNumber(top)) {
        grid[current[0]][current[1]] = down + 1;
        current[0]--;
      } else {
        break;
      }
    }

    if (cPipe === 'J') {
      let top = grid[current[0] - 1]?.[current[1]];
      let left = grid[current[0]][current[1] - 1];

      if (isNumber(top) && !isNumber(left)) {
        grid[current[0]][current[1]] = top + 1;
        current[1]--;
      } else if (isNumber(left) && !isNumber(top)) {
        grid[current[0]][current[1]] = left + 1;
        current[0]--;
      } else {
        break;
      }
    }

    if (cPipe === 'F') {
      let down = grid[current[0] + 1]?.[current[1]];
      let right = grid[current[0]][current[1] + 1];

      if (isNumber(down) && !isNumber(right)) {
        grid[current[0]][current[1]] = down + 1;
        current[1]++;
      } else if (isNumber(right) && !isNumber(down)) {
        grid[current[0]][current[1]] = right + 1;
        current[0]++;
      } else {
        break;
      }
    }

    if (cPipe === 0) {
      current[0]++;
      continue;
    }

    if (cPipe === '7') {
      let down = grid[current[0] + 1]?.[current[1]];
      let left = grid[current[0]][current[1] - 1];

      if (isNumber(down) && !isNumber(left)) {
        grid[current[0]][current[1]] = down + 1;
        current[1]--;
      } else if (isNumber(left) && !isNumber(down)) {
        grid[current[0]][current[1]] = left + 1;
        current[0]++;
      } else {
        break;
      }
    }

    if (cPipe === 'L') {
      let top = grid[current[0] - 1]?.[current[1]];
      let right = grid[current[0]][current[1] + 1];

      if (isNumber(top) && !isNumber(right)) {
        grid[current[0]][current[1]] = top + 1;
        current[1]++;
      } else if (isNumber(right) && !isNumber(top)) {
        grid[current[0]][current[1]] = right + 1;
        current[0]--;
      } else {
        break;
      }
    }
  }

  return Math.ceil(max / 2);
}

function part2(inp) {
  let r = '.'.repeat(inp.indexOf('\n') * 2 + 1);

  let wideInp = inp
    .split('\n')
    .map((row) => {
      return '.' + row.split('').join('.') + '.';
    })
    .join('\n' + r + '\n');

  wideInp = r + '\n' + wideInp + '\n' + r;

  let current = [0, 0];
  let grid = wideInp
    .split('\n')
    .map((row, rowI) => {
      let scol = row.indexOf('S');
      if (scol > -1) current = [rowI, scol];

      return row.split('');
    });

  grid[current[0]][current[1]] = 8;

  while (true) {
    let cPipe = grid[current[0]][current[1]];

    if (cPipe === '-') {
      let left = grid[current[0]][current[1] - 2];
      let right = grid[current[0]][current[1] + 2];
      if (isNumber(left) && !isNumber(right)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] + 1] = 8;
        current[1] += 2;
      } else if (isNumber(right) && !isNumber(left)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] - 1] = 8;
        current[1] -= 2;
      } else {
        break;
      }
    }

    if (cPipe === '|') {
      let top = grid[current[0] - 2]?.[current[1]];
      let down = grid[current[0] + 2]?.[current[1]];

      if (isNumber(top) && !isNumber(down)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] + 1][current[1]] = 8;
        current[0] += 2;
      } else if (isNumber(down) && !isNumber(top)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] - 1][current[1]] = 8;
        current[0] -= 2;
      } else {
        break;
      }
    }

    if (cPipe === 'J') {
      let top = grid[current[0] - 2]?.[current[1]];
      let left = grid[current[0]][current[1] - 2];

      if (isNumber(top) && !isNumber(left)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] - 1] = 8;
        current[1] -= 2;
      } else if (isNumber(left) && !isNumber(top)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] - 1][current[1]] = 8;
        current[0] -= 2;
      } else {
        break;
      }
    }

    if (cPipe === 'F') {
      let down = grid[current[0] + 2]?.[current[1]];
      let right = grid[current[0]][current[1] + 2];

      if (isNumber(down) && !isNumber(right)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] + 1] = 8;
        current[1] += 2;
      } else if (isNumber(right) && !isNumber(down)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] + 1][current[1]] = 8;
        current[0] += 2;
      } else {
        break;
      }
    }

    if (cPipe === 8) {
      grid[current[0] + 1][current[1]] = 8;
      grid[current[0]][current[1] - 1] = 8;
      current[0] += 2;
      continue;
    }

    if (cPipe === '7') {
      let down = grid[current[0] + 2]?.[current[1]];
      let left = grid[current[0]][current[1] - 2];

      if (isNumber(down) && !isNumber(left)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] - 1] = 8;
        current[1] -= 2;
      } else if (isNumber(left) && !isNumber(down)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] + 1][current[1]] = 8;
        current[0] += 2;
      } else {
        break;
      }
    }

    if (cPipe === 'L') {
      let top = grid[current[0] - 2]?.[current[1]];
      let right = grid[current[0]][current[1] + 2];

      if (isNumber(top) && !isNumber(right)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0]][current[1] + 1] = 8;
        current[1] += 2;
      } else if (isNumber(right) && !isNumber(top)) {
        grid[current[0]][current[1]] = 8;
        grid[current[0] - 1][current[1]] = 8;
        current[0] -= 2;
      } else {
        break;
      }
    }
  }

  grid[current[0]][current[1] - 2] = 8;

  let stack = [[0, 0]];
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

  let cleanGrid = [];

  for (let i = 1; i < grid.length; i += 2) {
    let row = grid[i];
    let newRow = [];
    for (let j = 1; j < grid[0].length; j += 2) {
      newRow.push(row[j]);
    }
    cleanGrid.push(newRow);
  }

  let gridLine = printGrid(cleanGrid).replace(/\s/g, '');

  let total = gridLine.length * gridLine[0].length;
  let pipesCnt = 0;
  let zCnt = 0;

  forEachInGrid(cleanGrid, (ch) => {
    if (ch === 'z') {
      zCnt++;
    } else if (ch === 8) {
      pipesCnt++;
    }
  });

  return total - pipesCnt - zCnt;
}

function isNumber(it) {
  return typeof it === "number";
}