import { runDay } from "../../utils.js";

// https://adventofcode.com/2023/day/22

console.log(part1(`1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`), [5]);

runDay(2023, 22)
  .part(1, part1, '395 low') // 395 low
  // .part(2, part2)
  .end();

function part1(inp) {
  let bricks = inp
    .split("\n")
    .map((line) => {
      let [from, to] = line.split("~");

      return {
        from: from.split(",").map(Number), // x,y,z
        to: to.split(",").map(Number),
      };
    });
  // .sort((a, b) => {
  //   return a.from[2] - b.from[2];
  // });


  let fallen = doFalling(bricks);
  /*
[
  { from: [ 1, 0, 1 ], to: [ 1, 2, 1 ] },
  { from: [ 0, 0, 2 ], to: [ 2, 0, 2 ] },
  { from: [ 0, 2, 2 ], to: [ 2, 2, 2 ] },
  { from: [ 0, 0, 3 ], to: [ 0, 2, 3 ] },
  { from: [ 2, 0, 3 ], to: [ 2, 2, 3 ] },
  { from: [ 0, 1, 4 ], to: [ 2, 1, 4 ] },
  { from: [ 1, 1, 5 ], to: [ 1, 1, 6 ] }
]
  */

  // console.log(fallen);
  let canRemoveCnt = 0;

  fallen.forEach((brick, id) => {
    // console.log("");
    // console.log("isStableWithout", brick);
    // console.log(isStableWithout(id, fallen));

    if (isStableWithout(id, fallen)) {
      canRemoveCnt++;
    }
  });

  function isStableWithout(brickId, bricks) {
    let brick = bricks[brickId];
    // debugger

    let higherBricks = bricks.filter((br) => {
      return br.from[2] === brick.from[2] + 1;
    });

    let possibleGrounds = bricks.filter((br, i) => {
      return i !== brickId && br.to[2] === brick.to[2];
    });
    if (higherBricks.length === 0) return true;
    if (possibleGrounds.length === 0) return false;

    // console.log("--- higherBricks");
    // console.log(higherBricks);
    // console.log("--- possibleGrounds");
    // console.log(possibleGrounds);

    debugger

    let hasGround = higherBricks.map((br) => {
      let tryToFall = cloneBrick(br);
      tryToFall.from[2]--;
      tryToFall.to[2]--;

      let fallen = possibleGrounds.filter((ground) => {
        return overlaps(tryToFall, ground); // пересекся -> значит поддерживал!
      }).length;

      return fallen > 0; // осталась поддержка
    });

    // console.log({ hasGround });

    return hasGround.every(it => it === true);
  }


  return canRemoveCnt;
}

function part2(inp) {
  return 123;
}

function overlaps(brickA, brickB) {
  let [ax1, ay1, az1] = brickA.from;
  let [ax2, ay2, az2] = brickA.to;
  let [bx1, by1, bz1] = brickB.from;
  let [bx2, by2, bz2] = brickB.to;

  return (
    ax1 <= bx2 &&
    ax2 >= bx1 &&
    ay1 <= by2 &&
    ay2 >= by1 &&
    az1 <= bz2 &&
    az2 >= bz1
  );
}

function cloneBrick(brick) {
  return {
    from: [...brick.from],
    to: [...brick.to],
  };
}


function doFalling(bricks) {
  let fallen = [];

  bricks.forEach((brick) => {
    let current = cloneBrick(brick);

    let limit = 1000;
    while (true && --limit) {
      if (current.from[2] === 1) {
        fallen.push(current);
        break;
      }
      let next = cloneBrick(current);
      next.from[2]--;
      next.to[2]--;

      if (fallen.find((br) => overlaps(br, next))) {
        fallen.push(current);
        break;
      }
      current = next;
    }
  });

  return fallen;
}