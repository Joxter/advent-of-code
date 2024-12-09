import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/9

console.log(part1(`2333133121414131402`), [1928]);
// console.log(part1(`12345`));

runDay(2024, 9)
  //
  .part(1, part1)
  // .part(2, part2)
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
  // console.log(disk.join(""));

  return sum(
    disk.map((n, i) => {
      return n * i;
    }),
  );
}

function part2(inp) {
  return 123;
}
