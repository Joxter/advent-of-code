import fs from 'fs';

// https://adventofcode.com/2022/day/22

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();
let inputTEST = fs.readFileSync('./inputTEST.txt').toString();

// console.log('test OK: ', part1(testInput), [6032]);
// console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part2(testInput) === 123);
// console.log('answer2:', part2(inputData));

console.log('answer2:', part2(inputTEST));

function part1(inp) {
  let dirDelta = {
    '>': [0, 1],
    '<': [0, -1],
    '^': [-1, 0],
    'v': [1, 0],
  };
  let clockDir = ['>', 'v', '<', '^']; //.map(it => dir[it]);

  let [strMap, strRoute] = inp.split('\n\n');

  let map = strMap.split('\n').map((line) => {
    return line.split('').map((char) => char === '_' ? ' ' : char);
  });
  // row, col
  let curPos = [0, map[0].findIndex(it => it === '.')];

  let [curSteps, ...route] = strRoute.split(/(?=[LR]\d+)/);
  curSteps = +curSteps;
  route.unshift('R' + curSteps);

  let currDirection = 100_000 - 1;

  let path = {[curPos.join(',')]: '>'};

  let directionArrow = clockDir[currDirection % 4];

  route.forEach((p, i) => {
    let direction = p.slice(0, 1);
    let steps = +p.slice(1);
    if (direction === 'R') {
      currDirection++;
    } else {
      currDirection--;
    }
    directionArrow = clockDir[currDirection % 4];

    for (let i = 0; i < steps; i++) {
      curPos = getStepCoords(curPos, directionArrow);

      path[curPos.join(',')] = directionArrow;
    }
  });
  render(map, path, curPos);

  let arrowPoint = {'>': 0, 'v': 1, '<': 2, '^': 3}[directionArrow];

  return 1000 * (curPos[0] + 1) + 4 * (curPos[1] + 1) + arrowPoint;

  function getStepCoords([row, col], directionArrow) {
    let delta = dirDelta[directionArrow];

    if (map[row + delta[0]] && map[row + delta[0]][col + delta[1]]) {
      let nextChar = map[row + delta[0]][col + delta[1]];

      if (nextChar === '.') return [row + delta[0], col + delta[1]];
      if (nextChar === '#') return [row, col];

      let cur = [row, col];

      while (
        (map[cur[0] - delta[0]] && map[cur[0] - delta[0]][cur[1] - delta[1]] === '.')
        ||
        (map[cur[0] - delta[0]] && map[cur[0] - delta[0]][cur[1] - delta[1]] === '#')
        ) {
        cur = [cur[0] - delta[0], cur[1] - delta[1]];
      }

      if (map[cur[0]][cur[1]] === '#') {
        return [row, col];
      }

      return cur;
    } else {
      let cur = [row, col];

      while (
        (map[cur[0] - delta[0]] && map[cur[0] - delta[0]][cur[1] - delta[1]] === '.')
        ||
        (map[cur[0] - delta[0]] && map[cur[0] - delta[0]][cur[1] - delta[1]] === '#')
        ) {
        cur = [cur[0] - delta[0], cur[1] - delta[1]];
      }

      if (map[cur[0]][cur[1]] === '#') {
        return [row, col];
      }
      return cur;
    }

    return [row, col];
  }
}

