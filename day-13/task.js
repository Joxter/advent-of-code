import fs from 'fs';

// https://adventofcode.com/2022/day/12

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// console.log('test OK: ', part1(testInput) === 13);
// console.log('answer: ', part1(inputData));

console.log('test2 OK:', part2(testInput) === 140);
console.log('answer2:', part2(inputData));

function part1(inp) {
  return inp.split('\n\n').map((blocks, i) => {
    let [_left, _right] = blocks.split('\n');
    let left = JSON.parse(_left);
    let right = JSON.parse(_right);

    let isCorrect = compare(left, right);
    // console.log(i + 1, isCorrect ? i + 1 : 0);
    return isCorrect ? i + 1 : 0;
  }).reduce((sum, n) => sum + n, 0);
}

function part2(inp) {
  let arr = inp.split('\n\n').map((blocks, i) => {
    let [_left, _right] = blocks.split('\n');
    let left = JSON.parse(_left);
    let right = JSON.parse(_right);
    return [left, right]
  }).flat()
  arr.push([[2]], [[6]])

  console.log(arr);

  arr.sort(compare).reverse()

  console.log(arr);

  let indexOf2 = arr.findIndex((it) => it.length === 1 && it[0].length === 1 && it[0][0] === 2) + 1;
  let indexOf6 = arr.findIndex((it) => it.length === 1 && it[0].length === 1 && it[0][0] === 6) + 1;

  return indexOf2 * indexOf6;
}

function compare(left, right) {
  left = JSON.parse(JSON.stringify(left))
  right = JSON.parse(JSON.stringify(right))
  // console.log(inp);

  while (left.length > 0 && right.length > 0) {
    let l = left.shift();
    let r = right.shift();

    if (typeof l !== 'number' || typeof r !== 'number') {
      let res = compare(
        Array.isArray(l) ? l : [l],
        Array.isArray(r) ? r : [r]
      );

      if (res !== 0) {
        // console.log(inp, res);
        return res;
      }
    }

    if (l > r) {
      // console.log(inp, false);
      return -1;
    }
    if (l < r) {
      // console.log(inp, true);
      return 1;
    }
  }

  if (left.length < right.length) {
    // console.log(inp, true);
    return 2;
  }
  if (left.length > right.length) {
    // console.log(inp, false);
    return -1;
  }
  // console.log(inp, null);
  return 0;
}
