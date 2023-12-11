import { rotateGrid90, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/11

runDay(2023, 11)
  .part(1, part1)
  .part(2, part2);

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
  grid = rotateGrid90(newGrid);

  newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    newGrid.push(row);
    if (!row.includes('#')) {
      newGrid.push([...row]);
    }
  }

  grid = newGrid;

  let galaxies = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let cell = grid[row][col];
      if (cell === '#') {
        galaxies.push([row, col]);
      }
    }
  }

  let total = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    let a = galaxies[i];

    for (let j = i + 1; j < galaxies.length; j++) {
      let b = galaxies[j];

      total += Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }
  }

  return total;
}

function part2(inp) {
  let grid = inp.split('\n').map(l => l.split(''));

  let oldRows = [];
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    if (!row.includes('#')) {
      oldRows.push(i);
    }
  }

  let oldCols = [];
  for (let i = 0; i < grid[0].length; i++) {
    let col = grid.map(row => row[i]);
    if (!col.includes('#')) {
      oldCols.push(i);
    }
  }

  let galaxies = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let cell = grid[row][col];
      if (cell === '#') {
        galaxies.push([row, col]);
      }
    }
  }

  let total = 0;
  let oldness = 1_000_000 - 1;
  for (let i = 0; i < galaxies.length - 1; i++) {
    let a = galaxies[i];

    for (let j = i + 1; j < galaxies.length; j++) {
      let b = galaxies[j];

      let oldRowsBetween = oldRows.filter(r => r > Math.min(a[0], b[0]) && r < Math.max(a[0], b[0])).length;
      let oldColsBetween = oldCols.filter(c => c > Math.min(a[1], b[1]) && c < Math.max(a[1], b[1])).length;

      let distance =
        Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
        + oldRowsBetween * oldness
        + oldColsBetween * oldness;

      total += distance;
    }
  }

  return total;
}
