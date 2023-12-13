import { rotateGrid90, runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/13

runDay(2023, 13)
  .part(1, part1)
  .part(2, part2)
  .end();

// Because you have guessed incorrectly 10 times on this puzzle, please wait 10 minutes before trying again. [Return to Day 13]

function part1(inp) {
  let reflections = inp
    .split('\n\n')
    .map((pattern) => findReflection(pattern));

  return sum(reflections);
}

function part2(inp) {
  let reflections = inp
    .split('\n\n')
    .map((pattern) => findReflection2(pattern));

  return sum(reflections);
}

function findReflection(pattern) {
  let lines = pattern.split('\n');

  let horizontal = symmetry(lines);
  if (horizontal) {
    return horizontal * 100;
  }

  return symmetry(rotateGrid90(lines).map(row => row.join('')));

  function symmetry(lines) {
    for (let i = 1; i < lines.length; i++) {
      let offset = 0;

      while (lines[i - offset] === lines[i - 1 + offset]) {
        if (offset === i || (i + offset) === lines.length) return i;
        offset++;
      }
    }
    return 0;
  }
}

function findReflection2(pattern) {
  let lines = pattern.split('\n');

  let horizontal = symmetry(lines);
  if (horizontal) {
    return horizontal * 100;
  }

  return symmetry(rotateGrid90(lines).map(row => row.join('')));

  function symmetry(lines) {
    let ans = 0;

    for (let i = 1; i < lines.length; i++) {
      let offset = 0;
      let collectDiff = 0;

      while (true) {
        let l = i - 1 - offset;
        let r = i + offset;
        if (l < 0 || r >= lines.length) break;

        collectDiff += diff(lines[l], lines[r]);

        if (collectDiff > 1) {
          break;
        } else if (collectDiff === 1 && (l === 0 || r === lines.length - 1)) {
          ans = i;
          break;
        }

        offset++;
      }
    }

    return ans;
  }

  function diff(lineA, lineB) {
    let cnt = 0;
    for (let i = 0; i < lineA.length; i++) {
      if (lineA[i] !== lineB[i]) cnt++;
    }
    return cnt;
  }
}
