import {
  allNeibs8,
  makeGrid,
  makeGridWithBorder,
  runDay,
} from "../../utils.js";

// https://adventofcode.com/2024/day/4

// console.log(
//   part2(`MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`),
// );

runDay(2024, 4)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, "#");
  let dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let res = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      dirs.forEach((dir) => {
        let ii = i;
        let jj = j;
        let word = grid[i][j];

        while ("XMAS".startsWith(word)) {
          ii = ii + dir[0];
          jj = jj + dir[1];

          word += grid[ii][jj];

          if (word === "XMAS") {
            res++;
            break;
          }
        }
      });
    }
  }

  return res;
}

function part2(inp) {
  let grid = makeGridWithBorder(inp, "#");

  let res = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "A") {
        let a = grid[i - 1][j - 1] + grid[i + 1][j + 1];

        let b = grid[i - 1][j + 1] + grid[i + 1][j - 1];

        if ((a === "MS" || a === "SM") && (b === "MS" || b === "SM")) {
          res++;
        }
      }
    }
  }

  return res;
}
