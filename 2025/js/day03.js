import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/3

console.log(
  part1(`987654321111111
811111111111119
234234234234278
818181911112111`),
);

runDay(2025, 3)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let banks = inp.split("\n").map((b) => b.split("").map((j) => +j));

  function findMax(bank, from, to) {
    let index = -1;
    let max = 0;
    for (let i = from; i < to; i++) {
      let item = bank[i];
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

      return a * 10 + findMax(bank, ai+ 1, bank.length)[1];
    }),
  );
}

function part2(inp) {
  return 123;
}
