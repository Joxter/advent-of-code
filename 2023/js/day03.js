import { allNeibs8, uniq, isNumericChar, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/3

runDay(2023, 3)
  .part(1, part1)
  .part(2, part2);

function part1(inp) {
  let lines = `.\n${inp}\n.`.split('\n');
  let total = 0;

  lines.forEach((line, i) => {
      let num = '';
      let isDetail = false;

      for (let j = 0; j <= line.length; j++) {
        if (isNumericChar(lines[i][j])) {
          num = num + lines[i][j];

          if (
            allNeibs8(i, j)
              .some(([ii, jj]) => isEngineChar(lines[ii][jj]))
          ) {
            isDetail = true;
          }
        } else if (num) {
          if (isDetail) {
            total += +num;
          }
          num = '';
          isDetail = false;
        }
      }
    }
  );

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
            return getNumber(lines[nI], nJ).join(':');
          });

        nums = uniq(nums).filter(Boolean).map(n => +(n.split(':')[1]));

        if (lines[i][j] === '*' && nums.length === 2) {
          total += nums[0] * nums[1];
        }
      }
    }
  });

  return total;
}

function isEngineChar(char) {
  return char && char !== '.' && !isNumericChar(char);
}

function getNumber(line, i) {
  if (isNumericChar(line[i])) {
    let l = getLeft(line, i - 1);
    let r = getRight(line, i + 1);

    return [i - l.length, l + line[i] + r];
  }

  function getLeft(line, i) {
    if (isNumericChar(line[i])) {
      return getLeft(line, i - 1) + line[i];
    }
    return '';
  }

  function getRight(line, i) {
    if (isNumericChar(line[i])) {
      return line[i] + getRight(line, i + 1);
    }
    return '';
  }

  return [];
}
