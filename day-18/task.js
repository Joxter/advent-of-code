import fs from 'fs';

// https://adventofcode.com/2022/day/**********

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 64);
console.log('answer: ', part1(inputData), [4580]);

// console.log('test2 OK:', part2(testInput), [58]);
// console.log('answer2:', part2(inputData));

function part1(inp) {
  let map = {};
  inp.trim().split('\n').forEach((line) => {
    map[line] = true;
  });

  return countSurface(map)
}

function countSurface(map) {
  return Object.keys(map).map((position) => {
    let [x, y, z] = position.split(',').map(it => +it);
    return 6 - getCubesAround(map, [x,y,z]);
  }).reduce((sum, it) => sum + it, 0);
}

function part2(inp) {
  let map = {};

  inp.trim().split('\n').forEach((line) => {
    map[line] = true;
  });

  let lava = {};

  // fill in with lava
  // count where lava touches bricks

}
function getCubesAround(map, [x, y, z]) {
  let cnt = 0;
  if (map[[x + 1, y, z].join(',')]) {
    cnt++;
  }
  if (map[[x, y + 1, z].join(',')]) {
    // console.log('> 2');
    cnt++;
  }
  if (map[[x, y, z + 1].join(',')]) {
    // console.log('> 3');
    cnt++;
  }

  if (map[[x - 1, y, z].join(',')]) {
    // console.log('> 4');
    cnt++;
  }
  if (map[[x, y - 1, z].join(',')]) {
    // console.log('> 5');
    cnt++;
  }
  if (map[[x, y, z - 1].join(',')]) {
    // console.log('> 6');
    cnt++;
  }

  return cnt;
}
