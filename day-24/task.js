import fs from 'fs';

// https://adventofcode.com/2022/day/24

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput), [18]);
console.log('answer: ', part1(inputData)); // 233 < ans < 285

// console.log('test2 OK:', part2(testInput) === 123);
// console.log('answer2:', part2(inputData));

function part1(inp) {
  let winds = {}; // [position]: ['']
  let start = []; // row,col

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
    [[...start], 1]
  ];

  let exit = 1_000_000_000;
  // let exit = 4;
  let mov = {
    '^': [-1, 0],
    'v': [1, 0],
    '<': [0, -1],
    '>': [0, 1],
  };
  let windsCash = {[0]: winds};

  let iters = 0;
  while (exit-- && queue.length > 0) {
    iters++;
    let [position, minute] = queue.shift();
    // console.log({minute}, position);

    if (iters % 10_000 === 0) {
      console.log(`iters ${iters / 1000}k, ${minute}min, q:${Math.ceil(queue.length / 1000)}k`);
    }

    let minWinds = getWinds(minute);
    // render(map, minWinds, position);

    let moved = 0;

    for (let k in mov) {
      // if (k === '^') continue;
      // if (k === '<') continue;

      let [deltaRow, deltaCol] = mov[k];
      let newRow = position[0] + deltaRow;
      let newCol = position[1] + deltaCol;
      // console.log(map[newRow] && map[newRow][newCol]);

      if (map[newRow] && map[newRow][newCol] === '.') {
        if (!minWinds[`${newRow},${newCol}`]) {
          moved++;
          if (!queue.find(([p, m]) => p[0] === newRow && p[1] === newCol && m === (minute + 1))) {
            queue.push([[newRow, newCol], minute + 1]);
          }

          if (newRow === map.length - 1) {
            // Object.entries(windsCash).forEach(([m, w]) => {
            //   console.log(m);
            //   render(map, w, [0, 0]);
            // });
            console.log('RESULT', minute + 1, iters);
            return minute + 1;
          }

        }
      }
    }

    // if (moved < 2) {
    // wait
    queue.push([position, minute + 1]);
    // }
  }

  function getWinds(min) {
    if (windsCash[min]) return windsCash[min];

    let newWinds = {};
    Object.entries(windsCash[min - 1]).forEach(([coords, ws]) => {
      // ^), down (v), left (<), or right (>)
      let [row, col] = coords.split(',');

      ws.forEach((w) => {
        let newRow = +row + mov[w][0];
        let newCol = +col + mov[w][1];
        // console.log(w, {newRow, newCol}, map[newRow][newCol]);
        if (map[newRow][newCol] === '#') {
          if (w === '^') newRow = map.length - 2;
          if (w === 'v') newRow = 1;
          if (w === '<') newCol = map[0].length - 2;
          if (w === '>') newCol = 1;
        }
        let key = `${newRow},${newCol}`;
        // console.log(key);
        if (!newWinds[key]) {
          newWinds[key] = [];
        }
        newWinds[key].push(w);
      });
    });
    windsCash[min] = newWinds;

    // console.log(min);
    // render(map, newWinds, [0,0])
    return newWinds;
  }

  console.log({exit});

  // console.log(map);
  // console.log(winds);

  // return minute;
}

function render(map, winds, pos) {
  let res = map.map((row, rowI) => {
    return row.map((char, colI) => {

      if (pos[0] === rowI && pos[1] === colI) {
        return 'E';
      }

      if (winds[`${rowI},${colI}`]) {
        return winds[`${rowI},${colI}`].length === 1
          ? winds[`${rowI},${colI}`][0]
          : winds[`${rowI},${colI}`].length;
      }

      return char;
    }).join('');
  }).join('\n');

  // console.log();
  console.log(res);
}

function part2(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result;
}