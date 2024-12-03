import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/3

runDay(2024, 3)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let match = inp.match(/mul\(\d{1,3},\d{1,3}\)/g);
  return sum(
    match.map((it) => {
      let [a, b] = it.match(/\d+/g);
      return +a * +b;
    }),
  );
}

function part2(inp) {
  let match = inp.match(/(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g);

  let DO = true;
  let filtered = match.filter((it) => {
    if (it.startsWith("don't")) {
      DO = false;
    } else if (it.startsWith("do")) {
      DO = true;
    } else {
      return DO;
    }
  });

  return sum(
    filtered.map((it) => {
      let [a, b] = it.match(/\d+/g);

      return +a * +b;
    }),
  );
}
