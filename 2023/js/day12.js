import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/12

console.log(part2(`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`));

runDay(2023, 12)
  // .part(1, part1)
  // .part(2, part2)
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
    // .slice(0, 2)
    .map((line, i, t) => {
      // console.log(i, t.length);
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

      let lim = 10000;

      function go(det, nums) {
        lim--;
        if (!lim) {
          console.log('ERROR LIMIT');
          return;
        }

        // console.log('GO: ');
        // console.log([det.join(' '), nums.join(', ')]);
        if (
          nums.length === 0 &&
          (det.length === 0 || det.length === 1 && getLastItem(det).ch === '.')
        ) {
          res++;
          return;
        }
        if (det.length === 0) return;

        let { n, ch } = getLastItem(det);

        if (ch === '.' || n === 0) {
          // nothing
          // console.log('nothing');
          go(popped(det), nums);
          return;
        }

        // ch: ?, #
        if (ch === '?') {
          // console.log('detract last "?"', det.length);
          go(detractLastItemMut([...det]), nums);
        }

        // find enough space between "?" amd "#"
        let currentNumber = nums.at(-1);
        let space = 0;
        let required = false;

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
              // TODO
              space += leftNumber;
              detractLastItemMut(det, leftNumber + 1); // +1 because it must be a "." after
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
        if (space === currentNumber) {
          // res++
          go([...det], popped(nums));
        }
      }

      go(det, numbers);

      console.log(res);

      return res;
    });


  return sum(comb);
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
  let { n, ch } = getLastItem(det);
  det[det.length - 1] = `${n - amount}${ch}`;
  return det;
}