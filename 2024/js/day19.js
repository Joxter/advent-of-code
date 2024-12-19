import { runDay, sum, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/19

runDay(2024, 19)
  //
  .part(1, part1) // 230 msec
  .part(1, part1better) // 61 msec
  .part(2, part2) // 17 sec
  .part(2, part2better) // 61 sec
  .end();

function part1(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return stripes.filter((str, i) => {
    return possible(str, towels);
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

function part1better(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return stripes.filter((str, i) => {
    return possibleBetter(str, towels);
  }).length;
}

function possibleBetter(str, towels) {
  let arr = Array(str.length + 1).fill(0);

  for (const towel of towels) {
    if (str.startsWith(towel)) {
      arr[towel.length] = 1;
    }
  }

  arr.forEach((v, i) => {
    if (v === 1) {
      for (const towel of towels) {
        if (str.startsWith(towel, i)) {
          arr[towel.length + i] = 1;
        }
      }
    }
  });

  return arr.at(-1) !== 0;
}

function part2better(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return sum(
    stripes.map((str) => {
      return possible(str, towels);
    }),
  );

  function possible(str, towels) {
    let arr = Array(str.length + 1).fill(0);

    for (const towel of towels) {
      if (str.startsWith(towel)) {
        arr[towel.length]++;
      }
    }

    arr.forEach((v, i) => {
      if (v > 0) {
        for (const towel of towels) {
          if (str.startsWith(towel, i)) {
            arr[towel.length + i] += v;
          }
        }
      }
    });

    return arr.at(-1);
  }
}
