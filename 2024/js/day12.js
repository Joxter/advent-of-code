import { makeGridWithBorder, rotateGrid90, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/12

runDay(2024, 12)
  //
  .part(1, part1)
  .part(2, part2)
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
  let grid = makeGridWithBorder(inp.trim(), "#");

  let areas = {};
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      let [char, area] = cntArea(i, j);
      if (area) {
        areas[char] = area;
      }
    }
  }

  let perimeters = Object.fromEntries(Object.keys(areas).map((k) => [k, 0]));

  cntPerimeter();
  grid = rotateGrid90(grid);
  cntPerimeter();
  grid = rotateGrid90(grid);
  cntPerimeter();
  grid = rotateGrid90(grid);
  cntPerimeter();

  return sum(
    Object.keys(areas).map((k) => {
      return areas[k] * perimeters[k];
    }),
  );

  function cntPerimeter() {
    for (let i = 1; i < grid.length - 1; i++) {
      for (let j = 1; j < grid[0].length - 1; j++) {
        let ch = grid[i][j];
        let topCh = grid[i - 1][j];

        if (topCh !== ch) {
          let prevCh = grid[i][j - 1];
          let prevTopCh = grid[i - 1][j - 1];

          if (prevCh !== ch || prevCh === prevTopCh) {
            perimeters[ch]++;
          }
        }
      }
    }
  }

  function cntArea(i, j) {
    let char = grid[i][j];
    if (char.length > 1) return ["", 0];

    let newCh = `${i},${j}`;

    let area = 0;

    dfsArea(i, j);

    return [newCh, area];

    function dfsArea(i, j) {
      if (grid[i][j] === newCh) return;
      if (grid[i][j] === "#") return;
      if (grid[i][j] !== char) return;

      grid[i][j] = newCh;

      area++;

      dfsArea(i - 1, j);
      dfsArea(i + 1, j);
      dfsArea(i, j - 1);
      dfsArea(i, j + 1);
    }
  }
}
