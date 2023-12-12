import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/12

// console.log(part2(`???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1`));

// console.log(part2(`?? 1`));
// console.log(part2(`?..?.??... 1`));
// console.log(part2(`??.?? 1,1`));
// console.log(part2(`?#.??# 1,1`)); // 1
// console.log(part2(`?#? 2`));
// console.log(part2(`??.?#? 1,2`));
// console.log(part2(`??.?## 1,2`));
// console.log(part2(`??? 1,1`));
// console.log(part2(`???.### 1,1,3`));

// console.log(part2(`?#?#?#?#?#?#?#? 1,3,1,6`));

runDay(2023, 12)
  // .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let comb = inp
    .split('\n')
    // .slice(0, 10)
    .map((line, i, t) => {
      console.log(i, t.length);
      let [details, numbers] = line.split(' ');
      // numbers = numbers.split(',').map(Number);
      // console.log([details, numbers]);

      let noUnknowns = details.split('').map((ch) => ch === '?' ? '.' : ch);
      let unknownsIds = details
        .split('')
        .map((char, i) => char === '?' ? i : '-')
        .filter(it => it !== '-');

      let max = 2 ** unknownsIds.length;
      // console.log(line, max, unknownsIds);

      let cnt = 0;
      for (let i = 1; i < max; i++) {
        let mask = i.toString(2).padStart(unknownsIds.length, '0');
        // console.log(mask, noUnknowns.join(''));

        let testLine = [...noUnknowns];
        mask.split('').forEach((maskChar, i) => {
          // console.log(unknownsId, mask[unknownsId]);
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
          // console.log(cnt, ' ' + testLine.join(''));
        }
      }

      // console.log([details, numbers], cnt);
      return cnt || 1;
    });


  return sum(comb);
}

function part2(inp) {
  let comb = inp
    .split('\n')
    // .slice(2, 3)
    .map((line, i, t) => {
      // console.log(i, t.length);
      let [details, numbers] = line.split(' ');
      details = Array(5).fill(details).join('?');
      numbers = Array(5).fill(numbers).join(',');
      numbers = numbers.split(',').map(it => +it);

      // console.log({line});
      line = details + ' ' + numbers;
      // console.log({line});

      console.log(i, t.length);
      console.log([line]);
      let res = solve2(line);
      // console.log([res, line.split(' ')]);
      return res;
    });


  return sum(comb);
}

function solve2(line) {
  let [details, numbers] = line.split(' ');
  numbers = numbers.split(',').map(it => +it);

  let cnt = 0;

  // details -  '??.#..###..'
  // nums    - [ 3, 1, 1 ]

  let limit = 100;

  // debugger
  function dp(details, numbers, acc, smol) {
    if (numbers[0] === 0) {
      debugger
    }
    // console.log([details, numbers.join(',')], [acc, smol]);
    limit--;

    if (!limit) {
      console.log([details, numbers], [acc, smol]);
      throw 'LIMIT';
      return;
    }

    if (numbers.length === 0) {
      if (details.includes('#')) {
        return;
      } else {
        cnt++;
        // console.log(acc);
        // debugger
        return;
      }
    }

    if (smol) {
      if (numbers[0] === 0 && (details === '' || details[0] === '?' || details[0] === '.')) {
        let n = [...numbers];
        n.shift();
        dp(details.slice(1), n, acc + '.', false);
        return;
      }

      if (details[0] === '#' || details[0] === '?') {
        let n = [...numbers];
        n[0]--;

        if (n[0] === 0) {
          dp(details.slice(1), n, acc + '#', true);
          return;
        } else {
          dp(details.slice(1), n, acc + '#', true);
          return;
        }
      }
    } else {
      if (details[0] === '#') {
        let n = [...numbers];
        n[0]--;

        dp(details.slice(1), n, acc + '#', true);
        return;
      }
      if (details[0] === '?') {
        dp(details, [...numbers], acc, true); // start smolling
        dp(details.slice(1), [...numbers], acc + '.', false); // skip
        return;
      }
      if (details[0] === '.') {
        dp(details.slice(1), [...numbers], acc + '.', false);
        return;
      }
    }

    // console.log('!!!!');
    // console.log({ details, numbers, acc, smol });
  }

  dp(details, numbers, '', false);

  return cnt;
}

