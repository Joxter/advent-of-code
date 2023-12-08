import { lcm, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/8

runDay(2023, 8)
  .part(1, part1)
  .part(2, part2);

function part1(inp) {
  let [lr, nodes] = inp.split('\n\n');

  let map = {};
  nodes.split('\n').forEach((line) => {
    let name = line.slice(0, 3);
    map[name] = line.slice(7, -1).split(', ');
  });
  lr = lr.split('').map(it => it === 'L' ? 0 : 1);

  let i = 0;
  let ii = 0;
  let current = 'AAA';

  while (true) {
    if (i === lr.length) i = 0;

    current = map[current][lr[i]];
    if (current[2] === 'Z') return ii + 1;

    i++;
    ii++;
  }
}

function part2(inp) {
  let [lr, nodes] = inp.split('\n\n');

  let map = {};
  nodes.split('\n').forEach((line) => {
    let name = line.slice(0, 3);
    map[name] = line.slice(7, -1).split(', ');
  });
  lr = lr.split('').map(it => it === 'L' ? 0 : 1);

  let periods = Object.keys(map)
    .filter(n => n[2] === 'A')
    .map((current) => {
      let i = 0;
      let ii = 0;

      while (true) {
        if (i === lr.length) i = 0;

        current = map[current][lr[i]];
        if (current[2] === 'Z') return ii + 1;

        i++;
        ii++;
      }
    });

  return lcm(periods);
}
