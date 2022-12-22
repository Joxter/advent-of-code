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

  // 10R5L5R10L4R5L5
  let [curSteps, ...route] = strRoute.split(/(?=[LR]\d+)/);
  curSteps = +curSteps;
  route.unshift('R' + curSteps);

  let currDirection = 100_000 - 1;

  let path = {[curPos.join(',')]: '>'};

  // console.log({currDirection: clockDir[currDirection % 4], curPos, curSteps});
  // console.log(startPos);
  // console.log(map);

  // console.log(route);
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

    // console.log();
    // console.log([direction, steps], directionArrow);

    // debugger


    for (let i = 0; i < steps; i++) {
      curPos = getStepCoords(curPos, directionArrow);

      path[curPos.join(',')] = directionArrow;
    }
    // render(map, path, curPos);

    // if (i > 1) throw new Error('end');

  });
  // render(map, path, curPos);

  // console.log(curPos, directionArrow);
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
  let result = 0;
  inp.split('\n').forEach((line) => {
  });
  return result;
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