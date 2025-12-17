import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/12

runDay(2015, 12, 1)
  //
  .part(1, part1)
  .part(2, part2)
  .part(1, part1json, "part1json")
  .end(1);

function part1(inp) {
  let cnt = 0;
  for (const d of inp.matchAll(/(-?\d+)/g)) cnt += +d[1];
  return cnt;
}

function part1json(inp) {
  let sum = 0;

  function go(node) {
    if (typeof node === "string") return;
    if (typeof node === "number") {
      sum += node;
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((n) => go(n));
      return;
    }

    Object.values(node).forEach((n) => go(n));
  }

  go(JSON.parse(inp));

  return sum;
}

function part2(inp) {
  let sum = 0;

  function go(node) {
    if (typeof node === "string") return;
    if (typeof node === "number") {
      sum += node;
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((n) => go(n));
      return;
    }

    const vals = Object.values(node);
    if (!vals.includes("red")) {
      vals.forEach((n) => go(n));
    }
  }

  go(JSON.parse(inp));

  return sum;
}
