import { findInGrid, makeGrid, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/7

runDay(2025, 7, 1)
  //
  .part(1, part1)
  .part(2, part2)
  .part(2, part2array, "array")
  .end();

function part1(inp) {
  let grid = makeGrid(inp);
  let b = grid[0].indexOf("S");
  let beams = [b];
  let split = 0;

  grid.forEach((row) => {
    let newBeams = [];

    for (let i = 0; i < row.length; i++) {
      if (beams.includes(i)) {
        if (row[i] === "^") {
          newBeams.push(i - 1, i + 1);
          split++;
        } else {
          newBeams.push(i);
        }
      }
    }

    beams = newBeams;
  });

  return split;
}

function part2(inp) {
  let grid = makeGrid(inp);
  let b = grid[0].indexOf("S");
  let beams = { [b]: 1 };

  grid.forEach((row) => {
    let newBeams = {};

    for (let i = 0; i < row.length; i++) {
      if (beams[i]) {
        if (row[i] === "^") {
          newBeams[i - 1] = (newBeams[i - 1] || 0) + beams[i];
          newBeams[i + 1] = (newBeams[i + 1] || 0) + beams[i];
        } else {
          newBeams[i] = (newBeams[i] || 0) + beams[i];
        }
      }
    }

    beams = newBeams;
  });

  return sum(Object.values(beams));
}

function part2array(inp) {
  let grid = makeGrid(inp);
  let b = grid[0].indexOf("S");
  let beams = Array(grid[0].length).fill(0);
  beams[b] = 1;

  grid.forEach((row) => {
    let newBeams = Array(row.length).fill(0);

    for (let i = 0; i < row.length; i++) {
      if (beams[i]) {
        if (row[i] === "^") {
          newBeams[i - 1] += beams[i];
          newBeams[i + 1] += beams[i];
        } else {
          newBeams[i] += beams[i];
        }
      }
    }

    beams = newBeams;
  });

  return sum(beams);
}
