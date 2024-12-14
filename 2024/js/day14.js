import { ints, printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/14

runDay(2024, 14, 1)
  //
  .part(1, part1)
  .part(1, part1opt, "optimal")
  .part(2, part2)
  .part(2, part2better, "better")
  .end();

function part1(inp) {
  let robots = inp.split("\n").map((line) => {
    let [a, b, c, d] = ints(line);
    return { pos: [a, b], v: [c, d] };
  });

  let map = [101, 103];

  for (let i = 1; i <= 100; i++) {
    robots.forEach(({ pos, v }, i) => {
      robots[i].pos = [
        (map[0] + pos[0] + v[0]) % map[0],
        (map[1] + pos[1] + v[1]) % map[1],
      ];
    });
  }

  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  let ii = Math.floor(map[0] / 2);
  let jj = Math.ceil(map[1] / 2) - 1;

  robots.forEach(({ pos }) => {
    let [i, j] = pos;
    if (i < ii && j < jj) {
      q1 += 1;
    } else if (i > ii && j < jj) {
      q2 += 1;
    } else if (i > ii && j > jj) {
      q4 += 1;
    } else if (i < ii && j > jj) {
      q3 += 1;
    }
  });

  return q1 * q2 * q3 * q4;
}

function part2(inp) {
  let robots = inp.split("\n").map((line) => {
    let [a, b, c, d] = ints(line);
    return { pos: [a, b], v: [c, d] };
  });

  let map = [101, 103];

  for (let i = 1; i <= 10_503; i++) {
    robots.forEach(({ pos, v }, i) => {
      robots[i].pos = [
        (map[0] + pos[0] + v[0]) % map[0],
        (map[1] + pos[1] + v[1]) % map[1],
      ];
    });

    let a = maxCnt(robots);
    if (a === 1) {
      return i;
    }
  }

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
}

function printMap(robots, map) {
  let res = Array(map[1])
    .fill(0)
    .map(() => Array(map[0]).fill("0"));

  robots.forEach(({ pos }) => {
    res[pos[1]][pos[0]]++;
  });

  return printGrid(res);
}

function part1opt(inp) {
  let map = [101, 103];
  let steps = 100;

  let ii = Math.floor(map[0] / 2);
  let jj = Math.ceil(map[1] / 2) - 1;

  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  inp.split("\n").forEach((line) => {
    let [px, py, vx, vy] = ints(line);

    let i = (map[0] * steps + px + vx * steps) % map[0];
    let j = (map[1] * steps + py + vy * steps) % map[1];

    if (i < ii) {
      if (j < jj) q1++;
      if (j > jj) q4++;
    }
    if (i > ii) {
      if (j < jj) q2++;
      if (j > jj) q3++;
    }
  });

  return q1 * q2 * q3 * q4;
}

let fin = JSON.parse(
  "[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352]",
);

function part2better(inp) {
  let robots = inp.split("\n").map((line) => {
    let [a, b, c, d] = ints(line);
    return { pos: [a, b], v: [c, d] };
  });

  let mapX = 101;
  let mapY = 103;

  let i = 1;
  while (true) {
    robots.forEach(({ pos, v }, i) => {
      robots[i].pos[0] = (mapX + pos[0] + v[0]) % mapX;
      robots[i].pos[1] = (mapY + pos[1] + v[1]) % mapY;
    });

    if (noOverlap(robots)) return i;
    i++;
  }

  function noOverlap(robots) {
    let s = new Set(robots.map(({ pos }) => pos[0] * mapX + pos[1]));
    return s.size === robots.length;
  }
}
