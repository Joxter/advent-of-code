import { runDay, uniq } from "../../utils.js";

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
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return stripes.filter((str) => {
    return possible(str, towels);
  }).length;
}

function possible(str, towels) {
  if (!str) return true;

  let vars = [""];

  let visitedFalse = new Set();

  // console.log(str, str.length);
  let i = 0;
  while (vars.length > 0) {
    // if (i++ % 1000_000 === 0) {
    //   console.log(
    //     i,
    //     vars.length,
    //     Math.floor(vars.reduce((a, b) => a + b.length, 0) / vars.length),
    //     Math.max(...vars.map((v) => v.length)),
    //     Math.min(...vars.map((v) => v.length)),
    //   );
    //   // avg length of vars:
    // }
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

function part2(inp) {
  return 123;
}
