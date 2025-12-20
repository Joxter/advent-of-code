import { runDay } from "../../utils.js";

// https://adventofcode.com/2015/day/20

// Covers all possible scenarios up to 50 billion presents for part one.
// Checked by brute forcing all solutions that the highest prime factor is 41.
const PRIMES = [41, 37, 31, 29, 23, 19, 17, 13, 11, 7, 5, 3, 2];

runDay(2015, 20)
  //
  // .part(1, part1) // 2min :(
  // .part(2, part2)
  // .part(1, part1reddit, "reddit")
  // .part(2, part2reddit, "reddit")
  // .part(1, part1redditEnh, "reddit enh")
  // .part(2, part2redditEnh, "reddit enh")
  .part(1, part1fromRust, "from rust")
  .part(2, part2fromRust, "from rust")
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

// https://github.com/maneatingape/advent-of-code-rust/blob/main/src/year2015/day20.rs + Claude to rewrite to js
function part1fromRust(input) {
  // Convert string input to number and divide by 10 (since each elf delivers 10 presents)
  const target = Math.ceil(input / 10);
  const cache = new Map();

  // Recursively compute the divisor sum greater than the target.
  function divisorSum(primes, target) {
    if (primes.length === 0) {
      return target;
    }

    // Cache previously seen states.
    const key = `${primes[0]},${target}`;
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Try not including this prime.
    let result = divisorSum(primes.slice(1), target);
    let power = 1;
    let sum = 1;

    // Try increasing powers of this prime until the divisor sum exceeds the target.
    while (sum < target) {
      power *= primes[0];
      sum += power;

      const next = power * divisorSum(primes.slice(1), Math.ceil(target / sum));
      result = Math.min(result, next);
    }

    cache.set(key, result);
    return result;
  }

  return divisorSum(PRIMES, target);
}

function part2fromRust(input) {
  const target = Math.ceil(input / 11);
  const candidates = [];

  // Recursively find all possible house numbers
  function divisorSum(primes, house, target) {
    if (primes.length === 0) {
      if (target === 1) {
        candidates.push(house);
      }
      return target;
    }

    // Try not including this prime.
    let result = divisorSum(primes.slice(1), house, target);
    let power = 1;
    let sum = 1;

    // Try increasing powers of this prime until the divisor sum exceeds the target.
    while (sum < target) {
      power *= primes[0];
      sum += power;

      const ds = divisorSum(
        primes.slice(1),
        house * power,
        Math.ceil(target / sum),
      );
      result = Math.min(result, power * ds);
    }

    return result;
  }

  // Get list of all house numbers that meet or exceed the target value
  divisorSum(PRIMES, 1, target);
  candidates.sort((a, b) => a - b);

  // Find the first house taking into account the 50 present limit
  return candidates.find((house) => factorSum(PRIMES, house, 1) >= target);
}

// Combine prime factors into all factors, only counting those where the elf will still deliver.
function factorSum(primes, house, factor) {
  if (primes.length === 0) {
    // Check if the elf reached this house (within 50 houses)
    return 50 * factor >= house ? factor : 0;
  }

  let sum = 0;
  let primePower = 1;

  // Try all powers of the current prime that divide the house
  for (let exp = 0; exp < 31; exp++) {
    if (house % primePower !== 0) break;

    sum += factorSum(primes.slice(1), house, factor * primePower);
    primePower *= primes[0];
  }

  return sum;
}
