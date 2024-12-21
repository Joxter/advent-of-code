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
  // .part(2, part2) // high 638563429049266400
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

  arrPaths = {
    ...arrPaths,
    //
    "A<": ["v<<"],
    ">^": ["^<"],
    "^>": ["v>"],
    "<A": [">>^"],
    vA: [">^"],
    Av: ["<v"],
  };

  let codes = inp.split("\n");

  let complexity = codes.map((code) => {
    let p1 = getPath1("A" + code, numpadPaths);

    let p2 = calc(p1);
    let p3 = calc(p2);

    let min = Math.min(...p3.map((p) => p.length));

    return +code.slice(0, 3) * min;
  });

  return sum(complexity);

  function calc(p1) {
    return p1.map((p) => {
      return getPathOne("A" + p, arrPaths);
    });
  }
}

function part2(inp) {
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

  arrPaths = {
    ...arrPaths,
    //
    "A<": ["v<<"],
    ">^": ["^<"],
    "^>": ["v>"],
    "<A": [">>^"],
    vA: [">^"],
    Av: ["<v"],
  };

  let complexity = codes.map((code) => {
    console.log(code);
    let p1 = getPath1("A" + code, numpadPaths).map((code) => {
      return toPairs(code);
    });

    let prev = p1;
    let last;
    for (let i = 1; i <= 2; i++) {
      last = calc(prev);
      prev = last;
    }

    // let min = Math.min(...last.map((p) => p.length));
    /*

    (2 steps) min
    286A 68
    480A 74
    140A 70
    413A 70
    964A 72
    */
    return +code.slice(0, 3) * 123;
  });

  return sum(complexity);

  function calc(p1) {
    // it does not work:(
    return p1.map((p) => getPathPair(p));
  }

  function getPathPair(pairs) {
    let newPairs = {};
    // console.log("-------------");
    // console.log(pairs);

    Object.entries(pairs).forEach(([oldP, oldCnt]) => {
      let [l, r] = oldP.split("");
      let newL = arrPaths["A" + l][0] + "A";
      let newR = arrPaths["A" + r][0] + "A";

      // console.log(oldP, [newL + newR]);

      Object.entries(toPairs(newL + newR)).forEach(([newP, newCnt]) => {
        // console.log({ newP, newCnt });
        if (!newPairs[newP]) newPairs[newP] = 0;
        newPairs[newP] += oldCnt * newCnt;
      });
    });
    // console.log(newPairs);
    // throw 123;

    return newPairs;
  }
}

function generateAllPaths(grid, start, end) {
  let paths = [];

  let dirs = [
    [0, 1, ">"],
    [0, -1, "<"],
    [1, 0, "v"],
    [-1, 0, "^"],
  ];

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

function getPathOne(code, paths, n) {
  let p = "";

  for (let i = 0; i < code.length - 1; i++) {
    let pair = code.slice(i, i + 2);
    let possiblePath = paths[pair][0];
    p += possiblePath + "A";
  }

  return p;
}

function toPairs(code) {
  let p = {};

  for (let i = 0; i < code.length - 1; i++) {
    let pair = code.slice(i, i + 2);

    if (!p[pair]) p[pair] = 0;
    p[pair]++;
  }

  return p;
}
