import fs from 'fs';

// https://adventofcode.com/2022/day/21

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 152);
console.log('answer: ', part1(inputData), [10037517593724]);

console.log('test2 OK:', part2(testInput) === 301);
console.log('answer2:', part2(inputData), [3272260914328]);

function part1(inp) {
  let ops = new Map();

  inp
    .trim()
    .split('\n')
    .forEach((line) => {
      let [name, _op] = line.split(': ');

      if (+_op) {
        ops.set(name, {num: +_op});
      } else {
        let [left, op, right] = _op.split(' ');
        ops.set(name, {left, op, right});
      }
    });

  return calc(ops, 'root');
}

function part2(inp) {
  let ops = new Map();

  inp
    .trim()
    .split('\n')
    .forEach((line) => {
      let [name, _op] = line.split(': ');

      if (+_op) {
        ops.set(name, {num: +_op});
      } else {
        let [left, op, right] = _op.split(' ');
        ops.set(name, {left, op, right});
      }
    });

  ops.set('humn', {num: NaN});

  let rightRoot = calc(ops, ops.get('root').right);

  return calcHuman(ops.get('root').left, rightRoot);

  function calcHuman(nodeName, target) {
    if (nodeName === 'humn') return target;

    let node = ops.get(nodeName);

    if ('num' in node) {
      return node.num;
    } else {
      let {left, op, right} = node;

      let leftVal = calc(ops, left);
      let rightVal = calc(ops, right);

      if (Number.isNaN(leftVal)) {
        if (op === '+') return calcHuman(left, target - rightVal);
        if (op === '-') return calcHuman(left, target + rightVal);
        if (op === '*') return calcHuman(left, target / rightVal);
        if (op === '/') return calcHuman(left, target * rightVal);
      } else {
        if (op === '+') return calcHuman(right, target - leftVal);
        if (op === '-') return calcHuman(right, leftVal - target);
        if (op === '*') return calcHuman(right, target / leftVal);
        if (op === '/') return calcHuman(right, leftVal / target);
      }
    }
  }
}

function calc(ops, nodeName) {
  let node = ops.get(nodeName);

  if ('num' in node) {
    return node.num;
  } else {
    let {left, op, right} = node;
    if (op === '+') return calc(ops, left) + calc(ops, right);
    if (op === '-') return calc(ops, left) - calc(ops, right);
    if (op === '*') return calc(ops, left) * calc(ops, right);
    if (op === '/') return calc(ops, left) / calc(ops, right);
  }
}
