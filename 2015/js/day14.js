import { runDay, ints } from "../../utils.js";

// https://adventofcode.com/2015/day/14

runDay(2015, 14)
  //
  .part(1, part1)
  .part(2, part2)
  .end(1);

function part1(inp) {
  return Math.max(
    ...inp.split("\n").map((l) => {
      let [speed, time, wait] = ints(l);

      let cycles = Math.floor(2503 / (time + wait));
      let d = speed * time * cycles;

      return d + Math.min(2503 - cycles * (time + wait), time) * speed;
    }),
  );
}

function part2(inp) {
  let deers = inp.split("\n").map((l) => {
    let [speed, goTime, waitTime] = ints(l);
    return {
      speed,
      goTime,
      waitTime,
      score: 0,
      path: 0,
      state: "go",
      stateTime: 0,
    };
  });

  for (let i = 1; i <= 2503; i++) {
    deers.forEach((d) => {
      if (d.state === "go") {
        if (d.stateTime < d.goTime) {
          d.path += d.speed;
        } else {
          d.state = "wait";
          d.stateTime = 0;
        }
      } else {
        if (d.stateTime >= d.waitTime) {
          d.state = "go";
          d.stateTime = 0;
          d.path += d.speed;
        }
      }

      d.stateTime++;
    });

    let max = Math.max(...deers.map((d) => d.path));
    deers.forEach((d) => {
      if (d.path === max) {
        d.score++;
      }
    });
  }

  return Math.max(...deers.map((d) => d.score));
}
