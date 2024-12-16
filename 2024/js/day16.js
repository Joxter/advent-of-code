import { findInGrid, makeGrid, printGridCb, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/16

runDay(2024, 16)
  //
  .part(1, part1) // 99488 (0:32 min)
  .part(2, part2) // 516 (1:05 min)
  .end(true);

function part1(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let finish = findInGrid(grid, "E");
  let max = Infinity;

  let maxpoins = {};

  function dfs(position, score, visited, dir) {
    if (score > max) return Infinity;

    let [i, j] = position;
    let k = `${i},${j}`;

    if (!maxpoins[k]) maxpoins[k] = score;

    if (score > maxpoins[k]) return Infinity;
    if (score < maxpoins[k]) maxpoins[k] = score;

    if (grid[i][j] === "#") return Infinity;
    if (visited.includes(k)) return Infinity;

    if (i === finish[0] && j === finish[1]) {
      if (max > score) max = score;
      return score;
    }

    let res = Infinity;

    const dirs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const d of dirs) {
      let add = d.join(",") === dir.join(",") ? 1 : 1001;

      let ll = dfs(
        //
        [i + d[0], j + d[1]],
        score + add,
        [...visited, k],
        d,
      );
      res = Math.min(res, ll);
    }

    return res;
  }

  return dfs(start, 0, [], [0, 1]);
}

function part2(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let finish = findInGrid(grid, "E");
  let best = 99488;

  let maxpoins = {};
  let bestTies = {};

  function dfs(position, score, visited, dir) {
    let [i, j] = position;
    let k = `${i},${j}`;

    if (!maxpoins[k]) maxpoins[k] = score;

    if (score > maxpoins[k] + 2000) return Infinity;
    if (score < maxpoins[k]) maxpoins[k] = score;

    if (grid[i][j] === "#") return Infinity;
    if (visited.includes(k)) return Infinity;

    if (i === finish[0] && j === finish[1]) {
      if (best === score) {
        bestTies = {
          ...bestTies,
          ...Object.fromEntries(visited.map((it) => [it, it])),
        };
      }
      return score;
    }
    if (score > best + 10) return Infinity;

    let res = Infinity;

    const dirs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const d of dirs) {
      let add = d.join(",") === dir.join(",") ? 1 : 1001;

      let ll = dfs([i + d[0], j + d[1]], score + add, [...visited, k], d);
      res = Math.min(res, ll);
    }

    return res;
  }

  dfs(start, 0, [], [0, 1]);

  return Object.keys(bestTies).length + 1;
}
