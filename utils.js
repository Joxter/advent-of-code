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

export function runDay(year, day, iters = 1) {
  let DD = String(day).padStart(2, '0');

  let inputFolder = new URL(`./inputs/${year}/`, import.meta.url).pathname;

  if (!fs.existsSync(path.join(inputFolder, `day${DD}.txt`))) {
    throw new Error(`Input file for ${year}/${day} not found. Too soon for ${day} december ${year}?`);
  }

  let ansFolder = new URL(`./${year}/answers/`, import.meta.url).pathname;
  let part1 = fileToStringOrEmpty(path.join(ansFolder, `day${DD}-part1.txt`));
  let part2 = fileToStringOrEmpty(path.join(ansFolder, `day${DD}-part2.txt`));

  let inputData = fs.readFileSync(path.join(inputFolder, `day${DD}.txt`)).toString().trim();

  console.log(`🎄${year}/${DD} https://adventofcode.com/${year}/day/${day}`);
  if (iters > 1) {
    console.log(`              (Best time in ${iters} iterations)`);
  }

  let runner = {
    part(part, fn, label = '') {
      let answer = part === 1 ? part1 : part2;

      let res;
      let minTime = Infinity;
      try {
        for (let i = 0; i < iters; i++) {
          let start = Date.now();
          res = String(fn(inputData));
          minTime = Math.min(minTime, Date.now() - start);
        }
      } catch (err) {
        console.error(err);
        res = 'ERROR';
      }
      let time = formatTime(minTime);

      if (!answer) {
        console.log(`      ❓  part${part} ${res} [${time}] ${label}`);
      } else {
        if (res === answer) {
          console.log(`      ✅  part${part} [${time}] ${label}`);
        } else {
          console.log(`      ❌  part${part} [${time}] ${label}`);
          console.log(`        expected:`, answer);
          console.log(`        actual:  `, res);
        }
      }
      return runner;
    },
    end() {
      // nothing
    }
  };

  return runner;
}

function fileToStringOrEmpty(p) {
  try {
    return fs.readFileSync(p).toString().trim();
  } catch (e) {
    return '';
  }
}

export function formatTime(timeMsec) {
  let sec = Math.floor(timeMsec / 1000);
  let min = Math.floor(sec / 60);
  sec = String(sec % 60).padStart(2, '0');

  let msec = String(timeMsec % 1000).padStart(3, '0');

  return `${min}:${sec}.${msec}`;
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

export function lcm(list) {
  let res = list[0];
  for (let i = 1; i < list.length; i++) {
    res = lcm(res, list[i]);
  }
  return res;

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  function gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}

export function printGrid(grid) {
  let res = '\n' +grid.map(row => row.join('')).join('\n');

  return res;
}

export function waitHard(msec) {
  let start = Date.now();
  while (Date.now() - start < msec) {
    //
  }
}

export function rotateGrid90(grid) {
  // rotate T[][] or string[] clockwise. Returns T[][] or string[][]
  let newGrid = [];
  for (let i = 0; i < grid[0].length; i++) {
    let col = grid.map(row => row[i]).reverse();
    newGrid.push(col);
  }
  return newGrid;
}

export function forEachInGrid(grid, cb) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      cb(grid[i][j], i, j);
    }
  }
}