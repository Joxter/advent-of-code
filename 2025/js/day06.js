import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/6

// console.log(
//   part1(`123 328  51 64
//  45 64  387 23
//   6 98  215 314
// *   +   *   +`),
//   [4277556],
// );

runDay(2025, 6)
  //
  .part(1, part1) // 6661595817617 hi
  // .part(2, part2)
  .end();

function part1(inp) {
  // console.log(inp);
  let [a, b, c, d, acts] = inp.split("\n").map((l) => l.trim().split(/\s+/));
  // console.log(a);
  // console.log(b);
  // console.log(c);
  // console.log(d);
  // console.log(acts);

  return sum(
    acts.map((act, i) => {
      // console.log(act, [+a[i], +b[i], +c[i]]);
      if (act === "+") {
        return +a[i] + +b[i] + +c[i] + +d[i];
      } else {
        return +a[i] * +b[i] * +c[i] * +d[i];
      }
    }),
  );
}

function part2(inp) {
  return 123;
}