function solve1() {
  console.log(line);
  let [details, numbers] = line.split(' ');
  // details = Array(5).fill(details).join('?');
  // numbers = Array(5).fill(numbers).join(',');
  numbers = numbers.split(',').map(it => +it);

  let det = [];
  let prevDet = details[0];
  let cnt = 1;
  details.slice(1).split('').forEach((ch) => {
    if (ch === prevDet) {
      cnt++;
    } else {
      det.push(`${cnt}${prevDet}`);
      prevDet = ch;
      cnt = 1;
    }
  });
  det.push(`${cnt}${prevDet}`);
  // console.log([details, det]);
  // details -   '????.#...#...'
  // det     - [ '4|?', '1|.', '1|#', '3|.', '1|#', '3|.' ]
  // nums    - [ 3, 1, 1 ]

  let res = 0;

  let lim = 100;

  debugger

  function go(det, nums, acc) {
    lim--;
    if (!lim) {
      throw 'LIMIT';
      return;
    }

    // console.log('GO: ', [acc]);
    // console.log([det.join(' '), nums.join(', ')]);
    if (
      nums.length === 0 &&
      det.map((it) => it.at(-1)).every(it => it === '.' || it === '?')
    ) {
      // console.log('>>> RES', acc);
      res++;
      return;
    }
    if (det.length === 0) return;

    let { n, ch } = getLastItem(det);

    if (n === 0) {
      // console.log('nothing1');
      go(popped(det), nums, acc);
      return;
    } else if (n < 0) {
      // debugger
      return;
    }

    if (ch === '.') {
      // console.log('nothing2');
      go(popped(det), nums, '.' + acc);
      return;
    }

    // ch: ?, #
    if (ch === '?') {
      // console.log('detract last "?"', det.length);

      // let r = +Math.random().toString().slice(2,10);
      // console.log('INNNNN', r);
      // console.log(det.join(' '), nums.join(','), acc);
      go(detractLastItemMut([...det]), nums, '.' + acc);
      // console.log('.... CONTINUE', r);
      // console.log([det.join(' '), nums.join(','), acc]);
    }

    let currentNumber = nums.at(-1);
    let space = 0;
    let required = false;

    // console.log('while');
    while (space < currentNumber) {
      if (det.length === 0) {
        // console.log('not enough space');
        return;
      }
      let leftNumber = currentNumber - space;

      let { ch, n } = getLastItem(det);

      if (ch === '.') {
        if (required) return; // '.#' ..2

        space = 0;
        det.pop(); // '.?' ..2
        continue;
      }

      if (ch === '#') {
        required = true;
      }

      if (ch === '#') {
        if (n > leftNumber) return; // impossible, '...###' 2
        if (n === leftNumber) {    // '...###' 3
          det.pop();
          space += n;
        }
        if (n < leftNumber) {      // '...##' 3
          det.pop();
          space += n;
        }
      } else if (ch === '?') {
        if (n > leftNumber) { //  '...???' 2
          space += leftNumber;
          detractLastItemMut(det, leftNumber + 1); // +1 because it must be a "." after
          break;
        }
        if (n === leftNumber) {    // '...???' 3
          det.pop();
          space += n;
        }
        if (n < leftNumber) {      // '...??' 3
          det.pop();
          space += n;
        }
      }
    }

    // console.log('while END');
    // console.log([det.join(' '), nums.join(','), acc]);
    if (space === currentNumber) {
      let newAcc;
      if (acc) {
        newAcc = '.' + '#'.repeat(currentNumber) + acc;
      } else {
        newAcc = '.' + '#'.repeat(currentNumber);
      }
      // console.log('ADD', [currentNumber, newAcc]);
      go(detractLastItemMut([...det]), popped(nums), newAcc);
    }
  }

  go(det, numbers, '');

  return res;
}

// det     - [ '4|?', '1|.', '1|#', '3|.', '1|#', '3|.' ]
function popped(det) {
  let a = [...det];
  a.pop();
  return a;
}

// det     - [ '4|?', '1|.', '1|#', '3|.', '1|#', '3|.' ]
function getLastItem(det) {
  let d = det.at(-1);
  let n = +d.slice(0, -1);
  let ch = d.at(-1);

  return { n, ch };
}

function detractLastItemMut(det, amount = 1) {
  if (det.length === 0) return det;

  let { n, ch } = getLastItem(det);
  det[det.length - 1] = `${Math.max(n - amount, 0)}${ch}`;
  return det;
}