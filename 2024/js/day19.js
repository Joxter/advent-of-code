import { runDay, sum, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/19

runDay(2024, 19)
  //
  .part(1, part1) // 230 msec
  .part(1, part1better, "better") // 61 msec
  .part(2, part2) // 17 sec
  .part(2, part2better, "better") // 61 sec
  .part(2, notMy1p2, "not my, cache+recur") // 157 msec
  .part(2, notMy2p2, "not my 2, cache+recur") // 83 msec
  .part(2, notMy3p2, "not my 3, similar as my 'better'") // 120 msec
  .end();

function part1(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return stripes.filter((str, i) => {
    return possible(str, towels);
  }).length;
}

function possible(str, towels) {
  if (!str) return true;

  let vars = [""];

  let visitedFalse = new Set();

  let i = 0;
  while (vars.length > 0) {
    let pref = vars.pop();
    if (pref === str) return true;
    if (!str.startsWith(pref) || visitedFalse.has(pref)) {
      continue;
    } else {
      visitedFalse.add(pref);
    }

    for (const towel of towels) {
      vars.push(pref + towel);
    }
  }

  return false;
}

function part2(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return sum(
    stripes.map((str) => {
      return possible(str, towels);
    }),
  );

  function possible(str, towels) {
    if (!str) return true;

    let vars = { "": 1 };

    let i = 0;
    let cnt = 0;
    while (Object.keys(vars).length > 0) {
      i++;
      let newVars = {};

      Object.entries(vars).forEach(([pref, n]) => {
        if (pref === str) {
          cnt += n;
          return;
        }
        for (const towel of towels) {
          let a = pref + towel;
          if (str.startsWith(a)) {
            if (!newVars[a]) newVars[a] = 0;
            newVars[a] += n;
          }
        }
      });
      vars = newVars;
    }

    return cnt;
  }
}

function part1better(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return stripes.filter((str, i) => {
    return possibleBetter(str, towels);
  }).length;
}

function possibleBetter(str, towels) {
  let arr = Array(str.length + 1).fill(0);

  for (const towel of towels) {
    if (str.startsWith(towel)) {
      arr[towel.length] = 1;
    }
  }

  arr.forEach((v, i) => {
    if (v === 1) {
      for (const towel of towels) {
        if (str.startsWith(towel, i)) {
          arr[towel.length + i] = 1;
        }
      }
    }
  });

  return arr.at(-1) !== 0;
}

function part2better(inp) {
  let [towels, stripes] = inp.split("\n\n");

  towels = towels.split(", ");
  stripes = stripes.split("\n");

  return sum(
    stripes.map((str) => {
      return possible(str, towels);
    }),
  );

  function possible(str, towels) {
    let arr = Array(str.length + 1).fill(0);

    for (const towel of towels) {
      if (str.startsWith(towel)) {
        arr[towel.length]++;
      }
    }

    arr.forEach((v, i) => {
      if (v > 0) {
        for (const towel of towels) {
          if (str.startsWith(towel, i)) {
            arr[towel.length + i] += v;
          }
        }
      }
    });

    return arr.at(-1);
  }
}

function notMy1p2(inp) {
  // https://www.reddit.com/r/adventofcode/comments/1hhlb8g/comment/m2w1lff/
  const [towels, designs] = inp
    .split("\n\n")
    .map((s, i) =>
      i === 0 ? s.split(",").map((s) => s.trim()) : s.split("\n"),
    );

  const walkDef = (design, towels) =>
    design === ""
      ? 1
      : towels
          .map((towel) =>
            design.startsWith(towel)
              ? walk(design.slice(towel.length), towels)
              : 0,
          )
          .reduce((acc, cur) => acc + cur);

  const cache = new Map();

  function walk(design, towels) {
    return cache.has(design)
      ? cache.get(design)
      : (() => {
          const result = walkDef(design, towels);
          cache.set(design, result);
          return result;
        })();
  }

  return designs
    .map((cur) => walk(cur, towels))
    .reduce((acc, cur) => acc + cur, 0);
}

function notMy2p2(inp) {
  // https://github.com/yolocheezwhiz/adventofcode/blob/main/2024/day19.js
  const input = inp.split("\n\n");
  const towels = input[0].split(", ");
  const patterns = input[1].split("\n");
  let answerp2 = 0;

  // DFS - Cache results
  function memoize(partialPattern, towels, memo) {
    // If we've already matched this partial pattern, return its count
    if (memo.has(partialPattern)) return memo.get(partialPattern);
    // We've successfully matched the entire pattern
    if (!partialPattern.length) return 1;
    // This is the first time we get this pattern
    // Find the towels that can be added next
    const count = towels
      .filter((towel) => partialPattern.startsWith(towel))
      // Recurse and sum
      .reduce(
        (sum, towel) =>
          sum + memoize(partialPattern.slice(towel.length), towels, memo),
        0,
      );
    // cache result for this partial pattern and return it
    memo.set(partialPattern, count);
    return count;
  }

  // Solve one pattern at a time
  patterns.forEach((pattern) => {
    const totalCount = memoize(pattern, towels, new Map());
    // P2: Sum possible ways to build the pattern
    answerp2 += totalCount;
  });

  return answerp2;
}

function notMy3p2(inp) {
  // https://www.reddit.com/r/adventofcode/comments/1hhlb8g/comment/m2s43j6/
  let [_towels, messages] = inp.split("\n\n");
  _towels = _towels.split(", ");
  let towels = {};
  for (let t of _towels) {
    towels[t] = true;
  }

  messages = messages.split("\n");
  let ret2 = 0;

  for (let line of messages) {
    let valids = [1];
    for (let i = 0; i < line.length; i++) {
      if (!valids[i]) continue;
      for (let j = i + 1; j <= line.length; j++) {
        if (i == 0) valids[j] = 0;
        if (towels[line.substring(i, j)]) valids[j] += valids[i];
      }
    }
    ret2 += valids[line.length];
  }
  return ret2;
}
