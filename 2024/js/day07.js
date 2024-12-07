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
        let [_total, _nums] = line.split(": ");

        let total = +_total;
        let nums = _nums.split(" ").map(Number);

        let res = {};
        trySum(total, nums, 1, nums[0], res);

        return res.ok ? total : 0;
      }),
  );
}

function trySum(total, nums, i, sum, ref) {
  if (ref.ok || sum > total) return;
  if (i === nums.length) {
    if (sum === total) {
      ref.ok = true;
    }
    return;
  }
  let n = nums[i];

  trySum(total, nums, i + 1, n + sum, ref);
  trySum(total, nums, i + 1, n * sum, ref);
}

function part2(inp) {
  return sum(
    inp
      .trim()
      .split("\n")
      .map((line) => {
        let [_total, _nums] = line.split(": ");

        let total = +_total;
        let nums = _nums.split(" ").map(Number);

        let res = {};
        trySum2(total, nums, 1, nums[0], res);

        return res.ok ? total : 0;
      }),
  );
}

function trySum2(total, nums, i, sum, ref) {
  if (ref.ok || sum > total) return;
  if (i === nums.length) {
    if (sum === total) {
      ref.ok = true;
    }
    return;
  }
  let n = nums[i];

  trySum2(total, nums, i + 1, n + sum, ref);
  trySum2(total, nums, i + 1, n * sum, ref);
  trySum2(total, nums, i + 1, +`${sum}${n}`, ref);
}
