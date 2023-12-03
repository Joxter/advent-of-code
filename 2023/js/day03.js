import { allNeibs8, inuq, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/3

runDay(2023, 3)
  .part(1, part1)
  .part(2, part2);

function part1(inp) {
  let lines = `.\n${inp}\n.`.split('\n');
  let total = 0;

  lines.forEach((line, i) => {
    let num = '';
    let isEngine = false;

    for (let j = 0; j <= line.length; j++) {
      if (isNumeric(lines[i][j])) {
        num = num + lines[i][j];

        if (isEngineChar(lines[i][j + 1])
          || isEngineChar(lines[i][j - 1])
          || isEngineChar(lines[i + 1][j])
          || isEngineChar(lines[i - 1][j])
          || isEngineChar(lines[i + 1][j + 1])
          || isEngineChar(lines[i + 1][j - 1])
          || isEngineChar(lines[i - 1][j + 1])
          || isEngineChar(lines[i - 1][j - 1])
        ) {
          isEngine = true;
        }
      } else if (num) {
        if (isEngine) {
          total += +num;
        }
        num = '';
        isEngine = false;
      } else {
        isEngine = false;
      }
    }
  });

  return total;
}

function part2(inp) {
  let lines = `.\n${inp}\n.`.split('\n');
  let total = 0;

  lines.forEach((line, i) => {
    for (let j = 0; j <= line.length; j++) {
      if (isEngineChar(lines[i][j])) {
        let nums = allNeibs8(i, j)
          .map(([nI, nJ]) => {
            let n = getNumber(lines[nI], nJ);

            if (n) {
              return n.join(':');
            }
            return '';
          });

        nums = inuq(nums).filter(Boolean).map(n => +(n.split(':')[1]));

        if (lines[i][j] === '*' && nums.length === 2) {
          total += nums[0] * nums[1];
        }
      }
    }
  });

  return total;
}

function isNumeric(char) {
  return !!char && '1234567890'.includes(char);
}

function isEngineChar(char) {
  let engineChars = ['*', '%', '$', '@', '&', '+', '/', '#', '=', '-'];
  return engineChars.includes(char);
}

function getNumber(line, i) {
  if (isNumeric(line[i])) {
    let l = getLeft(line, i - 1);
    let r = getRight(line, i + 1);

    return [i - l.length, l + line[i] + r];
  }

  function getLeft(line, i) {
    if (isNumeric(line[i])) {
      return getLeft(line, i - 1) + line[i];
    }
    return '';
  }

  function getRight(line, i) {
    if (isNumeric(line[i])) {
      return line[i] + getRight(line, i + 1);
    }
    return '';
  }

  return null;
}
