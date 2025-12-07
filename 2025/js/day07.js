import { findInGrid, makeGrid, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/7

runDay(2025, 7)
  //
  .part(1, part1)
  .part(2, part2)
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
  }

  return split;
}

function part2(inp) {
  let grid = makeGrid(inp);
  let [row, b] = findInGrid(grid, "S");
  let beams = { [b]: 1 };

  for (let row = 1; row < grid.length; row++) {
    let newBeams = {};

    for (let i = 0; i < grid[row].length; i++) {
      if (grid[row][i] === "^" && beams[i]) {
        newBeams[i - 1] = (newBeams[i - 1] || 0) + beams[i];
        newBeams[i + 1] = (newBeams[i + 1] || 0) + beams[i];
      } else if (grid[row][i] === "." && beams[i]) {
        newBeams[i] = (newBeams[i] || 0) + beams[i];
      }
    }

    if (Object.keys(newBeams).length > 0) {
      beams = newBeams;
    }
  }

  return sum(Object.values(beams));
}
