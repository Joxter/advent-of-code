import { printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/18

// console.log(
//   part1(`5,4
// 4,2
// 4,5
// 3,0
// 2,1
// 6,3
// 2,4
// 1,5
// 0,6
// 3,3
// 2,6
// 5,1
// 1,2
// 5,5
// 2,5
// 6,5
// 1,4
// 0,4
// 6,4
// 1,1
// 6,1
// 1,0
// 0,5
// 1,6
// 2,0`),
// );

runDay(2024, 18)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  // let size = 6;
  // let bytes = 12;
  let size = 70;
  let bytes = 1024;

  let grid = Array(size + 1)
    .fill(".")
    .map(() => {
      return Array(size + 1).fill(".");
    });

  inp
    .trim()
    .split("\n")
    .slice(0, bytes)
    .forEach((line, i) => {
      let [x, y] = line.split(",");
      grid[+y][+x] = "#";
      // console.log(i);
      // console.log(printGrid(grid));
    });

  let q = [[[0, 0], 0]];

  while (q.length > 0) {
    let [[x, y], len] = q.shift();
    // if (x < 0 || x >= size || y < 0 || y >= size || grid[y][x] !== "#") {
    //   continue;
    // }

    if (grid[y]?.[x] === '.') {
      grid[y][x] = len;
      q.push([[x + 1, y], len + 1]);
      q.push([[x - 1, y], len + 1]);
      q.push([[x, y + 1], len + 1]);
      q.push([[x, y - 1], len + 1]);
    }
  }

  // console.log(printGrid(grid));
  // console.log(grid);

  return grid[size][size];
}

function part2(inp) {
  // return 123;
}
