import { permutations, runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/13

runDay(2015, 13)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let pairs = {};

  inp.split("\n").forEach((l) => {
    let parts = l.split(" ");
    if (!pairs[parts[0]]) pairs[parts[0]] = {};

    pairs[parts[0]][parts[10].slice(0, -1)] =
      parts[2][0] === "g" ? +parts[3] : -parts[3];
  });

  let max = 0;

  permutations(Object.keys(pairs)).forEach((setup) => {
    let h = pairs[setup[0]][setup.at(-1)] + pairs[setup.at(-1)][setup[0]];
    for (let i = 0; i < setup.length - 1; i++) {
      h += pairs[setup[i]][setup[i + 1]] + pairs[setup[i + 1]][setup[i]];
    }
    max = Math.max(max, h);
  });

  return max;
}

function part2(inp) {
  let pairs = { Joxter: {} };

  inp.split("\n").forEach((l) => {
    let parts = l.split(" ");
    if (!pairs[parts[0]]) {
      pairs[parts[0]] = { Joxter: 0 };
      pairs["Joxter"][parts[0]] = 0;
    }

    pairs[parts[0]][parts[10].slice(0, -1)] =
      parts[2][0] === "g" ? +parts[3] : -parts[3];
  });

  let max = 0;

  permutations(Object.keys(pairs)).forEach((setup) => {
    let h = pairs[setup[0]][setup.at(-1)] + pairs[setup.at(-1)][setup[0]];
    for (let i = 0; i < setup.length - 1; i++) {
      h += pairs[setup[i]][setup[i + 1]] + pairs[setup[i + 1]][setup[i]];
    }
    max = Math.max(max, h);
  });

  return max;
}
