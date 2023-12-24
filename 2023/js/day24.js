import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2023/day/24

console.log(part2(`19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`));

// let shotLine = {
//   start: [24, 13, 10],
//   delta: [-3, 1, 2],
// };
// let line1 = { start: [19, 13, 30], delta: [-2, 1, -2] };
// let line2 = { start: [18, 19, 22], delta: [-1, -1, -2] };
// let line3 = { start: [18, 19, 22], delta: [-1, -1, 2] };

// console.log(getCross(shotLine, line1), [5]);
// console.log(getCross(shotLine, line2), [3]);
// console.log(getCross(shotLine, line3), [null]);

runDay(2023, 24)
  // .part(1, part1)
  .part(2, part2) // I gave up..
  .end();

function part1(inp, area = [200000000000000, 400000000000000]) {
  let hails = inp
    .split("\n")
    .map((line) => {
      let [start, delta] = line
        .split(" @ ")
        .map(it => it.trim().split(/,\s+/g));

      return {
        start: [+start[0], +start[1]],
        delta: [+delta[0], +delta[1]],
      };
    });

  let cnt = 0;

  for (let i = 0; i < hails.length - 1; i++) {
    let hail1 = hails[i];
    for (let j = i + 1; j < hails.length; j++) {
      let hail2 = hails[j];

      let cross = intersect(hail1, hail2);

      let isInFuture1 = cross[0] >= hail1.start[0] && hail1.delta[0] > 0
        || cross[0] <= hail1.start[0] && hail1.delta[0] < 0;
      let isInFuture2 = cross[0] >= hail2.start[0] && hail2.delta[0] > 0
        || cross[0] <= hail2.start[0] && hail2.delta[0] < 0;

      // console.log(hail1, hail2);
      if (Number.isFinite(cross[0]) && Number.isFinite(cross[1])) {
        if (isInArea(area, cross)) {

          if (isInFuture1 && isInFuture2) {
            // console.log('inside future');
            cnt++;
          } else {
            // console.log('inside past');
          }
        } else {
          // console.log('outside');
        }
      } else {
        // console.log('parallel');
      }

    }
  }

  return cnt;
}

function part2(inp) {

  let hails = inp
    .split("\n")
    .map((line) => {
      let [start, delta] = line
        .split(" @ ")
        .map(it => it.trim().split(/,\s+/g));

      return {
        start: [+start[0], +start[1], +start[2]],
        delta: [+delta[0], +delta[1], +delta[2]],
      };
    }).sort((a, b) => {
      let aSize = Math.abs(a.delta[0]) + Math.abs(a.delta[1]) + Math.abs(a.delta[2]);
      let bSize = Math.abs(b.delta[0]) + Math.abs(b.delta[1]) + Math.abs(b.delta[2]);

      return bSize - aSize;
    });

  // console.log(hails);
  // console.log(colleactData(hails));


  // return;

  for (let timeDiff = 1; timeDiff < 1_000_000; timeDiff++) {
    let simulated = 0;
    let all = 0;

    for (let startTime = 1; startTime < 1000; startTime++) {

      let res = forEachPairOfHails((h1, h2) => {
        let shootLine = getShootLine(h1, h2, hails, startTime, startTime + timeDiff);
        all++;

        // if (all > 100) return

        if (shootLine) {
          let ans = simulate(hails, shootLine);
          simulated++;
          if (ans) {
            console.log(shootLine);
            return sum(shootLine.start);
          }
        }
      });

      if (res) return res;
    }

    console.log(timeDiff, [
      formatNumberAsMillions(simulated),
      formatNumberAsMillions(all - simulated)
    ]);

  }

  return "NOT FOUND";

  function forEachPairOfHails(cb) {
    for (let i = 0; i < hails.length; i++) {
      for (let j = 0; j < hails.length; j++) {
        if (i === j) continue;

        let res = cb(hails[i], hails[j]);

        if (res) return res;
      }
    }
  }

  return null;
}

