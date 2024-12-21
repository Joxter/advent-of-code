import { makeGrid, runDay, sum } from "../../utils.js";

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
  .part(1, part1) // 160098 low:(, 164230 high
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

  function generatePaths(grid) {
    let paths = {};
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let num = grid[i][j];
        if (num === "#") continue;
        let q = [[i, j, ""]];
        let visited = new Set();

        while (q.length > 0) {
          let [x, y, path] = q.shift();

          if (grid[x][y] === "#") continue;
          if (visited.has(`${x},${y}`)) continue;
          visited.add(`${x},${y}`);

          // console.log("----------- path", path);
          // console.log(path.split().sort().join(""));
          if (!paths[`${num}${grid[x][y]}`]) {
            paths[`${num}${grid[x][y]}`] = path;
            // continue
            // .split("")
            // .toSorted()
            // .join("");
          }
          // paths[`${num}${grid[x][y]}`] = path;

          if (path) {
            let lastPath = path.at(-1);
            let dirs2 = [
              //
              [...dirToXY[lastPath], path.at(-1)],
              ...dirs.filter(([, , d]) => d !== lastPath),
            ];
            // console.log(path, lastPath, dirs2);

            for (let [dx, dy, dir] of dirs2) {
              q.push([x + dx, y + dy, path + dir]);
            }
          } else {
            for (let [dx, dy, dir] of dirs) {
              q.push([x + dx, y + dy, path + dir]);
            }
          }
        }
      }
    }
    // console.log("------");
    // console.log(paths);
    return paths;
  }

  let numpadPaths = {
    ...generatePaths(numpad),
    AA: "",
    A0: "<",
    A3: "^",
    A2: "<^",
    A6: "^^",
    A5: "<^^",
    A1: "^<<",
    A9: "^^^",
    A8: "<^^^",
    A4: "^^<<",
    A7: "^^^<<",
  };
  let arrPaths = {
    ...generatePaths(arrpad),
    "A<": "v<<",
    "<<": "",
    "<v": ">",
    "<>": ">>",
    "<^": ">^",
    "<A": ">>^",
    vv: "",
    "v>": ">",
    "v<": "<",
    "v^": "^",
    vA: ">^",
    ">>": "",
    ">v": "<",
    ">A": "^",
    "><": "<<",
    ">^": "<^",
  };

  // console.log(numpadPaths);
  // console.log(arrPaths);

  let codes = inp.split("\n");

  let complexity = codes.map((code) => {
    // console.log(code);
    let p1 = getPath1("A" + code, numpadPaths);
    // console.log("p1: ", p1);

    let p2 = getPath1("A" + p1, arrPaths);
    // console.log("p2: ", p2);

    let p3 = getPath1("A" + p2, arrPaths);
    // console.log("p3: ", p3);

    // console.log(code + ": " + p3);

    // console.log(code.slice(0, 3));
    return +code.slice(0, 3) * p3.length;
  });

  return sum(complexity);

  function getPath1(code, paths) {
    let path1 = [];
    for (let i = 0; i < code.length - 1; i++) {
      let pair = code.slice(i, i + 2);
      // console.log(pair);
      path1.push(paths[pair] + "A");
    }
    return path1.join("");
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
