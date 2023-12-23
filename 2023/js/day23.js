import { BLACK, makeGrid, printGrid, printGridCb, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/23

console.log(part2(`#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`));

runDay(2023, 23)
  // .part(1, part1)
  .part(2, part2, '1625 low')
  .end();

function part1(inp) {
  let grid = makeGrid(inp);

  let w = grid[0].length;

  grid[0][1] = '#';
  grid.at(-1)[w - 2] = '#';

  console.log(printGrid(grid));

  let q = [[1, 1, 1]];

  let max = 0;

  let limit = 2000000;

  while (q.length > 0 && limit--) {
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
      // grid[i][j] = len;
      q.push([i + 1, j, len + 1]);
    } else if (value === '>') {
      // grid[i][j] = len;
      q.push([i, j + 1, len + 1]);
    }

    max = Math.max(len, max);
  }

  console.log('');
  console.log(printGridCb(grid, (cell) => {
    if (typeof cell === "number") return cell % 10;
    if (cell === '#') return BLACK;
    return cell;
  }));

  return max;
}

function part2(inp) {
  let grid = makeGrid(inp);

  let w = grid[0].length;

  grid[0][1] = '#';
  grid.at(-1)[w - 2] = '#';

  console.log(printGrid(grid));

  let q = [[1, 1, [`1,1`]]];

  let maxPath = [];

  let limit = 100_000_000;

  grid[0][1] = '#';
  grid[grid.length - 2][grid[0].length - 2] = 'X';

  while (q.length > 0 && limit--) {
    // break
    let [i, j, path] = q.shift();
    // console.log([i,j, path]);
    let value = grid[i][j];
    let isFinal = i === grid.length - 2 && j === grid[0].length - 2;

    if (value === '#') continue;
    if (path.lastIndexOf(path.at(-1)) !== path.indexOf(path.at(-1))) {
      continue;
    }

    if (isFinal) {
      console.log('final', [maxPath.length], {limit}, q.length);
      if (path.length > maxPath.length) {
        maxPath = path
      }
    }

    if (typeof value === "number" && value < path && value + 2 !== path) {
      value = '.';
    }

    q.push([i, j - 1, [...path, `${i},${j - 1}`]]);
    q.push([i, j + 1, [...path, `${i},${j + 1}`]]);
    q.push([i - 1, j, [...path, `${i - 1},${j}`]]);
    q.push([i + 1, j, [...path, `${i + 1},${j}`]]);

    // max = Math.max(path.length, max);
  }

  console.log('');
  console.log(printGridCb(grid, (cell, i,j) => {
    if (maxPath.includes(`${i},${j}`)) return '0'

    if (typeof cell === "number") return cell % 10;
    if (cell === '#') return BLACK;
    return cell;
  }));

  console.log({limit});
  return maxPath.length + 1;
}

