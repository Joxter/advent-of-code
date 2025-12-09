import { ints, runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/9

console.log(
  part1(`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`),
);

runDay(2025, 9)
  //
  .part(1, part1)
  // .part(2, part2)
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
  return 123;
}
