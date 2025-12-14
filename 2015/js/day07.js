import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/7

runDay(2015, 7)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let values = {};
  let nodes = {};

  inp.split("\n").forEach((l) => {
    let [left, out] = l.split(" -> ");
    nodes[out] = left;
  });

  return calc("a", values, nodes);
}

function part2(inp) {
  let values = {};
  let nodes = {};

  inp.split("\n").forEach((l) => {
    let [left, out] = l.split(" -> ");
    nodes[out] = left;
  });
  nodes["b"] = part1(inp);

  return calc("a", values, nodes);
}

function calc(name, values, nodes) {
  if (values[name]) return values[name];
  if (/^\d+$/.test(name)) return +name;

  let left = nodes[name];

  if (/^\S+$/.test(left)) return calc(left, values, nodes);

  if (left.includes(" AND ")) {
    let [a, b] = left.split(" AND ");
    values[name] = calc(a, values, nodes) & calc(b, values, nodes)
  } else if (left.includes(" OR ")) {
    let [a, b] = left.split(" OR ");
    values[name] = calc(a, values, nodes) | calc(b, values, nodes);
  } else if (left.includes(" LSHIFT ")) {
    let [a, b] = left.split(" LSHIFT ");
    values[name] = calc(a, values, nodes) << calc(b, values, nodes);
  } else if (left.includes(" RSHIFT ")) {
    let [a, b] = left.split(" RSHIFT ");
    values[name] = calc(a, values, nodes) >> calc(b, values, nodes);
  } else if (left.includes("NOT ")) {
    let a = left.replace("NOT ", "");
    values[name] = ~calc(a, values, nodes) & 65535;
  }
  return values[name];
}
