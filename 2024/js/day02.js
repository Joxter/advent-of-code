import { runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/2

runDay(2024, 2)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let lines = inp
    .trim()
    .split("\n")
    .map((it) => it.split(" ").map((it) => +it));

  return lines.filter((level) => isSafe(level)).length;
}

function part2(inp) {
  let lines = inp
    .trim()
    .split("\n")
    .map((it) => it.split(" ").map((it) => +it));

  return lines.filter((level) => {
    for (let i = 0; i < level.length; i++) {
      if (isSafe(level.toSpliced(i, 1))) {
        return true;
      }
    }
    return false;
  }).length;
}

function isSafe(level) {
  let mode = level[0] < level[1] ? "inc" : "dec";

  if (mode === "inc") {
    return level.every((it, i) => {
      if (i === 0) return true;
      let prev = level[i - 1];
      if (it > prev && it - prev <= 3) return true;
    });
  } else {
    return level.every((it, i) => {
      if (i === 0) return true;
      let prev = level[i - 1];
      if (it < prev && prev - it <= 3) return true;
    });
  }
}
