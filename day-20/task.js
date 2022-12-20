import fs from 'fs';

// https://adventofcode.com/2022/day/     20

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// console.log('test OK: ', part1(testInput) === 3);
// console.log('answer: ', part1(inputData));

console.log('test2 OK:', part2(testInput) === 1623178306);
// console.log('answer2:', part2(inputData));

function part1(inp) {
  let arr = [];
  inp.trim().split('\n').forEach((line, i) => {
    arr.push({val: +line, original: i});
  });

  for (let i = 0; i < arr.length; i++) {
    let targetIndex = arr.findIndex((it) => it.original === i);
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

/*
initial:
1, 2, -3, 3, -2, 0, 4
1, 2, -3, 3, -2, 0, 4 +++

{ i: 0 } 1 original 0
2, 1, -3, 3, -2, 0, 4
2, 1, -3, 3, -2, 0, 4 +++


{ i: 1 } 2 original 1
1, -3, 2, 3, -2, 0, 4
1, -3, 2, 3, -2, 0, 4 +++

{ i: 2 } -3 original 2
1, 2, 3, -2, -3, 0, 4
1, 2, 3, -2, -3, 0, 4 +++

{ i: 3 } 3 original 3
1, 2, -2, -3, 0, 3, 4
1, 2, -2, -3, 0, 3, 4 +++

{ i: 4 } -2 original 4
-2, 1, 2, -3, 0, 3, 4
1, 2, -3, 0, 3, 4, -2 ---

{ i: 5 } 0 original 5
-2, 1, 2, -3, 0, 3, 4

{ i: 6 } 4 original 6
-2, 1, 2, -3, 0, 3, 4, 4, 4, 4



last CORRECT  1, 2, -3, 4, 0, 3, -2
last MY       1, 2, -3, 4, 0, 3, -2

*/