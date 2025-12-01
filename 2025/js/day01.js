import { runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/1

runDay(2025, 1)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let current = 50;
  let cnt = 0;

  inp.split("\n").forEach((l) => {
    let lr = l[0];
    let n = +l.slice(1);
    // console.log(lr,+n);

    if (lr === "L") {
      current -= +n;
    } else {
      current += +n;
    }
    current = (current + 100) % 100;

    // console.log(current);

    if (current === 0) {
      cnt++;
    }
  });

  return cnt;
}

function part2(inp) {
  let current = 50;
  let cnt = 0;

  inp.split("\n").forEach((l) => {
    let lr = l[0];
    let n = +l.slice(1);
    // console.log(lr,+n);

    for (let i = 0; i < n; i++) {
      if (lr === "L") {
        current -= +1;
      } else {
        current += +1;
      }
      current = (current + 100) % 100;

      if (current === 0) {
        cnt++;
      }

    }
  });

  return cnt;
}
