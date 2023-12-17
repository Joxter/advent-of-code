import { allNeibs8, makeGridWithBorder, printGridCb, ProitoryQueue, ProitoryQueueArr, runDay } from '../../utils.js';
import readlineSync from 'readline-sync';

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
  // .part(1, part1, '850 hight, 843 low')
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

function pathContains(path, i, j) {
  return !!path.find(([pi, pj]) => i === pi && j === pj);
}

function printDbg(grid, m, path, q) {
  // console.log(JSON.stringify(path));
  console.log(printGridAndPath(grid, path, []));
  console.log('');
  // console.log(printM(m));

  readlineSync.question('wait');
}

function part1(inp) {
  let grid = makeGridWithBorder(inp, 'x');
  // console.log(grid);

  let maxGrid = {};

  let maxSteps = 3;

  let q = ProitoryQueue();
  // let q = ProitoryQueueArr();
  // let ppp = [[1,1,'?']];
  let ppp = ['.'];

  q.push(0, [0, 1, 1, 'r', maxSteps, ppp]); // acc, i, j, direction, straight steps, path
  let result = Infinity;
  let aMin = 1000;

  let iters = 0;
  let ans = 0;

  while (!q.isEmpty()) {
    let [acc, i, j, dir, cnt, path] = q.pop();

    if (++iters % 1_000_000 === 0) {
      console.log({ iters }, q.size(), path.length);
    }

    if (cnt < 1) continue;

    if (i === grid.length - 2 && j === grid[0].length - 2) {
      // ans++;
    }

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

    // if (i === 8 && j === 13 && acc === 73) {
    //   console.log({ dir, cnt });
    //   // debugger
    // }

    if (i === grid.length - 2 && j === grid[0].length - 2) {
      console.log(cnt);
      console.log('>>>> RESULT', [acc], iters, path, path.length);
      // console.log({ acc }, JSON.stringify(path));
      // console.log(printGridAndPath(grid, path));
      result = acc;

      console.log('keys: ', Object.keys(maxGrid).length);
      console.log({ iters }, 'size:', q.size());
      console.log(printM(grid, maxGrid, path));

      return acc;
    }

    // printDbg(grid, maxGridR, [], q)

    // down
    if (grid[i + 1][j] !== 'x' && path.at(-1) !== 'u') {
      let cell = +grid[i + 1][j];
      // let newPath = [...path, [i, j, 'd']];
      let newPath = path+'d';

      if (dir === 'd') {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', cnt - 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i + 1, j, 'd', maxSteps, newPath]);
      }
    }
    // right
    if (grid[i][j + 1] !== 'x' && path.at(-1) !== 'l') {
      let cell = +grid[i][j + 1];
      // let newPath = [...path, [i, j, 'r']];
      let newPath = path+'r';

      if (dir === 'r') {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', cnt - 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i, j + 1, 'r', maxSteps, newPath]);
      }
    }
    // left
    if (grid[i][j - 1] !== 'x' && path.at(-1) !== 'r') {
      let cell = +grid[i][j - 1];
      // let newPath = [...path, [i, j, 'l']];
      let newPath = path+'l';

      if (dir === 'l') {
        q.push(acc + cell, [acc + cell, i, j - 1, 'l', cnt - 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i, j - 1, 'l', maxSteps, newPath]);
      }
    }
    // up
    if (grid[i - 1][j] !== 'x' && path.at(-1) !== 'd') {
      let cell = +grid[i - 1][j];
      // let newPath = [...path, [i, j, 'u']];
      let newPath = path+'u';

      if (dir === 'u') {
        q.push(acc + cell, [acc + cell, i - 1, j, 'u', cnt - 1, newPath]);
      } else {
        q.push(acc + cell, [acc + cell, i - 1, j, 'u', maxSteps, newPath]);
      }
    }
  }
  // console.log({ ans });

  return result;
}

function part2(inp) {
  return 123;
}


/*

2413432311323
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
4322674655533

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

 x   x   x   x   x   x   x   x   x   x   x   x   x   x   x
  x  17  22  25  34  36  41  41  53  50  56  58  60  60   x
  x  26  24  30  41  42  50  51  65  60  67  64  67  65   x
  x  28  32  35  47  47  59  63  75  73  77  67  73  74   x
  x  32  39  44  54  58  71  74  85  85  88  79  79  81   x
  x  38  45  49  59  65  74  82  94  99  83  91  85  89   x
  x  41  52  58  68  75  82  85 100  93  94  86  96  93   x
  x  52  60  69  76  83  88  91  93  98  89  98  91 100   x
  x  55  63  71  83  92  99  92 100  93  95  93  96 100   x
  x  58  65  74  83  97  88  99  97  99 100  99  97 100   x
  x  60  66  74  84  80  97  98  98  94 100  98  98  97   x
  x  56  63  75  87  99  93 100  97 100 100 100 100 101   x
  x  66  75  79  87  97  92  88 100  95 100   x 101  98   x
  x  65  69  79  90  98  92  96  93  99  96   x  99 101   x
  x   x   x   x   x   x   x   x   x   x   x   x   x   x   x
*/


function myQ() {
  let obj = {};

  let q = {
    add(acc, data) {
      if (!obj[+acc]) obj[+acc] = [];
      obj[+acc].push(data);

      return q;
    },
    pop() {
      for (const objKey in obj) {
        let arr = obj[objKey];
        let it = arr.pop();
        return it;
      }
    }
  };

  return q;
}

