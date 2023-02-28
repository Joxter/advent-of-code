import fs from 'fs';
import { runSolution } from '../../utils.js';

// https://adventofcode.com/2022/day/24

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

runSolution('test  ', () => part1(testInput), 18);
runSolution('part_1', () => part1(inputData), 266);

runSolution('test  ', () => part2(testInput), 54);
runSolution('part_2', () => part2(inputData), 853);

function part1(inp) {
  let winds = {};
  let start = [0, 1];

  let map = inp.split('\n').map((line, rowI) => {
    return line.split('').map((char, colI) => {
      if (char === 'E' || char === '#' || char === '.') {
        if (char === 'E') start = [rowI, colI];
        return char;
      }
      let key = `${rowI},${colI}`;
      if (!winds[key]) {
        winds[key] = [];
      }
      winds[key].push(char);
      return '.';
    });
  });

  let queue = [
    [[...start], 0]
  ];

  let exit = 1_000_000_000;
  let mov = {
    '^': [-1, 0],
    'v': [1, 0],
    '<': [0, -1],
    '>': [0, 1],
  };
  let windsCash = [winds];

  for (let i = 1; i < 1000; i++) {
    windsCash.push(getWinds(windsCash[i - 1], map));
  }

  let iters = 0;
  let qSet = new Set();
  qSet.add(`${start[0]},${start[1]},${0}`);

  while (exit-- && queue.length > 0) {
    iters++;
    let [position, minute] = queue.shift();
    qSet.delete(`${position[0]},${position[1]},${minute}`);

    let minWinds = windsCash[minute + 1];

    for (let k in mov) {
      let [deltaRow, deltaCol] = mov[k];
      let newRow = position[0] + deltaRow;
      let newCol = position[1] + deltaCol;

      if (map[newRow] && map[newRow][newCol] === '.') {
        if (!minWinds[`${newRow},${newCol}`]) {
          if (!qSet.has(`${newRow},${newCol},${minute + 1}`)) {
            queue.push([[newRow, newCol], minute + 1]);
            qSet.add(`${newRow},${newCol},${minute + 1}`);
          }

          if (newRow === map.length - 1) {
            return minute + 1;
          }
        }
      }
    }

    if (!minWinds[`${position[0]},${position[1]}`]) {
      queue.push([position, minute + 1]);
      qSet.add(`${position[0]},${position[1]},${minute + 1}`);
    }
  }
}

function getWinds(winds, map) {
  let mov = {
    '^': [-1, 0],
    'v': [1, 0],
    '<': [0, -1],
    '>': [0, 1],
  };

  let newWinds = {};
  Object.entries(winds).forEach(([coords, ws]) => {
    let [row, col] = coords.split(',');

    ws.forEach((w) => {
      let newRow = +row + mov[w][0];
      let newCol = +col + mov[w][1];
      if (map[newRow][newCol] === '#') {
        if (w === '^') newRow = map.length - 2;
        if (w === 'v') newRow = 1;
        if (w === '<') newCol = map[0].length - 2;
        if (w === '>') newCol = 1;
      }
      let key = `${newRow},${newCol}`;
      if (!newWinds[key]) {
        newWinds[key] = [];
      }
      newWinds[key].push(w);
    });
  });

  return newWinds;
}

function part2(inp) {
  let winds = {};
  let start = [0, 1];

  let map = inp.split('\n').map((line, rowI) => {
    return line.split('').map((char, colI) => {
      if (char === 'E' || char === '#' || char === '.') {
        return char;
      }
      let key = `${rowI},${colI}`;
      if (!winds[key]) {
        winds[key] = [];
      }
      winds[key].push(char);
      return '.';
    });
  });

  let exit = 1_000_000_000;
  let mov = {
    '^': [-1, 0],
    'v': [1, 0],
    '<': [0, -1],
    '>': [0, 1],
  };
  let windsCash = [winds];

  for (let i = 1; i < 1000; i++) {
    windsCash.push(getWinds(windsCash[i - 1], map));
  }
  let iters = 0;

  let queue = [
    [[...start], 0, 'finish']
  ];

  let qSet = new Set();
  qSet.add(`${start[0]},${start[1]},0,finish`);
  while (exit-- && queue.length > 0) {
    iters++;
    let [position, minute, goal] = queue.shift();
    qSet.delete(`${position[0]},${position[1]},${minute},${goal}`);

    let minWinds = windsCash[minute + 1];

    for (let k in mov) {
      let [deltaRow, deltaCol] = mov[k];
      let newRow = position[0] + deltaRow;
      let newCol = position[1] + deltaCol;

      if (map[newRow] && map[newRow][newCol] === '.') {
        if (!minWinds[`${newRow},${newCol}`]) {
          if (!qSet.has(`${newRow},${newCol},${minute + 1},${goal}`)) {
            queue.push([[newRow, newCol], minute + 1, goal]);
            qSet.add(`${newRow},${newCol},${minute + 1},${goal}`);
          }

          if (goal === 'finish' && newRow === map.length - 1) {
            queue = [
              [[newRow, newCol], minute + 1, 'snacks']
            ];
            qSet.clear();
            qSet.add(`${newRow},${newCol},${minute + 1},snacks`);
            break;
          } else if (goal === 'snacks' && newRow === 0) {
            queue = [
              [[0, 1], minute + 1, 'finish2']
            ];
            qSet.clear();
            qSet.add(`0,1,${minute + 1},finish2`);
            break;
          } else if (goal === 'finish2' && newRow === map.length - 1) {
            return minute + 1;
          }
        }
      }
    }

    if (!minWinds[`${position[0]},${position[1]}`]) {
      queue.push([position, minute + 1, goal]);
      qSet.add(`${position[0]},${position[1]},${minute + 1},${goal}`);
    }
  }
}

function render(map, winds, pos = [0, 0]) {
  let res = map.map((row, rowI) => {
    return row.map((char, colI) => {

      if (pos[0] === rowI && pos[1] === colI) {
        if (winds[`${rowI},${colI}`]) {
          return '█';
        }
        return '▒';
      }

      if (winds[`${rowI},${colI}`]) {
        return winds[`${rowI},${colI}`].length === 1
          ? winds[`${rowI},${colI}`][0]
          : winds[`${rowI},${colI}`].length;
      }

      return char;
    }).join('');
  }).join('\n');

  console.log(res);
}
