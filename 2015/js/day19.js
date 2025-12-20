import { runDay, uniq } from "../../utils.js";

// https://adventofcode.com/2015/day/19

runDay(2015, 19)
  //
  // .part(1, part1)
  .part(2, part2)
  .end();

// console.log(
//   part2(`e => H
// e => O
// H => HO
// H => OH
// O => HH
//
// HOHOHO`),
// );

function part1(inp) {
  let [atoms_, word] = inp.split("\n\n");

  let atoms = {};
  atoms_.split("\n").map((l) => {
    let [from, to] = l.split(" => ");
    if (!atoms[from]) atoms[from] = [];
    atoms[from].push(to);
  });

  let combinations = new Set();

  for (let i = 0; i < word.length; i++) {
    if (atoms[word.slice(i, i + 1)]) {
      let before = word.slice(0, i);
      let after = word.slice(i + 1);

      atoms[word.slice(i, i + 1)].forEach((w) => {
        combinations.add(before + w + after);
      });
    } else if (atoms[word.slice(i, i + 2)]) {
      let before = word.slice(0, i);
      let after = word.slice(i + 2);

      atoms[word.slice(i, i + 2)].forEach((w) => {
        combinations.add(before + w + after);
      });
    }
  }

  return combinations.size;
}

function part2(inp) {
  function sub(base) {
    let combinations = new Set();

    Object.entries(atoms).forEach(([from, to]) => {
      if (!base.includes(from)) return;

      let offset = 0;
      while (base.indexOf(from, offset) > -1) {
        offset = base.indexOf(from, offset);

        let before = base.slice(0, offset);
        let after = base.slice(offset + from.length);

        combinations.add(before + to + after);
        offset++;
      }
    });

    return [...combinations];
  }

  let [atoms_, target] = inp.split("\n\n");

  let atoms = {};

  atoms_.split("\n").map((l) => {
    let [to, from] = l.split(" => ");
    atoms[from] = to;
  });

  let ws = [target];

  for (let i = 1; i <= 1000; i++) {
    let newWs = [];
    ws.forEach((w) => newWs.push(...sub(w)));

    ws = uniq(newWs);
    ws.sort((a, b) => a.length - b.length);
    ws = ws.slice(0, 100);
    if (ws.includes("e")) {
      return i;
    }
  }
}
