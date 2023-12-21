import { forEachInGrid, makeGridWithBorder, printGrid, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/21

console.log(part1(`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`));

runDay(2023, 21)
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, '#');
  let pos = [0, 0];

  forEachInGrid(grid, (cell, i, j) => {
    if (cell === 'S') {
      pos = [i, j];
    }
  });

  let possibleSteps = { [`${pos[0]},${pos[1]}`]: true };

  // console.log(printGrid(grid));
  // console.log(possibleSteps);

  for (let step = 1; step <= 64; step++) {
    let newSteps = {};

    for (const possibleStepsKey in possibleSteps) {
      let [i, j] = possibleStepsKey.split(',').map(Number);
      // console.log('>>', [i, j]);

      [[i, j + 1],
        [i, j - 1],
        [i + 1, j],
        [i - 1, j],
      ].forEach(([ni, nj]) => {
        // console.log([ni, nj]);
        if (grid[ni][nj] !== '#') {
          newSteps[`${ni},${nj}`] = true;
        }
      });
    }

    possibleSteps = newSteps;
    // console.log(step, possibleSteps);
  }

  return Object.keys(possibleSteps).length;
}

function part2(inp) {
  return 123;
}
