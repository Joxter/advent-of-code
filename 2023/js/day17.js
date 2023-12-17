import { allNeibs8, makeGridWithBorder, printGridCb, ProitoryQueue, ProitoryQueueArr, runDay } from '../../utils.js';
import readlineSync from 'readline-sync';

// https://adventofcode.com/2023/day/17

//                 0
//                  1234567890
// console.log(part2(`01111111111`), ['OK']);
// console.log(part2(`011111111111`), ['UNDEF']);

console.log('---');
//                 0
//                  1234567890
// console.log(part2(`01111`), ['OK']);
// console.log(part2(`0111`), ['UNDEF']);

console.log(part2(`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`), [94]);

// .rrrrrrrrddddrrrrdddddddd 25
// .8r 4d 4r 8d (CORRECT)

//
console.log(part2(`111111111111
999999999991
999999999991
999999999991
999999999991`), [71]);
// .rrrrrrrrrrr
// .7r 4d 4r (correct)

runDay(2023, 17)
  // .part(1, part1)
  // .part(2, part2)
  .end();

function printGridAndPath(grid, path, allP) {
  let a = printGridCb(grid, (cell, gi, gj) => {
    if (path.find(([pi, pj]) => gi === pi && gj === pj)) {
      return ` [${cell}]`;
    } else if (allP.find((p) => {
        return p.find(([pi, pj]) => gi === pi && gj === pj);
      }
    )) {
      return `  ${cell}!`;
    } else {
      return `  ${cell} `;
    }
  });

  return a;
}

function printM(grid, maxGrid, path) {
  let max = Array(grid.length).fill(0).map(() => {
    return Array(grid[0].length).fill(Infinity);
  });

  // `${dir}-${cnt}-${i}-${j}`
  for (const maxGridKey in maxGrid) {
    let [, , i, j] = maxGridKey.split('-');
    max[i][j] = Math.min(max[i][j], maxGrid[maxGridKey]);
  }

  let a = max.map((r, i) => {
    return r.map((it, j) => {
      // let inc = path.find(([pi, pj]) => i === pi && j === pj)?.[2] || ' ';
      let inc = ' ';
      return Number.isFinite(it) ? String(it).padStart(3, ' ') + inc : '  x ';
    }).join('');
  }).join('\n');
  return a;
}

function part1(inp) {
  let grid = makeGridWithBorder(inp, 'x');

  let maxGrid = {};

  let maxSteps = 3;

  let q = ProitoryQueue();
  // let q = ProitoryQueueArr();
  // let ppp = [[1,1,'?']];
  let ppp = ['.'];

  q.push(0, [0, 1, 1, 'r', maxSteps, ppp]); // acc, i, j, direction, straight steps, path
  let iters = 0;

  while (!q.isEmpty()) {
    let [acc, i, j, dir, cnt, path] = q.pop();

    if (++iters % 1_000_000 === 0) {
      console.log({ iters }, q.size(), acc);
    }

    if (cnt < 1) continue;

    let gkey = `${dir}-${cnt}-${i}-${j}`;
    if (maxGrid[gkey]) {
      if (acc > maxGrid[gkey]) {
        continue;
      } else {
        maxGrid[gkey] = acc;
      }
    } else {
      maxGrid[gkey] = acc;
    }

    if (i === grid.length - 2 && j === grid[0].length - 2) {
      console.log('>>>> RESULT', [acc], iters, path, path.length);
      console.log('keys: ', Object.keys(maxGrid).length);
      console.log({ iters }, 'size:', q.size());
      console.log(printM(grid, maxGrid, path));

      return acc;
    }

    // down
    if (grid[i + 1][j] !== 'x' && dir !== 'u') {
      let cell = +grid[i + 1][j];
      // let newPath = [...path, [i, j, 'd']];
      let newPath = path + 'd';

      if (dir === 'd') {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', cnt - 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', maxSteps, newPath]);
      }
    }
    // right
    if (grid[i][j + 1] !== 'x' && dir !== 'l') {
      let cell = +grid[i][j + 1];
      // let newPath = [...path, [i, j, 'r']];
      let newPath = path + 'r';

      if (dir === 'r') {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', cnt - 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', maxSteps, newPath]);
      }
    }
    // left
    if (grid[i][j - 1] !== 'x' && dir !== 'r') {
      let cell = +grid[i][j - 1];
      // let newPath = [...path, [i, j, 'l']];
      let newPath = path + 'l';

      if (dir === 'l') {
        q.push(acc + cell, [acc + cell, i, j - 1, 'l', cnt - 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i, j - 1, 'l', maxSteps, newPath]);
      }
    }
    // up
    if (grid[i - 1][j] !== 'x' && dir !== 'd') {
      let cell = +grid[i - 1][j];
      // let newPath = [...path, [i, j, 'u']];
      let newPath = path + 'u';

      if (dir === 'u') {
        q.push(acc + cell, [acc + cell, i - 1, j, 'u', cnt - 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i - 1, j, 'u', maxSteps, newPath]);
      }
    }
  }
}

