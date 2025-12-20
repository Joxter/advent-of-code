import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/20

runDay(2015, 20)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let target = +inp;

  let i = 0;
  let max = 0;
  let prevMaxI = 0;
  let step = 2;
  while (i < 1_000_000) {
    i += step;
    let cnt = i * 10;

    for (let j = 1; j <= i * 0.5; j++) {
      if (i % j === 0) {
        cnt += j * 10;
      }
    }

    if (cnt > max) {
      prevMaxI = i;
      max = cnt;
    }
    if (cnt > target) return i;
  }
}

function part2(inp) {
  let target = +inp;

  let i = 819000;
  let max = 0;
  let prevMaxI = 0;
  let step = 2;
  while (i < 1_000_000) {
    i += step;
    let cnt = i * 11;

    for (let j = 1; j <= i * 0.5; j++) {
      if (i % j === 0 && i / j <= 50) {
        cnt += j * 11;
      }
    }

    if (cnt > max) {
      prevMaxI = i;
      max = cnt;
    }
    if (cnt > target) return i;
  }
}
