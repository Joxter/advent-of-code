import { runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/5

console.log(
  part1(`3-5
10-14
16-20
12-18

1
5
8
11
17
32`),
);

runDay(2025, 5)
  //
  .part(1, part1)
  // .part(2, part2)
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
  return 123;
}
