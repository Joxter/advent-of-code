import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/18

// console.log(part12(`R 6 (#70c710)
// D 5 (#0dc571)
// L 2 (#5713f0)
// D 2 (#d2c081)
// R 2 (#59c680)
// D 2 (#411b91)
// L 5 (#8ceee2)
// U 2 (#caa173)
// L 1 (#1b58a2)
// U 2 (#caa171)
// R 2 (#7807d2)
// U 3 (#a77fa3)
// L 2 (#015232)
// U 2 (#7a21e3)`), [62]); // 62, 952408144115

console.log(part12(`R 4 foo
D 4 foo
L 2 foo
D 2 foo
R 3 foo
D 2 foo
L 6 foo
U 5 foo
R 1 foo
U 3 foo`), [5 * 3 + 6 * 2 + 4 + 7 * 3]); // 62, 952408144115

runDay(2023, 18)
  .part(1, part1, 'old')
  .part(1, part12, 'should be ok')
  // .part(2, part2)
  .end();

/*
  0123456

0 .XXXXX. 0
1 .X...X. 1
2 .X...X. 2
3 XX...X. 3
4 X..XXX. 4
5 X..X... 5
6 X..XXXX 6
7 X.....X 7
8 XXXXXXX 8

  0123456    0123456   012345

0 .XXXXX. 0  .OOOO?. 0 .XXXX. 0
1 .XXXXX. 1  .OOOO?. 1 .XXXX. 1
2 .XXXXX. 2  .OOOO?. 2 .XXXX. 2
3 XXXXXX. 3  OOOOO?. 3 XXXXX. 3
4 XXXXXX. 4  OOO??X. 4 XXX... 4
5 XXXX... 5  OOO?... 5 XXX... 5
6 XXXXXXX 6  OOOOOO? 6 XXXXXX 6
7 XXXXXXX 7  OOOOOO? 7 XXXXXX 7
8 XXXXXXX 8  ??????X 8

-- R4 D4 L2 D2 R3 D2   L6   U5 R1 U3




*/

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

function part12(inp) {
  let total = 0;

  let deep = 0;

  let pp = 0;
  let prevDir = null;

  inp.split('\n')
     .forEach((line) => {
       let [dir, n] = line.split(' ');
       n = +n;


       if (dir === 'D') {
         pp += n;
         deep += (n);
       }
       if (dir === 'U') {
         deep -= (n);
       }
       if (dir === 'R') {
         if (prevDir === 'U') pp -= 1;

         total -= (deep) * (n);
       }
       if (dir === 'L') {
         pp += n;
         if (prevDir === 'D') pp += 1;

         total += (deep) * (n);
       }

       prevDir = dir;
     });

  return total + pp;
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

       sizes.push(n);

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
    if (i % 100_000 === 0) {
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