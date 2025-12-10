import { Heap, ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/10

runDay(2025, 10)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function combinationsExact(n, exactOnes) {
  const result = [];

  for (let i = 0; i < 1 << n; i++) {
    // Count ones
    let onesCount = 0;
    let temp = i;
    while (temp > 0) {
      onesCount += temp & 1;
      temp >>= 1;
    }

    // Only include if ones count == exactOnes
    if (onesCount === exactOnes) {
      const combo = [];
      for (let j = 0; j < n; j++) {
        combo.push((i >> j) & 1);
      }
      result.push(combo);
    }
  }

  return result;
}

function part1(inp) {
  function toggle(lights, buttons) {
    let res = Array(lights.length).fill(0);

    buttons.forEach((button) => {
      button.forEach((bb) => {
        res[bb]++;
      });
    });

    return res.map((r) => (r % 2 === 1 ? "#" : ".")).join("");
  }

  return sum(
    inp.split("\n").map((l) => {
      let [light, ...buttons] = l.split(" ");
      buttons.pop();
      light = light.slice(1, -1);
      buttons = buttons.map((b) => ints(b));

      for (let i = 1; i <= buttons.length; i++) {
        let combs = combinationsExact(buttons.length, i);

        for (let comb of combs) {
          let res = toggle(
            light,
            buttons.filter((b, i) => comb[i]),
          );
          if (light === res) return i;
        }
      }
    }),
  );
}

function part2(inp) {
  function minus(lights, buttons) {
    let res = [...lights];
    let times = Infinity;

    for (const b of buttons) {
      if (res[b] <= 0) {
        return [0, lights];
      }
      times = Math.min(times, res[b]);
    }

    for (const b of buttons) {
      res[b] -= times;
    }

    return [times, res];
  }

  return sum(
    inp.split("\n").map((l) => {
      let buttons = l.split(" ");
      buttons.shift();
      buttons = buttons.map((b) => ints(b));
      let lights = buttons.pop();
      // console.log(l);

      let q = new Heap();
      q.push(0, [0, lights]);

      while (q.size > 0) {
        let [cnt, lightsStep] = q.pop();

        if (lightsStep.every((l) => l === 0)) {
          // console.log({ cnt });
          return cnt;
        }

        buttons.forEach((b) => {
          let [times, newLights] = minus(lightsStep, b);

          if (times) {
            q.push(cnt + times, [cnt + times, newLights]);
          }
        });
      }
    }),
  );
}
