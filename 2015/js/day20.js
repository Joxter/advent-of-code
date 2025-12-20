import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/20

runDay(2015, 20)
  //
  // .part(1, part1) // 2min :(
  // .part(2, part2)
  .part(1, part1reddit, "reddit")
  .part(2, part2reddit, 'reddit')
  .part(1, part1redditEnh, "reddit enh")
  .part(2, part2redditEnh, "reddit enh")
  .end();

function part1(inp) {
  let target = +inp;

  let i = 0;
  while (i < target / 10) {
    i += 2;
    let cnt = i * 10;

    for (let j = 1; j <= i >> 1; j++) {
      if (i % j === 0) {
        cnt += j * 10;
      }
    }

    if (cnt > target) return i;
  }
}

function part2(inp) {
  let target = +inp;

  let i = 0;
  while (i < 1_000_000) {
    i += 2;
    let cnt = i * 11;

    for (let j = 1; j <= i >> 1; j++) {
      if (i % j === 0 && i / j <= 50) {
        cnt += j * 11;
      }
    }

    if (cnt > target) return i;
  }
}

function part1reddit(input) {
  const presents = [];

  for (let e = 1; e < input / 10; e++) {
    for (let i = e; i < input / 10; i = i + e) {
      if (!presents[i]) presents[i] = 10;
      presents[i] = presents[i] + e * 10;
    }
  }

  return presents.reduce(
    (min, current, index) =>
      min === 0 && current >= input ? (min = index) : min,
    0,
  );
}

function part2reddit(input) {
  const presents2 = [];

  for (let e = 1; e < input / 10; e++) {
    let visits = 0;
    for (let i = e; i < input / 10; i = i + e) {
      if (visits < 50) {
        if (!presents2[i]) presents2[i] = 11;
        presents2[i] = presents2[i] + e * 11;
        visits = visits + 1;
      }
    }
  }

  return presents2.reduce(
    (min, current, index) =>
      min === 0 && current >= input ? (min = index) : min,
    0,
  );
}

function part1redditEnh(inp) {
  inp = +inp; // LOL this line gives x10 perf boost
  const presents = Array(inp / 20).fill(10);

  for (let elf = 2; elf < inp / 10; elf++) {
    let step = elf % 2 === 0 ? elf : elf * 2;

    for (let i = step; i < inp / 10; i += step) {
      presents[i / 2] += elf * 10;
    }
  }

  for (let i = 0; i < presents.length; i++) {
    if (presents[i] >= inp) {
      return i * 2;
    }
  }
}

function part2redditEnh(inp) {
  inp = +inp;
  const presents = Array(inp / 20).fill(11);

  for (let elf = 2; elf < inp / 10; elf++) {
    let visits = 0;
    let step = elf % 2 === 0 ? elf : elf * 2;
    let vis = elf % 2 === 0 ? 1 : 2;

    for (let i = step; i < inp / 10 && visits < 50; i += step) {
      if (i % 2 === 0) presents[i / 2] += elf * 11;
      visits += vis;
    }
  }

  for (let i = 0; i < presents.length; i++) {
    if (presents[i] >= inp) {
      return i * 2;
    }
  }
}
