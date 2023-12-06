import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/6

runDay(2023, 6)
  .part(1, part1)
  .part(1, part1math, 'math')
  .part(2, part2)
  .part(2, part2math, 'math');

function part1(inp) {
  let [times, dists] = inp.split('\n');
  times = times.split(/\s+/).slice(1).map(Number);
  dists = dists.split(/\s+/).slice(1).map(Number);

  let total = 1;
  for (let i = 0; i < times.length; i++) {
    let time = times[i];
    let dist = dists[i];

    let wins = 0;
    for (let j = 1; j < time; j++) {
      let curDist = j * (time - j);
      if (curDist > dist) {
        wins++;
      }
    }
    total *= wins;
  }

  return total;
}

function part1math(inp) {
  let [times, dists] = inp.split('\n');
  times = times.split(/\s+/).slice(1).map(Number);
  dists = dists.split(/\s+/).slice(1).map(Number);

  let total = 1;
  for (let i = 0; i < times.length; i++) {
    total *= solve(-times[i], dists[i]);
  }

  return total;
}

function part2(inp) {
  let [times, dists] = inp.split('\n');
  let time = +times.replace(/\D/g, '');
  let dist = +dists.replace(/\D/g, '');

  let wins = 0;
  for (let j = 1; j < time; j++) {
    let curDist = j * (time - j);
    if (curDist > dist) {
      wins++;
    }
  }

  return wins;
}

function part2math(inp) {
  let [times, dists] = inp.split('\n');
  let time = +times.replace(/\D/g, '');
  let dist = +dists.replace(/\D/g, '');

  return solve(-time, dist);
}

function solve(b, c) {
  let d = Math.sqrt((b / 2) ** 2 - c);

  return Math.floor(-b / 2 + d) - Math.ceil(-b / 2 - d) + 1;
}