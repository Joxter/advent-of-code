import {
  makeGrid,
  makeGridWithBorder,
  printGrid,
  printGridCb,
  runDay,
} from "../../utils.js";

// https://adventofcode.com/2024/day/6

runDay(2024, 6)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGrid(inp);

  let dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let current = [0, 0];

  out: for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "^") {
        current = [i, j];
        break out;
      }
    }
  }

  grid[current[0]][current[1]] = ".";
  let path = new Set();
  let d = 0;

  try {
    while (grid[current[0]][current[1]] !== "@") {
      let dir = dirs[d];

      while (grid[current[0]][current[1]] === ".") {
        path.add(current[0] + "," + current[1]);
        current[0] += dir[0];
        current[1] += dir[1];
      }
      if (grid[current[0]][current[1]] === "@") break;
      current[0] -= dir[0];
      current[1] -= dir[1];

      d++;
      d %= 4;
    }
  } catch {}

  return path.size;
}

function part2(inp) {
  let grid = makeGrid(inp);

  let dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let start = [0, 0];

  out: for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "^") {
        start = [i, j];
        break out;
      }
    }
  }

  let current = [...start];
  grid[current[0]][current[1]] = ".";
  let path = new Set();
  let d = 0;

  try {
    while (!!grid[current[0]][current[1]]) {
      let dir = dirs[d];

      while (grid[current[0]][current[1]] === ".") {
        path.add(current[0] + "," + current[1]);
        current[0] += dir[0];
        current[1] += dir[1];
      }
      if (!grid[current[0]][current[1]]) {
        break;
      }
      current[0] -= dir[0];
      current[1] -= dir[1];

      d = (d + 1) % 4;
    }
  } catch {}

  let res = 0;
  [...path].forEach((crate) => {
    let path = new Set();
    let d = 0;

    let current = [...start];
    let cratePosition = crate.split(",");
    grid[cratePosition[0]][cratePosition[1]] = "#";

    try {
      while (grid[current[0]][current[1]] === ".") {
        let dir = dirs[d];

        while (grid[current[0]][current[1]] === ".") {
          current[0] += dir[0];
          current[1] += dir[1];
        }
        if (!grid[current[0]][current[1]]) break;

        let key = current[0] + "," + current[1] + "," + d;
        if (path.has(key)) {
          res++;
          break;
        }
        path.add(key);

        current[0] -= dir[0];
        current[1] -= dir[1];

        d = (d + 1) % 4;
      }

      grid[cratePosition[0]][cratePosition[1]] = ".";
    } catch (e) {
      grid[cratePosition[0]][cratePosition[1]] = ".";
    }
  });

  return res;
}
