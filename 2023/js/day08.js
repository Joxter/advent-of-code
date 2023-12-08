import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/8

// console.log(part1(`LLR
//
// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`))
//
// console.log(part1(`RL
//
// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)`))

// runDay(2023, 8)
//   .part(1, part1)
//   .part(2, part2);

function part1(inp) {
  let [lr, nodes] = inp.split('\n\n');

  let map = {};
  nodes.split('\n').forEach((line) => {
    let name = line.slice(0, 3);
    let children = line.slice(7, -1).split(', ');
    map[name] = { L: children[0], R: children[1] };
  });

  let i = 0;
  let ii = 0;
  let current = 'AAA';

  while (current !== 'ZZZ' && ii< 100_000_000_000 && current) {
    ii++;
    if (!lr[i]) {
      i = 0;
    }
    current = map[current][lr[i]];
    i++;
  }

  return ii;
  //  // 9670000000
}

function part2(inp) {
  return 123;
}

