import fs from 'fs';

// row, col
let portals = {
  ...creatPortals([50, 100], [50, 149], 'v', [50, 100], [99, 100], '>'), // line1
  ...creatPortals([0, 150], [49, 150], '>', [149, 100], [100, 100], '>'), // line2 ??? bug
  ...creatPortals([150, 50], [150, 99], 'v', [150, 50], [199, 50], '>'), // line3
  ...creatPortals([-1, 100], [-1, 149], '^', [200, 0], [200, 49], 'v'), // line4
  ...creatPortals([0, 49], [49, 49], '<', [149, -1], [100, -1], '<'), // line5
  ...creatPortals([-1, 50], [-1, 99], '^', [150, -1], [199, -1], '<'), // line6
  ...creatPortals([50, 49], [99, 49], '<', [99, 0], [99, 49], '^'), // line7
};

// https://adventofcode.com/2022/day/22

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();
let inputTEST = fs.readFileSync('./inputTEST.txt').toString();

// console.log('test OK: ', part1(testInput), [6032]);
// console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part2(testInput) === 123);
console.log('answer2:', part2(inputData));
// console.log('answer2:', part2(inputTEST)); // 107228 [ 106, 56 ]

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
    return line.split('');
  });
  // row, col
  let curPos = [0, map[0].findIndex(it => it === '.')];

  let [curSteps, ...route] = strRoute.split(/(?=[LR]\d+)/);
  curSteps = +curSteps;
  route.unshift('R' + curSteps);

  let currDirection = 100_000 - 1;

  let path = { [curPos.join(',')]: '>' };

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

  let arrowPoint = { '>': 0, 'v': 1, '<': 2, '^': 3 }[directionArrow];

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
    return line.split('');
    // return line.split('').map((c) => c === '#' ? '.' : c);
  });
  // row, col
  let curPos = [0, map[0].findIndex(it => it === '.')];

  let [curSteps, ...route] = strRoute.split(/(?=[LR]\d+)/);
  curSteps = +curSteps;
  route.unshift('R' + curSteps);

  let currDirection = 100_000 - 1;

  let path = { [curPos.join(',')]: '>' };

  let directionArrow = clockDir[currDirection % 4];

  // console.log(route);
  // route = [
  //   'R50', 'R52', 'L3', 'L49', 'R48', 'L3', 'L6',
  //   'R47', 'L3', 'L12', 'R102', 'R2', 'R12', 'L18', 'R4', 'R60',
  //   'R10', 'L3', 'L7', 'R95', 'L3', 'L10'
  // ];

  // console.log(route.length);
  // route = route.slice(0, 4);
  // console.log(route);
  route.forEach((p, i) => {
    let direction = p.slice(0, 1);
    let steps = +p.slice(1);
    if (direction === 'R') {
      currDirection++;
    } else {
      currDirection--;
    }

    for (let i = 0; i < steps; i++) {
      [curPos, currDirection] = getStepCoords(curPos, clockDir[currDirection % 4]);

      path[curPos.join(',')] = clockDir[currDirection % 4];
    }
    // console.log(p, i);
    // render(map, path, curPos);

    // hardWait(2000);
  });
  render(map, path, curPos);

  // console.log(directionArrow);
  let arrowPoint = { '>': 0, 'v': 1, '<': 2, '^': 3 }[clockDir[currDirection % 4]];

  // 113299 is low :(
  // after fixing a mistake in INPUT...
  // 11427 :/
  // after fixing a BUG in code...
  // 33375
  // 197123 :(
  // 197120 :(
  // 197122 :(

  return 1000 * (curPos[0] + 1) + 4 * (curPos[1] + 1) + arrowPoint;

  function getStepCoords([row, col], directionArrow) {
    let right = 100_000;
    let down = 100_001;
    let left = 100_002;
    let up = 100_003;
    let arrowToNumber = { '>': right, '<': left, '^': up, 'v': down };

    let delta = dirDelta[directionArrow];

    let newRow = row + delta[0];
    let newCol = col + delta[1];

    if (map[newRow] && map[newRow][newCol]) {
      let nextChar = map[newRow][newCol];

      if (nextChar === '.') return [[newRow, newCol], arrowToNumber[directionArrow]];
      if (nextChar === '#') return [[row, col], arrowToNumber[directionArrow]];

      let [mCoords, dir] = goPortal([newRow, newCol], directionArrow);

      if (map[mCoords[0]][mCoords[1]] === '#') {
        return [[row, col], arrowToNumber[directionArrow]];
      }
      return [mCoords, dir];
    }

    let [mCoords, dir] = goPortal([newRow, newCol], directionArrow);

    if (map[mCoords[0]][mCoords[1]] === '#') {
      return [[row, col], arrowToNumber[directionArrow]];
    }
    return [mCoords, dir];
  }

  function goPortal([row, col], arrow) {
    // let right = 100_000;
    // let down = 100_001;
    // let left = 100_002;
    // let up = 100_003;

    if (portals[`${row},${col},${arrow}`]) {
      let [resRow, resCol, resArr] = portals[`${row},${col},${arrow}`].split(',');
      let ar = {
        '>': 100_000,
        'v': 100_001,
        '<': 100_002,
        '^': 100_003,
      };

      return [[+resRow, +resCol], ar[resArr]];
    }

    throw 3;
    // return [[row, col], down];
  }
}

