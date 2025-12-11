import { runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/11

runDay(2025, 11)
  //
  .part(1, part1)
  // .part(2, part2)
  .part(2, part2notMyCode)
  .end();

function part1(inp) {
  let nodes = {};

  inp.split("\n").map((l) => {
    let [from, ...to] = l.replace(":", "").split(" ");
    nodes[from] = to;
  });

  let q = ["you"];
  let cnt = 0;

  while (q.length) {
    let cur = q.shift();

    if (cur === "out") {
      cnt++;
    } else if (nodes[cur]) {
      nodes[cur].forEach((t) => q.push(t));
    }
  }

  return cnt;
}

function part2(inp) {
  // todo
}

function part2notMyCode(inp) {
  const g = {};
  inp.split("\n").forEach((d) => {
    const [n, c] = d.split(": ");
    g[n] = c.split(" ");
  });

  let m = {};

  function dfs2(node, mask) {
    if (node === "dac") mask |= 1;
    if (node === "fft") mask |= 2;
    if (node === "out") {
      return mask === 3 ? 1 : 0;
    }
    const key = node + "|" + mask;
    if (m[key] !== undefined) return m[key];
    let count = 0;
    for (const nxt of g[node] || []) {
      count += dfs2(nxt, mask);
    }
    m[key] = count;
    return count;
  }

  return dfs2("svr", 0);
}
