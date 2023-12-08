import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/8

// console.log(part2(`LR
//
// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`))

runDay(2023, 8)
  .part(1, part1)
  .part(2, part2);

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

  while (current !== 'ZZZ' && ii < 100_000_000_000 && current) {
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
  let [lr, nodes] = inp.split('\n\n');

  let map = {};
  nodes.split('\n').forEach((line) => {
    let name = line.slice(0, 3);
    let children = line.slice(7, -1).split(', ');
    map[name] = children;
  });

  let i = 0;
  let ii = 0;
  let current = Object.keys(map).filter(n => n[2] === 'A');
  // console.log(current);
  // return  4;
  lr = lr.split('').map(it => it === 'L' ? 0 : 1);

  while (!current.every(n => n[2] === 'Z') && ii < 100_000_000_000) {
    ii++;
    if (ii % 1_000_000 === 0) {
      console.log(ii, current, (ii * 100) / 100_000_000_000);
    }
    if (i === lr.length) {
      i = 0;
    }

    current.forEach((name, id) => {
      current[id] = map[name][lr[i]];
    });
    i++;
  }

  return ii;
}