function colleactData(hails) {
  let area = [Infinity, -Infinity];
  let maxSpeed = 0;

  let averageDelta = [0, 0, 0];

  hails.forEach(({ start, delta }) => {

    averageDelta[0] += delta[0];
    averageDelta[1] += delta[1];
    averageDelta[2] += delta[2];

    area[0] = Math.min(start[0], start[1], start[2], area[0]);
    area[1] = Math.max(start[0], start[1], start[2], area[1]);
    maxSpeed = Math.max(
      Math.abs(delta[0]),
      Math.abs(delta[1]),
      Math.abs(delta[2]),
      maxSpeed,
    );
  });

  let allDistances = [];

  for (let i = 0; i < hails.length - 1; i++) {
    for (let j = i + 1; j < hails.length; j++) {
      let d = getDistance(hails[i].start, hails[j].start);
      allDistances.push(Math.sqrt(d));
    }
  }

  let averageDist = sum(allDistances) / allDistances.length;

  let size = area[1] - area[0];

  let maxPossibleSpeed = size / hails.length;

  return {
    area: [
      formatNumberAsMillions(area[0]),
      formatNumberAsMillions(area[1])
    ],
    averageDist: formatNumberAsMillions(averageDist),
    size: formatNumberAsMillions(size),
    maxPossibleSpeed: formatNumberAsMillions(maxPossibleSpeed),
    maxSpeed,
    averageDelta
  };
}

function intersect(lineA, lineB) {
  let eq1 = makeEq(lineA.start, lineA.delta);
  let eq2 = makeEq(lineB.start, lineB.delta);

  let crossX = (eq2.C - eq1.C) / (eq1.k - eq2.k);
  let crossY = eq1.k * crossX + eq1.C;

  return [crossX, crossY];
}

function makeEq(start, delta) {
  let x1 = start[0];
  let x2 = start[0] + delta[0];
  let y1 = start[1];
  let y2 = start[1] + delta[1];

  let k = (y2 - y1) / (x2 - x1);
  let C = y1 - (y2 - y1) * x1 / (x2 - x1);

  return { k, C };
}

function isInArea(area, dot) {
  return dot[0] >= area[0] && dot[0] <= area[1]
    && dot[1] >= area[0] && dot[1] <= area[1];
}

function pointInTime(line, time) {
  return [
    line.start[0] + line.delta[0] * time,
    line.start[1] + line.delta[1] * time,
    line.start[2] + line.delta[2] * time,
  ];
}

function makeLineByDots(a, b) {
  return {
    start: a,
    delta: [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
  };
}

function moveStartTo(line, deltaTime) {
  return {
    start: pointInTime(line, deltaTime),
    delta: [...line.delta],
  };
}

function isIntegers(coords) {
  return coords.every(it => Number.isInteger(it));
}

function getCross(lineA, lineB) {
  let d0 = getDistance(lineA.start, lineB.start);
  let d1 = getDistance(pointInTime(lineA, 1), pointInTime(lineB, 1));

  if (d1 > d0) return null;

  let step = d0 / (d0 - d1);

  if (getDistance(pointInTime(lineA, step), pointInTime(lineB, step)) === 0) {
    return step;
  }
  return null;
}

function getDistance(pointA, pointB) {
  return Math.abs(pointA[0] - pointB[0])
    + Math.abs(pointA[1] - pointB[1])
    + Math.abs(pointA[2] - pointB[2]);
}

function getShootLine(h1, h2, hails, t1, t2) {
  // console.log([t1, t2]);
  let line = makeLineByDots(
    pointInTime(h1, t1),
    pointInTime(h2, t2),
  );

  line.delta = line.delta.map((it) => it / (t2 - t1));
  if (!isIntegers(line.delta)) {
    return null;
  }

  let moved = moveStartTo(line, -t1);
  return moved;
}

function simulate(hails, shotLine) {
  for (let i = 0; i < hails.length; i++) {
    if (getCross(shotLine, hails[i]) === null) {
      return false;
    }
  }

  return true;
}

function formatNumberAsMillions(n) {
  // 10,000,000 => 10m
  // 13,000,000,000,000 => 13mm

  if (n < 1_000_000) return n;
  // if (n < 1_000_000_000_000) return (n / 1_000_000).toFixed(2) + 'm'

  return (n / 1_000_000_000).toFixed(3) + "mm";
}
