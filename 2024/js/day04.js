import { makeGridWithBorder, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/4

runDay(2024, 4, 100)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, "#");
  let dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let res = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      for (let dir of dirs) {
        for (let k = 0; k <= 3; k++) {
          if (grid[i + k * dir[0]][j + k * dir[1]] === "XMAS"[k]) {
            if (k === 3) res++;
          } else {
            break;
          }
        }
      }
    }
  }

  return res;
}

function part2(inp) {
  let grid = makeGridWithBorder(inp, "#");

  let res = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "A") {
        let a = grid[i - 1][j - 1] + grid[i + 1][j + 1];
        let b = grid[i - 1][j + 1] + grid[i + 1][j - 1];

        if ((a === "MS" || a === "SM") && (b === "MS" || b === "SM")) {
          res++;
        }
      }
    }
  }

  return res;
}
