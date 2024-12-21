import { makeGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/21

console.log(part1(`029A`));

runDay(2024, 21)
  //
  // .part(1, part1)
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
          if (x < 0 || y < 0 || x >= grid.length || y >= grid[x].length)
            continue;

          if (grid[x][y] === "#") continue;
          if (visited.has(`${x},${y}`)) continue;
          visited.add(`${x},${y}`);

          if (grid[x][y] !== "") {
            paths[`${num}${grid[x][y]}`] = path;
          }

          for (let [dx, dy, dir] of [
            [0, 1, ">"],
            [0, -1, "<"],
            [1, 0, "v"],
            [-1, 0, "^"],
          ]) {
            q.push([x + dx, y + dy, path + dir]);
          }
        }
      }
    }

    return paths;
  }

  let numpadPaths = generatePaths(numpad);
  let arrPaths = generatePaths(arrpad);

  // console.log(numpadPaths);
  // console.log(arrPaths);

  let codes = inp.split("\n");

  codes.forEach((code) => {
    let p1 = getPath1("A" + code, numpadPaths);
    console.log(p1);
    console.log(`<A^A>^^AvvvA`);

    let p2 = getPath1("A" + p1, arrPaths);
    console.log(p2); // TODO it shoud not switch directions ">v>" -> ">>v" (or"v>>")
    console.log(`v<<A>>^A<A>AvA<^AA>A<vAAA>^A`);

    let p3 = getPath1("A" + p2, arrPaths);
    console.log(p3);
    console.log(
      `<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A`,
    );

    /*
my: <v<A>A<A>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
ok:   <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A

*/
  });

  return;

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
<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
v<<A>>^A<A>AvA<^AA>A<vAAA>^A
<A^A>^^AvvvA
029A

029A: <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
980A: <v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A
179A: <v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A
456A: <v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A
379A: <v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A

*/
  return 123;
}

function part2(inp) {
  return 123;
}
