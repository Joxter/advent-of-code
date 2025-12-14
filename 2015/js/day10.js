import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/10

// https://www.reddit.com/r/adventofcode/comments/3w6h3m/day_10_solutions/

runDay(2015, 10)
  //
  .part(1, part1)
  .part(2, part2)
  .part(1, (inp) => golf(inp, 40), "golf")
  .part(2, (inp) => golf(inp, 50), "golf")
  .end();

function part1(inp) {
  return go(inp, 40);
}

function part2(inp) {
  return go(inp, 50);
}

function go(inp, steps) {
  let current = inp;

  for (let step = 1; step <= steps; step++) {
    let newLine = "";

    let i = 0;
    while (i < current.length) {
      let cnt = 1;
      let cur = current[i];
      i++;

      while (cur === current[i]) {
        i++;
        cnt++;
      }

      newLine += cnt + cur;
    }

    current = newLine;
  }

  return current.length;
}

// from reddit
function golf(a, b) {
  return [...Array(b)].reduce(
    (c) => c.match(/(.)\1*/g).map((d) => d.length + d[0]).join``,
    a,
  ).length;
}
