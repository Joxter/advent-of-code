import { rotateGrid90, runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/13

console.log(part1(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`));

console.log(part1(`...##.#
.##.###
.##.###
...##.#
#...###
.#..##.
##.##.#
...####
#.#.###
#....#.
..#.##.
..#.##.
#....#.
#.#.#.#
...####
`));

// 1 ...##.#
// 2 .##.###
// 3 .##.###
// 4 ...##.#
// 5 #...###
// 6 .#..##.
// 7 ##.##.#
// 8 ...####
// 9 #.#.###
// 0 #....#.
// 1 ..#.##. ---
// 2 ..#.##.
// 3 #....#.
// 4 #.#.#.#
// 5 ...####


runDay(2023, 13)
  .part(1, part1) // low 24951, 22624, (45619, 59478 wrong)
  // .part(2, part2)
  .end();
// try 51441, 37159
// 40281 --??

function part1(inp) {
  let patterns = inp.split('\n\n');

  let rowsAndCols = patterns.map((pattern, i) => {
    console.log('-- Pattern', i);
    let lines = pattern.split('\n');
    // console.log(lines.join('\n'));

    let horMaxOffset = 0;
    let horI = 0;
    let horOffset = 0;
    for (let i = 1; i < lines.length; i++) {
      horOffset = 1;
      if (lines[i] === lines[i - 1]) {
        // console.log('hor', i);

        while (
          i - horOffset >= 0 && (i - 1 + horOffset) < lines.length &&
          lines[i - horOffset] === lines[i - 1 + horOffset]
          ) {
          horOffset++;
        }
        // console.log('hor offset', horOffset);
      }

      if (horOffset > horMaxOffset) {
        // console.log({horOffset, i});
        horMaxOffset = horOffset;
        horI = i;
      }
    }
    // console.log({ horMaxOffset }, { horI });

    let vectMaxOffset = 0;
    let vecJ = 0;
    let vectOffset = 0;

    let rotated = rotateGrid90(pattern.split('\n').map(l => l.split('')));
    rotated = rotated.map(row => row.join(''));
    // console.log(rotated.join('\n'));

    for (let i = 1; i < rotated.length; i++) {
      vectOffset = 1;
      if (rotated[i] === rotated[i - 1]) {
        // console.log('vert', i);


        while (
          i - vectOffset >= 0 && (i - 1 + vectOffset) < rotated.length &&
          rotated[i - vectOffset] === rotated[i - 1 + vectOffset]
          ) {
          vectOffset++;
        }
        // console.log('vert offset', vectOffset);
      }

      if (vectOffset > vectMaxOffset) {
        vectMaxOffset = vectOffset;
        vecJ = i;
      }
    }

    // console.log({ vectMaxOffset }, { vecJ });
    console.log({ horMaxOffset, vectMaxOffset }, {horI, vecJ});

    return vectMaxOffset >= horMaxOffset ? vecJ  : horI * 100;
  });
  console.log(rowsAndCols);

  return sum(rowsAndCols);
}

/*

##..####.##
.##.#..#.#.
..###.###..
###.#.#.#.#
.##.#.#.#.#
..###.###.. -
.##.#..#.#. -
##..####.## -
.###..##..# - -
.###..##..# - -
##..####.## -
.##.#..#.#. -
..###.###..

*/

function part2(inp) {
  return 123;
}
