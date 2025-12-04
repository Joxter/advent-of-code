import { allNeibs8, makeGridWithBorder, runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/4

console.log(
  part1(`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`),
);

runDay(2025, 4)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, ".");
  let cnt = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "@") {
        let neibs = allNeibs8(i, j).map(([a, b]) => grid[a][b]);

        if (neibs.filter((c) => c === "@").length < 4) {
          cnt++;
        }
      }
    }
  }
  return cnt;
}

function part2(inp) {
  return 123;
}
