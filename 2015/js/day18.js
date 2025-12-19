import { allNeibs8, makeGridWithBorder, runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/18

runDay(2015, 18)
  //
  .part(1, part1)
  .part(1, part1twoGrids, "two grids")
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, ".");

  for (let step = 0; step < 100; step++) {
    let nextGrid = Array(grid.length)
      .fill(0)
      .map(() => Array(grid.length).fill("."));

    for (let i = 1; i < grid.length - 1; i++) {
      for (let j = 1; j < grid[i].length - 1; j++) {
        let cnt = allNeibs8(i, j)
          //
          .filter(([ii, jj]) => grid[ii][jj] === "#").length;

        nextGrid[i][j] =
          cnt === 3 || (cnt === 2 && grid[i][j] === "#") ? "#" : ".";
      }
    }
    grid = nextGrid;
  }

  return grid.flat().filter((c) => c === "#").length;
}

function part1twoGrids(inp) {
  let grid1 = makeGridWithBorder(inp, ".");
  let grid2 = Array(grid1.length)
    .fill(0)
    .map(() => Array(grid1.length).fill("."));

  for (let step = 0; step < 100; step++) {
    let current = step % 2 === 0 ? grid1 : grid2;
    let next = step % 2 === 0 ? grid2 : grid1;

    for (let i = 1; i < grid1.length - 1; i++) {
      for (let j = 1; j < grid1[i].length - 1; j++) {
        let cnt = allNeibs8(i, j)
          //
          .filter(([ii, jj]) => current[ii][jj] === "#").length;

        next[i][j] =
          cnt === 3 || (cnt === 2 && current[i][j] === "#") ? "#" : ".";
      }
    }
    current = next;
  }

  return (100 % 2 === 0 ? grid1 : grid2).flat().filter((c) => c === "#").length;
}

function part2(inp) {
  let grid = makeGridWithBorder(inp, ".");

  for (let step = 0; step < 100; step++) {
    let nextGrid = Array(grid.length)
      .fill(0)
      .map(() => Array(grid.length).fill("."));

    for (let i = 1; i < grid.length - 1; i++) {
      for (let j = 1; j < grid[i].length - 1; j++) {
        let cnt = allNeibs8(i, j)
          //
          .filter(([ii, jj]) => grid[ii][jj] === "#").length;

        nextGrid[i][j] =
          cnt === 3 || (cnt === 2 && grid[i][j] === "#") ? "#" : ".";
      }
    }

    nextGrid[1][1] = "#";
    nextGrid[1][nextGrid.length - 2] = "#";
    nextGrid[nextGrid.length - 2][1] = "#";
    nextGrid[nextGrid.length - 2][nextGrid.length - 2] = "#";

    grid = nextGrid;
  }

  return grid.flat().filter((c) => c === "#").length;
}
