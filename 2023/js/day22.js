import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/22

console.log(part1(`1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`), [5]);

runDay(2023, 22)
  // .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let bricks = inp
    .split('\n')
    .map((line) => {
      let [from, to] = line.split('~');

      return {
        from: from.split(',').map(Number), // x,y,z
        to: to.split(',').map(Number),
      };
    })
    .sort((a, b) => {
      return a.from[2] - b.from[2];
    });


  // console.log(bricks);
  /*
    [
    { from: [ 1, 0, 1 ], to: [ 1, 2, 1 ] },
    { from: [ 0, 0, 2 ], to: [ 2, 0, 2 ] },
    { from: [ 0, 2, 3 ], to: [ 2, 2, 3 ] },
    { from: [ 0, 0, 4 ], to: [ 0, 2, 4 ] },
    { from: [ 2, 0, 5 ], to: [ 2, 2, 5 ] },
    { from: [ 0, 1, 6 ], to: [ 2, 1, 6 ] },
    { from: [ 1, 1, 8 ], to: [ 1, 1, 9 ] }
  ]
  */
  let fallen = doFalling(bricks);

  let canRemoveCnt = 0;

  fallen.forEach((brick, removeId) => {
    console.log('canBeRemoved', removeId, stableWithout(removeId, fallen));
  });

  function stableWithout(brickId, bricks) {
    // remove brickId
    // check
    //   whether at least ONE brick z-1 does NOT OVERLAP with ALL OTHER
    //      -> UNSTALBE (return FALSE)
  }


  return 123;
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