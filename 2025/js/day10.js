import { Heap, ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/10

runDay(2025, 10)
  //
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  function applyButton(state, button) {
    let mask = 0;
    for (const index of button) {
      mask |= 1 << index;
    }
    return state ^ mask;
  }

  function stringToInt(str) {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "#") {
        result |= 1 << i;
      }
    }
    return result;
  }

  return sum(
    inp.split("\n").map((line) => {
      let [targetLight, ...buttons] = line.split(" ");
      buttons.pop();
      targetLight = targetLight.slice(1, -1);
      buttons = buttons.map((b) => ints(b));

      const target = stringToInt(targetLight);
      const startState = 0;

      const queue = [[startState, 0]];
      const visited = new Set([startState]);

      while (queue.length > 0) {
        const [currentState, numPresses] = queue.shift();

        if (currentState === target) return numPresses;

        for (const button of buttons) {
          const nextState = applyButton(currentState, button);

          if (!visited.has(nextState)) {
            visited.add(nextState);
            queue.push([nextState, numPresses + 1]);
          }
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
