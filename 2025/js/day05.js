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
    .map((l) => l.split("-").map((n) => +n))
    .toSorted((a, b) => a[0] - b[0]);

  let [start, end] = ranges.shift();
  let total = 0;

  while (ranges.length > 0) {
    let [from, to] = ranges.shift();

    if (from > end) {
      total += end - start + 1;
      start = from;
      end = to;
    } else {
      end = Math.max(to, end);
    }
  }

  total += end - start + 1;

  return total;
}
