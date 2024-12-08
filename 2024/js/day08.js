import { makeGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/8

console.log(
  part2(`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`),
);

runDay(2024, 8)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGrid(inp.trim());

  let antenas = {};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== ".") {
        let ant = grid[i][j];
        if (!antenas[ant]) antenas[ant] = [];
        antenas[ant].push([i, j]);
      }
    }
  }

  let antipodes = {};

  Object.entries(antenas).forEach(([name, coords]) => {
    for (let i = 0; i < coords.length - 1; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        let a = coords[i];
        let b = coords[j];

        let delta = [b[0] - a[0], b[1] - a[1]]; // a + delta -> b

        if (grid[a[0] - delta[0]]?.[a[1] - delta[1]]) {
          antipodes[`${a[0] - delta[0]},${a[1] - delta[1]}`] = "#";
        }
        if (grid[b[0] + delta[0]]?.[b[1] + delta[1]]) {
          antipodes[`${b[0] + delta[0]},${b[1] + delta[1]}`] = "#";
        }
      }
    }
  });

  return Object.keys(antipodes).length;
}

function part2(inp) {
  let grid = makeGrid(inp.trim());

  let antenas = {};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== ".") {
        let ant = grid[i][j];
        if (!antenas[ant]) antenas[ant] = [];
        antenas[ant].push([i, j]);
      }
    }
  }

  let antipodes = {};

  Object.entries(antenas).forEach(([name, coords]) => {
    for (let i = 0; i < coords.length - 1; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        let a = coords[i];
        let b = coords[j];
        // console.log(a);

        let delta = [b[0] - a[0], b[1] - a[1]]; // a + delta -> b

        let aa = [a[0] - delta[0], a[1] - delta[1]];
        while (grid[aa[0]]?.[aa[1]]) {
          antipodes[`${a[0] - delta[0]},${a[1] - delta[1]}`] = "#";
          aa = [aa[0] - delta[0], aa[1] - delta[1]];
        }

        let bb = [b[0] + delta[0], b[1] + delta[1]];
        while (grid[bb[0]]?.[bb[1]]) {
          antipodes[`${b[0] + delta[0]},${b[1] + delta[1]}`] = "#";
          bb = [bb[0] + delta[0], bb[1] + delta[1]];
        }
      }
    }
  });

  return Object.keys(antipodes).length;
}
