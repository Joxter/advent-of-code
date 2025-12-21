import { runDay, ints } from "../../utils.js";

// https://adventofcode.com/2015/day/25

runDay(2015, 25)
  //
  .part(1, part1)
  .end();

function part1(inp) {
  let [row, col] = ints(inp);
  row -= 1;
  col -= 1;

  let value = 20151125;
  let curRow = 1;
  let curCol = 0;

  while (true) {
    value = (value * 252533) % 33554393;

    if (curRow === row && curCol === col) return value;

    curRow--;
    curCol++;

    if (curRow < 0) {
      curRow = curCol;
      curCol = 0;
    }
  }
}
