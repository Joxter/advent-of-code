import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/2

runDay(2025, 2)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let ids = [];

  inp.split(",").forEach((range) => {
    let [from, to] = range.split("-").map((n) => +n);

    for (let i = from; i <= to; i++) {
      let str = String(i);
      let l = str.slice(0, str.length / 2);
      let r = str.slice(str.length / 2);
      if (l === r) {
        ids.push(i);
      }
    }
  });

  return sum(ids);
}

function part2(inp) {
  let ids = [];

  inp.split(",").forEach((range) => {
    let [from, to] = range.split("-").map((n) => +n);

    for (let i = from; i <= to; i++) {
      let str = String(i);

      for (let n = 1; n <= str.length / 2; n++) {
        if (
          str.length % n === 0 &&
          str.slice(0, n).repeat(str.length / n) === str
        ) {
          ids.push(i);
          break;
        }
      }
    }
  });

  return sum(ids);
}
