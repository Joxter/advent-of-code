import { formatTime, runDay, uniq } from '../../utils.js';

// https://adventofcode.com/2023/day/8

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
    if (i === lr.length) {
      i = 0;
    }
    current = map[current][lr[i]];
    i++;
  }

  return ii;
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

  let startTime = Date.now();

  let current = Object.keys(map).filter(n => n[2] === 'A');
  lr = lr.split('').map(it => it === 'L' ? 0 : 1);

  let limit = Number.MAX_SAFE_INTEGER;

  let periods = {};

  while (!current.every(n => n[2] === 'Z') && ii < limit) {
    ii++;
    if (i === lr.length) {
      i = 0;
    }

    current.forEach((name, id) => {
        current[id] = map[name][lr[i]];

        let key = current[id] + '-' + i;

        if (!periods[key]) {
          periods[key] = [];
        }
        if (Array.isArray(periods[key])) {
          if (periods[key].length > 5) {
            periods[key] = periods[key].at(-1) - periods[key].at(-2);
          } else {
            periods[key].push(ii);
          }
        }
      }
    )
    ;

    i++;
  }

  return ii;
}


/*
 periods
    [ 'NPZ-268', 11567 ],
  [ 'SPZ-268', 12643 ],
  [ 'GHZ-268', 14257 ],
  [ 'HVZ-268', 15871 ],
  [ 'NNZ-268', 19099 ],
  [ 'ZZZ-268', 19637 ]


  Наибольший общий делитель: 269

наименьшее общее кратное
НОК (11567, 12643, 14257, 15871, 19099, 19637) = 8811050362409

// CORRECT 8811050362409 would take 189hours
//           55180000000 (71min)

*/
