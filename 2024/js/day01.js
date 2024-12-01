import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/1

runDay(2024, 1)
  .part(1, part1)
  .part(2, part2);

//   .end();

function part1(inp) {
  let lines = inp.trim().split("\n").map(l => l.split(/\s+/).map(n => +n));

  let l = lines.map(l => l[0]).sort();
  let r = lines.map(l => l[1]).sort();

  return sum(l.map((n, i) => {
    return Math.abs(n - r[i]);
  }));
}

function part2(inp) {
  let lines = inp.trim().split("\n").map(l => l.split(/\s+/).map(n => +n));

  let l = lines.map(l => l[0]);
  let r = lines.map(l => l[1]);

  return sum(l.map((n) => {
    return n * r.filter(it => it === n).length
  }));
}
