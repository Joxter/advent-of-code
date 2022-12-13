import fs from 'fs';

// https://adventofcode.com/2022/day/12

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 13);
console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part2(testInput) === 140);
// console.log('answer2:', part2(inputData));

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

  arr.sort(compare)

  console.log(arr);

  return  2;
}

function compare(left, right) {
  // let inp = JSON.stringify({left, right})
  // console.log(inp);
  while (left.length > 0 && right.length > 0) {
    let l = left.shift();
    let r = right.shift();

    if (typeof l !== 'number' || typeof r !== 'number') {
      let res = compare(
        Array.isArray(l) ? l : [l],
        Array.isArray(r) ? r : [r]
      );

      if (res !== null) {
        // console.log(inp, res);
        return res;
      }
    }

    if (l > r) {
      // console.log(inp, false);
      return false;
    }
    if (l < r) {
      // console.log(inp, true);
      return true;
    }
  }

  if (left.length < right.length) {
    // console.log(inp, true);
    return true;
  }
  if (left.length > right.length) {
    // console.log(inp, false);
    return false;
  }
  // console.log(inp, null);
  return null;
}
