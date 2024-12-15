import { makeGrid, printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/15

runDay(2024, 15)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  const BOX = "O";
  const ROBOT = "@";

  let [grid, moves] = inp.trim().split("\n\n");

  grid = makeGrid(grid);
  moves = moves.trim().replaceAll(/\s/g, "").split("");

  let move = { "^": [-1, 0], v: [1, 0], "<": [0, -1], ">": [0, 1] };
  let pos = findInGrid(grid, ROBOT);

  for (let m of moves) {
    let dir = move[m];

    let tryPos = [pos[0] + dir[0], pos[1] + dir[1]];
    let fin = null;

    while (true) {
      if (grid[tryPos[0]][tryPos[1]] === "#") {
        fin = null;
        break;
      } else if (grid[tryPos[0]][tryPos[1]] === ".") {
        fin = tryPos;
        break;
      }
      tryPos = [tryPos[0] + dir[0], tryPos[1] + dir[1]];
    }

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
  }

  return getRes(grid, BOX);
}

function part2(inp) {
  const BOX = "O";
  const ROBOT = "@";

  let [grid1, moves] = inp.trim().split("\n\n");

  grid1 = makeGrid(grid1);
  let grid = [];
  for (let i = 0; i < grid1.length; i++) {
    let row = [];
    for (let j = 0; j < grid1[i].length; j++) {
      if (grid1[i][j] === ".") row.push(".", ".");
      if (grid1[i][j] === "#") row.push("#", "#");
      if (grid1[i][j] === ROBOT) row.push(ROBOT, ".");
      if (grid1[i][j] === BOX) row.push("[", "]");
    }
    grid.push(row);
  }

  moves = moves.trim().replaceAll(/\s/g, "").split("");

  let move = { "^": [-1, 0], v: [1, 0], "<": [0, -1], ">": [0, 1] };
  let pos = findInGrid(grid, ROBOT);

  for (let m of moves) {
    let dir = move[m];

    let nextGrid = cloneGrid(grid);
    let tryPos = [pos[0] + dir[0], pos[1] + dir[1]];

    let r =
      m === "<" || m === ">"
        ? tryMoveHor(nextGrid, tryPos, dir)
        : tryMoveVert(nextGrid, tryPos, dir);

    if (r) {
      nextGrid[pos[0]][pos[1]] = ".";
      pos = [...tryPos];
      nextGrid[pos[0]][pos[1]] = ROBOT;

      grid = nextGrid;
    }
  }

  return getRes(grid, "[");
}

function cloneGrid(grid) {
  let res = [];
  for (let i = 0; i < grid.length; i++) {
    res.push([...grid[i]]);
  }
  return res;
}

function tryMoveHor(grid, pos, dir) {
  let cell = grid[pos[0]][pos[1]];

  if (cell === ".") {
    return true;
  } else if (cell === "#") {
    return false;
  } else {
    let res = tryMoveHor(grid, [pos[0], pos[1] + dir[1]], dir);
    if (res) {
      grid[pos[0]][pos[1] + dir[1]] = cell;
      grid[pos[0]][pos[1]] = ".";
    }
    return res;
  }
}

function tryMoveVert(grid, pos, dir) {
  let cell = grid[pos[0]][pos[1]];

  if (cell === ".") {
    return true;
  } else if (cell === "#") {
    return false;
  } else if (cell === "[") {
    let res1 = tryMoveVert(grid, [pos[0] + dir[0], pos[1]], dir);
    let res2 = tryMoveVert(grid, [pos[0] + dir[0], pos[1] + 1], dir);
    if (res1 && res2) {
      grid[pos[0] + dir[0]][pos[1]] = cell;
      grid[pos[0] + dir[0]][pos[1] + 1] = "]";
      grid[pos[0]][pos[1]] = ".";
      grid[pos[0]][pos[1] + 1] = ".";
    }
    return res1 && res2;
  } else if (cell === "]") {
    let res1 = tryMoveVert(grid, [pos[0] + dir[0], pos[1]], dir);
    let res2 = tryMoveVert(grid, [pos[0] + dir[0], pos[1] - 1], dir);
    if (res1 && res2) {
      grid[pos[0] + dir[0]][pos[1]] = cell;
      grid[pos[0] + dir[0]][pos[1] - 1] = "[";
      grid[pos[0]][pos[1]] = ".";
      grid[pos[0]][pos[1] - 1] = ".";
    }
    return res1 && res2;
  }
}

function findInGrid(grid, char) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === char) {
        return [i, j];
      }
    }
  }

  return null;
}

function getRes(grid, ch) {
  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === ch) {
        res += i * 100 + j;
      }
    }
  }

  return res;
}