// console.log(creatPortals([0, 150], [49, 150], '>', [149, 100], [100, 100], '>'));

function creatPortals(fromA, fromB, fromArrow, toA, toB, toArrow) {
  let line1 = [];
  if (fromA[0] == fromB[0]) { // horizintal
    line1.push(
      ...myRange(fromA[1], fromB[1]).map((n) => {
        return [fromA[0], n];
      })
    );
  } else {
    line1.push(
      ...myRange(fromA[0], fromB[0]).map((n) => {
        return [n, fromA[1]];
      })
    );
  }

  debugger
  let line2 = [];
  if (toA[0] == toB[0]) { // horizintal
    line2.push(
      ...myRange(toA[1], toB[1]).map((n) => {
        return [toA[0], n];
      })
    );
  } else {
    line2.push(
      ...myRange(toA[0], toB[0]).map((n) => {
        return [n, toA[1]];
      })
    );
  }

  let portals = {
    // [row, col,arrow]: `row, col,arrow`
  };

  let dirDelta = {
    '>': [0, 1],
    '<': [0, -1],
    '^': [-1, 0],
    'v': [1, 0],
  };
  let antiArrow = {
    '>': '<',
    '<': '>',
    '^': 'v',
    'v': '^',
  };

  line1.forEach((l1, i) => {
    let l2 = line2[i];
    // console.log(l1, l2);

    portals[`${l1[0]},${l1[1]},${fromArrow}`] =
      `${l2[0] - dirDelta[toArrow][0]},${l2[1] - dirDelta[toArrow][1]},${antiArrow[toArrow]}`;

    portals[`${l2[0]},${l2[1]},${toArrow}`] =
      `${l1[0] - dirDelta[fromArrow][0]},${l1[1] - dirDelta[fromArrow][1]},${antiArrow[fromArrow]}`;

    // portals[`${l1[0] - dirDelta[fromArrow][0]},${l1[1] - dirDelta[fromArrow][1]},${fromArrow}`] =
    //   `${l2[0] + dirDelta[toArrow][0]},${l2[1] + dirDelta[toArrow][0]},${toArrow}`;
  });

  return portals;
}

function myRange(a, b) {
  let res = [];

  if (a < b) {
    for (let i = a; i <= b; i++) {
      res.push(i);
    }
  }

  for (let i = a; i >= b; i--) {
    res.push(i);
  }

  return res;
}

function render(map, path, final) {
  // {[row,col]: '>'}

  let result = '';

  for (let rowI = -1; rowI <= 300; rowI++) {
    let row = '';
    for (let colI = -1; colI <= 300; colI++) {
      // if (final.join(',') === rowI + ',' + colI) return 'X';

      let pChar = path[rowI + ',' + colI];
      // let pChar = (rowI + ',' + colI) in path ? dirArr[path[rowI + ',' + colI]] : null;

      let mapChar = map[rowI]?.[colI];
      let portal = portals[rowI + ',' + colI + ',^']
        ? '^'
        : portals[rowI + ',' + colI + ',v']
          ? 'v'
          : portals[rowI + ',' + colI + ',>']
            ? '>'
            : portals[rowI + ',' + colI + ',<']
              ? '<'
              : null;

      row += pChar || portal || mapChar || '+';
    }
    result += row + '\n';
  }

  // console.log(result);
  fs.writeFileSync('./path.txt', result);
}
