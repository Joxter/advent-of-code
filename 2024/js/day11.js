import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/11

runDay(2024, 11, 1)
  .part(1, part1)
  .part(2, part2)
  .part(2, part2alter, "alter")
  .part(2, part2notMy, "not my (recursion + cache)")
  .end();

function part1(inp) {
  let stones = inp.split(" ").map((it) => +it);

  for (let i = 0; i < 25; i++) {
    let toAdd = [];

    stones = stones.map((stone) => {
      let ss = String(stone);
      if (ss.length % 2 === 0) {
        let a = ss.slice(0, ss.length / 2);
        let b = ss.slice(ss.length / 2);
        toAdd.push(+b);
        return +a;
      } else {
        return stone ? stone * 2024 : 1;
      }
    });

    stones = stones.concat(toAdd);
  }

  return stones.length;
}

function part2(inp) {
  let stones = Object.fromEntries(inp.split(" ").map((it) => [it, 1]));

  for (let i = 0; i < 75; i++) {
    let newStones = {};

    Object.entries(stones).forEach(([stone, cnt]) => {
      if (stone.length % 2 === 0) {
        let a = +stone.slice(0, stone.length / 2);
        let b = +stone.slice(stone.length / 2);

        newStones[a] = (newStones[a] || 0) + cnt;
        newStones[b] = (newStones[b] || 0) + cnt;
      } else {
        if (stone === "0") {
          newStones["1"] = (newStones["1"] || 0) + cnt;
        } else {
          newStones[stone * 2024] = (newStones[stone * 2024] || 0) + cnt;
        }
      }
    });
    stones = newStones;
  }

  return sum(Object.values(stones));
}

function part2alter(inp) {
  let stones = Object.fromEntries(inp.split(" ").map((it) => [it, [1]]));
  stones["1"] = [];

  const N = 75;

  for (let i = 0; i < N; i++) {
    Object.entries(stones).forEach(([stone, cnts]) => {
      let cnt = cnts[i];
      if (!cnt) return;

      if (stone.length % 2 === 0) {
        let a = +stone.slice(0, stone.length / 2);
        let b = +stone.slice(stone.length / 2);

        if (!stones[a]) stones[a] = [];
        if (!stones[b]) stones[b] = [];

        stones[a][i + 1] = (stones[a][i + 1] || 0) + cnt;
        stones[b][i + 1] = (stones[b][i + 1] || 0) + cnt;
      } else {
        if (stone === "0") {
          stones["1"][i + 1] = (stones["1"][i + 1] || 0) + cnt;
        } else {
          let nn = stone * 2024;

          if (!stones[nn]) stones[nn] = [];
          stones[nn][i + 1] = (stones[nn][i + 1] || 0) + cnt;
        }
      }
    });
  }

  return sum(Object.values(stones).map((cnts) => cnts[N] || 0));
}

function part2notMy(inp) {
  const cache = new Map();
  const numbers = inp.split(" ").map(Number);

  const blink = (number, blinks) => {
    const cacheKey = `${number}-${blinks}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    let result;
    if (blinks === 0) result = 1;
    else if (number === 0) result = blink(1, blinks - 1);
    else if (("" + number).length % 2 === 0) {
      const str = "" + number;
      const firstHalf = +str.substring(0, str.length / 2);
      const secondHalf = +str.substring(str.length / 2);
      result = blink(firstHalf, blinks - 1) + blink(secondHalf, blinks - 1);
    } else {
      result = blink(number * 2024, blinks - 1);
    }

    cache.set(cacheKey, result);
    return result;
  };

  return numbers.reduce(
    (numberCount, number) => numberCount + blink(number, 75),
    0,
  );
}
