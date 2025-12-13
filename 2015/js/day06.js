import { runDay, ints, sum } from "../../utils.js";

// https://adventofcode.com/2015/day/6

runDay(2015, 6)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = Array(1000)
    .fill(0)
    .map(() => Array(1000).fill(false));

  inp.split("\n").forEach((l) => {
    let [fromX, fromY, toX, toY] = ints(l);

    if (l.startsWith("turn off")) {
      for (let i = fromX; i <= toX; i++) {
        for (let j = fromY; j <= toY; j++) {
          grid[i][j] = false;
        }
      }
    } else if (l.startsWith("toggle")) {
      for (let i = fromX; i <= toX; i++) {
        for (let j = fromY; j <= toY; j++) {
          grid[i][j] = !grid[i][j];
        }
      }
    } else {
      for (let i = fromX; i <= toX; i++) {
        for (let j = fromY; j <= toY; j++) {
          grid[i][j] = true;
        }
      }
    }
  });

  return sum(grid.map((r) => r.filter((v) => v).length));
}

function part2(inp) {
  let grid = Array(1000)
    .fill(0)
    .map(() => Array(1000).fill(0));

  inp.split("\n").forEach((l) => {
    let [fromX, fromY, toX, toY] = ints(l);

    if (l.startsWith("turn off")) {
      for (let i = fromX; i <= toX; i++) {
        for (let j = fromY; j <= toY; j++) {
          grid[i][j] = Math.max(grid[i][j] - 1, 0);
        }
      }
    } else if (l.startsWith("toggle")) {
      for (let i = fromX; i <= toX; i++) {
        for (let j = fromY; j <= toY; j++) {
          grid[i][j] += 2;
        }
      }
    } else {
      for (let i = fromX; i <= toX; i++) {
        for (let j = fromY; j <= toY; j++) {
          grid[i][j]++;
        }
      }
    }
  });

  return sum(grid.map((r) => sum(r)));
}
