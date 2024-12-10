import { makeGridWithBorder, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/10

runDay(2024, 10, 100)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, "#");
  let minusOne = String.fromCharCode("0".charCodeAt(0) - 1);

  let res = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "0") {
        res += dfs(i, j);
      }
    }
  }

  return res;

  function dfs(i, j) {
    let ends = new Set();
    go(i, j, minusOne);

    return ends.size;

    function go(i, j, prevH) {
      let h = grid[i][j];
      if (prevH.charCodeAt(0) + 1 !== h.charCodeAt(0)) return;
      if (h === "9") {
        ends.add((i << 6) + j);
        return;
      }

      go(i - 1, j, h);
      go(i + 1, j, h);
      go(i, j - 1, h);
      go(i, j + 1, h);
    }
  }
}

function part2(inp) {
  let grid = makeGridWithBorder(inp, "#");
  let minusOne = String.fromCharCode("0".charCodeAt(0) - 1);

  let res = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "0") {
        res += dfs(i, j);
      }
    }
  }
  return res;

  function dfs(i, j) {
    return go(i, j, minusOne);

    function go(i, j, prevH) {
      let h = grid[i][j];
      if (prevH.charCodeAt(0) + 1 !== h.charCodeAt(0)) return 0;
      if (h === "9") {
        return 1;
      }

      return (
        go(i - 1, j, h) +
        //
        go(i + 1, j, h) +
        go(i, j - 1, h) +
        go(i, j + 1, h)
      );
    }
  }
}
