import { printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/18

runDay(2024, 18)
  //
  // .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let size = 6;
  let bytes = 12;
  // let size = 70;
  // let bytes = 1024;

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
  console.log(printGrid(grid));

  let q = [[[0, 0], 0]];

  while (q.length > 0) {
    let [[x, y], len] = q.shift();
    // if (x < 0 || x >= size || y < 0 || y >= size || grid[y][x] !== "#") {
    //   continue;
    // }

    if (grid[y]?.[x] === ".") {
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
  // let size = 6;
  // let bytes = 12 + 100;
  let size = 70;
  let bytes = 1024222;

  let rawBytes = inp.trim().split("\n");

  for (let b = 1; b < rawBytes.length; b++) {
    let grid = Array(size + 1)
      .fill(".")
      .map(() => {
        return Array(size + 1).fill(".");
      });

    inp
      .trim()
      .split("\n")
      .slice(0, b)
      .forEach((line, i) => {
        // if (b > i) return;
        let [x, y] = line.split(",");
        grid[+y][+x] = "#";
      });

    // console.log(rawBytes[skip]);
    // console.log(printGrid(grid));
    // return;

    /*
2936 18,62 500 --- Correct!
2937 40,58 . ()
    */
    // console.log(b, rawBytes[b], find(grid));
    if (typeof find(grid) !== "number") {
      return rawBytes[b];
    }
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

    return grid[size][size];
  }

  return "none";
}
