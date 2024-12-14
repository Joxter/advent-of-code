import { ints, printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/14

runDay(2024, 14)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let robots = inp.split("\n").map((line) => {
    let [a, b, c, d] = ints(line);

    return { pos: [a, b], v: [c, d] };
  });

  // let map = [11, 7]; // width, height
  let map = [101, 103];

  // console.log("INIT");
  // console.log(printMap(robots));

  for (let i = 1; i <= 100; i++) {
    robots.forEach(({ pos, v }, i) => {
      //
      let newPos = [
        //
        (map[0] + pos[0] + v[0]) % map[0],
        (map[1] + pos[1] + v[1]) % map[1],
      ];
      // console.log(pos, newPos);
      robots[i].pos = newPos;
    });
    // console.log("after " + i);
    // console.log(printMap(robots));
  }

  // console.log(printMap(robots));

  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  //101 / 2 = 50
  //101 / 2

  // 0123456 = 7
  // 012 456
  // 7/2 - 1 = 2
  // 7/2 + 1 = 4

  let ii = Math.floor(map[0] / 2);
  let jj = Math.ceil(map[1] / 2) - 1;
  // console.log([ii, jj], [map[0], map[1]], [5, 3]); // 11 / 7
  // console.log(arr[ii], arr[jj]);

  // [ 53, 50 ] [ 107, 101 ] [ 5, 3 ]

  // console.log(robots);
  robots.forEach(({ pos }) => {
    let [i, j] = pos;
    // console.log([i, j]);
    if (i < ii && j < jj) {
      // console.log("q1");
      q1 += 1;
    } else if (i > ii && j < jj) {
      // console.log("q2");
      q2 += 1;
    } else if (i > ii && j > jj) {
      // console.log("q4");
      q4 += 1;
    } else if (i < ii && j > jj) {
      // console.log("q3");
      q3 += 1;
    } else {
      // console.log("no");
    }
  });
  // console.log([q1, q2, q3, q4]);

  return q1 * q2 * q3 * q4;

  function printMap(robots) {
    let res = Array(map[1])
      .fill(0)
      .map(() => Array(map[0]).fill("0"));

    robots.forEach(({ pos }) => {
      res[pos[1]][pos[0]]++;
    });

    return printGrid(res);
  }
}

function part2(inp) {
  let robots = inp.split("\n").map((line) => {
    let [a, b, c, d] = ints(line);

    return { pos: [a, b], v: [c, d] };
  });

  // let map = [11, 7]; // width, height
  let map = [101, 103];

  let initPosition = robots.map((it) => it.pos.join(",")).join(",");

  // console.log("INIT");
  // console.log(printMap(robots));

  // loop = 10403
  let rects = {};
  let mm = {};
  for (let i = 1; i <= 10_503; i++) {
    robots.forEach(({ pos, v }, i) => {
      //
      let newPos = [
        //
        (map[0] + pos[0] + v[0]) % map[0],
        (map[1] + pos[1] + v[1]) % map[1],
      ];
      // console.log(pos, newPos);
      robots[i].pos = newPos;
    });

    let r = rect(robots);
    if (!rects[r]) rects[r] = 0;
    rects[r]++;

    let a = maxCnt(robots);
    if (!mm[a]) mm[a] = 0;
    mm[a]++;

    // if (r.join(",") === "99,102") {
    //   console.log(printMap(robots));
    //   console.log(i);
    // }
    if (a === 1) {
      // console.log(printMap(robots));
      // console.log(i);
      return i;
    }

    if (initPosition === robots.map((it) => it.pos.join(",")).join(",")) {
      // console.log("LOOP!", i);
      break;
    }

    // console.log("after " + i);
    // console.log(printMap(robots));
  }
  // console.log(mm);
  // console.log(rects);

  function maxCnt(robots) {
    let max = {};
    robots.forEach(({ pos }) => {
      if (!max[pos]) max[pos] = 0;
      max[pos]++;
    });

    return Math.max(...Object.values(max));
  }

  function rect(robots) {
    let a = [0, 0];
    let b = [...map];
    robots.forEach(({ pos }) => {
      a[0] = Math.max(a[0], pos[0]);
      a[1] = Math.max(a[1], pos[1]);
      b[0] = Math.min(b[0], pos[0]);
      b[1] = Math.min(b[1], pos[1]);
    });
    return [a[0] - b[0], a[1] - b[1]];
  }

  console.log("end");

  // console.log(printMap(robots));

  return 4;

  function printMap(robots) {
    let res = Array(map[1])
      .fill(0)
      .map(() => Array(map[0]).fill("0"));

    robots.forEach(({ pos }) => {
      res[pos[1]][pos[0]]++;
    });

    return printGrid(res);
  }
}
