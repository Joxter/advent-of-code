import { prod, rotateGrid90, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/6

console.log(
  part2(`123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +`),
  [3263827],
);

runDay(2025, 6)
  //
  // .part(1, part1)
  // .part(2, part2) // 12377436852367 low
  .end();

function part1(inp) {
  let [a, b, c, d, acts] = inp.split("\n").map((l) => l.trim().split(/\s+/));

  return sum(
    acts.map((act, i) => {
      if (act === "+") {
        return +a[i] + +b[i] + +c[i] + +d[i];
      } else {
        return +a[i] * +b[i] * +c[i] * +d[i];
      }
    }),
  );
}

function part2(inp) {
  let grid = rotateGrid90(
    inp.split("\n").map((row, i, all) => {
      // console.log(row.length);
      return row.padEnd(3724, " ");
    }),
  );
  // console.log(grid.slice(-20));

  let aaa = [];

  let act = grid[0][0];
  let nums = [];

  grid.forEach((row) => {
    act = row[0] === "*" ? "*" : row[0] === "+" ? "+" : act;

    let n = +row.slice(1).reverse().join("").trim();
    // console.log(act, n);

    if (n === 0) {
      if (act === "+") {
        aaa.push(sum(nums));
      } else {
        aaa.push(prod(nums));
      }
      nums = [];
    } else {
      nums.push(n);
    }
  });

  return sum(aaa);
}
