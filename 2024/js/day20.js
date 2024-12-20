import {
  findInGrid,
  forEachInGrid,
  ints,
  makeGrid,
  printGrid,
  printGridCb,
  runDay,
} from "../../utils.js";

// https://adventofcode.com/2024/day/20

console.log(
  part2(`###############
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
  // .part(1, part1)
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

  let cheats = {};
  let aaaa = {};

  let res = 0;
  forEachInGrid(grid, (cell, i, j) => {
    if (cell !== "#") return;

    let top = 1;
    while (grid[i - top]?.[j] === "#") {
      top++;
    }
    let down = 1;
    while (grid[i + down]?.[j] === "#") {
      down++;
    }
    let left = 1;
    while (grid[i][j - left] === "#") {
      left++;
    }
    let right = 1;
    while (grid[i][j + right] === "#") {
      right++;
    }

    let nums = [
      [grid[i - top]?.[j], top],
      [grid[i + down]?.[j], down],
      [grid[i][j - left], left],
      [grid[i][j + right], right],
    ].filter(([x]) => x !== undefined && x !== "#");
    if (nums.length >= 2) {
      console.log([i, j], { top, left, down, right }, nums);
    }

    for (let k = 0; k < nums.length - 1; k++) {
      for (let l = k + 1; l < nums.length; l++) {
        let diff = Math.abs(nums[k][0] - nums[l][0]);
        let cost = nums[k][1] + nums[l][1];

        let min = Math.min(nums[k][0], nums[l][0]);
        let max = Math.max(nums[k][0], nums[l][0]);

        if (!cheats[min + "," + max]) cheats[min + "," + max] = [];
        cheats[min + "," + max].push(cost);

        // console.log(nums[k], nums[l]);
        // console.log({ diff, cost });
        if (diff >= 50 && cost < 20 && diff > cost) {
          if (!aaaa[diff]) aaaa[diff] = 0;
          aaaa[diff]++;

          // if (diff >= 100) {
          // cloneGrid[i][j] = diff;
          res += 1;
          // }
        }
      }
    }
  });
  console.log(aaaa);
  console.log(cheats);
  // console.log(res);

  let ss = {};

  let ress = Object.entries(cheats).filter(([key, cost]) => {
    let [min, max] = ints(key);

    if (max - min >= 50) {
      if (!ss[max - min]) ss[max - min] = [];
      ss[max - min].push(key);
    }
  });

  console.log(ss);

  console.log(
    printGridCb(cloneGrid, (cell) =>
      cell === "#" ? "###" : String(cell).padStart(3, " "),
    ),
  );

  return res;
}

/*
#############################################
###  2  3  4### 10 11 12### 26 27 28 29 30###
###  1###  5###  9### 13### 25######### 31###
###  0###  6  7  8### 14### 24### 34 33 32###
##################### 15### 23### 35#########
##################### 16### 22### 36 37 38###
##################### 17### 21######### 39###
######### 82 83 84### 18 19 20### 42 41 40###
######### 81##################### 43#########
### 78 79 80######### 60 59 58### 44 45 46###
### 77############### 61### 57######### 47###
### 76### 70 69 68### 62### 56### 50 49 48###
### 75### 71### 67### 63### 55### 51#########
### 74 73 72### 66 65 64### 54 53 52#########
#############################################
*/
