import fs from 'fs';

// https://adventofcode.com/2022/day/21

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log("test OK: ", part1(testInput) === 152);
console.log("answer: ", part1(getRealData())), [10037517593724];

// console.log('test2 OK:', part2(testInput) === 123);
// console.log('answer2:', part2(inputData));

function part1(inp) {
  let ops = new Map();

  inp
    .trim()
    .split("\n")
    .forEach((line) => {
      let [name, _op] = line.split(": ");

      if (+_op) {
        ops.set(name, { num: +_op });
      } else {
        let [left, op, right] = _op.split(" ");
        ops.set(name, { left, op, right });
      }
    });

  function calc(nodeName) {
    let aaa = ops.get(nodeName);

    if (aaa.num) {
      return aaa.num;
    } else {
      let { left, op, right } = aaa;
      if (op === "+") return calc(left) + calc(right);
      if (op === "-") return calc(left) - calc(right);
      if (op === "*") return calc(left) * calc(right);
      if (op === "/") return calc(left) / calc(right);
    }
  }

  return calc("root");
}

function part2(inp) {
  let ops = new Map();

  inp
    .trim()
    .split("\n")
    .forEach((line) => {
      let [name, _op] = line.split(": ");

      if (+_op) {
        ops.set(name, { num: +_op });
      } else {
        let [left, op, right] = _op.split(" ");
        ops.set(name, { left, op, right });
      }
    });
  let myName = "humn";

  // let leftRoot = calc(ops.get("root").left);
  let rightRoot = calc(ops.get("root").right);

  // answer2: 3886130271980.3667
  // WTF ????
  // 3886130271980 too high
  return calcHuman(ops.get("root").left, rightRoot);

  function calc(nodeName) {
    if (nodeName === myName) return NaN;
    let aaa = ops.get(nodeName);

    if (aaa.num) {
      return aaa.num;
    } else {
      let { left, op, right } = aaa;
      if (op === "+") return calc(left) + calc(right);
      if (op === "-") return calc(left) - calc(right);
      if (op === "*") return calc(left) * calc(right);
      if (op === "/") return calc(left) / calc(right);
    }
  }

  function calcHuman(nodeName, target) {
    if (nodeName === myName) return target;
    let aaa = ops.get(nodeName);

    if (aaa.num) {
      return aaa.num;
    } else {
      let { left, op, right } = aaa;

      let leftVal = calc(left);
      let rightVal = calc(right);

      if (Number.isNaN(leftVal)) {
        if (op === "+") return calcHuman(left, target - rightVal);
        if (op === "-") return calcHuman(left, target + rightVal);
        if (op === "*") return calcHuman(left, target / rightVal);
        if (op === "/") return calcHuman(left, target * rightVal);
      }

      if (Number.isNaN(rightVal)) {
        if (op === "+") return calcHuman(right, target - leftVal);
        if (op === "-") return calcHuman(right, target + leftVal);
        if (op === "*") return calcHuman(right, target / leftVal);
        if (op === "/") return calcHuman(right, target * leftVal);
      }
    }
  }
}
