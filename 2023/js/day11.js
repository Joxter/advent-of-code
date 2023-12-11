import { forEachInGrid, rotateGrid90, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/11

runDay(2023, 11)
  .part(1, part1)
  .part(1, (inp) => part1and2(inp, 2), 'general solution')
  .part(2, part2)
  .part(2, (inp) => part1and2(inp, 1_000_000), 'general solution');

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
  forEachInGrid(grid, (cell, row, col) => {
    if (cell === '#') galaxies.push([row, col]);
  });

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
    if (!grid[i].includes('#')) {
      oldRows.push(i);
    }
  }

  let oldCols = [];
  for (let i = 0; i < grid[0].length; i++) {
    if (grid.every(row => row[i] === '.')) {
      oldCols.push(i);
    }
  }

  let galaxies = [];
  forEachInGrid(grid, (cell, row, col) => {
    if (cell === '#') galaxies.push([row, col]);
  });

  let total = 0;
  let oldness = 1_000_000 - 1;

  for (let i = 0; i < galaxies.length - 1; i++) {
    let a = galaxies[i];

    for (let j = i + 1; j < galaxies.length; j++) {
      let b = galaxies[j];

      let rowMin = Math.min(a[0], b[0]);
      let rowMax = Math.max(a[0], b[0]);
      let colMin = Math.min(a[1], b[1]);
      let colMax = Math.max(a[1], b[1]);

      let oldRowsBetween = oldRows.filter(r => r > rowMin && r < rowMax).length * oldness;
      let oldColsBetween = oldCols.filter(c => c > colMin && c < colMax).length * oldness;

      let distance = (rowMax - rowMin) + (colMax - colMin) + oldRowsBetween + oldColsBetween;

      total += distance;
    }
  }

  return total;
}

function part1and2(inp, oldness) {
  let grid = inp.split('\n').map(l => l.split(''));

  let oldRows = [];
  for (let i = 0; i < grid.length; i++) {
    if (!grid[i].includes('#')) {
      oldRows.push(i);
    }
  }

  let oldCols = [];
  for (let i = 0; i < grid[0].length; i++) {
    if (grid.every(row => row[i] === '.')) {
      oldCols.push(i);
    }
  }

  let galaxies = [];
  forEachInGrid(grid, (cell, row, col) => {
    if (cell === '#') galaxies.push([row, col]);
  });

  let total = 0;
  oldness = oldness - 1;

  for (let i = 0; i < galaxies.length - 1; i++) {
    let a = galaxies[i];

    for (let j = i + 1; j < galaxies.length; j++) {
      let b = galaxies[j];

      let rowMin = Math.min(a[0], b[0]);
      let rowMax = Math.max(a[0], b[0]);
      let colMin = Math.min(a[1], b[1]);
      let colMax = Math.max(a[1], b[1]);

      let oldRowsBetween = oldRows.filter(r => r > rowMin && r < rowMax).length * oldness;
      let oldColsBetween = oldCols.filter(c => c > colMin && c < colMax).length * oldness;

      let distance = (rowMax - rowMin) + (colMax - colMin) + oldRowsBetween + oldColsBetween;

      total += distance;
    }
  }

  return total;
}
