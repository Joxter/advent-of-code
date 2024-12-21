import { findInGrid, makeGrid, runDay, sum, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/21

// console.log(part1(`456A`));
// console.log(part1(`029A`));
console.log(
  part1(`029A
980A
179A
456A
379A`),
  [126384],
);

runDay(2024, 21)
  //
  .part(1, part1) // 163086 ok
  // .part(2, part2) // low
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
  /*

<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
v<<A>>^A<A>AvA<^AA>A<vAAA>^A
<A^A>^^AvvvA
029A


456A
p1:  ^^<<A>A>AvvA
p2:  <AAv<AA^>>AvA^AvA^Av<AA^>A
p3:  v<<A^>>AAv<A<A^>>AA<Av>AA^Av<A^>A<A>Av<A^>A<A>Av<A<A^>>AA<Av>A^A
ok:  <v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A

*/

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

  let dirToXY = {
    ">": [0, 1],
    "<": [0, -1],
    v: [1, 0],
    "^": [-1, 0],
  };

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

  // console.log(numpadPaths);
  // return  23;
  // console.log(arrPaths);

  let codes = inp.split("\n");

  let complexity = codes.map((code) => {
    // console.log(code);
    let p1 = getPath1("A" + code, numpadPaths);
    console.log("p1", p1);
    // throw 123;

    let p2 = [];

    p1.forEach((p) => {
      p2.push(...getPath1("A" + p, arrPaths));
    });
    console.log("p2", p2.length);
    // console.log("p2", uniq(p2).length);
    // throw 123;

    let p3 = [];
    let min = Infinity;
    p2.forEach((p) => {
      getPath1("A" + p, arrPaths).forEach((aaa) => {
        min = Math.min(aaa.length, min);
      });
    });

    // console.log("p3: ", p3.length);
    // throw 123;

    // console.log(code + ": " + p3);

    // console.log(code.slice(0, 3));
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

  /*

029A
p1:  <A^A>^^AvvvA
p2:  <v<A>>^A<A>AvA<^AA>A<vAAA>^A
     v<<A>>^A<A>AvA<^AA>A<vAAA>^A
p3:  <v<A>A<A>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
9

<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
v<<A>>^A<A>AvA<^AA>A<vAAA>^A
<A^A>^^AvvvA
029A

029A: <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
980A: <v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A
179A: <v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A
456A: <v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A
379A: <v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A


my:
029A: <<vAA>A>^AvAA<^A>A<<vA>>^AvA^A<vA>^A<<vA>^A>AAvA^A<<vA>A>^AAAvA<^A>A
980A: <<vA>>^AAAvA^A<<vAA>A>^AvAA<^A>A<<vA>A>^AAAvA<^A>A<vA>^A<A>A
179A: <<vAA>A>^AAvA<^A>AvA^A<<vA>>^AAvA^A<vA>^AA<A>A<<vA>A>^AAAvA<^A>A
456A: <<vAA>A>^AAvA<^A>AAvA^A<vA>^A<A>A<vA>^A<A>A<<vA>A>^AAvA<^A>A
379A: <<vA>>^AvA^A<<vAA>A>^AAvA<^A>AAvA^A<vA>^AA<A>A<<vA>A>^AAAvA<^A>A


*/
  return 123;
}

function part2(inp) {
  return 123;
}
