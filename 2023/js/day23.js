import { BLACK, GREY, makeGrid, printGrid, printGridCb, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/23

runDay(2023, 23)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGrid(inp);

  let w = grid[0].length;

  grid[0][1] = '#';
  grid.at(-1)[w - 2] = '#';

  let q = [[1, 1, 1]];

  let max = 0;

  while (q.length > 0) {
    let [i, j, len] = q.shift();
    let value = grid[i][j];

    if (value === '#') continue;
    if (value === '0') continue;

    if (typeof value === "number" && value < len && value + 2 !== len) {
      value = '.';
    }

    if (value === '.') {
      grid[i][j] = len;
      q.push([i, j - 1, len + 1]);
      q.push([i, j + 1, len + 1]);
      q.push([i - 1, j, len + 1]);
      q.push([i + 1, j, len + 1]);
    } else if (value === 'v') {
      q.push([i + 1, j, len + 1]);
    } else if (value === '>') {
      q.push([i, j + 1, len + 1]);
    }

    max = Math.max(len, max);
  }

  return max;
}

function part2(inp) {
  let grid = makeGrid(inp);

  let w = grid[0].length;

  grid[0][1] = '#';
  grid.at(-1)[w - 2] = '#';

  let crosses = {
    '1,1': {},
    [`${grid.length - 2},${grid[0].length - 2}`]: {},
  };
  makeCrosses();

  for (let crossesKey in crosses) {
    let [i, j] = crossesKey.split(',').map(Number);
    makePath(crossesKey, i, j, [crossesKey]);
  }

  function makePath(start, i, j, path) {
    let value = grid[i][j];
    if (value === '#') return;
    if (path.length > 0 && path.lastIndexOf(path.at(-1)) !== path.indexOf(path.at(-1))) {
      return;
    }
    if (`${i},${j}` !== start && crosses[`${i},${j}`]) {
      crosses[start][`${i},${j}`] = path.length;
      return;
    }

    [
      [i, j - 1],
      [i, j + 1],
      [i - 1, j],
      [i + 1, j],
    ].forEach(([i, j]) => {
      makePath(start, i, j, [...path, `${i},${j}`]);
    });
  }

  let q = [
    [`1,1`, 0, [`1,1`]]
  ];
  let finalCoords = `${grid.length - 2},${grid[0].length - 2}`;

  let max = 0;
  while (q.length > 0) {
    let [coords, len, path] = q.pop();

    if (coords === finalCoords) {
      if (len > max) {
        max = len;
      }
    }

    Object
      .entries(crosses[coords])
      .forEach(([next, n]) => {
        if (!path.includes(next)) {
          q.push([next, len + n - 1, [...path, next]]);
        }
      });
  }

  return max + 2;

  function makeCrosses() {
    for (let i = 1; i < grid.length - 1; i++) {
      for (let j = 1; j < grid[0].length - 1; j++) {
        let value = grid[i][j];

        if (value !== '#') {
          let free = [
            [i, j - 1],
            [i, j + 1],
            [i - 1, j],
            [i + 1, j],
          ].filter(([i, j]) => {
            return grid[i][j] !== '#';
          });

          if (free.length > 2) {
            free.forEach((coord) => {
              crosses[`${i},${j}`] = {};
            });
          }
        }
      }
    }
  }
}
