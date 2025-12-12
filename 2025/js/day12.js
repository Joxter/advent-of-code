import { ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/12

runDay(2025, 12)
  //
  .part(1, part1)
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
