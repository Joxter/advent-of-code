import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/3

// console.log(part1(`......633
// ......#..`));

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

function isNumeric(char) {
  return '1234567890'.includes(char);
}

function isEngineChar(char) {
  let engineChars = ['*', '%', '$', '@', '&', '+', '/', '#', '=', '-'];
  return engineChars.includes(char);
}
