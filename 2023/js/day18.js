import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/18

console.log(part2(`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`));

runDay(2023, 18)
  // .part(1, part1)
  // .part(2, part2)
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

  let stack = [[-1, 1]];

  let limit = 1000000;

  while (stack.length > 0) {
    limit--;
    if (!limit) {
      console.log('LIMIT');
      break;
    }

    let [x, y] = stack.pop();
    if (!trench[x + ',' + y]) {
      trench[x + ',' + y] = 'x';
      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }
  }

  // printTrench(trench)

  return Object.keys(trench).length;
}

function part2(inp) {

  let trench = {};

  let curX = 0;
  let curY = 0;

  let sizes = [];

  inp.split('\n')
     .forEach((line) => {
       line = line.split(' ')[2];

       let n = parseInt(line.slice(2, 7), 16);
       let dir = ['R', 'D', 'L', 'U'][line.slice(7, 8)];
       console.log(line, { n, dir });

       sizes.push(n)

       return;

       if (dir === 'L') {
         while (n) {
           curX++;
           trench[curX + ',' + curY] = 1;
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

  // console.log(Object.keys(trench).length);
// trench len 6_405_262
// size 0..=1_186_328 ^^ 2
// test result 952_408_144_115

  return 123;
}

function getSize(trench) {
  // print grid
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let i = 0;
  for (const key in trench) {
    i++;
    if (i%100_000 === 0) {
      console.log(i, key, { minY, minX, maxX, maxY });
    }
    let [x, y] = key.split(',').map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  return { minY, minX, maxX, maxY };
}

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