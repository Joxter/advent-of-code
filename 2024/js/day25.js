import { makeGrid, rotateGrid90, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/25


runDay(2024, 25)
  //
  .part(1, part1)
  .end();

function part1(inp) {
  let locks = [];
  let keys = [];

  inp
    .trim()
    .split("\n\n")
    .forEach((it) => {
      let grid = makeGrid(it);
      let isLock = grid[0][0] === "#";

      let schema = rotateGrid90(grid).map(
        (it) => it.filter((c) => c === "#").length - 1,
      );

      if (isLock) {
        locks.push(schema);
      } else {
        keys.push(schema);
      }
    });

  let res = 0;

  locks.forEach((l) => {
    keys.forEach((k) => {
      for (let i = 0; i < 5; i++) {
        if (l[i] + k[i] > 5) {
          return;
        }
      }

      res++;
    });
  });

  return res
}
