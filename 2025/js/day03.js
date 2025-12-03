import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/3

runDay(2025, 3, 1)
  //
  .part(1, part1)
  .part(2, part2)
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
