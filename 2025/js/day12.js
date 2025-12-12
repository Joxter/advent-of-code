import { ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/12

console.log(
  part1(`0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`),
);

runDay(2025, 12)
  //
  .part(1, part1) // 463 low, 513 high 487??
  // .part(2, part2)
  .end();

function part1(inp) {
  let a = inp.split("\n\n");
  let boxes = a.at(-1);

  return sum(
    boxes.split("\n").map((b) => {
      let [w, h, ...counts] = ints(b);

      let fit =
        w * h >
        sum([
          counts[0] * 9,
          counts[1] * 9,
          counts[2] * 8,
          counts[3] * 9,
          counts[4] * 9,
          counts[5] * 9,
        ]);

      return fit ? 1 : 0;
    }),
  );
}

function part2(inp) {
  return 123;
}
