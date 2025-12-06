import { ints, prod, rotateGrid90, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/6

runDay(2025, 6)
  //
  // .part(1, part1)
  .part(2, part2) // 12377436852367 low
  //                 12377473011151
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
      return row.padEnd(Math.max(...all.map((x) => x.length)), " ");
    }),
  )
    .map((r) => (r[0] + " " + r.slice(1).reverse().join("")).trim())
    .join("\n");
  // console.log(grid.slice(-20));
  // console.log(grid);

  return sum(
    grid.split("\n\n").map((eq) => {
      const [act, ...nums] = eq.split(/\s+/);

      if (act === "+") {
        return sum(nums.map((n) => +n));
      } else {
        return prod(nums.map((n) => +n));
      }
    }),
  );

  let aaa = [];

  let act = grid[0][0];
  let nums = [];

  grid.forEach((row) => {
    act = row[0] === "*" ? "*" : row[0] === "+" ? "+" : act;

    let n = +row.slice(1).join("").trim();
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
