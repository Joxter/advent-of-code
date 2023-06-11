import fs from 'fs';
import { runSolution } from '../../utils.js';

let folder = '../inputs/d23/';
let testInput = fs.readFileSync(folder + 'test.txt').toString();
let inputData = fs.readFileSync(folder + 'input.txt').toString();

runSolution('test  ', () => part1(testInput), 110);
runSolution('part_1', () => part1(inputData), 3966);

runSolution('test  ', () => part2(testInput), 20);
runSolution('part_2', () => part2(inputData), 933);

function part1(inp) {
  let elfes = {};

  inp.split('\n').forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (char === '#') {
        elfes[x + ',' + y] = true;
      }
    });
  });

  function noElfes(...coords) {
    return coords.every(([x, y]) => {
      return !elfes[[x, y].join(',')];
    });
  }

  function getRect() {
    let xRange = [100, -100];
    let yRange = [100, -100];

    Object.keys(elfes).forEach((coords) => {
      let [x, y] = coords.split(',').map((it) => +it);
      if (x < xRange[0]) xRange[0] = x;
      if (x > xRange[1]) xRange[1] = x;

      if (y < yRange[0]) yRange[0] = y;
      if (y > yRange[1]) yRange[1] = y;
    });

    return [xRange, yRange];
  }

  let proposeN = ([x, y], proposals) => {
    if (noElfes([x - 1, y - 1], [x, y - 1], [x + 1, y - 1])) {
      if (!proposals[[x, y - 1].join(',')]) {
        proposals[[x, y - 1].join(',')] = [];
      }
      proposals[[x, y - 1].join(',')].push([x, y].join(','));
      return true;
    }
    return false;
  };
  let proposeS = ([x, y], proposals) => {
    if (noElfes([x - 1, y + 1], [x, y + 1], [x + 1, y + 1])) {
      if (!proposals[[x, y + 1].join(',')]) {
        proposals[[x, y + 1].join(',')] = [];
      }
      proposals[[x, y + 1].join(',')].push([x, y].join(','));
      return true;
    }
    return false;
  };
  let proposeW = ([x, y], proposals) => {
    if (noElfes([x - 1, y - 1], [x - 1, y], [x - 1, y + 1])) {
      if (!proposals[[x - 1, y].join(',')]) {
        proposals[[x - 1, y].join(',')] = [];
      }
      proposals[[x - 1, y].join(',')].push([x, y].join(','));
      return true;
    }
    return false;
  };
  let proposeE = ([x, y], proposals) => {
    if (noElfes([x + 1, y - 1], [x + 1, y], [x + 1, y + 1])) {
      if (!proposals[[x + 1, y].join(',')]) {
        proposals[[x + 1, y].join(',')] = [];
      }
      proposals[[x + 1, y].join(',')].push([x, y].join(','));
      return true;
    }
    return false;
  };
  let propArray = [proposeN, proposeS, proposeW, proposeE];

  for (let round = 1; round <= 10; round++) {
    let proposals = {};

    Object.keys(elfes).forEach((coords) => {
      let [x, y] = coords.split(',').map((it) => +it);

      if (
        noElfes(
          [x - 1, y - 1],
          [x, y - 1],
          [x + 1, y - 1],
          //
          [x - 1, y],
          [x + 1, y],
          //
          [x - 1, y + 1],
          [x, y + 1],
          [x + 1, y + 1]
        )
      ) {
        return;
      }

      propArray[0]([x, y], proposals) ||
      propArray[1]([x, y], proposals) ||
      propArray[2]([x, y], proposals) ||
      propArray[3]([x, y], proposals);
    });

    let first = propArray.shift();
    propArray.push(first);

    Object.entries(proposals).forEach(([coords, els]) => {
      if (els.length === 1) {
        delete elfes[els[0]];
        elfes[coords] = true;
      }
    });
  }
  let rect = getRect();

  let [xRange, yRange] = rect;

  return (
    (Math.abs(xRange[0]) + Math.abs(xRange[1]) + 1) *
    (Math.abs(yRange[0]) + Math.abs(yRange[1]) + 1) -
    Object.keys(elfes).length
  );
}

function part2(inp) {
  let elfes = {};

  inp.split('\n').forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (char === '#') {
        elfes[x + ',' + y] = true;
      }
    });
  });

  function noElfes(...coords) {
    return coords.every(([x, y]) => {
      return !elfes[[x, y].join(',')];
    });
  }

  let proposeN = ([x, y], proposals) => {
    if (noElfes([x - 1, y - 1], [x, y - 1], [x + 1, y - 1])) {
      if (!proposals[[x, y - 1].join(',')]) {
        proposals[[x, y - 1].join(',')] = [];
      }
      proposals[[x, y - 1].join(',')].push([x, y].join(','));
      return true;
    }
    return false;
  };
  let proposeS = ([x, y], proposals) => {
    if (noElfes([x - 1, y + 1], [x, y + 1], [x + 1, y + 1])) {
      if (!proposals[[x, y + 1].join(',')]) {
        proposals[[x, y + 1].join(',')] = [];
      }
      proposals[[x, y + 1].join(',')].push([x, y].join(','));
      return true;
    }
    return false;
  };
  let proposeW = ([x, y], proposals) => {
    if (noElfes([x - 1, y - 1], [x - 1, y], [x - 1, y + 1])) {
      if (!proposals[[x - 1, y].join(',')]) {
        proposals[[x - 1, y].join(',')] = [];
      }
      proposals[[x - 1, y].join(',')].push([x, y].join(','));
      return true;
    }
    return false;
  };
  let proposeE = ([x, y], proposals) => {
    if (noElfes([x + 1, y - 1], [x + 1, y], [x + 1, y + 1])) {
      if (!proposals[[x + 1, y].join(',')]) {
        proposals[[x + 1, y].join(',')] = [];
      }
      proposals[[x + 1, y].join(',')].push([x, y].join(','));
      return true;
    }
    return false;
  };
  let propArray = [proposeN, proposeS, proposeW, proposeE];
  let round = 0;
  while (true) {
    round++;
    let proposals = {};

    let freeElf = 0;
    Object.keys(elfes).forEach((coords) => {
      let [x, y] = coords.split(',').map((it) => +it);

      if (
        noElfes(
          [x - 1, y - 1],
          [x, y - 1],
          [x + 1, y - 1],
          //
          [x - 1, y],
          [x + 1, y],
          //
          [x - 1, y + 1],
          [x, y + 1],
          [x + 1, y + 1]
        )
      ) {
        freeElf++;
        return;
      }

      propArray[0]([x, y], proposals) ||
      propArray[1]([x, y], proposals) ||
      propArray[2]([x, y], proposals) ||
      propArray[3]([x, y], proposals);
    });

    if (Object.keys(elfes).length === freeElf) {
      break;
    }

    let first = propArray.shift();
    propArray.push(first);

    Object.entries(proposals).forEach(([coords, els]) => {
      if (els.length === 1) {
        delete elfes[els[0]];
        elfes[coords] = true;
      }
    });
  }

  return round;
}

function render(elfes, xRange, yRange) {
  let res = '';

  for (let y = yRange[0]; y <= yRange[1]; y++) {
    for (let x = xRange[0]; x <= xRange[1]; x++) {
      res += elfes[x + ',' + y] ? '#' : x === 0 ? '.' : '.';
    }
    res += ` ${y.toString().padStart(3, ' ')}\n`;
  }
  console.log(res);
}
