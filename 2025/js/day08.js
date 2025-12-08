import { runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/8

// console.log(part1(`162,817,812
// 57,618,57
// 906,360,560
// 592,479,940
// 352,342,300
// 466,668,158
// 542,29,236
// 431,825,988
// 739,650,466
// 52,470,668
// 216,146,977
// 819,987,18
// 117,168,530
// 805,96,715
// 346,949,466
// 970,615,88
// 941,993,340
// 862,61,35
// 984,92,344
// 425,690,689`));

runDay(2025, 8)
  //
  .part(1, part1)
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

  let cir = Array(dots.length).fill(0);
  let allPairs = {};

  for (let i = 0; i < dots.length - 1; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      allPairs[i + "," + j] = distance(dots[i], dots[j]);
    }
  }
  let sortedDist = Object.entries(allPairs).toSorted(([, a], [, b]) => a - b);

  let res = 0;
  while (cir.includes(0)) {
    let [a, b] = sortedDist.shift()[0].split(",");

    cir[+a] = 1;
    cir[+b] = 1;

    res = dots[+a][0] * dots[+b][0];
  }

  return res;
}
