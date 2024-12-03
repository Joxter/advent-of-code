import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/3

runDay(2024, 3, 100)
  .part(1, part1)
  .part(1, part1better, "better")
  .part(2, part2)
  .part(2, part2better, "better")
  .end();

function part1(inp) {
  return sum(
    inp.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g).map(([, a, b]) => {
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

function part1better(inp) {
  return sum(
    inp.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g).map(([, a, b]) => {
      return +a * +b;
    }),
  );
}

function part2better(inp) {
  let match = inp.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|(do\(\))|(don't\(\))/g);

  let DO = true;
  let res = 0;
  for (let it of match) {
    if (it[0].startsWith("don't")) {
      DO = false;
    } else if (it[0].startsWith("do")) {
      DO = true;
    } else if (DO) {
      res += +it[1] * +it[2];
    }
  }

  return res;
}
