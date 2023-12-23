import { makeGridWithBorder, PriorityQueue, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/17

runDay(2023, 17)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, 'x');

  let cache = {};
  let maxSteps = 3;
  let q = PriorityQueue();

  q.push(0, [0, 1, 1, 'r', maxSteps]); // acc, i, j, direction, straight steps, path

  while (!q.isEmpty()) {
    let [acc, i, j, dir, cnt] = q.pop();
    if (cnt < 1) continue;

    let gkey = `${dir}-${cnt}-${i}-${j}`;
    if (cache[gkey]) {
      continue
    } else {
      cache[gkey] = acc;
    }

    if (i === grid.length - 2 && j === grid[0].length - 2) {
      return acc;
    }

    // down
    if (grid[i + 1][j] !== 'x' && dir !== 'u') {
      let cell = +grid[i + 1][j];

      if (dir === 'd') {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', cnt - 1]);
      } else {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', maxSteps]);
      }
    }
    // right
    if (grid[i][j + 1] !== 'x' && dir !== 'l') {
      let cell = +grid[i][j + 1];

      if (dir === 'r') {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', cnt - 1]);
      } else {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', maxSteps]);
      }
    }
    // left
    if (grid[i][j - 1] !== 'x' && dir !== 'r') {
      let cell = +grid[i][j - 1];

      if (dir === 'l') {
        q.push(acc + cell, [acc + cell, i, j - 1, 'l', cnt - 1]);
      } else {
        q.push(acc + cell, [acc + cell, i, j - 1, 'l', maxSteps]);
      }
    }
    // up
    if (grid[i - 1][j] !== 'x' && dir !== 'd') {
      let cell = +grid[i - 1][j];

      if (dir === 'u') {
        q.push(acc + cell, [acc + cell, i - 1, j, 'u', cnt - 1]);
      } else {
        q.push(acc + cell, [acc + cell, i - 1, j, 'u', maxSteps]);
      }
    }
  }
}

function part2(inp) {
  let grid = makeGridWithBorder(inp, 'x');

  let maxGrid = {};
  let q = PriorityQueue();

  q.push(0, [0, 1, 1, '.', 0]); // acc, i, j, direction, straight steps, path

  while (!q.isEmpty()) {
    let [acc, i, j, dir, directionCnt] = q.pop();

    if (grid[i][j] === 'x') continue;
    if (directionCnt > 10) continue;

    let gkey = `${dir}-${directionCnt}-${i}-${j}`;
    if (maxGrid[gkey]) {
      if (acc > maxGrid[gkey]) {
        continue;
      } else {
        maxGrid[gkey] = acc;
      }
    } else {
      maxGrid[gkey] = acc;
    }

    if (i === grid.length - 2 && j === grid[0].length - 2 && directionCnt >= 4) {
      return acc;
    }

    let possibleD = dir === '.' ||
      (dir === 'd' && directionCnt <= 10 || dir !== 'd' && directionCnt >= 4)
      && dir !== 'u';
    let possibleU = dir === '.' ||
      (dir === 'u' && directionCnt <= 10 || dir !== 'u' && directionCnt >= 4)
      && dir !== 'd';
    let possibleR = dir === '.' ||
      (dir === 'r' && directionCnt <= 10 || dir !== 'r' && directionCnt >= 4)
      && dir !== 'l';
    let possibleL = dir === '.' ||
      (dir === 'l' && directionCnt <= 10 || dir !== 'l' && directionCnt >= 4)
      && dir !== 'r';

    // down
    if (possibleD) {
      let cell = +grid[i + 1][j];

      if (dir === 'd') {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', directionCnt + 1]);
      } else {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', 1]);
      }
    }

    if (possibleR) {
      let cell = +grid[i][j + 1];

      if (dir === 'r') {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', directionCnt + 1]);
      } else {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', 1]);
      }
    }

    // left
    if (possibleL) {
      if (grid[i][j - 1] !== 'x') {
        let cell = +grid[i][j - 1];

        if (dir === 'l') {
          q.push(acc + cell, [acc + cell, i, j - 1, 'l', directionCnt + 1]);
        } else {
          q.push(acc + cell, [acc + cell, i, j - 1, 'l', 1]);
        }
      }
    }

    // up
    if (possibleU) {
      if (grid[i - 1][j] !== 'x') {
        let cell = +grid[i - 1][j];

        if (dir === 'u') {
          q.push(acc + cell, [acc + cell, i - 1, j, 'u', directionCnt + 1]);
        } else {
          q.push(acc + cell, [acc + cell, i - 1, j, 'u', 1]);
        }
      }
    }
  }
}
