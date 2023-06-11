import fs from 'fs';
import { runSolution } from "../../utils.js";

// https://adventofcode.com/2022/day/20

let folder = '../inputs/d20/';
let testInput = fs.readFileSync(folder + 'test.txt').toString();
let inputData = fs.readFileSync(folder + 'input.txt').toString();

// for (let i = 0; i < 100; i++) {
//   test(`-1, -2, ${i}, -3, -4, -5, -6`, 2);
// }
// for (let i = 0; i < 100; i++) {
//   test(`0, 1, 2, -${i}, 3, 4, 5, 6`, 3);
// }

runSolution('test  ', () => part1(testInput), 3);
runSolution('part_1', () => part1(inputData), 7278);

runSolution('test  ', () => part2(testInput), 1623178306);
runSolution('part_2', () => part2(inputData), 14375678667089);

function part1(inp) {
  let arr = [];
  inp.trim().split('\n').forEach((line, i) => {
    arr.push({val: +line, original: i});
  });

  for (let i = 0; i < arr.length; i++) {
    mix(arr, i);
  }

  let zeroIndex = arr.findIndex((it) => it.val === 0);

  let a = arr[(zeroIndex + 1000) % arr.length].val;
  let b = arr[(zeroIndex + 2000) % arr.length].val;
  let c = arr[(zeroIndex + 3000) % arr.length].val;

  return a + b + c;
}

function part2(inp) {
  let arr = [];
  inp.trim().split('\n').forEach((line, i) => {
    arr.push({val: +line * 811589153, original: i});
  });

  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < arr.length; i++) {
      mix(arr, i);
    }
  }

  let zeroIndex = arr.findIndex((it) => it.val === 0);

  let a = arr[(zeroIndex + 1000) % arr.length].val;
  let b = arr[(zeroIndex + 2000) % arr.length].val;
  let c = arr[(zeroIndex + 3000) % arr.length].val;

  return a + b + c;
}

function test(input, ind) {
  let arr = input.split(', ').map((val, i) => {
    return {val: +val, original: i};
  });

  let expected = mix_OLD([...arr], ind).map((it) => it.val).join(', ');
  let actual = mix([...arr], ind).map((it) => it.val).join(', ');
  if (expected === actual) {
    console.log(`OK! ${actual}`);
  } else {
    console.log('ERROR:', arr[ind]);
    console.log('input:   ', input);
    console.log('expected:', expected);
    console.log('actual:  ', actual);
    console.log('');
  }
}

function mix(arr, original) {
  let targetIndex = arr.findIndex((it) => it.original === original);
  let target = arr[targetIndex];

  if (target.val === 0) return arr;

  arr.splice(targetIndex, 1);

  if (target.val > 0) {
    let firstLineOffset = arr.length - targetIndex;
    let newIndex = (target.val - firstLineOffset) % arr.length;
    arr.splice(newIndex, 0, target);

  } else {
    let firstLineOffset = targetIndex;

    let newIndex = -target.val < firstLineOffset
      ? firstLineOffset - -target.val
      : arr.length - (-target.val - firstLineOffset) % arr.length;

    arr.splice(newIndex, 0, target);
  }

  return arr;
}

function mix_OLD(arr, original) {
  let targetIndex = arr.findIndex((it) => it.original === original);
  let target = arr[targetIndex];

  if (target.val === 0) {
    // continue;
  } else if (target.val > 0) {
    let start = targetIndex;
    for (let j = 0; j < target.val; j++) {
      arr.splice(start, 1);
      start++;
      if (start === arr.length) start = 0;
      arr.splice(start, 0, target);
    }
  } else {
    let start = targetIndex;
    for (let j = 0; j < -target.val; j++) {
      arr.splice(start, 1);
      start--;
      if (start < 0) start = arr.length - 1;
      arr.splice(start, 0, target);
    }
    if (start === 0) {
      arr.shift();
      arr.push(target);
    }
  }

  return arr;
}
