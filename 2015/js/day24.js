import { runDay, ints, sum, prod } from "../../utils.js";

// https://adventofcode.com/2015/day/24

runDay(2015, 24)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let weights = ints(inp).toReversed();
  return calc(weights, sum(weights) / 3);
}

function part2(inp) {
  let weights = ints(inp).toReversed();
  return calc(weights, sum(weights) / 4);
}

function calc(weights, target) {
  let combinations = [];
  let minSize = 100;

  go([0], weights[0]);

  function go(ids, s) {
    if (ids.length > minSize) return;
    if (s === target) {
      if (ids.length < minSize) {
        minSize = ids.length;
        combinations = [];
      }
      combinations.push(ids);
    } else if (s < target) {
      let last = ids.at(-1);
      for (let i = last + 1; i < weights.length; i++) {
        go([...ids, i], s + weights[i]);
      }
    }
  }

  return Math.min(
    ...combinations.map((c) => {
      return prod(c.map((i) => weights[i]));
    }),
  );
}
