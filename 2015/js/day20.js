import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/20

runDay(2015, 20)
  //
  .part(1, part1)
  .part(2, part2)
  .part(1, part1reddit, 'reddit')
  .part(2, part2reddit, 'reddit')
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

function part1reddit(input) {
  const presents = [];

  for (let e = 1; e < input / 10; e++) {
    for (let i = e; i < input / 10; i = i + e) {
      if (!presents[i]) presents[i] = 10;
      presents[i] = presents[i] + e * 10;
    }
  }

  return presents.reduce(
    (min, current, index) =>
      min === 0 && current >= input ? (min = index) : min,
    0,
  );
}

function part2reddit(input) {
  const presents2 = [];

  for (let e = 1; e < input / 10; e++) {
    let visits = 0;
    for (let i = e; i < input / 10; i = i + e) {
      if (visits < 50) {
        if (!presents2[i]) presents2[i] = 11;
        presents2[i] = presents2[i] + e * 11;
        visits = visits + 1;
      }
    }
  }

  return presents2.reduce(
    (min, current, index) =>
      min === 0 && current >= input ? (min = index) : min,
    0,
  );
}
