import {
  BLACK,
  forEachInGrid,
  GREY,
  makeGrid,
  makeGridWithBorder,
  printGrid,
  printGridCb,
  runDay,
  waitHard
} from "../../utils.js";

// https://adventofcode.com/2023/day/21

// console.log(part2(`...........
// .....###.#.
// .###.##..#.
// ..#.#...#..
// ....#.#....
// .##..S####.
// .##..#...#.
// .......##..
// .##.#.####.
// .##..##.##.
// ...........`));

/**
 *  Part2 is unsolved during the advent.
 *
 *  I'm pretty sure I understand the top-level solution, but I can't figure out
 *  a few details and therefore can't calculate or write a solution.
 *
 *  Will return to it later.
 * */

runDay(2023, 21)
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let grid = makeGridWithBorder(inp, "#");
  let pos = [0, 0];

  forEachInGrid(grid, (cell, i, j) => {
    if (cell === "S") {
      pos = [i, j];
    }
  });

  let coords = { [`${pos[0]},${pos[1]}`]: true };

  for (let step = 1; step <= 64; step++) {
    let newSteps = {};

    for (const coordsKey in coords) {
      let [i, j] = coordsKey.split(",").map(Number);
      [[i, j + 1],
        [i, j - 1],
        [i + 1, j],
        [i - 1, j],
      ].forEach(([ni, nj]) => {
        if (grid[ni][nj] !== "#") {
          newSteps[`${ni},${nj}`] = true;
        }
      });
    }

    coords = newSteps;
  }

  return Object.keys(coords).length;
}

function part2(inp) {
  let grid = makeGrid(inp.replace(/#/g, GREY), GREY);
  let pos = [0, 0];

  let size = grid.length;

  forEachInGrid(grid, (cell, i, j) => {
    if (cell === "S") {
      pos = [i, j];
    }
  });

  let possibleSteps = {
    [`${pos[0]},${pos[1]}`]: getBox(pos[0], pos[1]).join(",")
  };

  let cash = {};
  let boxHistory = {};
  let countHistory = [];
  let boxes = {};

  // 26501365
  for (let step = 1; step <= 500; step++) {
    let newSteps = {};
    let boxIds = {};

    for (const possibleStepsKey in possibleSteps) {
      let [i, j] = possibleStepsKey.split(",").map(Number);

      [[i, j + 1],
        [i, j - 1],
        [i + 1, j],
        [i - 1, j],
      ].forEach(([ni, nj]) => {
        if (grid[getCoords(ni)][getCoords(nj)] !== GREY) {
          newSteps[`${ni},${nj}`] = true;
          boxIds[getBox(ni, nj)] = true;
        }
      });
    }

    possibleSteps = newSteps;

    if (step % 2) {

      let cnt = { new: 0, old: 0 };
      Object.keys(boxIds).forEach((boxId) => {
        let g = renderGridByKey(boxId);
        if (cash[g]) {
          cnt.old++;
          if (step !== cash[g].steps.at(-1)) {
            cash[g].steps.push(step);
          }
        } else {
          cnt.new++;
          cash[g] = { id: Object.keys(cash).length, steps: [step] };
        }

        if (!boxes[boxId]) {
          boxes[boxId] = [];
        }
        // boxes[boxId].push(cash[g].id);
        boxes[boxId].push(cash[g].steps.at(0));
      });

      if (cnt.new || step % 50 === 1 || true) {
        countHistory.push(Object.keys(possibleSteps).length);
        console.log("");
        console.log(step);
        console.log('boxes:', Object.keys(boxIds).length, "possible steps:", Object.keys(possibleSteps).length);
        console.log({ cnt }, "cash size:", Object.keys(cash).length);
        console.log(printBoxes(boxes));
      }
      if (!cnt.new) {
        console.log("");
        console.log("break");
        console.log(step);
        console.log('boxes:', Object.keys(boxIds).length, "possible steps:", Object.keys(possibleSteps).length);
        console.log({ cnt }, "cash size:", Object.keys(cash).length);
        break;
      }
    }

    // if (step % 100 === 0) {
    //   console.log(step, Object.keys(possibleSteps).length);
    // }
  }

  function renderGridByKey(gridKey) {
    let [i, j] = gridKey.split(",");
    return renderGrid([size * i, size * i + size], [size * j, size * j + size]);
  }

  function renderGrid(iRange, jRange) {
    let res = [];
    for (let i = iRange[0]; i < iRange[1]; i++) {
      let row = "";
      for (let j = jRange[0]; j < jRange[1]; j++) {
        if (possibleSteps[`${i},${j}`]) {
          row += "0";
        } else {
          row += grid[getCoords(i)][getCoords(j)];
        }
      }
      res.push(row);
    }
    return res.join("\n");
  }

  function getCoords(n) {
    return ((n + size) % size + size) % size;
  }

  function getBox(i, j) {
    return [Math.floor(i / size), Math.floor(j / size)];
  }

  function getN(i, j) {
    let [a, b] = getBox(i, j);
    return (a * 3 + b) % 10;
  }

  return 123;
}

/*


57
boxes: 76 possible steps: 2072
{ cnt: { new: 2, old: 74 } } cash size: 179

break
59
boxes: 76 possible steps: 2244
{ cnt: { new: 0, old: 76 } } cash size: 179

===============
521
boxes: 41 possible steps: 243580
{ cnt: { new: 4, old: 37 } } cash size: 1878

break
523
boxes: 41 possible steps: 245436
{ cnt: { new: 0, old: 41 } } cash size: 1878

*/

function diff(arr, len = 1) {
  let res = [];

  for (let i = len; i < arr.length; i++) {
    res.push(arr[i] - arr[i - len]);
  }

  return res;
}

function printBoxes(boxes) {
  let iRange = [0, 0];
  let jRange = [0, 0];

  Object.keys(boxes).forEach((coords) => {
    let [i, j] = coords.split(',').map(Number);

    iRange[0] = Math.min(iRange[0], i);
    iRange[1] = Math.max(iRange[1], i);
    jRange[0] = Math.min(jRange[0], j);
    jRange[1] = Math.max(jRange[1], j);
  });

  let rows = [];
  for (let i = iRange[0]; i <= iRange[1]; i++) {
    let row = '';
    for (let j = jRange[0]; j <= jRange[1]; j++) {

      let val = boxes[`${i},${j}`]?.at(-1).toString();
      row += val ? ` [${val.padStart(2, ' ')}]` : '     ';
    }
    rows.push(row);
  }

  return rows.join('\n');
}

function countOf(arr, item) {
  return arr.filter((x) => x === item).length.toString();
}