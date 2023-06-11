import fs from 'fs';
import { runSolution } from "../../utils.js";

// https://adventofcode.com/2022/day/3

let folder = '../inputs/d03/';
let testInput = fs.readFileSync(folder + 'test.txt').toString();
let inputData = fs.readFileSync(folder + 'input.txt').toString();

runSolution('test  ', () => run(testInput), 157);
runSolution('part_1', () => run(inputData), 7872);

runSolution('test  ', () => runPart2(testInput), 70);
runSolution('part_2', () => runPart2(inputData), 2497);

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.

function run(inp) {
  let result = 0;

  inp.split('\n').forEach((line) => {
    let firstPart = new Set();

    for (let i = 0; i < line.length / 2; i++) {
      firstPart.add(line[i]);
    }
    for (let i = Math.floor(line.length / 2); i < line.length; i++) {
      if (firstPart.has(line[i])) {
        if (line[i].toUpperCase() === line[i]) {
          result += line[i].charCodeAt(0) - 38;
        } else {
          result += line[i].charCodeAt(0) - 96;
        }
        return;
      }
    }
  });

  return result;
}

function runPart2(inp) {
  let result = 0;
  let lines = inp.split('\n');

  for (let i = 0; i < lines.length; i += 3) {
    let line1 = lines[i];
    let line1set = new Set();
    for (let i = 0; i < line1.length; i++) {
      line1set.add(line1[i]);
    }

    let line2 = lines[i + 1];
    let line2set = new Set();
    for (let i = 0; i < line2.length; i++) {
      if (line1set.has(line2[i])) {
        line2set.add(line2[i]);
      }
    }

    let line3 = lines[i + 2];
    for (let i = 0; i < line3.length; i++) {
      if (line2set.has(line3[i])) {
        if (line3[i].toUpperCase() === line3[i]) {
          result += line3[i].charCodeAt(0) - 38;
        } else {
          result += line3[i].charCodeAt(0) - 96;
        }
        break;
      }
    }
  }

  return result;
}

