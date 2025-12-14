import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2015/day/8

runDay(2015, 8)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  function isHex(char) {
    return "0123456789abcdef".includes(char);
  }

  let totalStr = sum(inp.split("\n").map((l) => l.length));
  let totalCode = sum(
    inp.split("\n").map((l) => {
      l = l.slice(1, -1).split("");

      let cnt = 0;

      while (l.length > 0) {
        let a = l.shift();
        if (a === "\\" && l[0] === `\\`) {
          cnt++;
          l.shift();
        } else if (a === "\\" && l[0] === `\"`) {
          cnt++;
          l.shift();
        } else if (a === "\\" && l[0] === `x` && isHex(l[1]) && isHex(l[2])) {
          cnt++;
          l.shift();
          l.shift();
          l.shift();
        } else {
          cnt++;
        }
      }

      return cnt;
    }),
  );

  return totalStr - totalCode;
}

function part2(inp) {
  let totalStr = sum(inp.split("\n").map((l) => l.length));

  let totalCode = sum(
    inp.split("\n").map((l) => {
      let cnt = 0;

      for (let i = 1; i < l.length - 1; i++) {
        if (l[i] === `"` || l[i] === `\\`) cnt++;
      }

      return l.length + cnt + 4;
    }),
  );

  return totalCode - totalStr;
}
