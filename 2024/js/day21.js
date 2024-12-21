import { findInGrid, makeGrid, runDay, sum, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/21

// console.log(part1(`456A`));
// console.log(part2(`029A`));
// console.log(
//   part1(`029A
// 980A
// 179A
// 456A
// 379A`),
//   [126384],
// );

runDay(2024, 21)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let numpad = makeGrid(
    `
#####
#789#
#456#
#123#
##0A#
#####
`.trim(),
  );

  let arrpad = makeGrid(
    `
#####
##^A#
#<v>#
#####
`.trim(),
  );

  let dirs = [
    [0, 1, ">"],
    [0, -1, "<"],
    [1, 0, "v"],
    [-1, 0, "^"],
  ];

  function generateAllPaths(grid, start, end) {
    let paths = [];

    let q = [[findInGrid(grid, start), "", ""]];

    while (q.length > 0) {
      let [pos, path, pathCell] = q.shift();

      let [i, j] = pos;
      let cell = grid[i]?.[j];
      if (cell === "#") continue;

      if (cell === end) {
        paths.push(path);
        continue;
      }

      for (let [dx, dy, dir] of dirs) {
        let [x, y] = [i + dx, j + dy];
        if (!pathCell.includes(cell)) {
          q.push([[x, y], path + dir, pathCell + cell]);
        }
      }
    }
    let min = Math.min(...paths.map((p) => p.length));

    paths = paths.filter((p) => p.length === min);

    return paths;
  }

  let arrPaths = {};
  let nums = "A<>v^";
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      let start = nums[i];
      let end = nums[j];
      arrPaths[start + end] = generateAllPaths(arrpad, start, end);
    }
  }

  let numpadPaths = {};
  let nums2 = "0123456789A";
  for (let i = 0; i < nums2.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      let start = nums2[i];
      let end = nums2[j];
      numpadPaths[start + end] = generateAllPaths(numpad, start, end);
    }
  }

  let codes = inp.split("\n");

  function getMin(p2) {
    let min = Math.min(...new Set(p2.map((p) => p.length)));
    p2 = p2.filter((p) => p.length === min);
    return p2;
  }

  let complexity = codes.map((code) => {
    // console.log(code);
    let p1 = getMin(getPath1("A" + code, numpadPaths));

    let p2 = [];

    p1.forEach((p) => {
      p2.push(...getPath1("A" + p, arrPaths));
    });

    let min = Infinity;
    getMin(p2).forEach((p) => {
      getPath1("A" + p, arrPaths).forEach((aaa) => {
        min = Math.min(aaa.length, min);
      });
    });

    return +code.slice(0, 3) * min;
  });

  return sum(complexity);

  function getPath1(code, paths) {
    let p = [""];
    for (let i = 0; i < code.length - 1; i++) {
      let pair = code.slice(i, i + 2);

      let newP = [];
      paths[pair].forEach((possiblePath) => {
        p.forEach((pp) => {
          newP.push(pp + possiblePath + "A");
        });
      });
      p = newP;
    }

    return p;
  }
}

function part2(inp) {
  return 123;
}
