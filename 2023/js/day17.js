import { allNeibs8, makeGridWithBorder, printGridCb, PriorityQueue, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/17


console.log(part1(`2413432311323
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
4322674655533`));

runDay(2023, 17)
  // .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, 'x');
  // console.log(grid);

  let m = Array(grid.length).fill(0).map(() => {
    return Array(grid[0].length).fill(Infinity);
  });
  let maxSteps = 3;

  let q = [[0, 1, 1, 'r', maxSteps, [[1, 1]]]]; // acc, i, j, direction, straight steps, path

  let result = Infinity;
  // debugger

  let aMin = 1000;

  while (q.length > 0) {
    let [acc, i, j, dir, cnt, path] = q.shift();
    // console.log(acc, [i,j], dir, cnt);

    if (i === 3 && j === 10 && acc < aMin) {
      // console.log('3-10', acc);
      // console.log(printGridCb(grid, (cell, gi, gj) => {
      //   if (path.find(([pi, pj]) => gi === pi && gj === pj)) {
      //     return '*';
      //   } else {
      //     return cell;
      //   }
      // }));
      // aMin = acc;
      // debugger
    }

    // [[1,1],[1,2],[1,3],[2,3],[2,4],[2,5],[2,6],[1,6],[1,7],[1,8],[1,9],[2,9],[2,10],[3,10],[3,11],[4,11],[4,12],[5,12],[6,12],[7,12],[7,13],[8,13],[9,13],[10,13],[10,12],[11,12],[12,12],[13,12],[13,13]]
    // [[1,1],[1,2],[1,3],[2,3],[2,4],[2,5],[2,6],[1,6],[1,7],[1,8],[1,9],[2,9]]
    if (JSON.stringify(path) === '[[1,1],[1,2],[1,3],[2,3],[2,4],[2,5],[2,6],[1,6],[1,7],[1,8],[1,9],[2,9],[3,9],[3,10]]') {
      // console.log('>>>', 'OK');
      // console.log(printGridCb(grid, (cell, gi, gj) => {
      //   if (path.find(([pi, pj]) => gi === pi && gj === pj)) {
      //     return '*';
      //   } else {
      //     return cell;
      //   }
      // }));
      // // debugger
    }

    if (cnt < 1) continue;

    if (i === grid.length - 2 && j === grid[0].length - 2 && acc < result) {
      console.log('');
      console.log(JSON.stringify(path));
      console.log({ acc });
      console.log(printGridCb(grid, (cell, gi, gj) => {
        if (path.find(([pi, pj]) => gi === pi && gj === pj)) {
          return '*';
        } else {
          return cell;
        }
      }));
      result = acc;
    }

    let c = [acc, m[i][j]];
    if (acc >= m[i][j]) continue;
    m[i][j] = acc;

    // down
    if (grid[i + 1][j] !== 'x') {
      let cell = +grid[i + 1][j];
      let newPath = [...path, [i + 1, j]];

      if (dir === 'd') {
        q.push([acc + cell, i + 1, j, 'd', cnt - 1, newPath]);
      } else {
        q.push([acc + cell, i + 1, j, 'd', maxSteps, newPath]);
      }
    }
    // right
    if (grid[i][j + 1] !== 'x') {
      let cell = +grid[i][j + 1];
      let newPath = [...path, [i, j + 1]];

      if (dir === 'r') {
        q.push([acc + cell, i, j + 1, 'r', cnt - 1, newPath]);
      } else {
        q.push([acc + cell, i, j + 1, 'r', maxSteps, newPath]);
      }
    }
    // left
    if (grid[i][j - 1] !== 'x') {
      let cell = +grid[i][j - 1];
      let newPath = [...path, [i, j - 1]];

      if (dir === 'l') {
        q.push([acc + cell, i, j - 1, 'l', cnt - 1, newPath]);
      } else {
        q.push([acc + cell, i, j - 1, 'l', maxSteps, newPath]);
      }
    }
    // up
    if (grid[i - 1][j] !== 'x') {
      let cell = +grid[i - 1][j];
      let newPath = [...path, [i - 1, j]];

      if (dir === 'u') {
        q.push([acc + cell, i - 1, j, 'u', cnt - 1, newPath]);
      } else {
        q.push([acc + cell, i - 1, j, 'u', maxSteps, newPath]);
      }
    }
  }

  // console.log(m.map(r => {
  //   return r.map((it) => {
  //     // console.log(it);
  //     return Number.isFinite(it) ? String(it).padStart(3,' ') : 'x'
  //   }).join(',')
  // }).join('\n'));

  return result;
}

function part2(inp) {
  return 123;
}


/*

2>>34^>>>1323
32v>>>35v5623
32552456v>>54
3446585845v52
4546657867v>6
14385987984v4
44578769877v6
36378779796v>
465496798688v
456467998645v
12246868655<v
25465488877v5
43226746555v>

x***34****1323x
x32****35**623x
x325524565**54x
x3446585845**2x
x45466578675*6x
x14385987984*4x
x44578769877**x
x363787797965*x
x465496798688*x
x45646799864**x
x12246868655*3x
x25465488877*5x
x43226746555**x
*/


