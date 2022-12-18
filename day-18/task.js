import fs from 'fs';

// https://adventofcode.com/2022/day/18

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// run `node --stack-size=16000 ./task.js`

console.log('test OK: ', part1(testInput) === 64);
console.log('answer: ', part1(inputData), [4580]);

console.log('test2 OK:', part2(testInput) === 58);
console.log('answer2:', part2(inputData), [2610]);

//  Maximum call stack size exceeded

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

  let lava = fillInWithLava(max, cubes);

  let result = 0;
  Object.keys(cubes).forEach((position) => {
    let [x, y, z] = position.split(',').map(it => +it);

    if (lava[[x + 1, y, z].join(',')]) result++;
    if (lava[[x, y + 1, z].join(',')]) result++;
    if (lava[[x, y, z + 1].join(',')]) result++;

    if (lava[[x - 1, y, z].join(',')]) result++;
    if (lava[[x, y - 1, z].join(',')]) result++;
    if (lava[[x, y, z - 1].join(',')]) result++;
  });

  return result;
}

function fillInWithLava(max, cubes) {
  let lava = {};

  filIn(0, 0, 0);

  return lava;

  function filIn(x, y, z) {
    if (x > max.x || y > max.y || z > max.z) return;
    if (x < -1 || y < -1 || z < -1) return;
    if (cubes[[x, y, z].join(',')]) return;
    if (lava[[x, y, z].join(',')]) return;

    lava[[x, y, z].join(',')] = true;

    filIn(x + 1, y, z);
    filIn(x, y + 1, z);
    filIn(x, y, z + 1);
    filIn(x - 1, y, z);
    filIn(x, y - 1, z);
    filIn(x, y, z - 1);
  }
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

function renderYSlice(cubes, lava, max, y) {
  let result = `Y: ${y}\n`;

  for (let x = -1; x <= max.x; x++) {
    for (let z = -1; z <= max.z; z++) {
      let isCube = !!cubes[[x, y, z].join(',')];
      let isLava = !!lava[[x, y, z].join(',')];

      result += isCube && isLava ? 'X' : isCube ? 'C' : isLava ? 'L' : '.';
    }
    result += ` ${x}\n`;
  }

  console.log(result);
}
