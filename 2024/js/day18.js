import { ints, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/18

runDay(2024, 18)
  //
  .part(1, part1)
  .part(2, part2)
  .part(2, part2better, "better")
  .end();

function part1(inp) {
  let size = 70;
  let bytes = 1024;

  let grid = Array(size + 1)
    .fill(".")
    .map(() => Array(size + 1).fill("."));

  inp
    .trim()
    .split("\n")
    .slice(0, bytes)
    .forEach((line) => {
      let [x, y] = line.split(",");
      grid[+y][+x] = "#";
    });

  let q = [[[0, 0], 0]];

  while (q.length > 0) {
    let [[x, y], len] = q.shift();
    if (grid[y]?.[x] === ".") {
      grid[y][x] = len;
      q.push([[x + 1, y], len + 1]);
      q.push([[x - 1, y], len + 1]);
      q.push([[x, y + 1], len + 1]);
      q.push([[x, y - 1], len + 1]);
    }
  }

  return grid.at(-1).at(-1);
}

function part2(inp) {
  let size = 70;
  let bytes = inp
    .trim()
    .split("\n")
    .map((l) => l.split(","));

  let last = "";
  for (let b = 0; b < bytes.length; b++) {
    let grid = Array(size + 1)
      .fill(".")
      .map(() => Array(size + 1).fill("."));

    bytes.slice(0, b).forEach(([x, y]) => {
      grid[+y][+x] = "#";
    });

    if (find(grid) === ".") {
      return last;
    }
    last = bytes[b];
  }

  function find(grid) {
    let q = [[[0, 0], 0]];

    while (q.length > 0) {
      let [[x, y], len] = q.shift();
      if (grid[y]?.[x] === ".") {
        grid[y][x] = len;
        q.push([[x + 1, y], len + 1]);
        q.push([[x - 1, y], len + 1]);
        q.push([[x, y + 1], len + 1]);
        q.push([[x, y - 1], len + 1]);
      }
    }

    return grid.at(-1).at(-1);
  }

  return "none";
}

function part2better(inp) {
  let size = 70;
  let bytes = inp
    .trim()
    .split("\n")
    .map((l) => ints(l));

  let grid = Array(size + 1)
    .fill(".")
    .map(() => Array(size + 1).fill("."));

  bytes.forEach(([x, y]) => {
    grid[x][y] = "#";
  });

  find(grid, [0, 0]);

  for (let b = bytes.length - 1; b > 0; b--) {
    let [x, y] = bytes[b];
    grid[x][y] = ".";

    if (
      grid[x + 1]?.[y] === "+" ||
      grid[x - 1]?.[y] === "+" ||
      grid[x]?.[y + 1] === "+" ||
      grid[x]?.[y - 1] === "+"
    ) {
      if (find(grid, [+x, +y]) === "+") {
        return bytes[b];
      }
    }
  }

  function find(grid, start) {
    let q = [start];
    while (q.length > 0) {
      let [x, y] = q.shift();
      if (grid[x]?.[y] === ".") {
        grid[x][y] = "+";
        q.push([x + 1, y]);
        q.push([x - 1, y]);
        q.push([x, y + 1]);
        q.push([x, y - 1]);
      }
    }

    return grid.at(-1).at(-1);
  }

  return "none";
}
