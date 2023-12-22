import { printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2023/day/22

runDay(2023, 22)
  .part(1, part1)
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
    })
    .sort((a, b) => {
      return a.from[2] - b.from[2];
    });

  let fallen = doFalling(bricks);

  let canRemoveCnt = 0;
  for (let id = 0; id < fallen.length; id++) {
    if (isStableWithout(id, fallen)) {
      canRemoveCnt++;
    }
  }

  return canRemoveCnt;

  function isStableWithout(brickId, bricks) {
    let brick = bricks[brickId];
    let higherBricks = bricks.filter((br) => {
      return br.from[2] === brick.to[2] + 1;
    });

    let possibleGrounds = bricks.filter((br, i) => {
      return i !== brickId && br.to[2] === brick.to[2];
    });
    if (higherBricks.length === 0) return true;
    if (possibleGrounds.length === 0) return false;

    let hasGround = higherBricks.map((br) => {
      let tryToFall = cloneBrick(br);
      tryToFall.from[2]--;
      tryToFall.to[2]--;

      let fallen = possibleGrounds.filter((ground) => {
        return overlaps(tryToFall, ground);
      }).length;

      return fallen > 0;
    });

    return hasGround.every(it => it === true);
  }
}

function part2(inp) {
  let bricks = inp
    .split("\n")
    .map((line) => {
      let [from, to] = line.split("~");

      return {
        from: from.split(",").map(Number), // x,y,z
        to: to.split(",").map(Number),
      };
    })
    .sort((a, b) => {
      return a.from[2] - b.from[2];
    });

  let fallen = doFalling(bricks);

  let canRemoveCnt = 0;

  fallen.forEach((brick, id) => {
    let cnt = howManyFall(id, fallen);

    canRemoveCnt += cnt;
  });

  function howManyFall(brickId, bricks) {
    let minusOne = deepCloneBricks(bricks);
    minusOne.splice(brickId, 1);

    let fallen = doFalling(deepCloneBricks(minusOne));

    return diffBricks(fallen, minusOne);
  }

  return canRemoveCnt;
}

function isStableWithoutBrute(id, bricks) {
  let minusOne = deepCloneBricks(bricks);
  minusOne.splice(id, 1);
  let fallen = doFalling(deepCloneBricks(minusOne));
  return diffBricks(fallen, minusOne) === 0;
}

function deepCloneBricks(bricks) {
  return bricks.map((brick) => {
    return {
      from: [...brick.from],
      to: [...brick.to],
    };
  });
}

function compareBricks(bricksA, bricksB) {
  if (bricksA.length !== bricksB.length) return false;

  for (let i = 0; i < bricksA.length; i++) {
    let brickA = bricksA[i];
    let brickB = bricksB[i];

    if (brickA.from[0] !== brickB.from[0]) return false;
    if (brickA.from[1] !== brickB.from[1]) return false;
    if (brickA.from[2] !== brickB.from[2]) return false;

    if (brickA.to[0] !== brickB.to[0]) return false;
    if (brickA.to[1] !== brickB.to[1]) return false;
    if (brickA.to[2] !== brickB.to[2]) return false;
  }

  return true;
}

function diffBricks(bricksA, bricksB) {
  let diff = 0;

  for (let i = 0; i < bricksA.length; i++) {
    let brickA = bricksA[i];
    let brickB = bricksB[i];

    if (brickA.from[0] !== brickB.from[0]) {
      diff++;
      continue;
    }
    if (brickA.from[1] !== brickB.from[1]) {
      diff++;
      continue;
    }
    if (brickA.from[2] !== brickB.from[2]) {
      diff++;
      continue;
    }

    if (brickA.to[0] !== brickB.to[0]) {
      diff++;
      continue;
    }
    if (brickA.to[1] !== brickB.to[1]) {
      diff++;
      continue;
    }
    if (brickA.to[2] !== brickB.to[2]) {
      diff++;
      continue;
    }
  }

  return diff;
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

  bricks.forEach((brick, i) => {
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