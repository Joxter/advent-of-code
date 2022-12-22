import fs from 'fs';

// https://adventofcode.com/2022/day/22

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// console.log('test OK: ', part1(testInput), [6032]);
console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part2(testInput) === 123);
// console.log('answer2:', part2(inputData));

function part1(inp) {
  let dir = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, 1],
    'v': [0, -1],
  };
  let clockDir = ['>', 'v', '<', '^']; //.map(it => dir[it]);

  let [strMap, strRoute] = inp.split('\n\n');

  let map = strMap.split('\n').map((line) => {
    return line.split('').map((char) => char === '_' ? ' ' : char);
  });
  // row, col
  let startPos = [0, map[0].findIndex(it => it === '.')];

  // 10R5L5R10L4R5L5
  let route = strRoute.split(/(?=[LR]\d+)/);

  let i = 100_000;

  // console.log(startPos);
  // console.log(route);
  // console.log(map);

  let path = {[startPos.join(',')]: '>'};

  render(map, path)

  // Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^).
  // The final password is the sum of 1000 times the row, 4 times the column, and the facing.
  let result = 0;
  return result;
}

function part2(inp) {
  let result = 0;
  inp.split('\n').forEach((line) => {
  });
  return result;
}

function render(map, path) {
  // {[row,col]: '>'}
  let result = map.map((row, rowI) => {
    return row.map((char, colI) => {
      let pChar = path[rowI + ',' + colI];

      return pChar || char;

    }).join('');
  }).join('\n');
  console.log(result);
  // fs.writeFileSync('./path.txt', result);
}