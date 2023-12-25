import { runDay } from "../../utils.js";

// https://adventofcode.com/2023/day/25

runDay(2023, 25)
  .part(1, part1)
  .end();

function part1(inp) {
  // hardcode
  let toRemove = [
    "bbm mzg",
    "cth xxk",
    "zdj nvt",
  ];

  let pairs = inp
    .split("\n")
    .map((line) => {
      let [l, b] = line.split(": ");
      return b.split(" ").map((r) => {
        return [l, r];
      });
    })
    .flat()
    .filter(([l, r]) => {
      return !(toRemove.includes(`${l} ${r}`) || toRemove.includes(`${r} ${l}`));
    });

  let nodes = {};
  pairs
    .forEach(([l, r]) => {
      if (!nodes[l]) nodes[l] = [];
      nodes[l].push(r);

      if (!nodes[r]) nodes[r] = [];
      nodes[r].push(l);
    });

  const total = Object.keys(nodes).length;
  let cnt = 0;

  function explore(node, visited) {
    if (visited[node]) return;

    visited[node] = true;
    cnt++;

    for (const key of node) {
      explore(nodes[key], visited);
    }
  }

  // hardcode
  explore(nodes["ssr"], {});

  return cnt * (total - cnt);
}
