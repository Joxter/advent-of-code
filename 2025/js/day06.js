import { ints, prod, rotateGrid90, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/6

runDay(2025, 6)
  //
  .part(1, part1)
  .part(2, part2)
  .part(2, part2original, "original")
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
      return row.padEnd(Math.max(...all.map((x) => x.length)), " ");
    }),
  )
    .map((r) => (r[0] + " " + r.slice(1).reverse().join("")).trim())
    .join("\n");

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
}

function part2original(inp) {
  let grid = rotateGrid90(
    inp.split("\n").map((row, i, all) => {
      return row.padEnd(Math.max(...all.map((x) => x.length)), " ");
    }),
  );

  let nums = [];
  let act = grid[0][0];
  let acc = [];
  grid.push([""]);

  grid.forEach((row) => {
    act = row[0] === "*" ? "*" : row[0] === "+" ? "+" : act;

    let n = +row.slice(1).reverse().join("").trim();

    if (n === 0) {
      if (act === "+") {
        nums.push(sum(acc));
      } else {
        nums.push(prod(acc));
      }
      acc = [];
    } else {
      acc.push(n);
    }
  });

  return sum(nums);
}
