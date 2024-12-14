import { ints, printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/14

runDay(2024, 14)
  //
  .part(1, part1)
  .part(1, part1opt, "optimal")
  // .part(2, part2)
  .end();

function part1(inp) {
  let robots = inp.split("\n").map((line) => {
    let [a, b, c, d] = ints(line);
    return { pos: [a, b], v: [c, d] };
  });

  let map = [101, 103];

  for (let i = 1; i <= 100; i++) {
    robots.forEach(({ pos, v }, i) => {
      robots[i].pos = [
        (map[0] + pos[0] + v[0]) % map[0],
        (map[1] + pos[1] + v[1]) % map[1],
      ];
    });
  }

  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  let ii = Math.floor(map[0] / 2);
  let jj = Math.ceil(map[1] / 2) - 1;

  robots.forEach(({ pos }) => {
    let [i, j] = pos;
    if (i < ii && j < jj) {
      q1 += 1;
    } else if (i > ii && j < jj) {
      q2 += 1;
    } else if (i > ii && j > jj) {
      q4 += 1;
    } else if (i < ii && j > jj) {
      q3 += 1;
    }
  });

  return q1 * q2 * q3 * q4;
}

function part2(inp) {
  let robots = inp.split("\n").map((line) => {
    let [a, b, c, d] = ints(line);
    return { pos: [a, b], v: [c, d] };
  });

  let map = [101, 103];

  for (let i = 1; i <= 10_503; i++) {
    robots.forEach(({ pos, v }, i) => {
      robots[i].pos = [
        (map[0] + pos[0] + v[0]) % map[0],
        (map[1] + pos[1] + v[1]) % map[1],
      ];
    });

    let a = maxCnt(robots);
    if (a === 1) {
      return i;
    }
  }

  function maxCnt(robots) {
    let max = {};
    robots.forEach(({ pos }) => {
      if (!max[pos]) max[pos] = 0;
      max[pos]++;
    });

    return Math.max(...Object.values(max));
  }

  function rect(robots) {
    let a = [0, 0];
    let b = [...map];
    robots.forEach(({ pos }) => {
      a[0] = Math.max(a[0], pos[0]);
      a[1] = Math.max(a[1], pos[1]);
      b[0] = Math.min(b[0], pos[0]);
      b[1] = Math.min(b[1], pos[1]);
    });
    return [a[0] - b[0], a[1] - b[1]];
  }
}

function printMap(robots, map) {
  let res = Array(map[1])
    .fill(0)
    .map(() => Array(map[0]).fill("0"));

  robots.forEach(({ pos }) => {
    res[pos[1]][pos[0]]++;
  });

  return printGrid(res);
}

function part1opt(inp) {
  let map = [101, 103];
  let steps = 100;

  let ii = Math.floor(map[0] / 2);
  let jj = Math.ceil(map[1] / 2) - 1;

  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  inp.split("\n").forEach((line) => {
    let [px, py, vx, vy] = ints(line);

    let i = (map[0] * steps + px + vx * steps) % map[0];
    let j = (map[1] * steps + py + vy * steps) % map[1];

    if (i < ii) {
      if (j < jj) q1++;
      if (j > jj) q4++;
    }
    if (i > ii) {
      if (j < jj) q2++;
      if (j > jj) q3++;
    }
  });

  return q1 * q2 * q3 * q4;
}
