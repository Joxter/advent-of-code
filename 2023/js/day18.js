import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/18


runDay(2023, 18)
  .part(1, part1)
  .part(1, part1opt, 'optimized')
  .part(1, part1correct, 'part1correct')
  .part(2, part2)
  .end();

function part1(inp) {
  let trench = {};

  let curX = 0;
  let curY = 0;

  inp.split('\n')
     .forEach((line) => {
       let [dir, n, color] = line.split(' ');
       n = +n;

       if (dir === 'L') {
         while (n) {
           curX++;
           trench[curX + ',' + curY] = "#";
           n--;
         }
       }
       if (dir === 'R') {
         while (n) {
           curX--;
           trench[curX + ',' + curY] = "#";
           n--;
         }
       }
       if (dir === 'U') {
         while (n) {
           curY--;
           trench[curX + ',' + curY] = "#";
           n--;
         }
       }
       if (dir === 'D') {
         while (n) {
           curY++;
           trench[curX + ',' + curY] = "#";
           n--;
         }
       }
     });

  let stack = [[-1, 1]]; // hardcode :(

  while (stack.length > 0) {
    let [x, y] = stack.pop();
    if (!trench[x + ',' + y]) {
      trench[x + ',' + y] = 'x';
      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }
  }

  return Object.keys(trench).length;
}

function part1opt(inp) {
  return countSize(parse1(inp));
}

function part1correct(inp) {
  // https://en.wikipedia.org/wiki/Pick's_theorem
  // https://en.wikipedia.org/wiki/Shoelace_formula
  const dirs = { 'R': [1, 0], 'D': [0, 1], 'L': [-1, 0], 'U': [0, -1] };

  let pos = 0;
  let ans = 1;

  parse1(inp).forEach(([d, count]) => {
    let [x, y] = dirs[d];
    pos += x * count;
    ans += y * count * pos + count / 2;
  })

  return Math.floor(ans);
}

function part2(inp) {
  const dirs = { 'R': [1, 0], 'D': [0, 1], 'L': [-1, 0], 'U': [0, -1] };

  let pos = 0;
  let ans = 1;

  parse2(inp).forEach(([d, count]) => {
    let [x, y] = dirs[d];
    pos += x * count;
    ans += y * count * pos + count / 2;
  })

  return Math.floor(ans);
}

function countSize(steps) {
  let total = 0;
  let deep = 0;
  let pp = 0;
  let prevDir = null;

  steps.forEach(([dir, steps]) => {
    if (dir === 'D') {
      pp += steps;
      deep += (steps);
    }
    if (dir === 'U') {
      deep -= (steps);
    }
    if (dir === 'R') {
      if (prevDir === 'U') pp -= 1;

      total -= (deep) * (steps);
    }
    if (dir === 'L') {
      pp += steps;
      if (prevDir === 'D') pp += 1;

      total += (deep) * (steps);
    }

    prevDir = dir;
  });

  return total + pp;
}

function parse1(inp) {
  return inp
    .split('\n')
    .map((line) => {
        let [direction, steps] = line.split(' ');
        steps = +steps;

        return [direction, steps];
      }
    );
}

function parse2(inp) {
  return inp
    .split('\n')
    .map((line) => {
        line = line.split(' ')[2];
        let steps = parseInt(line.slice(2, 7), 16);
        let dirrdirction = ['R', 'D', 'L', 'U'][line.slice(7, 8)];

        return [dirrdirction, steps];
      }
    );
}

/*
function printTrench(trench) {
  // print grid
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const key in trench) {
    let [x, y] = key.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  let grid = [];
  for (let i = minY; i <= maxY; i++) {
    let row = [];
    for (let j = minX; j <= maxX; j++) {
      row.push(trench[j + ',' + i] || ' ');
    }
    grid.push(row);
  }

  let res = grid.map(row => row.join('')).join('\n');
  console.log(res);
}
*/
