import { findInGrid, forEachInGrid, makeGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/20

runDay(2024, 20)
  //
  .part(1, part1)
  .part(2, part2)
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
  grid[start[0]][start[1]] = ".";
  grid[end[0]][end[1]] = ".";

  while (q.length > 0) {
    let [[x, y], n] = q.pop();

    if (grid[x][y] === ".") {
      grid[x][y] = n;
      for (let [dx, dy] of dirs) {
        q.push([[x + dx, y + dy], n + 1]);
      }
    }
  }

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
        if (diff >= 100) res += 1;
      }
    }
  });

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
  grid[start[0]][start[1]] = ".";
  grid[end[0]][end[1]] = ".";

  let steps = [];
  while (q.length > 0) {
    let [[x, y], n] = q.shift();

    if (grid[x][y] === ".") {
      grid[x][y] = n;
      steps[n] = [x, y];
      for (let [dx, dy] of dirs) {
        q.push([[x + dx, y + dy], n + 1]);
      }
    }
  }

  let res = 0;
  for (let s = 0; s < steps.length - 1; s++) {
    for (let ss = s + 1; ss < steps.length; ss++) {
      let distance =
        Math.abs(steps[s][0] - steps[ss][0]) +
        Math.abs(steps[s][1] - steps[ss][1]);

      if (distance > 20) continue;

      if (ss - s - distance >= 100) res++;
    }
  }

  return res;
}
