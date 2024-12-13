import { ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/13

runDay(2024, 13, 1)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let machines = inp
    .trim()
    .split("\n\n")
    .map((rawM) => {
      let [rawA, rawB, res] = rawM.split("\n");
      return { a: ints(rawA), b: ints(rawB), fin: ints(res) };
    });

  return sum(
    machines.map(({ a, b, fin }) => {
      for (let i = 1; i <= 100; i++) {
        for (let j = 1; j <= 100; j++) {
          if (
            i * a[0] + j * b[0] === fin[0] &&
            i * a[1] + j * b[1] === fin[1]
          ) {
            return i * 3 + j;
          }
        }
      }

      return 0;
    }),
  );
}

function part2(inp) {
  let machines = inp
    .trim()
    .split("\n\n")
    .map((rawM) => {
      let [rawA, rawB, res] = rawM.split("\n");
      return {
        a: ints(rawA),
        b: ints(rawB),
        fin: ints(res).map((it) => it + 10000000000000),
      };
    });

  return sum(
    machines.map(({ a, b, fin }) => {
      let A = (fin[0] * b[1] - fin[1] * b[0]) / (a[0] * b[1] - a[1] * b[0]);

      if (Number.isInteger(A)) {
        let B = (fin[0] - a[0] * A) / b[0];
        return A * 3 + B;
      }

      return 0;
    }),
  );
}
