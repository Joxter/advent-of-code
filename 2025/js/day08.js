import { runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/8

runDay(2025, 8)
  //
  // .part(1, part1)
  .part(2, part2)
  .end();

function distance(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
  );
}

function part1(inp, maxLinks = 1000) {
  let dots = inp.split("\n").map((l) => l.split(",").map((n) => +n));

  let cir = Array(dots.length).fill(null);
  let allPairs = {};

  for (let i = 0; i < dots.length - 1; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      allPairs[i + "," + j] = distance(dots[i], dots[j]);
    }
  }
  let sortedDist = Object.entries(allPairs).toSorted(([, a], [, b]) => a - b);

  for (let i = 1; i <= maxLinks; i++) {
    let [a, b] = sortedDist.shift()[0].split(",");

    if (cir[+a] !== null && cir[+b] !== null) {
      let old1 = cir[+a];
      let old2 = cir[+b];
      let newN = Math.min(old1, old2);

      cir = cir.map((n) => (n === old1 ? newN : n));
      cir = cir.map((n) => (n === old2 ? newN : n));
    } else {
      if (cir[+a] === null) {
        cir[+a] = cir[+b] ?? +a;
      }
      if (cir[+b] === null) {
        cir[+b] = cir[+a] ?? +a;
      }
    }
  }
  let cnts = {};
  cir.forEach((n) => {
    if (n !== null) {
      cnts[n] = (cnts[n] || 0) + 1;
    }
  });

  // console.log(Object.values(cnts).toSorted((a, b) => b - a));
  let sizes = Object.values(cnts).toSorted((a, b) => b - a);

  return sizes[0] * sizes[1] * sizes[2];
}

function part2(inp) {
  let dots = inp.split("\n").map((l) => l.split(",").map((n) => +n));

  let cir = Array(dots.length).fill(null);
  let allPairs = {};

  for (let i = 0; i < dots.length - 1; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      allPairs[i + "," + j] = distance(dots[i], dots[j]);
    }
  }
  let sortedDist = Object.entries(allPairs).toSorted(([, a], [, b]) => a - b);

  let res = 0;
  while (true) {
    let [a, b] = sortedDist.shift()[0].split(",");

    if (cir[+a] !== null && cir[+b] !== null) {
      let old1 = cir[+a];
      let old2 = cir[+b];
      let newN = Math.min(old1, old2);

      cir = cir.map((n) => (n === old1 ? newN : n));
      cir = cir.map((n) => (n === old2 ? newN : n));
    } else {
      if (cir[+a] === null) {
        cir[+a] = cir[+b] ?? +a;
      }
      if (cir[+b] === null) {
        cir[+b] = cir[+a] ?? +a;
      }
    }

    res = dots[+a][0] * dots[+b][0];

    if (cir.every((n) => n === cir[0])) {
      break;
    }
  }

  return res;
}
