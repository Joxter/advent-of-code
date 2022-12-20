import fs from 'fs';

// https://adventofcode.com/2022/day/     20

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// for (let i = 0; i < 100; i++) {
//   test(`-1, -2, ${i}, -3, -4, -5, -6`, 2);
// }

// test('01, 2, -51, 3, 4, 5, 6', 2);
// test('1, 2, -52, 3, 4, 5, 6', 2);
// test('1, 2, -1, 3, 4, 5, 6', 2);

// for (let i = 0; i < 100; i++) {
//   test(`0, 1, 2, -${i}, 3, 4, 5, 6`, 3);
// }

console.log('test OK: ', part1(testInput) === 3);
console.log('answer: ', part1(inputData), [7278]);

// console.log('test2 OK:', part2(testInput) === 1623178306);
// console.log('answer2:', part2(inputData));


function part1(inp) {
  let arr = [];
  inp.trim().split('\n').forEach((line, i) => {
    arr.push({val: +line, original: i});
  });

  for (let i = 0; i < arr.length; i++) {
    precess2(arr, i);
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
    arr.push({val: +line, original: i});
  });


  // if (i === 2) break;

  /*
  0  1  2  3  4  5   6
       {-4}        !
      arr.len7: from 2 to -4 (eq +3)

  0  1  2  3  4  5   6
      !      {-9}
      arr.len7: from 4 to -9 (eq -2)


=======================================
=======================================
=======================================
=======================================
  0  1  2  3  4  5  6
         {+3}
  0  1  2  4  5  6  3
  arr.len7: from 3 to +3.  REMOVE 3, INSERT IN 6 (remove baseIndex, insert baseIndex + +3)
=======================================
  0  1  2  3  4  5  6
         {+2}
  0  1  2  4  5  3  6
  arr.len7: from 3 to +2.  REMOVE 3, INSERT IN 5 (remove baseIndex, insert baseIndex + +2)

=======================================
  0  1  2  3  4  5  6
         {+8}
  0  1  2  4  3  5  6
  arr.len7: from 3 to +2.  REMOVE 3, INSERT IN 4 (remove baseIndex, insert (baseIndex + +8) % arr.len)

=======================================
  0  1  2  3  4  5  6
         {+5}
  0  1  3  2  4  5  6
  arr.len7: from 3 to +2.  REMOVE 3, INSERT IN 2 (remove baseIndex, insert ((baseIndex + +5) % arr.len) + 1)

=======================================
  0  1  2  3  4  5  6
         {-2}
  0  3  1  2  4  5  6
  arr.len7: from 3 to +2.  REMOVE 3, INSERT IN 1 (remove baseIndex, insert baseIndex + -2)

=======================================
  0  1  2  3  4  5  6
         {+1}
  0  1  2  4  3  5  6
  arr.len7: from 3 to +2.  REMOVE 3, INSERT IN 4 (remove baseIndex, insert baseIndex + -2)

  0  1  2  3  4  5  6
                   {+1}
  6  0  1  2  3  4  5
  arr.len7: from 3 to +2.  REMOVE 6, INSERT IN 0 (remove baseIndex, insert baseIndex + -2)


  */

  /*
      if (target.val > 0) {

        // if (targetIndex + target.val <= arr.length) {
          arr.splice(targetIndex + target.val + 1, 0, target);
          arr.splice(targetIndex, 1);
          continue;
        // }
      }

      if (target.val > 0 && targetIndex + target.val > arr.length) {
        let newPlace = targetIndex + target.val;
        arr.splice(targetIndex + target.val + 1, 0, target);
        arr.splice(targetIndex, 1);
        continue;
      }
      //
      if (target.val < 0 && targetIndex + target.val < 0) {
        arr.splice(arr.length - (-target.val - targetIndex), 0, target);
        arr.splice(targetIndex, 1);
      }
  */

  return result;
}

function test(input, ind) {
  let arr = input.split(', ').map((val, i) => {
    return {val: +val, original: i};
  });

  let expected = precess([...arr], ind).map((it) => it.val).join(', ');
  let actual = precess2([...arr], ind).map((it) => it.val).join(', ');
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

function precess2(arr, original) {
  let targetIndex = arr.findIndex((it) => it.original === original);
  let target = arr[targetIndex];

  if (target.val === 0) return arr;

  if (target.val > 0) {
    arr.splice(targetIndex, 1);
    let offset1 = arr.length - targetIndex;
    let newIndex = (target.val - offset1) % arr.length;
    // console.log('offset: ', offset1);
    // console.log('offset: ', (arr.length - targetIndex) % arr.length);
    // console.log(arr.length - targetIndex);
    // console.log({newIndex});
    arr.splice(newIndex, 0, target);
  } else {
    arr.splice(targetIndex, 1);

    let offset1 = targetIndex;
    if (-target.val < offset1) {
      arr.splice(offset1 - -target.val, 0, target);
    } else {

      let newIndex = Math.abs(-target.val - offset1) % arr.length;
      // console.log('offset: ', offset1);
      // console.log('offset: ', (arr.length - targetIndex) % arr.length);
      // console.log(arr.length - targetIndex);
      // console.log({newIndex});
      arr.splice(arr.length - newIndex, 0, target);
    }
  }

  return arr;
}

function precess(arr, original) {
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
