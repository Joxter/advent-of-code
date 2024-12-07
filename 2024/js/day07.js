import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/7

runDay(2024, 7, 100)
  .part(1, part1) // 0.340 (100 iters)
  .part(1, part1rev, "rev") // 0.076 (100 iters)
  .part(2, part2) // 22.557 (100 iters)
  .part(2, part2rev, "rev") // 0.108 (100 iters)
  .end();

function part1(inp) {
  return parseAndRun(inp, trySum);
}

function part2(inp) {
  return parseAndRun(inp, trySum2);
}

function part1rev(inp) {
  return parseAndRun(inp, trySumReverse);
}

function part2rev(inp) {
  return parseAndRun(inp, trySum2reverse);
}

function trySum(total, nums) {
  let ok = false;
  go(total, nums, 1, nums[0]);
  return ok;

  function go(total, nums, i, sum) {
    if (ok || sum > total) return;
    if (i === nums.length) {
      if (sum === total) ok = true;
      return;
    }
    let n = nums[i];

    go(total, nums, i + 1, n + sum);
    go(total, nums, i + 1, n * sum);
  }
}

function trySum2(total, nums) {
  let ok = false;
  go(total, nums, 1, nums[0]);
  return ok;

  function go(total, nums, i, sum) {
    if (sum > total || ok) return;
    if (i === nums.length) {
      if (sum === total) ok = true;
      return;
    }
    let n = nums[i];

    go(total, nums, i + 1, n + sum);
    go(total, nums, i + 1, n * sum);
    go(total, nums, i + 1, +`${sum}${n}`);
  }
}

function trySumReverse(total, nums) {
  let ok = false;
  go(total, nums, nums.length - 1);
  return ok;

  function go(total, nums, i) {
    if (ok) return;
    if (total === 0) {
      if (i === -1) ok = true;
      return;
    }
    if (i < 0) return;
    let n = nums[i];

    let a = total / n;
    if (Number.isInteger(a)) {
      go(a, nums, i - 1);
    }
    go(total - n, nums, i - 1);
  }
}

function trySum2reverse(total, nums) {
  let tens = [1, 10, 100, 1000];

  let ok = false;
  go(total, nums, nums.length - 1);
  return ok;

  function go(total, nums, i) {
    if (ok) return;
    if (total === 0) {
      if (i === -1) ok = true;
      return;
    }
    if (i < 0) return;
    let n = nums[i];

    go(total - n, nums, i - 1);

    let a = total / n;
    if (Number.isInteger(a)) {
      go(a, nums, i - 1);
    }

    let b = (total - n) / tens[n >= 100 ? 3 : n >= 10 ? 2 : 1];
    if (Number.isInteger(b)) {
      go(b, nums, i - 1);
    }
  }
}

function parseAndRun(inp, fn) {
  return sum(
    inp
      .trim()
      .split("\n")
      .map((line) => {
        let [_total, _nums] = line.split(": ");

        let total = +_total;
        let nums = _nums.split(" ").map(Number);

        return fn(total, nums) ? total : 0;
      }),
  );
}
