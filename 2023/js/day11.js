import { forEachInGrid, rotateGrid90, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/11

runDay(2023, 11)
  .part(1, part1)
  .part(1, (inp) => part1and2(inp, 2), 'general solution O(stars^2)')
  .part(1, (inp) => part12alter(inp, 2), 'part12alter O(grid_size)')
  .part(2, part2)
  .part(2, (inp) => part1and2(inp, 1_000_000), 'general solution O(stars^2)')
  .part(2, (inp) => part12alter(inp, 1_000_000), 'part12alter O(grid_size)')
  .end();

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

  let stars = [];
  forEachInGrid(grid, (cell, row, col) => {
    if (cell === '#') stars.push([row, col]);
  });

  let total = 0;
  for (let i = 0; i < stars.length - 1; i++) {
    let a = stars[i];

    for (let j = i + 1; j < stars.length; j++) {
      let b = stars[j];

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

  let stars = [];
  forEachInGrid(grid, (cell, row, col) => {
    if (cell === '#') stars.push([row, col]);
  });

  let total = 0;
  let oldness = 1_000_000 - 1;

  for (let i = 0; i < stars.length - 1; i++) {
    let a = stars[i];

    for (let j = i + 1; j < stars.length; j++) {
      let b = stars[j];

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

  let stars = [];
  forEachInGrid(grid, (cell, row, col) => {
    if (cell === '#') stars.push([row, col]);
  });

  let total = 0;
  oldness = oldness - 1;

  for (let i = 0; i < stars.length - 1; i++) {
    let a = stars[i];

    for (let j = i + 1; j < stars.length; j++) {
      let b = stars[j];

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

function part12alter(inp, oldness = 2) {
  let grid = inp.split('\n').map(l => l.split(''));

  let res = 0;

  let stars = 0;
  let age = 0;
  let prevForOneStar = 0;
  for (let i = 0; i < grid.length; i++) {
    let rowStars = 0;
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '#') rowStars++;
    }

    if (rowStars === 0) {
      age += oldness;
    } else {
      let toAddForOneStar = (prevForOneStar + stars * (age + 1));
      prevForOneStar = toAddForOneStar;

      stars += rowStars;
      res += toAddForOneStar * rowStars;

      age = 0;
    }
  }

  stars = 0;
  age = 0;
  prevForOneStar = 0;
  for (let i = 0; i < grid[0].length; i++) {
    let rowStars = 0;
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] === '#') rowStars++;
    }

    if (rowStars === 0) {
      age += oldness;
    } else {
      let toAddForOneStar = (prevForOneStar + stars * (age + 1));
      prevForOneStar = toAddForOneStar;

      stars += rowStars;
      res += toAddForOneStar * rowStars;

      age = 0;
    }
  }

  return res;
}
