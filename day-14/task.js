import fs from "fs";

// https://adventofcode.com/2022/day/14

let testInput = fs.readFileSync("./testData.txt").toString();
let inputData = fs.readFileSync("./input.txt").toString();

console.log("test OK: ", part1(testInput) === 24);
console.log("answer: ", part1(inputData), [745]);

console.log("test2 OK:", part2(testInput) === 93);
console.log("answer2:", part2(inputData), [27551]);

function part1(inp) {
  let map = {};

  let lastLeftRock = 500;
  let lastRightRock = 500;
  let bottom = 0;

  inp.split("\n").forEach((line) => {
    let [[hx, hy], ...target] = line
      .split(` -> `)
      .map((xy) => xy.split(",").map((n) => +n));
    map[hx + "," + hy] = "#";

    target.forEach(([tx, ty]) => {
      while (tx !== hx || ty !== hy) {
        if (tx === hx && ty > hy) {
          hy++;
        } else if (tx === hx && ty < hy) {
          hy--;
        } else if (ty === hy && tx > hx) {
          hx++;
        } else if (ty === hy && tx < hx) {
          hx--;
        }
        map[hx + "," + hy] = "#";

        if (hx < lastLeftRock) lastLeftRock = hx;
        if (hx > lastRightRock) lastRightRock = hx;
        bottom = Math.max(bottom, hy);
      }
    });
  });

  function getFinishPos([x, y]) {
    if (y > bottom) return null;

    if (!map[x + "," + (y + 1)]) {
      return getFinishPos([x, y + 1]);
    }
    if (!map[x - 1 + "," + (y + 1)]) {
      return getFinishPos([x - 1, y + 1]);
    }
    if (!map[x + 1 + "," + (y + 1)]) {
      return getFinishPos([x + 1, y + 1]);
    }

    return [x, y];
  }

  let result = 0;
  let sandSource = [500, 0];

  while (true) {
    let lastPose = getFinishPos(sandSource);
    if (!lastPose) {
      break;
    }
    map[lastPose.join(",")] = "o";
    result++;
  }
  // render(map, lastLeftRock, lastRightRock, bottom);

  return result;
}

function part2(inp) {
  let map = {};

  let lastLeftRock = 500;
  let lastRightRock = 500;
  let bottom = 0;

  inp.split("\n").forEach((line) => {
    let [[hx, hy], ...target] = line
      .split(` -> `)
      .map((xy) => xy.split(",").map((n) => +n));
    map[hx + "," + hy] = "#";

    target.forEach(([tx, ty]) => {
      while (tx !== hx || ty !== hy) {
        if (tx === hx && ty > hy) {
          hy++;
        } else if (tx === hx && ty < hy) {
          hy--;
        } else if (ty === hy && tx > hx) {
          hx++;
        } else if (ty === hy && tx < hx) {
          hx--;
        }
        map[hx + "," + hy] = "#";

        if (hx < lastLeftRock) lastLeftRock = hx;
        if (hx > lastRightRock) lastRightRock = hx;
        bottom = Math.max(bottom, hy);
      }
    });
  });

  function getFinishPos([x, y]) {
    if (y > bottom) return [x, y];

    if (!map[x + "," + (y + 1)]) return getFinishPos([x, y + 1]);
    if (!map[x - 1 + "," + (y + 1)]) return getFinishPos([x - 1, y + 1]);
    if (!map[x + 1 + "," + (y + 1)]) return getFinishPos([x + 1, y + 1]);

    return [x, y];
  }

  let result = 0;
  let sandSource = [500, 0];

  while (true) {
    let lastPose = getFinishPos(sandSource);

    if (lastPose[0] === sandSource[0] && lastPose[1] === sandSource[1]) {
      map[lastPose.join(",")] = "o";
      result++;
      break;
    }

    map[lastPose.join(",")] = "o";
    if (lastPose[0] < lastLeftRock) lastLeftRock = lastPose[0];
    if (lastPose[0] > lastRightRock) lastRightRock = lastPose[0];

    result++;
  }
  // render(map, lastLeftRock, lastRightRock, bottom);

  return result;
}

function render(map, lastLeftRock, lastRightRock, bottom) {
  let result = "";

  for (let y = -1; y <= bottom + 2; y++) {
    let row = "";
    for (let x = lastLeftRock - 2; x < lastRightRock + 2; x++) {
      row += map[x + "," + y] || ".";
    }
    result += String(y).padStart(3, "0") + " " + row + "\n";
  }

  console.log(result);
}
