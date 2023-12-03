import fs from 'fs';
import path from 'path';

/**
 * @deprecated use `runDay` instead
 */
export function runSolution(label, fn, answer = null) {
  let start = Date.now();
  let res = null;
  try {
    res = fn();
  } catch (err) {
    console.error(err);
    res = 'ERROR';
  }

  let time = (Date.now() - start) / 1000;

  if (answer === null) {
    console.log('❓ ', label, res, `[sec ${time}]`);
    return;
  }

  if (res === answer) {
    console.log('✅', label, res, `[sec ${time}]`);
  } else {
    console.log(`❌`, label, `[sec ${time}]`);
    console.log(`  expected:`, answer);
    console.log(`  actual:  `, res);
  }
}

export function runDay(year, day) {
  let folder = new URL(`./${year}/inputs/d${String(day).padStart(2, '0')}/`, import.meta.url).pathname;
  let inputData = fileToString(path.join(folder, 'input.txt'));
  let part1 = fileToString(path.join(folder, 'part1.txt'));
  let part2 = fileToString(path.join(folder, 'part2.txt'));

  console.log(`https://adventofcode.com/${year}/day/${day}`);

  let runner = {
    part(part, fn, label = '') {
      let answer = part === 1 ? part1 : part2;

      let start = Date.now();
      let res;
      try {
        res = String(fn(inputData));
      } catch (err) {
        console.error(err);
        res = 'ERROR';
      }
      let time = (Date.now() - start) / 1000;

      if (!answer) {
        console.log('❓ ', label, res, `[sec ${time}]`);
      } else {
        if (res === answer) {
          console.log(`✅  part${part} [sec ${time}] ${label}`);
        } else {
          console.log(`❌`, label, `[sec ${time}]`);
          console.log(`  expected:`, answer);
          console.log(`  actual:  `, res);
        }
      }
      return runner;
    }
  };

  return runner;
}

function fileToString(p) {
  try {
    return fs.readFileSync(p).toString().trim();
  } catch (e) {
    return '';
  }
}

export function isNumericChar(char) {
  return char && char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

export function uniq(arr) {
  return [...new Set(arr)];
}

export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

export function allNeibs8(i, j) {
  return [
    [i, j + 1],
    [i, j - 1],
    [i + 1, j],
    [i - 1, j],
    [i + 1, j + 1],
    [i + 1, j - 1],
    [i - 1, j + 1],
    [i - 1, j - 1],
  ];
}