import { ints, printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/14

console.log(
  part1(`p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`),
  [12],
);

// console.log(
//   part1(`p=2,4 v=2,-3`),
// );

runDay(2024, 14)
  //
  .part(1, part1)
  // .part(2, part2)
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

  console.log(printMap(robots));

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

  // 11 = 01234 67890
  let arr = "11111022222".split("");
  // 01234567890
  // console.log(Math.floor(map[0] / 2), Math.ceil(map[0] / 2));
  let ii = Math.floor(map[0] / 2);
  let jj = Math.ceil(map[1] / 2) - 1;
  console.log([ii, jj], [map[0], map[1]], [5, 3]); // 11 / 7
  // console.log(arr[ii], arr[jj]);

  // [ 53, 50 ] [ 107, 101 ] [ 5, 3 ]

  // console.log(robots);
  robots.forEach(({ pos }) => {
    let [i, j] = pos;
    console.log([i, j]);
    if (i < ii && j < jj) {
      console.log("q1");
      q1 += 1;
    } else if (i > ii && j < jj) {
      console.log("q2");
      q2 += 1;
    } else if (i > ii && j > jj) {
      console.log("q4");
      q4 += 1;
    } else if (i < ii && j > jj) {
      console.log("q3");
      q3 += 1;
    } else {
      console.log("no");
    }
  });
  console.log([q1, q2, q3, q4]);

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
  return 123;
}
