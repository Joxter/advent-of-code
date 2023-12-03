import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/2

runDay(2023, 2)
  .part(1, part1)
  .part(2, part2);

function part1(inp) {
  let R = 12;
  let G = 13;
  let B = 14;

  return inp
    .split('\n')
    .map((game, i) => {
      let [_, sets] = game.split(': ');
      sets = sets.split('; ');
      let r = 0;
      let g = 0;
      let b = 0;

      sets.forEach((set) => {
        set.split(', ').forEach((color) => {
          let [cnt, col] = color.split(' ');

          if (col === 'red' && +cnt >= r) r = +cnt;
          if (col === 'green' && +cnt >= g) g = +cnt;
          if (col === 'blue' && +cnt >= b) b = +cnt;
        });
      });

      if (r <= R && g <= G && b <= B) {
        return i + 1;
      } else {
        return 0;
      }
    })
    .reduce((sum, cnt) => sum + cnt, 0);
}

function part2(inp) {
  return inp
    .split('\n')
    .map((game) => {
      let [_, sets] = game.split(': ');
      sets = sets.split('; ');
      let r = 0;
      let g = 0;
      let b = 0;

      sets.forEach((set) => {
        set.split(', ').forEach((color) => {
          let [cnt, col] = color.split(' ');

          if (col === 'red' && +cnt >= r) r = +cnt;
          if (col === 'green' && +cnt >= g) g = +cnt;
          if (col === 'blue' && +cnt >= b) b = +cnt;
        });
      });

      return r * g * b;
    })
    .reduce((sum, cnt) => sum + cnt, 0);
}

