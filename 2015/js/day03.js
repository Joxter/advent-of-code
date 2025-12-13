import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/3

runDay(2015, 3)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let dirMap = {
    ">": [1, 0],
    "<": [-1, 0],
    "^": [0, -1],
    v: [0, 1],
  };

  let visited = { "0,0": 1 };
  let current = [0, 0];

  inp.split("").forEach((dir) => {
    current[0] += dirMap[dir][0];
    current[1] += dirMap[dir][1];

    visited[current.join(",")] = 1;
  });

  return Object.keys(visited).length;
}

function part2(inp) {
  let dirMap = {
    ">": [1, 0],
    "<": [-1, 0],
    "^": [0, -1],
    v: [0, 1],
  };

  let visited = { "0,0": 1 };
  let currentS = [0, 0];
  let currentR = [0, 0];

  inp.split("").forEach((dir, i) => {
    if (i % 2 === 0) {
      currentS[0] += dirMap[dir][0];
      currentS[1] += dirMap[dir][1];

      visited[currentS.join(",")] = 1;
    } else {
      currentR[0] += dirMap[dir][0];
      currentR[1] += dirMap[dir][1];

      visited[currentR.join(",")] = 1;
    }
  });

  return Object.keys(visited).length;
}
