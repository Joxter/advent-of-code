import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/9
// todo optimise

runDay(2015, 9)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let map = {};
  let cities = new Set();

  inp.split("\n").forEach((l) => {
    let [from, _1, to, _2, len] = l.split(" ");
    map[from + to] = +len;
    map[to + from] = +len;
    cities.add(from);
    cities.add(to);
  });

  cities = [...cities];
  let result = Infinity;

  permutations(cities).forEach((path) => {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      total += map[path[i] + path[i + 1]];
    }
    result = Math.min(total, result);
  });

  return result;
}

function part2(inp) {
  let map = {};
  let cities = new Set();

  inp.split("\n").forEach((l) => {
    let [from, _1, to, _2, len] = l.split(" ");
    map[from + to] = +len;
    map[to + from] = +len;
    cities.add(from);
    cities.add(to);
  });

  cities = [...cities];
  let result = 0;

  permutations(cities).forEach((path) => {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      total += map[path[i] + path[i + 1]];
    }
    result = Math.max(total, result);
  });

  return result;
}

function permutations(arr) {
  let result = [];

  function _perm(p, rest) {
    if (rest.length === 0) {
      result.push(p);
    } else {
      rest.forEach((it, i) => {
        let newRest = [...rest];
        newRest.splice(i, 1);
        _perm([...p, it], newRest);
      });
    }
  }

  _perm([], arr);

  return result;
}
