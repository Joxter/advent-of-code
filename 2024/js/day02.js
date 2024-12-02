import { runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/2

runDay(2024, 2)
  //
  .part(1, part1)
  .part(2, part2)
  .part(2, part2better, "better")
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

function part2better(inp) {
  let lines = inp
    .trim()
    .split("\n")
    .map((it) => it.split(" ").map((it) => +it));

  return lines.filter((level) => {
    let normalRes = isSafeBetter(level);
    if (normalRes === true) return true;

    return (
      isSafeBetter(level.toSpliced(normalRes, 1)) === true ||
      isSafeBetter(level.toSpliced(normalRes - 1, 1)) === true
    );
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

function isSafeBetter(level) {
  if (level[0] < level.at(-1)) {
    for (let i = 1; i < level.length; i++) {
      let prev = level[i - 1];
      if (level[i] <= prev || level[i] - prev > 3) {
        return i;
      }
    }
    return true;
  } else {
    for (let i = 1; i < level.length; i++) {
      let prev = level[i - 1];
      if (level[i] >= prev || prev - level[i] > 3) {
        return i;
      }
    }
    return true;
  }
}
