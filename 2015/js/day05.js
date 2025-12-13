import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/5

runDay(2015, 5)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let nono = ["ab", "cd", "pq", "xy"];

  return inp.split("\n").filter((l) => {
    if (nono.find((no) => l.includes(no))) return false;

    let hasDouble = false;
    for (let i = 1; i < l.length; i++) {
      if (l[i] === l[i - 1]) {
        hasDouble = true;
        break;
      }
    }
    if (!hasDouble) return false;

    let cnt = 0;
    for (let i = 0; i < l.length; i++) {
      if ("aeiou".includes(l[i])) {
        cnt++;
      }
      if (cnt >= 3) return true;
    }

    return false;
  }).length;
}

function part2(inp) {
  return inp.split("\n").filter((l) => {
    let pass = false;
    for (let i = 2; i < l.length; i++) {
      if (l[i] === l[i - 2]) {
        pass = true;
        break;
      }
    }
    if (!pass) return false;

    for (let i = 0; i < l.length - 2; i++) {
      if (l.includes(l[i] + l[i + 1], i + 2)) {
        return true;
      }
    }

    return false;
  }).length;
}
