import { runDay, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/23

// console.log(
//   part1(`kh-tc
// qp-kh
// de-cg
// ka-co
// yn-aq
// qp-ub
// cg-tb
// vc-aq
// tb-ka
// wh-tc
// yn-cg
// kh-ub
// ta-co
// de-co
// tc-td
// tb-wq
// wh-td
// ta-ka
// td-qp
// aq-cg
// wq-ub
// ub-vc
// de-ta
// wq-aq
// wq-vc
// wh-yn
// ka-de
// kh-ta
// co-tc
// wh-qp
// tb-vc
// td-yn`),
// );

runDay(2024, 23)
  //
  // .part(1, part1)
  .part(2, part2)
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
  return 123;
}
