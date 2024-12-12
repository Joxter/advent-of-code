import { makeGridWithBorder, printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/12

console.log(
  part1(
    `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
  ),
  [1930],
);

// console.log(
//   part1(
//     `AAAA
// BBCD
// BBCC
// EEEC`,
//   ),
//   [1930],
// );

runDay(2024, 12)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp.trim(), "#");

  let res = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      let a = price(i, j);
      res += a;
    }
  }

  return res;

  function price(i, j) {
    let area = 0;
    let perimeter = 0;

    let char = grid[i][j];

    dfsArea(i, j);

    if (area * perimeter) {
      // console.log([i, j], char, [area, perimeter]);
      // console.log(printGrid(grid));
    }

    return area * perimeter;

    function dfsArea(i, j) {
      if (grid[i][j] === char.toLowerCase()) return;
      if (grid[i][j] === "#") return perimeter++;
      if (grid[i][j] !== char) return perimeter++;

      grid[i][j] = grid[i][j].toLowerCase();

      area++;

      dfsArea(i - 1, j);
      dfsArea(i + 1, j);
      dfsArea(i, j - 1);
      dfsArea(i, j + 1);
    }
  }
}

function part2(inp) {
  return 123;
}
