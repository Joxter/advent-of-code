import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/5

runDay(2025, 5)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let [ranges, ids] = inp.split("\n\n");
  ranges = ranges.split("\n").map((l) => {
    return l.split("-").map((n) => +n);
  });

  return ids.split("\n").filter((id) => {
    return ranges.some(([from, to]) => id >= from && id <= to);
  }).length;
}

function part2(inp) {
  let ranges = inp
    .split("\n\n")[0]
    .split("\n")
    .map((l) => {
      return l.split("-").map((n) => +n);
    })
    .toSorted((a, b) => {
      return a[0] - b[0];
    });

  let from = ranges[0][0];
  let to = ranges[0][1];
  let total = 0;

  let limit = 1000;
  ranges.shift();

  while (limit-- > 0 && ranges.length) {
    let range = ranges.shift();

    if (range[0] > to) {
      total += to - from + 1;
      from = range[0];
      to = range[1];
    } else {
      to = Math.max(range[1], to);
    }
  }
  total += to - from + 1;

  return total;
}
