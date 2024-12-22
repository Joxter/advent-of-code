import { ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/22

// console.log(part1(`123`));
console.log(
  part1(`1
10
100
2024`),
);

runDay(2024, 22)
  //
  .part(1, part1)
  // .part(2, part2)
  .end(true);

function part1(inp) {
  let buyers = ints(inp);
  // console.log(buyers);
  return sum(
    buyers.map((n) => {
      let next = n;
      for (let i = 0; i < 2000; i++) {
        next = (((next * 64) ^ next) % 16777216 + 16777216) % 16777216;
        next = ((Math.floor(next / 32) ^ next) % 16777216+ 16777216) % 16777216;
        next = (((next * 2048) ^ next) % 16777216+ 16777216) % 16777216;
      }

      return next
    }),
  );
}

function part2(inp) {
  return 123;
}
