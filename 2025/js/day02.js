import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/2

runDay(2025, 2, 10)
  //
  .part(1, part1)
  .part(2, part2)
  .part(1, part1regexp, 'regexp')
  .part(2, part2regexp, 'regexp')
  .part(1, part1fun, 'fun')
  .end();

function part1(inp) {
  let ids = [];

  inp.split(",").forEach((range) => {
    let [from, to] = range.split("-").map((n) => +n);

    for (let i = from; i <= to; i++) {
      let str = String(i);
      let l = str.slice(0, str.length / 2);
      let r = str.slice(str.length / 2);
      if (l === r) {
        ids.push(i);
      }
    }
  });

  return sum(ids);
}

function part2(inp) {
  let ids = [];

  inp.split(",").forEach((range) => {
    let [from, to] = range.split("-").map((n) => +n);

    for (let i = from; i <= to; i++) {
      let str = String(i);

      for (let n = 1; n <= str.length / 2; n++) {
        if (
          str.length % n === 0 &&
          str.slice(0, n).repeat(str.length / n) === str
        ) {
          ids.push(i);
          break;
        }
      }
    }
  });

  return sum(ids);
}

function part1regexp(inp) {
  let ids = [];

  inp.split(",").forEach((range) => {
    let [from, to] = range.split("-").map((n) => +n);

    for (let i = from; i <= to; i++) {
      if (/^(.+)\1$/.test(String(i))) {
        ids.push(i);
      }
    }
  });

  return sum(ids);
}

function part2regexp(inp) {
  let ids = [];

  inp.split(",").forEach((range) => {
    let [from, to] = range.split("-").map((n) => +n);

    for (let i = from; i <= to; i++) {
      if (/^(.+)\1+$/.test(String(i))) {
        ids.push(i);
      }
    }
  });

  return sum(ids);
}

function part1fun(inp) {
  let ids = [];

  inp.split(",").forEach((range) => {
    let [from, to] = range.split("-");
    from = +from;
    to = +to;

    for (let i = from; i <= to; i++) {
      let str = String(i);

      if (str.length % 2 === 1) {
        i = +"9".repeat(i.toString().length) + 1;
      } else {
        if (str.slice(0, str.length / 2) === str.slice(str.length / 2)) {
          ids.push(i);
          i += +"9".repeat(str.length / 2) + 1;
        }
      }
    }
  });

  return sum(ids);
}
