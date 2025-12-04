import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/3

runDay(2025, 3, 1)
  //
  .part(1, part1)
  .part(2, part2)
  .part(2, part2stack, "stack")
  .end();

function part1(inp) {
  let banks = inp.split("\n").map((b) => b.split("").map((j) => +j));

  function findMax(bank, from, to) {
    let index = -1;
    let max = 0;
    for (let i = from; i < to; i++) {
      if (bank[i] > max) {
        max = bank[i];
        index = i;
      }
    }

    return [index, max];
  }

  return sum(
    banks.map((bank) => {
      let [ai, a] = findMax(bank, 0, bank.length - 1);

      return a * 10 + findMax(bank, ai + 1, bank.length)[1];
    }),
  );
}

function part2(inp) {
  let banks = inp.split("\n").map((b) => b.split("").map((j) => +j));

  function findMax(bank, from, to) {
    let index = from;
    let max = bank[index];
    for (let i = from + 1; i < to; i++) {
      if (bank[i] > max) {
        max = bank[i];
        index = i;
      }
    }

    return [index, max];
  }

  return sum(
    banks.map((bank) => {
      let joltage = 0;
      let from = 0;
      let to = bank.length - 12;

      for (let i = 1; i <= 12; i++) {
        let [ai, a] = findMax(bank, from, to + i);
        from = ai + 1;
        joltage = joltage * 10 + a;
      }

      return joltage;
    }),
  );
}

function part2stack(inp) {
  let banks = inp.split("\n").map((b) => b.split("").map((j) => +j));

  return sum(
    banks.map((bank) => {
      return calcJoltage(bank);
    }),
  );

  function calcJoltage(digits) {
    let k = digits.length - 12;
    const stack = [];

    for (const d of digits) {
      while (stack.length > 0 && stack[stack.length - 1] < d && k > 0) {
        stack.pop();
        k--;
      }
      stack.push(d);
    }

    let n = 0;
    for (let i = 0; i < 12; i++) {
      n = n * 10 + stack[i]
    }
    return n;
  }
}
