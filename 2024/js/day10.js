import { makeGridWithBorder, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/10

// console.log(
//   part1(`89010123
// 78121874
// 87430965
// 96549874
// 45678903
// 32019012
// 01329801
// 10456732`),
//   [36],
// );

// console.log(
//   part1(`0123
// 1234
// 8765
// 9876`),
//   [36],
// );

runDay(2024, 10)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, "#");

  let res = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "0") {
        let score = dfs(i, j);
        res += score;
      }
    }
  }

  return res;

  function dfs(i, j) {
    let ends = {};
    // console.log("start");
    go(i, j, -1);
    // console.log("end", ends, Object.keys(ends));

    return Object.keys(ends).length;

    function go(i, j, prevH) {
      // console.log(i, j, prevH);
      let h = grid[i][j];
      if (h === "#") return;

      if (+prevH + 1 !== +h) return;
      if (h === "9") {
        ends[`${i},${j}`] = true;
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
  return 123;
}
