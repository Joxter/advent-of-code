import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/12

console.log(part1(`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`));

runDay(2023, 12)
  .part(1, part1)
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
  return 123;
}
