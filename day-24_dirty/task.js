import fs from 'fs';

// https://adventofcode.com/2022/day/24

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 18);
console.log('answer: ', part1(inputData), [266]);

// console.log('test2 OK:', part2(testInput) === 54);
// console.log('answer2:', part2(inputData), [853]);

function part1(inp) {
  let winds = {}; // [position]: ['']
  let start = [0, 1]; // row,col

  let map = inp.split('\n').map((line, rowI) => {
    return line.split('').map((char, colI) => {
      if (char === 'E' || char === '#' || char === '.') {
        // if (char === 'E') start = [rowI, colI];
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
  // let exit = 4;
  let mov = {
    '^': [-1, 0],
    'v': [1, 0],
    '<': [0, -1],
    '>': [0, 1],
  };
  let windsCash = [winds];

  for (let i = 1; i < 1000; i++) {
    windsCash.push(getWinds(windsCash[i - 1]));
  }
  // for (let i = 0; i < 20; i++) {
  //   console.log(i);
  //   render(map, windsCash[i], []);
  // }
  // return


  let iters = 0;

  let queue = [
    [[...start], 0, 'finish'] // finish snacks finish2
  ];

  let qSet = new Set();
  qSet.add(`${start[0]},${start[1]},0,finish`);
  while (exit-- && queue.length > 0) {
    iters++;
    let [position, minute, goal] = queue.shift();
    qSet.delete(`${position[0]},${position[1]},${minute},${goal}`);
    // console.log({minute}, position);

    if (iters % 10_000 === 0) {
      console.log(`iters ${iters / 1000}k, ${minute}min, q:${Math.ceil(queue.length / 1000)}k`);
    }

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
            console.log('RESULT, finish', minute + 1, iters);
            queue = [
              [[newRow, newCol], minute + 1, 'snacks']
            ];
            qSet.clear();
            qSet.add(`${newRow},${newCol},${minute + 1},snacks`);
            break;
          } else if (goal === 'snacks' && newRow === 0) {
            console.log('RESULT, snacks', minute + 1, iters);
            queue = [
              [[0, 1], minute + 1, 'finish2']
            ];
            qSet.clear();
            qSet.add(`0,1,${minute + 1},finish2`);
            break;
          } else if (goal === 'finish2' &&  newRow === map.length - 1) {
            console.log('RESULT, finish2', minute + 1, iters);
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

  function getWinds(winds) {
    // if (windsCash[min]) return windsCash[min];

    let newWinds = {};
    Object.entries(winds).forEach(([coords, ws]) => {
      // ^), down (v), left (<), or right (>)
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
        // console.log(key);
        if (!newWinds[key]) {
          newWinds[key] = [];
        }
        newWinds[key].push(w);
      });
    });
    // windsCash[min] = newWinds;

    // console.log(min);
    // render(map, newWinds, [0,0])
    return newWinds;
  }

  console.log({exit});

  // console.log(map);
  // console.log(winds);

  // return minute;
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

  // console.log();
  console.log(res);
}

function part2(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result;
}

/*
0
#E######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#
1
#E######
#E>3.<.#
#<..<<.#
#>2.22.#
#>v..^<#
######.#
2
#E######
#.2>2..#
#E^22^<#
#.>2.^>#
#.>..<.#
######.#
3
#E######
#<^<22.#
#E2<.2.#
#><2>..#
#..><..#
######.#
4
#E######
#E<..22#
#<<.<..#
#<2.>>.#
#.^22^.#
######.#
5
#E######
#2Ev.<>#
#<.<..<#
#.^>^22#
#.2..2.#
######.#
6
#E######
#>2E<.<#
#.2v^2<#
#>..>2>#
#<....>#
######.#
7
#E######
#.22^2.#
#<vE<2.#
#>>v<>.#
#>....<#
######.#
8
#E######
#.<>2^.#
#..!<.<#
#.22..>#
#.2v^2.#
######.#
9
#E######
#<.2>>.#
#.<<E<.#
#>2>2^.#
#.v><^.#
######.#
10
#E######
#.2..>2#
#<2v!^.#
#<>.>2.#
#..<>..#
######.#
11
#E######
#2^.^2>#
#<v<.^<#
#..2E>2#
#.<..>.#
######.#
12
#E######
#>>.<^<#
#.<..<<#
#>v.!<>#
#<^v^^>#
######.#
13
#E######
#.>3.<.#
#<..<<.#
#>2.22.#
#>v.E^<#
######.#
14
#E######
#.2>2..#
#.^22^<#
#.>2.^>#
#.>.E<.#
######.#
15
#E######
#<^<22.#
#.2<.2.#
#><2>..#
#..><E.#
######.#
16
#E######
#.<..22#
#<<.<..#
#<2.>>.#
#.^22^E#
######.#

*/