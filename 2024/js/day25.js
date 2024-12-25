import { makeGrid, rotateGrid90, runDay, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/25

runDay(2024, 25, 100)
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
  let locks = new Int32Array(250);
  let ll = 0;
  let keys = new Int32Array(250);
  let kk = 0;

  let i = 6;
  while (i < inp.length) {
    let res = 0;
    let to = i + 30;
    for (let k = i; k < to; k++) {
      res = res << 1;
      if (inp[k] === "#") res |= 1;
    }

    if (inp[i - 2] === "#") {
      locks[ll] = res;
      ll++;
    } else {
      keys[kk] = res;
      kk++;
    }

    i += 43;
  }

  let res = 0;
  for (let i = 0; i < 250; i++) {
    for (let j = 0; j < 250; j++) {
      if ((locks[i] & keys[j]) === 0) res++;
    }
  }
  return res;
}
