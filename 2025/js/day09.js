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
  let max = 0;
  let reds = inp.split("\n").map((l) => ints(l));

  let ghost = [
    [10000, 50058],
    [20000, 50058],
    [30000, 50058],
    [40000, 50058],
    [50000, 50058],
    [60000, 50058],
    [70000, 50058],
    [80000, 50058],
  ];

  for (let i = 0; i < reds.length - 1; i++) {
    loop1: for (let j = i + 1; j < reds.length; j++) {
      let a = reds[i];
      let b = reds[j];
      let verMin = Math.min(a[0], b[0]) + 1;
      let verMax = Math.max(a[0], b[0]) - 1;
      let horMin = Math.min(a[1], b[1]) + 1;
      let horMax = Math.max(a[1], b[1]) - 1;

      if (verMin > verMax || horMin > horMax) continue;

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
