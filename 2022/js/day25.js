import fs from 'fs';
import { runSolution } from "../../utils.js";

// https://adventofcode.com/2022/day/25

let folder = '../inputs/d25/';
let testInput = fs.readFileSync(folder + 'test.txt').toString();
let inputData = fs.readFileSync(folder + 'input.txt').toString();

runSolution('test  ', () => part1(testInput), '2=-1=0');
runSolution('part_1', () => part1(inputData), '2-2=12=1-=-1=000=222');

function sum(a, b) {
  a = a.split('').reverse();
  b = b.split('').reverse();

  let res = [];
  let rem = '0';

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    let charA = a[i] || '0';
    let charB = b[i] || '0';
    let [newRem, ss] = sumAB(charA, charB);

    let [newRem2, ss2] = sumAB(ss, rem);

    res.push(ss2);
    rem = sumAB(newRem, newRem2)[1];
  }
  if (rem !== '0') {
    res.push(rem);
  }
  return res.reverse().join('');

  function sumAB(a, b) {
    let s = {
      '==': ['-', '1'],
      '=-': ['-', '2'],
      '=0': ['0', '='],
      '=1': ['0', '-'],
      '=2': ['0', '0'],

      '-=': ['-', '2'],
      '--': ['0', '='],
      '-0': ['0', '-'],
      '-1': ['0', '0'],
      '-2': ['0', '1'],

      '0=': ['0', '='],
      '0-': ['0', '-'],
      '00': ['0', '0'],
      '01': ['0', '1'],
      '02': ['0', '2'],

      '1=': ['0', '-'],
      '1-': ['0', '0'],
      '10': ['0', '1'],
      '11': ['0', '2'],
      '12': ['1', '='],

      '2=': ['0', '0'],
      '2-': ['0', '1'],
      '20': ['0', '2'],
      '21': ['1', '='],
      '22': ['1', '-'],
    };
    return s[`${a}${b}`];
  }
}

function part1(inp) {
  let res = '0';
  inp.trim().split('\n').forEach((line) => {
    res = sum(res, line);
  });
  return res;
}

function fiveToSnafu(n) {
  let dts = ['=', '-', '0', '1', '2'];

  return n.split('').map((d) => dts[d]).join('');
}

function snafuToDec(snaf) {
  let res = 0;
  let std = {
    '2': 2,
    '1': 1,
    '0': 0,
    '-': -1,
    '=': -2
  };
  let base = 1;

  snaf.split('').reverse().forEach((s) => {
    res = res + base * std[s];
    base *= 5;
  });
  return res;
}

function part2(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result;
}