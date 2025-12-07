import { findInGrid, makeGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/7

console.log(
  part1(
    `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`.trim(),
  ),
);

runDay(2025, 7)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGrid(inp);
  let [row, b] = findInGrid(grid, "S");
  let beams = [b];
  let split = 0;

  for (let row = 1; row < grid.length; row++) {
    let newBeams = [];

    for (let i = 0; i < grid[row].length; i++) {
      if (grid[row][i] === "^" && beams.includes(i)) {
        newBeams.push(i - 1, i + 1);
        split++;
      } else if (grid[row][i] === "." && beams.includes(i)) {
        newBeams.push(i);
      }
    }

    if (newBeams.length > 0) {
      beams = newBeams;
    }

    // console.log(
    //   grid[row].map((c, i) => (beams.includes(i) ? "|" : c)).join(""),
    // );
  }

  return split;
}

function part2(inp) {
  return 123;
}
