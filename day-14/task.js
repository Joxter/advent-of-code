import fs from 'fs';

// https://adventofcode.com/2022/day/14

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 24);
// console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part2(testInput) === 140);
// console.log('answer2:', part2(inputData));

function part1(inp) {
  let map = {}; // [x-y]: #/o
  inp.split('\n').forEach((line) => {
    console.log(line);
    let [[hx, hy], ...target] = line.split(` -> `).map((xy) => xy.split(',').map(n => +n));

    target.forEach(([tx, ty]) => {
      let [tx, ty] = t;

      let i = 1000;
      while ((tx !== hx || ty !== hy) && i--) {
        if (tx === hx && ty > hy) {
          hy++;
        } else if (tx === hx && ty < hy) {
          hy--;
        } else if (ty === hy && tx > hx) {
          hx++;
        } else if (ty === hy && tx < hx) {
          hx--;
        }
        map[hx + ',' + hy] = '#';
      }
      if (i < 1) throw new Error('OVERFLOW')
    });

  });

  console.log(map);

  /*
  498,4 -> 498,6 -> 496,6
  503,4 -> 502,4 -> 502,9 -> 494,9
  */


  let result = 0;
  let lastLeftRock = 500;
  let lastRightRock = 500;
  let sandSource = [500, 0];


  return result;
}

function part2(inp) {
}
