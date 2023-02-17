import fs from 'fs';

// https://adventofcode.com/2022/day/15

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK:', part1(testInput, 10), [26]);
console.log('part1: ', part1(inputData, 2_000_000), [4582667]);

console.log('test OK:', part2(testInput, 20), [56000011]);
console.log('part2: ', part2(inputData, 4000000), [10961118625406]);

function part1(inp, ROW) {
  let map = {};
  let res = 0;

  inp
    .split('\n')
    .forEach((line) => {
      let [sx, sy, bx, by] = /(-?\d+).+?(-?\d+).+?(-?\d+).+?(-?\d+)/
        .exec(line)
        .slice(1)
        .map((n) => +n);

      if (sy === ROW) map[sx] = '-';
      if (by === ROW) map[bx] = '-';

      paintOver([sx, sy], [bx, by]);
    });

  return res;

  function paintOver(signal, beacon) {
    let size = getDistance(signal, beacon);

    for (let i = signal[0] - size; i <= signal[0] + size; i++) {
      if (getDistance(signal, [i, ROW]) <= size && !map[i]) {
        map[i] = '#';
        res++;
      }
    }
  }

  function getDistance(signal, beacon) {
    let deltaX = Math.abs(signal[0] - beacon[0]);
    let deltaY = Math.abs(signal[1] - beacon[1]);

    return deltaX + deltaY;
  }
}

function part2(inp, aaa) {

  let signals = [];
  let beacons = [];

  inp
    .split('\n')
    .forEach((line) => {
      let [sx, sy, bx, by] = /(-?\d+).+?(-?\d+).+?(-?\d+).+?(-?\d+)/
        .exec(line)
        .slice(1)
        .map((n) => +n);

      signals.push([sx, sy]);
      beacons.push([bx, by]);
    });

  for (let i = 0; i <= aaa; i++) {
    for (let j = 0; j <= aaa; j++) {
      let noBeacons = true;

      for (let k = 0; k < beacons.length, j <= aaa; k++) {
        if (!beacons[k]) {
          break;
        }
        let [bx, by] = beacons[k];
        let [sx, sy] = signals[k];

        let b_s = getDistance([bx, by], [sx, sy]);
        let curr_s = getDistance([i, j], [sx, sy]);

        if (b_s >= curr_s) {
          let offset = b_s - curr_s;
          j += offset;

          noBeacons = false;
          break;
        }
      }
      if (noBeacons) {
        return i * 4_000_000 + j;
      }
    }
  }

  function getDistance(signal, beacon) {
    let deltaX = Math.abs(signal[0] - beacon[0]);
    let deltaY = Math.abs(signal[1] - beacon[1]);

    return deltaX + deltaY;
  }
}

function render(map, [y1, y2], [x1, x2]) {
  let result = '';

  for (let y = y1; y <= y2; y++) {
    let row = '';
    for (let x = x1; x <= x2; x++) {
      row += map[x + ',' + y] || ' ';
    }
    result += String(y).padStart(3, '_') + ' ' + row + '|\n';
  }

  console.log(result);
}
