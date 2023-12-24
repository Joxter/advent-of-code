import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/24

runDay(2023, 24)
  .part(1, part1)
  // .part(2, part2) // I gave up..
  .end();

function part1(inp, area = [200000000000000, 400000000000000]) {
  let hails = inp
    .split('\n')
    .map((line) => {
      let [start, delta] = line
        .split(' @ ')
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
    .split('\n')
    .map((line) => {
      let [start, delta] = line
        .split(' @ ')
        .map(it => it.trim().split(/,\s+/g));

      return {
        start: [+start[0], +start[1], +start[2]],
        delta: [+delta[0], +delta[1], +delta[2]],
      };
    });

  for (let i = 0; i < hails.length; i++) {
    console.log(i, hails.length);
    for (let j = 0; j < hails.length; j++) {
      if (i === j) continue;

      for (let t1 = 1; t1 < 200; t1++) {
        for (let t2 = t1 + 1; t2 < 201; t2++) {
          // let ans = simulate(i, j, hails, t1, t2);
          if (ans) {
            return ans;
          }
        }
      }

    }
  }

  return 'NOT FOUND';
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

function intersect3(line1, line2) {
  let tX = (line1.start[0] - line2.start[0]) / (line2.delta[0] - line1.delta[0]);
  let tY = (line1.start[1] - line2.start[1]) / (line2.delta[1] - line1.delta[1]);
  let tZ = (line1.start[2] - line2.start[2]) / (line2.delta[2] - line1.delta[2]);

  let ts = [tX, tY, tZ].filter((x) => !Number.isNaN(x));

  if (ts.every(it => it === ts[0])) {
    return pointInTime(line1, tX);
  }

  return null;
}

function isInArea3(area, dot) {
  return dot[0] >= area[0] && dot[0] <= area[1]
    && dot[1] >= area[0] && dot[1] <= area[1]
    && dot[2] >= area[0] && dot[2] <= area[1];
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