import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/7

runDay(2024, 7)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  return sum(
    inp
      .trim()
      .split("\n")
      .map((line) => {
        let [total, nums] = line.split(": ");

        return [+total, nums.split(" ").map(Number)];
      })
      .map(([total, nums]) => {
        let res = {};

        let [a, ...rest] = nums;
        trySum(total, rest, a, res);

        return res.ok ? total : 0;
      }),
  );
}

function trySum(total, nums, sum, ref) {
  if (ref.ok) return;
  if (nums.length === 0) {
    if (sum === total) {
      ref.ok = true;
    }
    return;
  }
  let [n, ...rest] = nums;

  trySum(total, rest, n + sum, ref);
  trySum(total, rest, n * sum, ref);
}

function part2(inp) {
  return sum(
    inp
      .trim()
      .split("\n")
      .map((line) => {
        let [total, nums] = line.split(": ");

        return [+total, nums.split(" ").map(Number)];
      })
      .map(([total, nums]) => {
        let res = {};

        let [a, ...rest] = nums;
        trySum2(total, rest, a, res);

        return res.ok ? total : 0;
      }),
  );
}

function trySum2(total, nums, sum, ref) {
  if (ref.ok) return;
  if (nums.length === 0) {
    if (sum === total) {
      ref.ok = true;
    }
    return;
  }
  let [n, ...rest] = nums;

  trySum2(total, rest, n + sum, ref);
  trySum2(total, rest, n * sum, ref);
  trySum2(total, rest, +`${sum}${n}`, ref);
}
