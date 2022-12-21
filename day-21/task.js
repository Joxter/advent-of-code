import fs from 'fs';

// https://adventofcode.com/2022/day/21

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 152);
// console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part2(testInput) === 123);
// console.log('answer2:', part2(inputData));

function part1(inp) {
  let result = 0;

  let nums = new Map();
  let ops = new Map();

  inp.trim().split('\n').forEach((line) => {
    let [name, ..._op] = line.split(' ')

    if (+_op[0]) {
      nums.set(name, +_op[0])
    } else {
      let [left, op, right] = _op
      ops.set(name, [left, op, right])
    }
  });

  /*
  Map(8) {
  'dbpl:' => 5,
  'zczc:' => 2,
  'dvpt:' => 3,
  'lfqf:' => 4,
  'humn:' => 5,
  'ljgn:' => 2,
  'sllz:' => 4,
  'hmdt:' => 32
  'root:' => [ 'pppw', '+', 'sjmn' ],
  'cczh:' => [ 'sllz', '+', 'lgvd' ],
  'ptdq:' => [ 'humn', '-', 'dvpt' ],
  'sjmn:' => [ 'drzm', '*', 'dbpl' ],
  'pppw:' => [ 'cczh', '/', 'lfqf' ],
  'lgvd:' => [ 'ljgn', '*', 'ptdq' ],
  'drzm:' => [ 'hmdt', '-', 'zczc' ]
*/
  console.log(nums, ops);
  return ;

  let i = 20
  while (ops.size > 0 && i--) {
    // console.log(1111);
    for (let [name, [left, op, right]] of ops) {
      console.log(left, op, right);
      if (nums.has(left) && nums.has(right)) {
        let res = {
          '+': +left + +right,
          '-': +left - +right,
          '*': +left * +right,
          '/': +left / +right,
        }
        nums.set(name, res[op])
        ops.delete(name)
      }
    }
    console.log(ops.size);

    // return
  }



  return nums.get('root')
}

function part2(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result
}