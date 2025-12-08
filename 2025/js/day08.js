import { Heap, runDay } from "../../utils.js";

// https://adventofcode.com/2025/day/8

runDay(2025, 8)
  //
  .part(1, part1)
  .part(2, part2)
  .part(2, part2heap, 'heap') // 7 times faster!
  .end();

function distance(a, b) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
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

  let cnt = 0;
  for (let i = 1; i <= maxLinks; i++) {
    let [a, b] = sortedDist[cnt++][0].split(",");

    if (cir[a] !== null && cir[b] !== null) {
      let old1 = cir[a];
      let old2 = cir[b];
      let newN = Math.min(old1, old2);

      for (let i = 0; i < dots.length; i++) {
        cir[i] === old1 ? (cir[i] = newN) : null;
        cir[i] === old2 ? (cir[i] = newN) : null;
      }
    } else {
      if (cir[a] === null) cir[a] = cir[b] ?? a;
      if (cir[b] === null) cir[b] = cir[a] ?? a;
    }
  }
  let cnts = {};
  cir.forEach((n) => {
    if (n !== null) {
      cnts[n] = (cnts[n] || 0) + 1;
    }
  });

  let sizes = Object.values(cnts).toSorted((a, b) => b - a);

  return sizes[0] * sizes[1] * sizes[2];
}

function part2(inp) {
  let dots = inp.split("\n").map((l) => l.split(",").map((n) => +n));

  let cir = Array(dots.length).fill(null);
  let allPairs = {};

  // let h = new Heap();

  for (let i = 0; i < dots.length - 1; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      allPairs[i + "," + j] = distance(dots[i], dots[j]);
      // h.push(distance(dots[i], dots[j]), i + "," + j);
    }
  }
  let sortedDist = Object.entries(allPairs).toSorted((a, b) => a[1] - b[1]);

  let cnt = 0;
  while (true) {
    // let [a, b] = h.pop().split(",");
    let [a, b] = sortedDist[cnt++][0].split(",");

    if (cir[a] !== null && cir[b] !== null) {
      let old1 = cir[a];
      let old2 = cir[b];
      let newN = Math.min(old1, old2);

      for (let i = 0; i < dots.length; i++) {
        cir[i] === old1 ? (cir[i] = newN) : null;
        cir[i] === old2 ? (cir[i] = newN) : null;
      }
    } else {
      if (cir[a] === null) cir[a] = cir[b] ?? a;
      if (cir[b] === null) cir[b] = cir[a] ?? a;
    }

    if (cir.every((n) => n === cir[0])) {
      return dots[a][0] * dots[b][0];
    }
  }
}

function part2heap(inp) {
  let dots = inp.split("\n").map((l) => l.split(",").map((n) => +n));
  let cir = Array(dots.length).fill(null);

  let h = new Heap();

  for (let i = 0; i < dots.length - 1; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      h.push(distance(dots[i], dots[j]), [i, j]);
    }
  }

  while (true) {
    let [a, b] = h.pop();

    if (cir[a] !== null && cir[b] !== null) {
      let old1 = cir[a];
      let old2 = cir[b];
      let newN = Math.min(old1, old2);

      for (let i = 0; i < dots.length; i++) {
        cir[i] === old1 ? (cir[i] = newN) : null;
        cir[i] === old2 ? (cir[i] = newN) : null;
      }
    } else {
      if (cir[a] === null) cir[a] = cir[b] ?? a;
      if (cir[b] === null) cir[b] = cir[a] ?? a;
    }

    if (cir.every((n) => n === cir[0])) {
      return dots[a][0] * dots[b][0];
    }
  }
}
