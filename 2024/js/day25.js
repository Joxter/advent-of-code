import { makeGrid, rotateGrid90, runDay, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/25

runDay(2024, 25)
  //
  .part(1, part1)
  .part(1, part1bitmaps, "bitmaps")
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

  return res;
}

function part1bitmaps(inp) {
  let locks = [];
  let keys = [];

  function schemaToNumber(it) {
    let res = 0;
    let to = it.length - 6;
    for (let i = 6; i < to; i++) {
      res = res << 1;
      if (it[i] === "#") res |= 1;
    }
    return res;
  }

  inp
    .trim()
    .split("\n\n")
    .forEach((it) => {
      if (it[0] === "#") {
        locks.push(schemaToNumber(it));
      } else {
        keys.push(schemaToNumber(it));
      }
    });

  let res = 0;
  for (let i = 0; i < locks.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if ((locks[i] & keys[j]) === 0) res++;
    }
  }
  return res;
}
