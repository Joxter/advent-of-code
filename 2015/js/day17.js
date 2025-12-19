import { runDay, ints, sum } from "../../utils.js";

// https://adventofcode.com/2015/day/17

runDay(2015, 17)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let boxes = ints(inp).toSorted((a, b) => a - b);

  let cnt = 0;
  let limit = 0;

  go(150, 0);

  function go(leftSpace, checked) {
    limit++;
    if (leftSpace === 0) {
      cnt++;
    } else {
      while (checked < boxes.length) {
        if (boxes[checked] <= leftSpace) {
          go(leftSpace - boxes[checked], checked + 1);
        }
        checked++;
      }
    }
  }

  return cnt;
}

function part2(inp) {
  let boxes = ints(inp).toSorted((a, b) => a - b);

  let mins = Array(boxes.length).fill(0);
  let limit = 0;

  go(150, 0, 0);

  function go(leftSpace, checked, acc) {
    limit++;
    if (leftSpace === 0) {
      mins[acc]++;
    } else {
      while (checked < boxes.length) {
        if (boxes[checked] <= leftSpace) {
          go(leftSpace - boxes[checked], checked + 1, acc + 1);
        }
        checked++;
      }
    }
  }

  return mins.find((n) => n > 0);
}
