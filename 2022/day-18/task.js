import fs from 'fs';

// https://adventofcode.com/2022/day/18

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 64);
console.log('answer: ', part1(inputData), [4580]);

console.log('test2 OK:', part2(testInput) === 58);
console.log('answer2:', part2(inputData), [2610]);

function part1(inp) {
  let cubes = {};
  inp.trim().split('\n').forEach((line) => {
    cubes[line] = true;
  });

  return Object.keys(cubes).map((position) => {
    let [x, y, z] = position.split(',').map(it => +it);
    return 6 - getCubesAround(cubes, [x, y, z]);
  }).reduce((sum, it) => sum + it, 0);
}

function part2(inp) {
  let cubes = {};
  let max = {x: 0, y: 0, z: 0};

  inp.trim().split('\n').forEach((line) => {
    let [x, y, z] = line.split(',').map(it => +it);

    if (x > max.x) max.x = x;
    if (y > max.y) max.y = y;
    if (z > max.z) max.z = z;

    cubes[line] = true;
  });

  max.x++;
  max.y++;
  max.z++;

  let water = fillInWithWater(max, cubes);

  let result = 0;
  Object.keys(cubes).forEach((position) => {
    let [x, y, z] = position.split(',').map(it => +it);

    if (water[[x + 1, y, z].join(',')]) result++;
    if (water[[x, y + 1, z].join(',')]) result++;
    if (water[[x, y, z + 1].join(',')]) result++;

    if (water[[x - 1, y, z].join(',')]) result++;
    if (water[[x, y - 1, z].join(',')]) result++;
    if (water[[x, y, z - 1].join(',')]) result++;
  });

  return result;
}

function fillInWithWater(max, cubes) {
  let water = {};
  let stack = [[0, 0, 0]];

  while (stack.length > 0) {
    let [x, y, z] = stack.pop();

    if (x < -1 || y < -1 || z < -1) continue;
    if (x > max.x || y > max.y || z > max.z) continue;
    if (cubes[[x, y, z].join(',')]) continue;
    if (water[[x, y, z].join(',')]) continue;

    water[[x, y, z].join(',')] = true;

    stack.push(
      [x + 1, y, z],
      [x + 1, y, z],
      [x, y + 1, z],
      [x, y, z + 1],
      [x - 1, y, z],
      [x, y - 1, z],
      [x, y, z - 1]
    );
  }

  return water;
}

function getCubesAround(cubes, [x, y, z]) {
  let cnt = 0;

  if (cubes[[x + 1, y, z].join(',')]) cnt++;
  if (cubes[[x, y + 1, z].join(',')]) cnt++;
  if (cubes[[x, y, z + 1].join(',')]) cnt++;

  if (cubes[[x - 1, y, z].join(',')]) cnt++;
  if (cubes[[x, y - 1, z].join(',')]) cnt++;
  if (cubes[[x, y, z - 1].join(',')]) cnt++;

  return cnt;
}

function renderYSlice(cubes, water, max, y) {
  let result = `Y: ${y}\n`;

  for (let x = -1; x <= max.x; x++) {
    for (let z = -1; z <= max.z; z++) {
      let isCube = !!cubes[[x, y, z].join(',')];
      let isWater = !!water[[x, y, z].join(',')];

      result += isCube && isWater ? 'X' : isCube ? 'C' : isWater ? '~' : '.';
    }
    result += ` ${x}\n`;
  }

  console.log(result);
}
