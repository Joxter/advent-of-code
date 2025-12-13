import { createHash } from "node:crypto";
import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/4

runDay(2015, 4)
  //
  .part(1, part1)
  .part(2, part2)
  .end(true);

function part1(inp) {
  let i = 1;
  while (true) {
    if (
      createHash("md5")
        .update(inp + i)
        .digest("hex")
        .startsWith("00000")
    )
      return i;

    i++;
  }
}

function part2(inp) {
  let i = 1;
  while (true) {
    if (
      createHash("md5")
        .update(inp + i)
        .digest("hex")
        .startsWith("000000")
    )
      return i;

    i++;
  }
}
