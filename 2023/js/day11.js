import { printGrid, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/11

// console.log(part1(`...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....`));

runDay(2023, 11)
  .part(1, part1)
//   .part(2, part2);

function part1(inp) {
  let grid = inp.split('\n').map(l => l.split(''));

  let newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    newGrid.push(row);
    if (!row.includes('#')) {
      newGrid.push([...row]);
    }
  }
  grid = rotate2dGrid90(newGrid);

  newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    newGrid.push(row);
    if (!row.includes('#')) {
      newGrid.push([...row]);
    }
  }
  // console.log('--');
  // console.log(printGrid(newGrid));
  // console.log('--');
  grid = rotate2dGrid90(rotate2dGrid90(rotate2dGrid90(newGrid)));

  let galaxies = [];
  // row,col positions of "#"
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let cell = grid[row][col];
      if (cell === '#') {
        galaxies.push([row, col]);
      }
    }
  }

  let total = 0;
  // console.log(galaxies);
  for (let i = 0; i < galaxies.length - 1; i++) {
    let a = galaxies[i];

    for (let j = i + 1; j < galaxies.length; j++) {
      let b = galaxies[j];

      let distance = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
      // console.log(a, b, distance);

      total += distance;
    }
  }

  return total;
}

function part2(inp) {
  return 123;
}

function rotate2dGrid90(grid) {
  let newGrid = [];
  for (let i = 0; i < grid[0].length; i++) {
    let col = grid.map(row => row[i]).reverse();
    newGrid.push(col);
  }
  return newGrid;
}
