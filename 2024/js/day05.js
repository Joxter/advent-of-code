import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/5

runDay(2024, 5)
  //
  .part(1, part1) // 100 iters = 0.259
  .part(2, part2) // 100 iters = 1.689
  .part(2, part2faster, "faster") // 100 iters = 0.168
  .end();

function part1(inp) {
  let [_rules, updates] = inp.trim().split("\n\n");

  let rules = _rules.split("\n").map((l) => {
    return [+l.slice(0, 2), +l.slice(3, 5)];
  });

  let n = updates
    .split("\n")
    .map((l) => l.split(",").map((n) => +n))
    .filter((nums) => {
      return rules.every((rule) => {
        return nums.includes(rule[0]) && nums.includes(rule[1])
          ? nums.indexOf(rule[0]) <= nums.indexOf(rule[1])
          : true;
      });
    })
    .map((it) => it[it.length >> 1]);

  return sum(n);
}

function part2(inp) {
  let [_rules, updates] = inp.trim().split("\n\n");

  let rules = _rules.split("\n").map((l) => {
    return [+l.slice(0, 2), +l.slice(3, 5)];
  });

  let n = updates
    .split("\n")
    .map((l) => l.split(",").map((n) => +n))
    .filter((nums) => {
      let a = nums.join(",");
      nums.sort((a, b) => {
        let rule = rules.find((r) => r.includes(a) && r.includes(b));
        return rule.indexOf(a) - rule.indexOf(b);
      });

      return nums.join(",") !== a;
    })
    .map((it) => it[it.length >> 1]);

  return sum(n);
}

function part2faster(inp) {
  let [_rules, updates] = inp.trim().split("\n\n");

  let rules = Object.fromEntries(
    _rules.split("\n").map((l) => {
      return [l, [+l.slice(0, 2), +l.slice(3, 5)]];
    }),
  );

  let n = updates
    .split("\n")
    .map((l) => l.split(",").map((n) => +n))
    .filter((nums) => {
      let a = nums.join(",");
      nums.sort((a, b) => {
        let rule = rules[a + "|" + b] || rules[b + "|" + a];
        return rule.indexOf(a) - rule.indexOf(b);
      });

      return nums.join(",") !== a;
    })
    .map((it) => it[it.length >> 1]);

  return sum(n);
}
