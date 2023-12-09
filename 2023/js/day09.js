import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/9

runDay(2023, 9)
  .part(1, part1)
  .part(2, part2)
  .part(2, notMyPart2, 'not my, very cool trick');

function part1(inp) {
  let rows = inp
    .split('\n')
    .map((line) => line.split(' ').map(Number));

  let predictions = rows
    .map((row) => {
      let n = row.at(-1);

      while (!row.every(n => n === 0)) {
        let newRow = Array(row.length - 1);
        for (let i = 0; i < row.length - 1; i++) {
          newRow[i] = row[i + 1] - row[i];
        }
        n += newRow.at(-1);
        row = newRow;
      }

      return n;
    });

  return sum(predictions);
}

function part2(inp) {
  let rows = inp
    .split('\n')
    .map((line) => line.split(' ').map(Number));

  let predictions = rows
    .map((row) => {
      let history = [row[0]];

      while (!row.every(n => n === 0)) {
        let newRow = Array(row.length - 1);
        for (let i = 0; i < row.length - 1; i++) {
          newRow[i] = row[i + 1] - row[i];
        }
        history.push(newRow[0]);
        row = newRow;
      }

      return history.reduceRight((acc, it) => it - acc, 0);
    });

  return sum(predictions);
}

function notMyPart2(inp) {
  // https://www.reddit.com/r/adventofcode/comments/18e6z5h/2023_day_9_part_2_part_2_is_so_easy/
  let rows = inp
    .split('\n')
    .map((line) => line.split(' ').map(Number).reverse()); // only just .reverse() to my "part1", very cool!

  let predictions = rows
    .map((row) => {
      let n = row.at(-1);

      while (!row.every(n => n === 0)) {
        let newRow = Array(row.length - 1);
        for (let i = 0; i < row.length - 1; i++) {
          newRow[i] = row[i + 1] - row[i];
        }
        n += newRow.at(-1);
        row = newRow;
      }

      return n;
    });

  return sum(predictions);
}
