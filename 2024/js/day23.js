import { runDay, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/23

runDay(2024, 23)
  //
  .part(1, part1)
  .part(2, part2) // todo does not work on test example
  .end();

function part1(inp) {
  let lan = {};

  inp
    .trim()
    .split("\n")
    .map((it) => {
      let [a, b] = it.split("-");

      if (!lan[a]) lan[a] = [];
      lan[a].push(b);
      if (!lan[b]) lan[b] = [];
      lan[b].push(a);
    });

  let trie = [];

  Object.entries(lan).forEach(([a, keysB]) => {
    keysB.forEach((b) => {
      lan[b].forEach((c) => {
        if (lan[c].includes(a)) {
          trie.push([a, b, c].toSorted().join(","));
        }
      });
    });
  });

  return (
    uniq(trie)
      //
      .filter((it) => it.startsWith("t") || it.includes(",t")).length
  );
}

function part2(inp) {
  let lan = {};
  inp
    .trim()
    .split("\n")
    .map((it) => {
      let [a, b] = it.split("-");
      if (!lan[a]) lan[a] = {};
      lan[a][b] = 1;
      if (!lan[b]) lan[b] = {};
      lan[b][a] = 1;
    });

  let max = ["", 0];

  Object.keys(lan).forEach((k, i) => {
    let all = Object.keys(lan[k]);

    for (let i = 0; i < all.length - 1; i++) {
      for (let j = i + 1; j < all.length; j++) {
        let a = all[i];
        let b = all[j];

        if (b in lan[a]) {
          lan[a][b]++;
          lan[b][a]++;
        }

        if (lan[a][b] > max[1]) {
          max = [a, lan[a][b]];
        }
      }
    }
  });

  return [
    ...new Set([
      max[0],
      ...Object.entries(lan[max[0]])
        .filter(([k, cnt]) => {
          return cnt === max[1];
        })
        .map((it) => it[0]),
    ]),
  ]
    .toSorted()
    .join(",");
}
