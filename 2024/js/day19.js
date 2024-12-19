import { runDay, sum, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/19

// console.log(
//   part1(`r, wr, b, g, bwu, rb, gb, br
//
// brwrr
// bggr
// gbbr
// rrbgbr
// ubwu
// bwurrg
// brgr
// bbrgwb`),
// );

runDay(2024, 19)
  //
  .part(1, part1) // 230 msec
  // .part(2, part2) // 17 sec
  .end();

function part1(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  //.slice(7, 8)
  return stripes.filter((str, i) => {
    return possibleFast(str, towels);
  }).length;
}

function possible(str, towels) {
  if (!str) return true;

  let vars = [""];

  let visitedFalse = new Set();

  let i = 0;
  while (vars.length > 0) {
    let pref = vars.pop();
    if (pref === str) return true;
    if (!str.startsWith(pref) || visitedFalse.has(pref)) {
      continue;
    } else {
      visitedFalse.add(pref);
    }

    for (const towel of towels) {
      vars.push(pref + towel);
    }
  }

  return false;
}

function possibleFast(str, towels) {
  if (!str) return true;

  let arr = Array(str.length + 1).fill(0);

  let ok = false;
  for (const towel of towels) {
    if (str.startsWith(towel)) {
      arr[towel.length] = 1;
      ok = true;
    }
  }

  let it = 0;
  while (ok) {
    if (arr.at(-1) !== 0) {
      return true;
    }

    ok = false;
    let next = it + 1;
    arr.forEach((v, i) => {
      if (v > it) {
        for (const towel of towels) {
          if (str.startsWith(towel, i)) {
            arr[towel.length + i] = next;
            ok = true;
          }
        }
      }
    });
    it++;
  }
  // console.log(str);
  // console.log(arr.join(""));

  return false;
}

function part2(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return sum(
    stripes.map((str) => {
      return possible(str, towels);
    }),
  );

  function possible(str, towels) {
    if (!str) return true;

    let vars = { "": 1 };

    let i = 0;
    let cnt = 0;
    while (Object.keys(vars).length > 0) {
      i++;
      let newVars = {};

      Object.entries(vars).forEach(([pref, n]) => {
        if (pref === str) {
          cnt += n;
          return;
        }
        for (const towel of towels) {
          let a = pref + towel;
          if (str.startsWith(a)) {
            if (!newVars[a]) newVars[a] = 0;
            newVars[a] += n;
          }
        }
      });
      vars = newVars;
    }

    return cnt;
  }
}
