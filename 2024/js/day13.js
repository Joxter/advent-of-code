import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/13

console.log(
  part2(`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`),
  [480],
);

runDay(2024, 13)
  //
  // .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let machines = inp
    .trim()
    .split("\n\n")
    .map((rawM) => {
      let [rawA, rawB, res] = rawM.split("\n");

      return {
        a: [...rawA.matchAll(/(\d+)/g)].map((it) => +it[0]),
        b: [...rawB.matchAll(/(\d+)/g)].map((it) => +it[0]),
        fin: [...res.matchAll(/(\d+)/g)].map((it) => +it[0]),
      };
    });

  return sum(
    machines.map(({ a, b, fin }, i) => {
      let tokens = Infinity;
      console.log(i);

      for (let i = 1; i <= 100; i++) {
        for (let j = 1; j <= 100; j++) {
          if (
            i * a[0] + j * b[0] === fin[0] &&
            i * a[1] + j * b[1] === fin[1]
          ) {
            tokens = Math.min(tokens, i * 3 + j);
          }
        }
      }

      if (tokens === Infinity) {
        return 0;
      }
      return tokens;
    }),
  );
}

function part2(inp) {
}
