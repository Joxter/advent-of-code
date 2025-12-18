import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/16

runDay(2015, 16)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let sues = inp.split("\n").map((l) => {
    let [_, ind, fact1, fact2, fact3] = l.match(/Sue (\d+): (.+), (.+), (.+)/);

    return [
      +ind,
      Object.fromEntries(
        [fact1, fact2, fact3].map((f) => {
          let [name, n] = f.split(": ");
          return [name, +n];
        }),
      ),
    ];
  });

  let memo = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  return sues.find(([n, facts]) => {
    return Object.entries(facts).every(([fact, cnt]) => {
      return memo[fact] === cnt;
    });
  })[0];
}

function part2(inp) {
  let sues = inp.split("\n").map((l) => {
    let [_, ind, fact1, fact2, fact3] = l.match(/Sue (\d+): (.+), (.+), (.+)/);

    return [
      +ind,
      Object.fromEntries(
        [fact1, fact2, fact3].map((f) => {
          let [name, n] = f.split(": ");
          return [name, +n];
        }),
      ),
    ];
  });

  let memo = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  return sues.find(([n, facts]) => {
    return Object.entries(facts).every(([fact, cnt]) => {
      if (fact === "cats" || fact === "trees") return memo[fact] < cnt;
      if (fact === "pomeranians" || fact === "goldfish")
        return memo[fact] > cnt;

      return memo[fact] === cnt;
    });
  })[0];
}
