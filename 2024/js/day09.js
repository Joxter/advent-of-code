import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/9

runDay(2024, 9)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let disk = [];

  let file = true;
  let id = 0;
  inp
    .trim()
    .split("")
    .forEach((n) => {
      if (file) {
        disk.push(...Array(+n).fill(id));
        id++;
      } else {
        disk.push(...Array(+n).fill("."));
      }
      file = !file;
    });

  while (disk.includes(".")) {
    let ind = disk.indexOf(".");
    disk[ind] = disk.pop();
  }

  return sum(
    disk.map((n, i) => {
      return n * i;
    }),
  );
}

function part2(inp) {
  let disk = [];

  let file = true;
  let id = 0;
  inp
    .trim()
    .split("")
    .forEach((n) => {
      if (file) {
        disk.push([+n, String(id)]);
        id++;
      } else {
        disk.push([+n, "."]);
      }
      file = !file;
    });

  let checked = disk.length;
  while (checked > 0) {
    let toMoveInd = disk.findLastIndex(([cnt, it], i) => {
      return i < checked && it !== ".";
    });
    let toMove = disk[toMoveInd];
    checked = toMoveInd;

    if (!toMove) break;

    let firstFreeInd = disk.findIndex(([cnt, it], i) => {
      return i < checked && cnt >= toMove[0] && it === ".";
    });

    let firstFree = disk[firstFreeInd];
    if (!firstFree) continue;

    disk.splice(toMoveInd, 1, [toMove[0], "."]);
    if (toMove[0] === firstFree[0]) {
      disk.splice(firstFreeInd, 1, toMove);
    } else {
      disk.splice(firstFreeInd, 1, toMove, [firstFree[0] - toMove[0], "."]);
    }
    // for (let i = 1; i < disk.length; i++) {
    //   let it = disk[i];
    //   let prev = disk[i - 1];
    //   if (prev[1] === "." && it[1] === ".") {
    //     disk.splice(i - 1, 2, [prev[0] + it[0], "."]);
    //     i -= 3;
    //   }
    // }
  }

  return sum(
    disk
      .flatMap(([n, ch]) => {
        if (ch === ".") {
          return new Array(n).fill(0);
        }
        return new Array(n).fill(+ch);
      })
      .map((n, i) => {
        return n * i;
      }),
  );
}
