import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/9

runDay(2024, 9, 1)
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

  let from = 0;
  while (true) {
    let ind = disk.indexOf(".", from);
    if (ind >= 0) {
      disk[ind] = disk.pop();
      from = ind;
    } else {
      break;
    }
  }

  return sum(disk.map((n, i) => n * i));
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
        disk.push([+n, id]);
        id++;
      } else {
        disk.push([+n, null]);
      }
      file = !file;
    });

  let checkedL = 0;
  let checkedR = disk.length;
  let maxFreeSpace = 10;

  while (true) {
    let toMoveInd = -1;
    for (let i = checkedR - 1; i >= checkedL; i--) {
      if (disk[i][1] !== null && disk[i][0] <= maxFreeSpace) {
        toMoveInd = i;
        break;
      }
    }
    if (toMoveInd === -1) break;

    let toMove = disk[toMoveInd];
    checkedR = toMoveInd;

    let firstFreeInd = -1;
    let max = 0;
    for (let i = checkedL; i < checkedR; i++) {
      if (disk[i][1] === null) {
        if (max < disk[i][0]) max = disk[i][0];
        if (disk[i][0] >= toMove[0]) {
          firstFreeInd = i;
          if (toMove[0] === 1) {
            checkedL = firstFreeInd;
          }
          break;
        }
      }
    }

    if (firstFreeInd === -1) {
      maxFreeSpace = max;
      continue;
    }

    let firstFree = disk[firstFreeInd];

    disk[toMoveInd] = [toMove[0], null];
    if (toMove[0] === firstFree[0]) {
      disk[firstFreeInd] = toMove;
    } else {
      disk.splice(firstFreeInd, 1, toMove, [firstFree[0] - toMove[0], null]);
    }
  }

  return sum(
    disk
      .slice(0, disk.findLastIndex((a) => a[1] !== null) + 1)
      .flatMap(([n, ch]) => {
        if (ch === null) {
          return new Array(n).fill(0);
        }
        return new Array(n).fill(ch);
      })
      .map((n, i) => {
        return n * i;
      }),
  );
}
