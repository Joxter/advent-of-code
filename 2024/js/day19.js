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

  while (vars.length > 0) {
    let pref = vars.shift();
    for (const towel of towels) {
      if (pref + towel === str) return true;

      if (str.startsWith(pref + towel)) {
        vars.push(pref + towel);
      }
    }
    vars = uniq(vars);
  }

  return false;
}

function part2(inp) {
  return 123;
}
