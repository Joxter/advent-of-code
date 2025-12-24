import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/23

runDay(2015, 23)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  return run(inp, 0);
}

function part2(inp) {
  return run(inp, 1);
}

function run(inp, start) {
  let tape = inp.split("\n").map((l) => {
    let [name, a, b] = l.split(" ");

    if (name === "jmp") return [name, +a];
    if (b) return [name, a[0] === "a" ? 0 : 1, +b];

    return [name, a === "a" ? 0 : 1];
  });

  // let reg = { a: start, b: 0 };
  let reg = [start, 0];
  let pos = 0;

  while (tape[pos]) {
    let [name, a, b] = tape[pos];

    if (name === "inc") {
      reg[a]++;
      pos++;
    } else if (name === "tpl") {
      reg[a] *= 3;
      pos++;
    } else if (name === "hlf") {
      reg[a] /= 2;
      pos++;
    } else if (name === "jmp") {
      pos += a;
    } else if (name === "jie") {
      if (reg[a] % 2 === 0) {
        pos += b;
      } else {
        pos++;
      }
    } else if (name === "jio") {
      if (reg[a] === 1) {
        pos += b;
      } else {
        pos++;
      }
    }
  }

  return reg[1];
}
