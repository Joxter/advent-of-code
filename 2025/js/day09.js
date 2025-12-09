import { ints, runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/9

runDay(2025, 9)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let max = 0;
  let reds = inp.split("\n").map((l) => ints(l));

  for (let i = 0; i < reds.length - 1; i++) {
    for (let j = i + 1; j < reds.length; j++) {
      let s = (reds[i][0] - reds[j][0] + 1) * (reds[i][1] - reds[j][1] + 1);
      max = Math.max(max, s);
    }
  }

  return max;
}

function part2(inp) {
  // not a general solution, but should for work all inputs
  let max = 0;
  let reds = inp.split("\n").map((l) => ints(l));
  const maxCoord1 = Math.max(...reds.map((r) => r[0]));
  const maxCoord = Math.max(maxCoord1, ...reds.map((r) => r[1]));

  let rootDots = [];
  let ghost = [];

  reds.forEach((red, i, all) => {
    let prev = all[i - 1] || all.at(-1);
    if (prev) {
      let len = Math.abs(red[0] - prev[0]);
      if (len > maxCoord >> 1) {
        ghost.push([(prev[0] + red[0]) >> 1, (prev[1] + red[1]) >> 1]);
        rootDots.push(prev, red);
      }
    }
  });

  for (let i = 0; i < rootDots.length; i++) {
    loop1: for (let j = 0; j < reds.length; j++) {
      let a = rootDots[i];
      let b = reds[j];
      let verMin = Math.min(a[0], b[0]) + 1;
      let verMax = Math.max(a[0], b[0]) - 1;
      let horMin = Math.min(a[1], b[1]) + 1;
      let horMax = Math.max(a[1], b[1]) - 1;

      for (let k = 0; k < reds.length; k++) {
        if (
          reds[k][0] >= verMin &&
          reds[k][0] <= verMax &&
          reds[k][1] >= horMin &&
          reds[k][1] <= horMax
        ) {
          continue loop1;
        }
      }
      for (let k = 0; k < ghost.length; k++) {
        if (
          ghost[k][0] >= verMin &&
          ghost[k][0] <= verMax &&
          ghost[k][1] >= horMin &&
          ghost[k][1] <= horMax
        ) {
          continue loop1;
        }
      }

      let s = (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
      if (s > max) max = s;
    }
  }

  return max;
}