function part2(inp) {
  let grid = makeGridWithBorder(inp, 'x');

  let maxGrid = {};

  let q = ProitoryQueue();
  let ppp = '.';

  q.push(0, [0, 1, 1, '.', 0, ppp]); // acc, i, j, direction, straight steps, path
  let iters = 0;

  while (!q.isEmpty()) {
    let [acc, i, j, dir, directionCnt, path] = q.pop();
    // console.log([acc, i, j, dir, directionCnt, path]);
    // 8r 4d 4r 8d (CORRECT)
    // .7r 4d 4r (correct)

    if (path.startsWith('.rrrrrrrdddd')) {
      // console.log('cor', path);
    }
    if (path === '.rrr') {
      debugger
    }

    if (++iters % 1_000_000 === 0) {
      console.log({ iters }, q.size(), acc);
    }

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
      console.log('>>>> RESULT', [acc], iters, path, path.length);
      // console.log('keys: ', Object.keys(maxGrid).length);
      // console.log({ iters }, 'size:', q.size());
      // console.log(printM(grid, maxGrid, path));
      return acc;
    }


    // dir = 'u', cnt = 2
    // d- false
    // u - true
    // r - false
    // l - fasle

    // dir = 'u', cnt = 4
    // d- false
    // u - true
    // r - false
    // l - fasle

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

    if (!possibleD && !possibleU && !possibleR && !possibleL) {
      console.log([i, j], { dir, directionCnt });
    }

    // console.log({possibleD, });


    // down
    if (possibleD) {
      let cell = +grid[i + 1][j];
      // let newPath = [...path, [i, j, 'd']];
      let newPath = path + 'd';

      if (dir === 'd') {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', directionCnt + 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', 1, newPath]);
      }
    }

    // right
    if (possibleR) {
      let cell = +grid[i][j + 1];
      // let newPath = [...path, [i, j, 'r']];
      let newPath = path + 'r';

      if (dir === 'r') {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', directionCnt + 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', 1, newPath]);
      }
    }

    // left
    if (possibleL) {
      if (grid[i][j - 1] !== 'x') {
        let cell = +grid[i][j - 1];
        // let newPath = [...path, [i, j, 'l']];
        let newPath = path + 'l';

        if (dir === 'l') {
          q.push(acc + cell, [acc + cell, i, j - 1, 'l', directionCnt + 1, newPath]);
        } else {
          q.push(acc + cell, [acc + cell, i, j - 1, 'l', 1, newPath]);
        }
      }
    }

    // up
    if (possibleU) {
      if (grid[i - 1][j] !== 'x') {
        let cell = +grid[i - 1][j];
        // let newPath = [...path, [i, j, 'u']];
        let newPath = path + 'u';

        if (dir === 'u') {
          q.push(acc + cell, [acc + cell, i - 1, j, 'u', directionCnt + 1, newPath]);
        } else {
          q.push(acc + cell, [acc + cell, i - 1, j, 'u', 1, newPath]);
        }
      }
    }
  }
}
