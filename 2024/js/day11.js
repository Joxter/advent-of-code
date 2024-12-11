import { runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/11

runDay(2024, 11)
  //
  .part(1, part1)
  .part(2, part2)
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
