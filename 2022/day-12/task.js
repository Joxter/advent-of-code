import fs from 'fs';
import { runSolution } from '../../utils.js';

// https://adventofcode.com/2022/day/12

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

runSolution('test  ', () => part1(testInput), 31);
runSolution('part_1', () => part1(inputData), 497);

runSolution('test  ', () => part2(testInput), 29);
runSolution('part_2', () => part2(inputData), 492);

function part1(inp) {
  let heightMap = Object.fromEntries('abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map((char, i) => [char, i]));
  heightMap['S'] = heightMap['a'];
  heightMap['E'] = heightMap['z'];

  let path = findPath(inp, 'S', 'E', heightMap);
  return path.length;
}

function part2(inp) {
  let heightMap = Object.fromEntries('zyxwvutsrqponmlkjihgfedcba'
    .split('')
    .map((char, i) => [char, i]));
  heightMap['E'] = heightMap['z'];

  let path = findPath(inp, 'E', 'a', heightMap);
  return path.length;
}

function findPath(inp, start, finish, heightMap) {
  let grid = inp.split('\n').map((line) => line.split(''));
  let queue = [];

  let startPosition = [0, 0];
  grid.forEach((row, startX) => {
    row.forEach((char, startY) => {
      if (char === start) {
        startPosition = [startX, startY];
      }
    });
  });

  let visited = new Set();
  queue.push([[...startPosition], [[...startPosition]]]);
  visited.add(startPosition.join(','));

  while (queue.length > 0) {
    let [position, path] = queue.shift();
    let currentChar = grid[position[0]][position[1]];

    if (currentChar === finish) {
      // renderPath(grid, path);
      path.pop();
      return path;
    }

    let neibs = getNeibs(...position);

    for (let i = 0; i < neibs.length; i++) {
      let [x, y] = neibs[i];
      let neibChar = grid[x][y];

      if (heightMap[currentChar] + 1 >= heightMap[neibChar]) {
        queue.push([
          [x, y],
          [...path, [x, y]],
        ]);
        visited.add(`${x},${y}`);
      }
    }
  }
  return '';

  function getNeibs(x, y) {
    let res = [];

    if (x - 1 >= 0 && !visited.has(`${x - 1},${y}`)) res.push([x - 1, y]);
    if (grid[x + 1] && !visited.has(`${x + 1},${y}`)) res.push([x + 1, y]);

    if (y - 1 >= 0 && !visited.has(`${x},${y - 1}`)) res.push([x, y - 1]);
    if (grid[x][y + 1] && !visited.has(`${x},${y + 1}`)) res.push([x, y + 1]);

    return res;
  }
}

function renderPath(grid, _path) {
  let path = _path.map((position) => position.join(','));
  let result = grid.map((row, x) => {
    return row.map((char, y) => {
      return path.includes(x + ',' + y) ? char : ' ';
    }).join('');
  }).join('\n');
  // fs.writeFileSync('./path2.txt', result);
}