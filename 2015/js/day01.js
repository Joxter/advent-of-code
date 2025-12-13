import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/1

runDay(2015, 1)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let res = 0;
  for (let i = 0; i < inp.length; i++) {
    if (inp[i] === "(") {
      res++;
    } else {
      res--;
    }
  }
  return res;
}

function part2(inp) {
  let current = 0;
  for (let i = 0; i < inp.length; i++) {
    if (inp[i] === "(") {
      current++;
    } else {
      current--;
    }

    if (current === -1) return i + 1;
  }
}
