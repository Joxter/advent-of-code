import { runDay } from '../../utils.js';

// https://adventofcode.com/2022/day/1

runDay(2022, 1)
  .part(1, run, 'naive js')
  .part(2, runPart2, 'naive js');

function run(inp) {
  let totals = inp.split('\n\n').map((calories) => {
    return calories.split('\n').reduce((sum, cnt) => sum + +cnt, 0);
  });

  return Math.max(...totals);
}

function runPart2(inp) {
  let totals = inp.split('\n\n').map((calories) => {
    return calories.split('\n').reduce((sum, cnt) => sum + +cnt, 0);
  });
  totals.sort((a, b) => b - a);

  return totals[0] + totals[1] + totals[2];
}

