import {
  findInGrid,
  forEachInGrid,
  makeGrid,
  printGrid,
  printGridCb,
  runDay,
} from "../../utils.js";

// https://adventofcode.com/2024/day/20

console.log(
  part1(`###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`),
);

runDay(2024, 20)
  //
  .part(1, part1) // 1382 1383, 1413 low
  // .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let end = findInGrid(grid, "E");

  let q = [[start, 0]];

  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  console.log(start, end);
  grid[start[0]][start[1]] = ".";
  grid[end[0]][end[1]] = ".";

  while (q.length > 0) {
    let [[x, y], n] = q.shift();
    let val = grid[x][y];
    // console.log([x, y], n, q.length);

    if (val === ".") {
      grid[x][y] = n;
      for (let [dx, dy] of dirs) {
        q.push([[x + dx, y + dy], n + 1]);
      }
    }
  }
  // console.log(printGrid(grid));
  // console.log(
  //   printGridCb(grid, (cell) =>
  //     cell === "#" ? "###" : String(cell).padStart(3, " "),
  //   ),
  // );

  let cloneGrid = grid.map((row) => row.slice());

  let a = {};

  let res = 0;
  forEachInGrid(grid, (cell, i, j) => {
    let nums = [
      grid[i][j - 1],
      grid[i][j + 1],
      grid[i - 1]?.[j],
      grid[i + 1]?.[j],
    ].filter((x) => x !== undefined && x !== "#");

    for (let k = 0; k < nums.length - 1; k++) {
      for (let l = k + 1; l < nums.length; l++) {
        let diff = Math.abs(nums[k] - nums[l]) - 2;
        if (diff > 0) {
          if (!a[diff]) a[diff] = 0;
          a[diff]++;

          if (diff >= 100) {
            cloneGrid[i][j] = diff;
            res += 1;
          }
        }
      }
    }
  });
  console.log(a);
  console.log(res);

  console.log(
    printGridCb(cloneGrid, (cell) =>
      cell === "#" ? "###" : String(cell).padStart(3, " "),
    ),
  );

  return res;
}

function part2(inp) {
  return 123;
}
