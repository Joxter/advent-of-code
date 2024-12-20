import { findInGrid, forEachInGrid, makeGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/20

runDay(2024, 20)
  //
  .part(1, part1)
  .part(2, part2)
  .part(2, notMy1p2, "not my 1")
  .part(2, notMy2p2, "not my 2")
  .end();

function part1(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let end = findInGrid(grid, "E");

  let q = [[start, 0]];

  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  grid[start[0]][start[1]] = ".";
  grid[end[0]][end[1]] = ".";

  while (q.length > 0) {
    let [[x, y], n] = q.shift();

    if (grid[x][y] === ".") {
      grid[x][y] = n;
      for (let [dx, dy] of dirs) {
        q.push([[x + dx, y + dy], n + 1]);
      }
    }
  }

  let res = 0;
  forEachInGrid(grid, (cell, i, j) => {
    let nums = [
      grid[i][j - 1],
      grid[i][j + 1],
      grid[i - 1]?.[j],
      grid[i + 1]?.[j],
    ].filter((x) => x !== undefined && x !== "#");

    for (let k = 0; k < nums.length - 1; k++) {
      for (let l = k + 1; l < nums.length; l++) {
        let diff = Math.abs(nums[k] - nums[l]) - 2;
        if (diff >= 100) res += 1;
      }
    }
  });

  return res;
}

function part2(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let end = findInGrid(grid, "E");

  let q = [[start, 0]];

  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  grid[start[0]][start[1]] = ".";
  grid[end[0]][end[1]] = ".";

  let steps = [];
  while (q.length > 0) {
    let [[x, y], n] = q.shift();

    if (grid[x][y] === ".") {
      grid[x][y] = n;
      steps[n] = [x, y];
      for (let [dx, dy] of dirs) {
        q.push([[x + dx, y + dy], n + 1]);
      }
    }
  }

  let res = 0;
  for (let s = 0; s < steps.length - 1; s++) {
    for (let ss = s + 1; ss < steps.length; ss++) {
      let distance =
        Math.abs(steps[s][0] - steps[ss][0]) +
        Math.abs(steps[s][1] - steps[ss][1]);

      if (distance > 20) continue;

      if (ss - s - distance >= 100) res++;
    }
  }

  return res;
}

function notMy1p2(inp) {
  // https://www.reddit.com/r/adventofcode/comments/1hicdtb/comment/m2xwz97/
  const grid = inp.split("\n").map((line) => line.split(""));
  const height = grid.length;
  const width = grid[0].length;

  let startPos = { x: 0, y: 0 };
  let endPos = { x: 0, y: 0 };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === "S") {
        startPos = { x, y };
      } else if (grid[y][x] === "E") {
        endPos = { x, y };
      }
    }
  }

  function getNeighborsLocationWithCondition(x, y, condition) {
    var neighbors = [
      //orth
      x > 0 ? [x - 1, y] : null,
      x < grid[0].length - 1 ? [x + 1, y] : null,
      y > 0 ? [x, y - 1] : null,
      y < grid.length - 1 ? [x, y + 1] : null,
      //diag
      x > 0 && y > 0 ? [x - 1, y - 1] : null,
      x > 0 && y < grid.length - 1 ? [x - 1, y + 1] : null,
      x < grid[0].length - 1 && y > 0 ? [x + 1, y - 1] : null,
      x < grid[0].length - 1 && y < grid.length - 1 ? [x + 1, y + 1] : null,
    ];
    return neighbors.filter(
      (k) => k !== null && condition(k[0], k[1], grid[k[1]][k[0]]),
    );
  }

  const pathPositions = [];
  const visited = new Set();
  const queue = [{ ...startPos }];
  while (queue.length > 0) {
    const { x, y } = queue.shift();
    pathPositions.push({ x, y });

    //if its the end,stop
    if (x === endPos.x && y === endPos.y) {
      break;
    }

    //mark as visited
    visited.add(`${x},${y}`);

    const nei = getNeighborsLocationWithCondition(x, y, (x, y, v) => {
      return v !== "#" && !visited.has(`${x},${y}`);
    });

    queue.push({ x: nei[0][0], y: nei[0][1] });
  }

  let skips = 0;
  let savedArr = {};
  for (let firstPos = 0; firstPos < pathPositions.length - 1; firstPos++) {
    for (
      let secondPos = firstPos + 1;
      secondPos < pathPositions.length;
      secondPos++
    ) {
      const savedBySkipping = secondPos - firstPos;

      //check if they are 3 units or less away
      let xDiff = Math.abs(
        pathPositions[firstPos].x - pathPositions[secondPos].x,
      );
      let yDiff = Math.abs(
        pathPositions[firstPos].y - pathPositions[secondPos].y,
      );

      if (xDiff + yDiff <= 20) {
        const saved = savedBySkipping - (xDiff + yDiff);

        //if (saved > 0) console.log("saved", saved);

        if (saved >= 100) {
          skips++;

          savedArr[saved] = savedArr[saved] ? savedArr[saved] + 1 : 1;
          //start a frequency counter
        }
      }
    }
  }

  return skips;
}

