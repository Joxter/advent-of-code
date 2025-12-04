import { allNeibs8, makeGridWithBorder, runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/4

runDay(2025, 4)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, ".");
  let cnt = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "@") {
        let neibs = allNeibs8(i, j).filter(([a, b]) => grid[a][b] === "@");

        if (neibs.length < 4) {
          cnt++;
        }
      }
    }
  }

  return cnt;
}

function part2(inp) {
  let grid = makeGridWithBorder(inp, ".");

  function go() {
    let toRemove = [];

    for (let i = 1; i < grid.length - 1; i++) {
      for (let j = 1; j < grid[i].length - 1; j++) {
        if (grid[i][j] === "@") {
          let neibs = allNeibs8(i, j).filter(([a, b]) => grid[a][b] === "@");

          if (neibs.length < 4) {
            toRemove.push([i, j]);
          }
        }
      }
    }

    toRemove.forEach(([i, j]) => {
      grid[i][j] = ".";
    });

    return toRemove.length;
  }

  let total = 0;

  while (true) {
    let cnt = go();
    if (cnt) {
      total += cnt;
    } else {
      break;
    }
  }

  return total;
}
