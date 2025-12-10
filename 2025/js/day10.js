import { ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2025/day/10

console.log(
  part1(`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`),
);

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
    // lights .##.
    // Array of [0,1,2]
    let res = Array(lights.length).fill(0);

    buttons.forEach((button) => {
      button.forEach((bb) => {
        //
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
      // console.log(l);

      for (let i = 1; i <= buttons.length; i++) {
        let combs = combinationsExact(buttons.length, i);

        for (let comb of combs) {
          let res = toggle(
            light,
            buttons.filter((b, i) => comb[i]),
          );
          // console.log("");
          // console.log(
          //   light,
          //   buttons.filter((b, i) => comb[i]),
          // );
          // console.log(res);
          if (light === res) return i;
        }
      }

      //
    }),
  );
}

function part2(inp) {
  return 123;
}