function part2(inp) {
  let dirDelta = {
    '>': [0, 1],
    '<': [0, -1],
    '^': [-1, 0],
    'v': [1, 0],
  };
  let clockDir = ['>', 'v', '<', '^']; //.map(it => dir[it]);

  let [strMap, strRoute] = inp.split('\n\n');

  let map = strMap.split('\n').map((line) => {
    return line.split('').map((char) => char === '_' ? ' ' : char);
  });
  // row, col
  let curPos = [0, map[0].findIndex(it => it === '.')];

  let [curSteps, ...route] = strRoute.split(/(?=[LR]\d+)/);
  curSteps = +curSteps;
  route.unshift('R' + curSteps);

  let currDirection = 100_000 - 1;

  let path = {[curPos.join(',')]: '>'};

  let directionArrow = clockDir[currDirection % 4];

  route = [
    'R51', 'R52', 'L3', 'L6', 'R47', 'L3', 'L6', 'R47', 'L3', 'L12', 'R102', 'R2', 'R12', 'L12', 'R4', 'R60',
    'R10', 'L3', 'L7', 'R95', 'L3', 'L10'
  ];
  route.forEach((p, i) => {
    let direction = p.slice(0, 1);
    let steps = +p.slice(1);
    if (direction === 'R') {
      currDirection++;
    } else {
      currDirection--;
    }
    // directionArrow = clockDir[currDirection % 4];
    // console.log(directionArrow);

    for (let i = 0; i < steps; i++) {
      [curPos, currDirection] = getStepCoords(curPos, clockDir[currDirection % 4]);

      path[curPos.join(',')] = clockDir[currDirection % 4];
    }
  });
  render(map, path, curPos);

  let arrowPoint = {'>': 0, 'v': 1, '<': 2, '^': 3}[directionArrow];

  return 1000 * (curPos[0] + 1) + 4 * (curPos[1] + 1) + arrowPoint;

  function getStepCoords([row, col], directionArrow) {
    let right = 100_000;
    let down = 100_001;
    let left = 100_002;
    let up = 100_003;
    let arrowToNumber = {'>': right, '<': left, '^': up, 'v': down};

    let delta = dirDelta[directionArrow];

    let newRow = row + delta[0];
    let newCol = col + delta[1];

    if (map[newRow] && map[newRow][newCol]) {
      let nextChar = map[newRow][newCol];

      if (nextChar === '.') return [[newRow, newCol], arrowToNumber[directionArrow]];
      if (nextChar === '#') return [[row, col], arrowToNumber[directionArrow]];

      let [mCoords, dir] = moveTile([newRow, newCol], directionArrow);

      if (map[mCoords[0]][mCoords[1]] === '#') {
        return [[row, col], arrowToNumber[directionArrow]];
      }
      return [mCoords, dir];
    }

    let [mCoords, dir] = moveTile([newRow, newCol], directionArrow);

    if (map[mCoords[0]][mCoords[1]] === '#') {
      return [[row, col], arrowToNumber[directionArrow]];
    }
    return [mCoords, dir];
  }

  function moveTile([row, col], arrow) {
    let right = 100_000;
    let down = 100_001;
    let left = 100_002;
    let up = 100_003;

    console.log({row, col});

    let isLine1 = (it) => it >= 0 && it <= 49;
    let isLine2 = (it) => it >= 50 && it <= 99;
    let isLine3 = (it) => it >= 100 && it <= 149;
    let isLine4 = (it) => it >= 150 && it <= 199;
    let isLine5 = (it) => it >= 200 && it <= 249;
    // 0-49 | 50-99 | 100-149 | 150-199 | 20


    // line1, under 2
    if (arrow === 'v' && row === 50 && isLine3(col)) {
      return [[col - 50, 99], left]; // OK
    }
    // line1, right 3
    if (arrow === '>' && col === 100 && isLine2(row)) {
      return [[49, row + 50], up]; // OK
    }

    // line2, right 2
    if (col === 150 && isLine1(row)) {
      return [[100 + (49 - row), 99], left]; // OK
    }
    // line2, right 4
    if (col === 100 && isLine3(row)) {
      return [[0 + (149 - row), 149], left]; // OK
    }

    // line3, under 4
    if (arrow === 'v' && row === 150 && isLine2(col)) {
      return [[col + 100, 49], left]; // OK
    }
    // line3, right 6
    if (arrow === '>' && col === 50 && isLine4(row)) {
      return [[149, row - 100], up]; // OK
    }

    // line4, over 2
    if (row === -1 && isLine3(col)) {
      return [[199, col - 100], up]; // OK
    }
    // line4, under 6
    if (row === 200 && isLine1(col)) {
      return [[0, col + 100], down]; // OK
    }

    // line5, left 1
    if (col === 49 && isLine1(row)) {
      return [[150 - row, 0], right]; // OK
    }
    // line5, left 5
    if (col === -1 && isLine3(row)) {
      return [[150 - row, 50], right];// OK
    }

    // // line6, over 1
    if (row === -1 && isLine2(col)) {
      return [[100 + col, 0], right]; // OK
    }
    // // line6, left 6
    if (col === -1 && isLine4(row)) {
      return [[0, row - 100], down];
    }

    // line7, right 3
    if (arrow === '<' && col === 49 && isLine2(row)) {
      return [[100, row - 50], down]; // OK
    }
    // line7, up 5
    if (arrow === '^' && row === 99 && isLine1(col)) {
      return [[col + 50, 50], right]; // OK
    }

    // [row, col]
    // 0-49 | 50-99 | 100-149 | 150-199 | 20
    /*
          '>' '<'  '^'  'v'
    */

    return [[row, col], down];
  }
}

function render(map, path, final) {
  // {[row,col]: '>'}
  let result = map.map((row, rowI) => {
    return row.map((char, colI) => {
      if (final.join(',') === rowI + ',' + colI) return 'X';

      let pChar = path[rowI + ',' + colI];

      return pChar || char;

    }).join('');
  }).join('\n');
  // console.log(result);
  fs.writeFileSync('./path.txt', result);
}