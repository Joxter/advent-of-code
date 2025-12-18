import { runDay, ints, sum, prod } from "../../utils.js";

// https://adventofcode.com/2015/day/15

runDay(2015, 15)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let ingreds = inp.split("\n").map((l) => ints(l));

  let max = 0;

  for (let spoon1 = 1; spoon1 <= 100 - 3; spoon1++) {
    for (let spoon2 = spoon1 + 1; spoon2 <= 100 - 2; spoon2++) {
      for (let spoon3 = spoon2 + 1; spoon3 <= 100 - 1; spoon3++) {
        let s = [spoon1, spoon2 - spoon1, spoon3 - spoon2, 100 - spoon3];

        let capacity = Math.max(0, sum(ingreds.map((it, i) => it[0] * s[i])));
        let durability = Math.max(0, sum(ingreds.map((it, i) => it[1] * s[i])));
        let flavor = Math.max(0, sum(ingreds.map((it, i) => it[2] * s[i])));
        let texture = Math.max(0, sum(ingreds.map((it, i) => it[3] * s[i])));

        let res = capacity * durability * flavor * texture;
        if (res > max) max = res;
      }
    }
  }

  return max;
}

function part2(inp) {
  let ingreds = inp.split("\n").map((l) => ints(l));

  let max = 0;

  for (let spoon1 = 1; spoon1 <= 100 - 3; spoon1++) {
    for (let spoon2 = spoon1 + 1; spoon2 <= 100 - 2; spoon2++) {
      for (let spoon3 = spoon2 + 1; spoon3 <= 100 - 1; spoon3++) {
        let s = [spoon1, spoon2 - spoon1, spoon3 - spoon2, 100 - spoon3];

        let calories = Math.max(0, sum(ingreds.map((it, i) => it[4] * s[i])));

        if (calories === 500) {
          let capacity = Math.max(0, sum(ingreds.map((it, i) => it[0] * s[i])));
          let durability = Math.max(0, sum(ingreds.map((it, i) => it[1] * s[i])));
          let flavor = Math.max(0, sum(ingreds.map((it, i) => it[2] * s[i])));
          let texture = Math.max(0, sum(ingreds.map((it, i) => it[3] * s[i])));

          let res = capacity * durability * flavor * texture;
          if (res > max) max = res;
        }
      }
    }
  }

  return max;
}
