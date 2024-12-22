import { ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/22

// console.log(
//   part2better(`1
// 2
// 3
// 2024`),
// );

runDay(2024, 22)
  //
  // .part(1, part1)
  // .part(2, part2) // 10 min! (6 bun, a bit more optimised)...  no strings - 4:30 min
  // .part(2, part2better) // 9.2 sec
  .part(2, part2optimal) // 0.7 sec
  .end();

function part1(inp) {
  let buyers = ints(inp);

  return sum(
    buyers.map((n) => {
      let next = n;
      for (let i = 0; i < 2000; i++) {
        next = ((((next * 64) ^ next) % 16777216) + 16777216) % 16777216;
        next = ((((next / 32) ^ next) % 16777216) + 16777216) % 16777216;
        next = ((((next * 2048) ^ next) % 16777216) + 16777216) % 16777216;
      }

      return next;
    }),
  );
}

function part2(inp) {
  let buyers = ints(inp);

  let history = [];
  let prices = [];

  buyers.forEach((n, ii) => {
    let next = n;

    history[ii] = [];
    prices[ii] = [];

    for (let i = 0; i < 2000; i++) {
      let start = next % 10;

      next = ((((next * 64) ^ next) % 16777216) + 16777216) % 16777216;
      next = ((((next / 32) ^ next) % 16777216) + 16777216) % 16777216;
      next = ((((next * 2048) ^ next) % 16777216) + 16777216) % 16777216;

      let end = next % 10;

      prices[ii].push(end);
      history[ii].push(end - start);
    }
  });

  let best = 0;

  for (let i = -9; i <= 9; i++) {
    // console.log(i, best);
    for (let ii = -9; ii <= 9; ii++) {
      if (Math.abs(sum([i, ii])) > 9) continue;

      for (let iii = -9; iii <= 9; iii++) {
        if (Math.abs(sum([ii, iii])) > 9) continue;

        for (let iiii = -9; iiii <= 9; iiii++) {
          if (Math.abs(sum([iii, iiii])) > 9) continue;

          let seq = [i, ii, iii, iiii];
          let s = sum(prices.map((p, i) => getSell(history[i], p, seq)));

          if (s > best) {
            best = s;
            console.log(seq, best);
          }
        }
      }
    }
  }

  return best;
}

function getSell(history, prices, seq) {
  for (let ind = 0; ind < history.length - 3; ind++) {
    if (
      history[ind] === seq[0] &&
      history[ind + 1] === seq[1] &&
      history[ind + 2] === seq[2] &&
      history[ind + 3] === seq[3]
    ) {
      return prices[ind + 3];
    }
  }
  return 0;
}

function part2better(inp) {
  let buyers = ints(inp);

  let bb = [];

  buyers.forEach((n, ii) => {
    let next = n;

    let history = [];
    bb[ii] = {};

    for (let i = 0; i < 2000; i++) {
      let start = next % 10;

      next = ((((next * 64) ^ next) % 16777216) + 16777216) % 16777216;
      next = ((((next / 32) ^ next) % 16777216) + 16777216) % 16777216;
      next = ((((next * 2048) ^ next) % 16777216) + 16777216) % 16777216;

      let end = next % 10;

      history.push(end - start);

      if (history.length === 4) {
        let k = history.join(",");

        if (!bb[ii][k]) {
          bb[ii][k] = end;
        }
        history.shift();
      }
    }
  });

  let best = 0;

  let from = -9;
  let to = 9;

  for (let i = from; i <= to; i++) {
    for (let ii = from; ii <= to; ii++) {
      if (Math.abs(i + ii) > 9) continue;

      for (let iii = from; iii <= to; iii++) {
        if (Math.abs(ii + iii) > 9) continue;

        for (let iiii = from; iiii <= to; iiii++) {
          if (Math.abs(iii + iiii) > 9) continue;

          let seq = [i, ii, iii, iiii].join(",");
          let s = sum(bb.map((b) => b[seq] || 0));

          if (s > best) best = s;
        }
      }
    }
  }

  return best;
}

function part2optimal(inp) {
  let q = {};

  ints(inp).forEach((next) => {
    let visited = {};
    let history = [];

    for (let i = 0; i < 2000; i++) {
      let start = next % 10;

      next = ((next * 64) ^ next) & 16777215;
      next = ((next / 32) ^ next) & 16777215;
      next = ((next * 2048) ^ next) & 16777215;

      let end = next % 10;
      history.push(end - start);

      if (history.length === 4) {
        let k = history.join(",");
        if (!visited[k]) {
          if (!q[k]) q[k] = 0;
          q[k] += end;
          visited[k] = true;
        }

        history.shift();
      }
    }
  });

  return Math.max(...Object.values(q));
}