function notMy2p2(input) {
  // https://www.reddit.com/r/adventofcode/comments/1hicdtb/comment/m2yi65z/
  const init = (input) => input.split("\n").map((l) => l.split(""));
  const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  const k = (u, v) => [...u, ...v].join("_");

  const DIRS = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  // floodfill
  const distanceMap = (map, froms, entryDist = 0, wall = "#", path = ".") => {
    const offMap = (x, y) => x < 0 || y < 0 || x >= cols || y >= rows;

    let cols = map[0].length,
      rows = map.length,
      cur;
    let filled = map.map((row) => row.slice().fill(Infinity)),
      stack = froms.map((from) => ({
        pos: [...from],
        dist: entryDist,
      }));

    while ((cur = stack.shift())) {
      let [cx, cy] = cur.pos;

      if (filled[cy][cx] <= cur.dist) continue;
      filled[cy][cx] = cur.dist;

      DIRS.forEach(([dx, dy]) => {
        let [x, y] = [cx + dx, cy + dy];
        if (offMap(x, y)) return true;
        if (map[y][x] === wall) return true;
        stack.push({
          pos: [x, y],
          dist: cur.dist + 1,
        });
      });
    }
    return filled;
  };

  const run = (map, tpTime = 2) => {
    const offMap = (x, y) => x < 0 || y < 0 || x >= cols || y >= rows;

    let cols = map[0].length,
      rows = map.length,
      cur;
    let start,
      end,
      cheats = {};

    map.forEach((row, y) =>
      row.forEach((v, x) => {
        if (v == "#") return true;
        if (v == "S") start = [x, y];
        if (v == "E") end = [x, y];
        map[y][x] = ".";
      }),
    );

    let dmap = distanceMap(map, [start]);

    // step from start to end and with each iteration check in 4 directions for the shortcut
    let pos = start.slice();
    while (pos[0] != end[0] || pos[1] !== end[1]) {
      // check every possible tp exit point within given manhattan distance from every path point
      for (let y = pos[1] - tpTime; y <= pos[1] + tpTime; y++) {
        for (let x = pos[0] - tpTime; x <= pos[0] + tpTime; x++) {
          if (offMap(x, y)) continue;
          let d = dist(pos, [x, y]);
          if (d >= tpTime + 1) continue;
          if (map[y][x] !== ".") continue;
          let saved = dmap[y][x] - dmap[pos[1]][pos[0]] - d;
          let key = k(pos, [x, y]);
          if (saved > 0) {
            if (cheats[key] === undefined || cheats[key] < saved)
              cheats[key] = saved;
          }
        }
      }

      // move forward
      DIRS.some(([dx, dy]) => {
        let [x, y] = [pos[0] + dx, pos[1] + dy];
        if (!offMap(x, y) && dmap[y][x] == dmap[pos[1]][pos[0]] + 1) {
          pos = [x, y];
          return true;
        }
        return false;
      });
    }

    return Object.values(cheats).filter((v) => v >= 100).length;
  };

  return run(init(input), 20);
}
