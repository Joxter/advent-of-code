import fs from 'fs';

// https://adventofcode.com/2022/day/22

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput), [6032]);
console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part2(testInput) === 123);
// console.log('answer2:', part2(inputData));

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
  // render(map, path, curPos);

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

  // 10R5L5R10L4R5L5
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

  let arrowPoint = {'>': 0, 'v': 1, '<': 2, '^': 3}[directionArrow];

  return 1000 * (curPos[0] + 1) + 4 * (curPos[1] + 1) + arrowPoint;

  function getStepCoords([row, col], directionArrow) {
    let delta = dirDelta[directionArrow];

    if (map[row + delta[0]] && map[row + delta[0]][col + delta[1]]) {
      let nextChar = map[row + delta[0]][col + delta[1]];

      if (nextChar === '.') return [row + delta[0], col + delta[1]];
      if (nextChar === '#') return [row, col];

      let cur = [row, col];
      // todo moveTile()
      return cur;
    } else {
      let cur = [row, col];

      // todo moveTile()
      return cur;
    }

    return [row, col];
  }

  function moveTile([row, col], arrow) {
    let right = 100_000;
    let down = 100_001;
    let left = 100_002;
    let up = 100_003;

    let isLine1 = (it) => it >= 0 && it <= 49;
    let isLine2 = (it) => it >= 50 && it <= 99;
    let isLine3 = (it) => it >= 100 && it <= 149;
    let isLine4 = (it) => it >= 150 && it <= 199;
    let isLine5 = (it) => it >= 200 && it <= 249;
    // 0-49 | 50-99 | 100-149 | 150-199 | 20


    // line1, under 2
    if (arrow === 'v' && row === 50 && isLine3(col)) {
      return [[col - 50, 99], right];
    }
    // line1, right 3
    if (arrow === '>' && col === 100 && isLine2(row)) {
      return [[49, col + 50], up];
    }

    // line2, right 2
    if (col === 150 && isLine1(row)) {
      // 49 -> 100; 48 -> 101; 0  -> 149
      return [[100 + (49 - row), 99], left];
    }
    // line2, right 4
    if (col === 100 && isLine3(row)) {
      // 100 -> 49; 101 -> 48; 149 -> 0
      return [[0 + (149 - row), 149], left];
    }
    // todo make another 5 lines.. (line 3 is similar 1)

    // [row, col]
    // 0-49 | 50-99 | 100-149 | 150-199 | 20
    /*
          '>' '<'  '^'  'v'
    */

    return [];
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
  console.log(result);
  fs.writeFileSync('./path.txt', result);
}