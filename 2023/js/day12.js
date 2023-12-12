import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/12

runDay(2023, 12)
  .part(1, part1)
  .part(1, part1Fast, 'fast')
  .part(2, part2)
  .end();

function part1(inp) {
  let comb = inp
    .split('\n')
    .map((line, i, t) => {
      let [details, numbers] = line.split(' ');

      let noUnknowns = details.split('').map((ch) => ch === '?' ? '.' : ch);
      let unknownsIds = details
        .split('')
        .map((char, i) => char === '?' ? i : '-')
        .filter(it => it !== '-');

      let max = 2 ** unknownsIds.length;

      let cnt = 0;
      for (let i = 1; i < max; i++) {
        let mask = i.toString(2).padStart(unknownsIds.length, '0');

        let testLine = [...noUnknowns];
        mask.split('').forEach((maskChar, i) => {
          testLine[unknownsIds[i]] = maskChar === '1' ? '#' : '.';
        });

        let toNumbers = testLine
          .join('')
          .split(/\.+/)
          .filter(Boolean)
          .map(it => it.length)
          .join(',');

        if (toNumbers === numbers) {
          cnt++;
        }
      }

      return cnt || 1;
    });

  return sum(comb);
}

function part1Fast(inp) {
  let comb = inp
    .split('\n')
    .map((line) => solve2(line));

  return sum(comb);
}

function part2(inp) {
  let comb = inp
    .split('\n')
    .map((line) => {
      let [details, numbers] = line.split(' ');
      details = Array(5).fill(details).join('?');
      numbers = Array(5).fill(numbers).join(',');
      numbers = numbers.split(',').map(it => +it);

      line = details + ' ' + numbers;

      return solve2(line);
    });

  return sum(comb);
}

function solve2(line) {
  let [details, numbers] = line.split(' ');
  numbers = numbers.split(',').map(it => +it);

  let cache = {};

  function dp(details, numbers, acc, smol) {
    if (details.length < sum(numbers)) {
      return 0;
    }

    let cacheKey = `${details}|${numbers.join(',')}|${+smol}`;
    if (cacheKey in cache) {
      return cache[cacheKey];
    }

    if (numbers.length === 0) {
      if (details.includes('#')) {
        return 0;
      } else {
        return 1;
      }
    }

    if (smol) {
      if (numbers[0] === 0) {
        if (details === '' || details[0] === '?' || details[0] === '.') {
          numbers.shift();
          let r = dp(details.slice(1), numbers, acc + '.', false);
          cache[cacheKey] = r;
          return r;
        } else {
          cache[cacheKey] = 0;
          return 0;
        }
      }

      if (details[0] === '#' || details[0] === '?') {
        numbers[0]--;

        return dp(details.slice(1), numbers, acc + '#', true);
      }
    } else {
      if (details[0] === '#') {
        numbers[0]--;

        return dp(details.slice(1), numbers, acc + '#', true);
      }
      if (details[0] === '?') {
        let a = dp(details, [...numbers], acc, true); // start smolling
        let b = dp(details.slice(1), [...numbers], acc + '.', false); // skip
        return a + b;
      }
      if (details[0] === '.') {
        return dp(details.slice(1), [...numbers], acc + '.', false);
      }
    }

    cache[cacheKey] = 0;
    return 0;
  }

  let res = dp(details, numbers, '', false);

  return res;
}
