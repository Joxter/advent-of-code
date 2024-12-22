import { ints, runDay, sum } from "../../utils.js";

// https://adventofcode.com/2024/day/22

// console.log(part1(`123`));
// console.log(
//   part2(`1
// 2
// 3
// 2024`),
// );

runDay(2024, 22)
  //
  // .part(1, part1)
  .part(2, part2)
  .end(false);

function part1(inp) {
  let buyers = ints(inp);

  return sum(
    buyers.map((n) => {
      let next = n;
      for (let i = 0; i < 2000; i++) {
        next = ((((next * 64) ^ next) % 16777216) + 16777216) % 16777216;
        next =
          (((Math.floor(next / 32) ^ next) % 16777216) + 16777216) % 16777216;
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
    // console.log("----------");
    let next = n;

    history[ii] = [];
    prices[ii] = [];

    for (let i = 0; i < 2000; i++) {
      let start = next % 10;
      next = ((((next * 64) ^ next) % 16777216) + 16777216) % 16777216;
      next =
        (((Math.floor(next / 32) ^ next) % 16777216) + 16777216) % 16777216;
      next = ((((next * 2048) ^ next) % 16777216) + 16777216) % 16777216;

      let end = next % 10;

      prices[ii].push(end);
      history[ii].push(end - start);
    }
  });
  function toStr(t) {
    return t.map((it) => String(it).padStart(2, " ")).join(",");
  }

  history = history.map((it) => toStr(it));
  prices = prices.map((it) => toStr(it));

  // console.log(history[0]);

  let best = 0;

  for (let i = -9; i <= 9; i++) {
    for (let ii = -9; ii <= 9; ii++) {
      console.log(i, ii);
      for (let iii = -9; iii <= 9; iii++) {
        for (let iiii = -9; iiii <= 9; iiii++) {
          let seq = [i, ii, iii, iiii];

          best = Math.max(
            sum(
              prices.map((p, i) => {
                return getSell(history[i], p, seq);
              }),
            ),
            best,
          );
          // console.log(seq);
          // let sell = ;
        }
      }
    }
  }

  // console.log(history[0]);
  // console.log(prices);

  // let ind = history
  //   .map((it) => String(it).padStart(2, " "))
  //   .join(",")
  //   .indexOf("-2, 1,-1, 3");
  //
  // return getSell(history, prices, [-2, 1, -1, 3]);

  return best;

  function getSell(h, p, seq) {
    let best = seq.map((it) => String(it).padStart(2, " ")).join(",");

    // let h = history.map((it) => String(it).padStart(2, " ")).join(",");
    // let p = prices.map((it) => String(it).padStart(2, " ")).join(",");

    let ind = h.indexOf(best);

    // console.log(ind);

    if (ind > -1) {
      //
      // console.log(">>>>>>", [p.slice(ind + 9, ind + 11)]);
      return +p.slice(ind + 9, ind + 11).trim();
    }
    return 0;
  }
}
//  2, 0, 6,-4, 4,-9, 5, 4,-2,-5,-2, 1, 2, 6,-1,-3, 2,-1, 0, 3,-6, 4,-2,-3,-1, 2, 5,-3,-2, 2,-3, 3, 3, 0,-1,-3,-4, 7,-4, 2, 1,-3, 4,-7, 1, 4, 0, 3,-2, 2, 1,-5, 3, 0, 2,-8, 7, 0,-8, 0, 7,-3,-3, 7,-4, 5,-5,-2, 1, 0,-3, 5,-4, 3, 3,-6, 4,-4, 3, 1, 2,-3,-3,-1, 9,-1, 1,-3,-4, 6, 0,-1,-5, 5,-1, 0,-6, 9,-5, 0, 5,-6, 5, 0,-8, 5, 4,-3, 0,-3, 6,-5, 3,-1,-5, 4, 3,-6, 1, 3, 2,-8, 6,-6, 2, 1, 4,-1, 2,-3,-4, 8,-6, 0,-1,-1, 8,-8, 0, 0, 1, 4, 3,-8, 1, 6,-6,-2, 4, 5,-9, 3, 0, 6,-1,-8, 3,-1,-1, 4,-3, 7,-6, 6,-5, 2,-1, 0,-3, 4, 0,-6, 3,-3, 3, 1, 4,-7, 2, 5,-8, 6,-5,-1, 3, 2, 0,-2, 4,-2, 1, 0,-2, 0, 0, 1,-4, 1, 4, 2,-5,-1, 4, 2,-3, 4,-8, 0, 2,-3, 1, 5,-4, 6,-6, 6,-2,-6, 9,-3, 1, 0, 0, 0,-5, 7, 0,-2, 2,-7, 3, 2, 2, 0,-4, 0,-4, 0, 1, 7,-2,-5, 3, 0,-4, 7, 1,-6,-3, 2, 6,-6, 0,-1, 7,-3, 1, 0, 0, 0,-1,-2,-3, 3,-3, 8,-3, 3,-3,-3, 5, 1, 0,-3, 0,-3, 4, 1,-3, 2, 0, 1, 0,-7, 6, 1,-6, 8,-5, 2, 3,-5, 2, 1,-3,-2, 7,-3, 0,-1,-3, 5, 0,-5, 2, 5,-4,-5, 4,-2,-2, 7,-3,-1,-3, 7,-3,-3, 2, 3,-6, 6, 3,-8, 0, 6,-5,-1, 8,-2, 2,-1,-1,-3, 0,-2, 3,-3, 7,-9, 9,-5,-1, 0, 0, 1, 1, 3, 1,-3,-2, 3,-1, 2,-7, 1, 3,-3, 5,-4, 3, 1,-7, 4, 1, 0, 3,-7, 4, 2,-1,-3, 0, 5, 0, 0,-3,-4, 8,-3,-4, 4,-6, 2, 1,-1, 7,-5,-4, 4,-1,-2, 0, 2, 4,-2,-1, 1,-1, 5,-9, 0, 6,-1, 0,-2,-1, 0, 3,-3, 5,-4, 5, 0,-6, 2,-1,-1, 2, 3,-7, 8,-7, 5, 3,-9, 7, 0,-2,-1, 3,-3,-2, 6,-4, 5,-9, 9,-7, 6,-1,-6, 5,-1,-1, 5,-6, 6,-6,-2, 7,-7, 4, 1, 3,-6, 4,-7, 5, 4,-9, 0, 3,-2, 5, 1, 1,-5, 2, 4,-6,-2, 1, 0, 1, 4,-1,-2, 3,-2, 1, 0,-5, 8,-9, 6, 0,-3, 5,-4, 5,-3,-1,-4, 7,-8, 6, 2,-1,-4, 3, 1,-2, 0, 0, 0,-2, 0,-2, 8,-9, 3,-1, 5, 2, 0,-2,-1,-5, 3, 2,-6, 1, 3, 0,-3, 3, 5,-2, 0, 0,-6, 8,-1,-2, 2,-4, 1, 4,-4,-4, 0, 7,-1,-4, 6,-7, 2, 5,-1,-5, 4,-1,-3, 6,-6, 0,-3, 8, 1,-4, 0, 3,-4, 4, 0,-1,-4, 2,-1, 4,-7, 2, 5, 1,-9, 2, 1, 3,-5, 8,-1, 1,-9, 5,-2,-2, 5,-3, 1, 2, 1,-2,-5, 1, 7,-1,-1,-2,-3, 6,-1,-3, 2, 1,-1,-4, 4,-3, 7,-3, 1,-5, 7,-2, 1,-5, 1,-4, 4, 1, 2, 0, 2,-8, 3,-2,-1, 0,-1, 4,-4, 1, 5, 3,-5, 0, 0,-3,-1, 7,-6, 6,-4, 3, 0, 2,-5, 5,-7, 6,-7, 2, 3, 0,-3,-1, 8,-5,-4, 7,-1,-4, 2, 3,-1,-1, 2, 1,-4, 3, 0,-6, 0,-1, 0, 5, 1, 3,-3, 3,-1, 1,-6, 3,-4,-1, 6, 0, 0, 0,-1,-6, 4, 1,-2,-2, 6,-1,-2,-3, 1,-1, 0, 6,-4, 1,-2, 3, 1,-2,-4, 6, 2,-2,-5, 6,-4, 5,-3,-1,-1,-2, 6,-1,-6, 8,-7, 5,-2, 5,-4, 1,-5, 0, 3, 0,-4, 0, 2, 5,-6, 5, 0,-6, 7,-5, 0, 4, 0,-2,-4, 8,-1,-2,-4, 5,-1,-3,-2, 0, 5,-5, 6, 0,-1,-3, 0, 3, 4,-7, 6,-4, 5,-7, 6,-8, 8,-8, 7,-7, 5,-4, 0, 2, 1, 1, 0, 4,-1,-1,-6, 5,-5, 5,-3, 1, 1, 1,-2,-4, 2,-1, 2, 0, 0, 3,-1,-1, 5, 0,-8, 8,-1,-7, 2,-2, 0, 8,-5,-1,-1, 2,-2, 2, 1,-2, 0, 5, 0,-1,-7, 4,-1, 2,-1, 0,-3, 3, 5,-8, 7, 1,-3,-5,-1, 3,-2, 5, 0, 2,-3, 1,-5,-1, 1, 3, 2, 0, 1, 2,-6, 6,-7,-2, 5, 3,-7, 7,-3, 2,-3,-2, 0, 4,-2,-4, 3, 0, 2, 1,-4, 2, 0, 3,-2, 1, 3,-2,-7, 0, 9, 0,-3, 1,-5, 2,-3, 4,-4, 1, 5,-1, 3, 0,-2,-3, 4, 0,-4,-3,-1, 3, 0, 2,-4, 5, 3,-5, 5,-6, 5,-8, 0, 5, 3,-8, 4, 0,-4, 5, 4,-4,-3, 6,-8, 1, 2, 6,-8, 8, 0,-5,-4, 4, 0,-3, 4, 3,-7, 1, 2,-3,-1, 4, 0,-2, 3, 0,-2, 3,-1, 1,-3,-1, 7,-4, 2, 2,-4, 1, 3,-8, 2,-2, 5,-1,-2, 3,-6, 0, 2,-1, 7,-2,-4, 4,-2,-4, 0, 2, 6,-1,-2,-4, 5, 3,-4,-2,-1, 6,-7, 1, 4,-5, 3, 5,-8, 7,-2,-6, 8,-8, 2, 5,-7, 4, 3, 2,-6, 0,-2, 5,-2, 2, 2,-6, 5,-1,-1,-3, 3,-1, 3,-6, 4, 0, 4,-9, 5, 0, 4, 0,-5, 3,-6, 1, 2, 5, 0,-1,-4,-4, 2,-2, 1, 0,-1, 1, 7, 0,-5,-2,-1, 2, 5,-5, 7,-3,-6, 1, 4, 4,-1,-1,-7, 8,-1,-2,-1, 2,-4, 0,-1, 6,-2,-2, 3,-6, 1, 8, 0,-4,-5, 7,-1,-1,-1,-4, 9,-6, 1, 1,-4, 0, 1, 2, 4,-3, 2,-4,-1, 7,-1,-6,-1, 4, 1, 1,-5, 2,-3, 5,-6, 3,-2, 8,-8, 3,-2, 4,-2,-1,-1, 3, 0,-4, 1, 2, 0,-3, 8, 0,-7, 0, 4,-6, 6,-1, 2,-3, 1,-5, 9,-8, 5,-1,-2, 1,-4, 9,-5, 0, 4, 1,-2,-6, 4,-1,-2, 1,-3, 5, 1, 2,-1, 1,-8, 7,-5, 1, 1, 2,-2,-3, 7,-8, 5,-5, 8, 0,-3,-5, 1, 8,-7, 3, 1,-5, 1, 3, 1, 2, 0,-6, 2,-2, 3,-5, 2,-2, 6, 3,-6, 4,-6, 2, 5,-4, 4,-3, 2,-7, 3, 4,-6, 3, 0, 1,-4,-1, 5,-1,-4, 4, 3,-6, 6, 0,-1,-4, 3,-4, 2,-1,-2, 8,-6, 7,-9, 7,-5, 0, 3,-3, 0, 7,-2, 2, 0,-6,-3, 6,-3,-3, 4, 0,-4, 3, 1, 3,-6, 3, 4,-1,-5, 4,-3, 1, 1,-4, 7, 1,-9, 2, 2,-4, 9, 0,-6,-3, 2, 6,-3, 4,-9, 3,-1, 4,-3, 4, 2,-7,-2, 5, 3,-3,-1, 4,-5, 3,-6, 3, 0, 6,-3,-1, 3,-3,-4, 0, 8,-3, 1, 0,-1, 2,-1,-5, 0, 3,-1, 2,-3, 5,-7, 8,-1,-2, 1, 1,-2,-5, 6,-2,-3, 4,-1,-1, 3,-4, 3,-1, 2,-3,-4, 5,-2, 4,-7, 3, 0,-2, 5, 3,-6,-1, 7,-7,-2, 0, 7, 1, 0,-2,-5,-1, 0, 8,-4,-3, 2, 5,-6, 3,-2, 1,-1,-1, 5, 2,-3, 1,-2, 2,-2,-3, 3, 0, 4,-1,-1,-4, 1, 1,-5, 4, 0,-2, 3, 0,-5, 6,-3, 2, 2,-1, 3,-3,-1, 1,-1,-5, 5, 0,-2,-1, 7, 0,-4,-5, 5,-4, 4,-2, 4,-1, 1,-1, 3,-4, 1, 1, 2,-1, 0, 0,-5, 3,-4,-1, 0, 2, 3,-5, 2, 6,-9, 8,-3,-3,-2, 6,-3, 6,-9, 3, 5,-3, 1,-3,-3, 5,-1, 4,-4,-3, 5,-6, 8, 0,-4, 2,-3, 3, 2,-8, 5,-2, 3,-2, 1,-1,-3, 1, 1, 5,-6, 7,-6,-3, 7, 2, 0,-5,-2, 7,-8, 6,-5,-2, 0, 7,-3,-2, 6,-1,-5, 0, 2,-3, 1, 7,-3,-6, 6,-2, 1,-4, 8,-1,-3,-3, 7,-3,-6, 8,-2,-6, 9,-5,-4, 7,-2,-1,-4, 5, 4,-6, 5,-8, 8,-4, 3,-4,-2, 1, 1,-2, 8, 0,-8, 0, 3,-3, 4,-5, 2, 3, 2,-4, 2,-5, 8,-2, 2,-6, 0, 2, 4,-3,-5, 6, 2,-6, 7,-2, 1,-4,-4, 9,-9, 4, 4,-6, 6,-3,-1,-3, 3,-1, 5,-5, 3, 1,-4,-1, 7,-6, 0, 5,-5, 3,-5, 2, 2,-3, 5, 1,-4,-3, 8,-6, 1,-1,-2, 1, 6,-2,-2, 4, 0,-6, 2,-2, 6,-1,-1,-3, 5,-7, 8, 0, 0,-2,-2, 0,-1, 0,-1, 3,-2, 5,-1,-5, 6,-9, 1,-1, 5, 1, 2,-8, 1, 7,-2, 1,-5, 1, 5,-1, 0, 0,-6, 0, 1, 6,-3,-2, 0, 0, 3, 0,-5, 3, 0, 2, 1, 1, 1,-1,-8, 0, 8,-6,-1, 0, 3,-1, 4, 0,-2,-5, 1, 2, 6,-1, 1,-7, 7,-1, 1,-9, 1,-1, 0, 4, 1,-3, 7,-7, 7,-5, 3, 1,-4, 5,-2, 0,-2, 0,-4,-1, 4, 0, 0, 5,-2, 1,-1,-7, 1, 2,-2, 4, 0, 4,-5, 0, 5,-9, 6,-3, 6,-1,-4, 4,-4,-4, 8,-6, 6,-8, 7, 1,-3, 0, 0,-1,-4, 1, 6,-4, 5, 1,-9, 0, 1, 0, 2,-1, 3, 4,-3,-5, 2,-3, 2, 1,-3, 1, 1, 2, 0, 5,-6, 4,-3, 0,-1,-1,-2, 2, 0, 7,-6, 4, 0,-3, 3, 0,-5, 0, 2,-4, 4,-2, 3, 4,-5, 2, 0, 3,-9, 4, 1,-3, 4,-2,-1, 3, 1,-1,-4, 6,-7, 5,-1,-2, 5,-1,-4, 2,-4,-1, 2, 0, 3, 0,-4,-1, 9,-6,-3, 3, 1,-2, 3, 0,-2, 6,-3, 0,-1,-2, 6,-4, 0,-3, 1, 6,-1,-4,-2, 5,-7, 6,-4, 0, 7,-8, 6, 2,-9, 1, 1,-2, 6, 3,-4, 0,-3, 7,-5,-1, 3, 2,-7, 5,-4, 5, 0,-1,-6, 2, 6,-5,-1,-2, 3,-2, 4, 1,-4, 2, 0,-3, 2, 5,-3, 0, 1,-4,-1, 2, 5,-5,-2, 8,-6, 5,-5, 1, 1,-2,-3, 8,-3, 2,-7, 3, 0,-1, 1,-1, 4,-2, 4,-2,-1,-1,-1,-3, 6, 0, 3,-2,-3,-1, 3,-2, 1,-1, 3, 1, 0,-5, 4,-5, 5, 2,-6, 6, 0,-4,-4, 6,-5, 3,-4, 7,-4,-4, 8,-8, 4,-2, 6,-4,-2, 0, 5,-7, 6, 2,-2,-6, 3,-1, 7
