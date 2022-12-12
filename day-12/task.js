import fs from 'fs';

// https://adventofcode.com/2022/day/12

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// console.log('test OK: ', part1(testInput, [0, 0]) === 31, [31]);
console.log('answer: ', part1(inputData, [20, 0]), [497]);

// console.log('test2 OK:', part2(testInput, [4, 0]) === 29, [29]);
console.log('answer2:', part2(inputData, [20, 0]), [492]);

function part1(inp, startPosition) {
  return findPath(inp, startPosition).length;
}

function part2(inp, startPosition) {
  // console.log(findPath(inp, startPosition).replace('S', 'a').replace(/a+/, 'a'));
  return findPath(inp, startPosition).replace(/a+/, 'a').length;
}

function findPath(inp, startPosition) {
  let grid = inp.split('\n').map((line) => line.split(''));
  let queue = [];
  let heightMap = Object.fromEntries('SabcdefghijklmnopqrstuvwxyzE'
    .split('')
    .map((char, i) => [char, i]));
  heightMap['S'] = heightMap['a'];

  let visited = new Set();
  queue.push([[...startPosition], [[...startPosition]]]);
  visited.add(startPosition.join(','));

  let stop = 100_000;

  while (queue.length > 0 && stop--) {
    let [position, path] = queue.shift();
    let currentChar = grid[position[0]][position[1]];
    // console.log(currentChar, path.length);

    if (currentChar === 'E') {
      path.pop();
      // console.log(path.map(([x, y]) => grid[x][y]).join(''));
      // console.log(path.map(([x, y]) => grid[x][y]).join(''), path.map(([x, y]) => grid[x][y]).join('').length);
      return path.map(([x, y]) => grid[x][y]).join('');
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
