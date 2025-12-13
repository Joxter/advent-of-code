import { ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2015/day/2

runDay(2015, 2)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  return sum(
    inp.split("\n").map((r) => {
      let [l, w, h] = ints(r);

      let parts = [l * w, w * h, h * l];
      let extra = Math.min(...parts);

      return sum(parts) * 2 + extra;
    }),
  );
}

function part2(inp) {
  return sum(
    inp.split("\n").map((r) => {
      let [l, w, h] = ints(r);

      let perim = 2 * (l + w + h - Math.max(l, w, h));
      let bow = l * w * h;

      return perim + bow;
    }),
  );
}
