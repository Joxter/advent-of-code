import { makeGrid, printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/15

const BOX = "O";
const ROBOT = "@";

console.log(
  part1(`
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv
<v>>v<<`),
  [10092, 2028],
);

runDay(2024, 15)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let [grid, moves] = inp.trim().split("\n\n");

  grid = makeGrid(grid);
  moves = moves.trim().replaceAll(/\s/g, "").split("");

  let move = {
    "^": [-1, 0],
    v: [1, 0],
    "<": [0, -1],
    ">": [0, 1],
  };

  let pos = [0, 0];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === ROBOT) {
        pos = [i, j];
        break;
      }
    }
  }

  for (let m of moves) {
    let dir = move[m];

    let tryPos = [pos[0] + dir[0], pos[1] + dir[1]];
    let fin = null;
    console.log("-------- dir", dir);

    let limit = 1000;
    while (true) {
      if (limit-- < 0) {
        return console.log("EXIT");
      }
      // console.log(tryPos, grid[tryPos[0]][tryPos[1]]);

      if (grid[tryPos[0]][tryPos[1]] === "#") {
        fin = null;
        break;
      } else if (grid[tryPos[0]][tryPos[1]] === ".") {
        fin = tryPos;
        break;
      } else if (grid[tryPos[0]][tryPos[1]] === BOX) {
        //
      }
      tryPos = [tryPos[0] + dir[0], tryPos[1] + dir[1]];
    }
    // console.log(printGrid(grid));
    // console.log(dir);

    if (fin) {
      let newPos = [pos[0] + dir[0], pos[1] + dir[1]];
      let next = grid[newPos[0]][newPos[1]];
      if (next === BOX) {
        grid[fin[0]][fin[1]] = BOX;
      }

      grid[newPos[0]][newPos[1]] = ROBOT;
      grid[pos[0]][pos[1]] = ".";
      pos = newPos;
    }

    // printGrid(grid);
  }

  // all boxes
  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === BOX) {
        res += i * 100 + j;
      }
    }
  }

  return res;
}

function part2(inp) {
  return 123;
}
