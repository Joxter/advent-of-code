import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/11

runDay(2015, 11, 10)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let n = inp.split("").map((n) => alphabet.indexOf(n));

  let limit = 0;
  while (limit < 1_000_000) {
    limit++;
    inc(n);

    if (n.includes(8) || n.includes(11) || n.includes(14)) {
      continue;
    }

    let double = [];
    for (let i = 1; i < n.length; i++) {
      if (n[i] === n[i - 1] && !double.includes(n[i])) {
        double.push(n[i]);
      }
    }
    if (double.length < 2) continue;

    for (let i = 2; i < n.length; i++) {
      if (n[i] === n[i - 1] + 1 && n[i] === n[i - 2] + 2) {
        return n.map((n) => alphabet[n]).join("");
      }
    }
  }

  return "password is not found";

  function inc(numbers) {
    for (let i = numbers.length - 1; i >= 0; i--) {
      numbers[i]++;
      if (alphabet[numbers[i]]) break;
      numbers[i] = 0;
    }
  }
}

function part2(inp) {
  return part1(part1(inp));
}
