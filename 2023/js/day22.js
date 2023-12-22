import { printGrid, runDay } from "../../utils.js";

// https://adventofcode.com/2023/day/22

// There are so manny optimisations current approach are possible!
// But it already works 0.6s and 1.7s (dirty rush versions calculates 18s each)
// Of course, with better algorithms it could be an order of magnitude better.

runDay(2023, 22)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let bricks = inp
    .split("\n")
    .map((line) => {
      let [from, to] = line.split("~");

      return {
        from: from.split(",").map(Number),
        to: to.split(",").map(Number),
      };
    })
    .sort((a, b) => {
      return a.from[2] - b.from[2];
    });

  let [fallen] = doFalling(bricks);

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
        from: from.split(",").map(Number),
        to: to.split(",").map(Number),
      };
    })
    .sort((a, b) => {
      return a.from[2] - b.from[2];
    });

  let [fallen] = doFalling(bricks);

  let canRemoveCnt = 0;

  fallen.forEach((brick, id) => {
    let cnt = howManyFall(id, fallen);

    canRemoveCnt += cnt;
  });

  function howManyFall(brickId, bricks) {
    let minusOne = deepCloneBricks(bricks);
    minusOne.splice(brickId, 1);

    let [fallen, cnt] = doFalling(minusOne);

    return cnt;
  }

  return canRemoveCnt;
}

function deepCloneBricks(bricks) {
  return bricks.map((brick) => {
    return {
      from: [...brick.from],
      to: [...brick.to],
    };
  });
}

function overlaps(brickA, brickB) {
  return (
    brickA.from[2] <= brickB.to[2] &&
    brickA.to[2] >= brickB.from[2] &&
    brickA.from[1] <= brickB.to[1] &&
    brickA.to[1] >= brickB.from[1] &&
    brickA.from[0] <= brickB.to[0] &&
    brickA.to[0] >= brickB.from[0]
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
  let cnt = 0;

  bricks.forEach((brick) => {
    let current = cloneBrick(brick);
    let moved = false;

    while (true) {
      if (current.from[2] === 1) {
        fallen.push(current);
        break;
      }
      let next = cloneBrick(current);
      next.from[2]--;
      next.to[2]--;

      if (fallen.findLastIndex((br) => overlaps(br, next)) > -1) {
        fallen.push(current);
        break;
      }
      current = next;
      moved = true;
    }
    if (moved) cnt++;
  });

  return [fallen, cnt];
}

/*

Legacy %)

function isStableWithoutBrute(id, bricks) {
  let minusOne = deepCloneBricks(bricks);
  minusOne.splice(id, 1);
  let [fallen] = doFalling(minusOne);
  return diffBricks(fallen, minusOne) === 0;
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
*/
