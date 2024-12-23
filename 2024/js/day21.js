import { findInGrid, makeGrid, runDay, sum, uniq } from "../../utils.js";

// https://adventofcode.com/2024/day/21

runDay(2024, 21)
  //
  .part(1, part1)
  // .part(2, part2) // not solved:(
  .part(2, part2notMy)
  .end();

function part1(inp) {
  let numpad = makeGrid(
    `
#####
#789#
#456#
#123#
##0A#
#####
`.trim(),
  );

  let arrpad = makeGrid(
    `
#####
##^A#
#<v>#
#####
`.trim(),
  );

  let arrPaths = {};
  let nums = "A<>v^";
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      let start = nums[i];
      let end = nums[j];
      arrPaths[start + end] = generateAllPaths(arrpad, start, end);
    }
  }

  let numpadPaths = {};
  let nums2 = "0123456789A";
  for (let i = 0; i < nums2.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      let start = nums2[i];
      let end = nums2[j];
      numpadPaths[start + end] = generateAllPaths(numpad, start, end);
    }
  }

  arrPaths = {
    ...arrPaths,
    //
    "A<": ["v<<"],
    ">^": ["^<"],
    "^>": ["v>"],
    "<A": [">>^"],
    vA: [">^"],
    Av: ["<v"],
  };

  let codes = inp.split("\n");

  let complexity = codes.map((code) => {
    let p1 = getPath1("A" + code, numpadPaths);

    let p2 = calc(p1);
    let p3 = calc(p2);

    let min = Math.min(...p3.map((p) => p.length));

    return +code.slice(0, 3) * min;
  });

  return sum(complexity);

  function calc(p1) {
    return p1.map((p) => {
      return getPathOne("A" + p, arrPaths);
    });
  }
}

function part2(inp) {
  let numpad = makeGrid(
    `
#####
#789#
#456#
#123#
##0A#
#####
`.trim(),
  );

  let arrpad = makeGrid(
    `
#####
##^A#
#<v>#
#####
`.trim(),
  );

  let arrPaths = {};
  let nums = "A<>v^";
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      let start = nums[i];
      let end = nums[j];
      arrPaths[start + end] = generateAllPaths(arrpad, start, end);
    }
  }

  let numpadPaths = {};
  let nums2 = "0123456789A";
  for (let i = 0; i < nums2.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      let start = nums2[i];
      let end = nums2[j];
      numpadPaths[start + end] = generateAllPaths(numpad, start, end);
    }
  }

  let codes = inp.split("\n");

  arrPaths = {
    ...arrPaths,
    //
    "A<": ["v<<"],
    ">^": ["<^"],
    "^>": ["v>"],
    "<A": [">>^"],
    vA: [">^"],
    Av: ["<v"],
  };

  let complexity = codes.map((code) => {
    let p1 = getPath1("A" + code, numpadPaths).slice(0, 1);

    let last = p1.map((p) => {
      let memo = {};

      let res = getPathNew("A" + p, 2, memo);
      return res;
    });

    return +code.slice(0, 3) * 123;
  });

  return sum(complexity);

  function getPathNew(code, n, memo) {
    if (n === 0) return code + "A";
    if (memo[code + ":" + n]) return memo[code + ":" + n];

    let p = "";

    for (let i = 0; i < code.length - 1; i++) {
      let pair = code.slice(i, i + 2);
      let next = getPathOne("A" + pair, arrPaths);
      p += getPathNew(next, n - 1, memo);
    }

    memo[code + ":" + n] = p;
    return p;
  }
}

function generateAllPaths(grid, start, end) {
  let paths = [];

  let dirs = [
    [0, 1, ">"],
    [0, -1, "<"],
    [1, 0, "v"],
    [-1, 0, "^"],
  ];

  let q = [[findInGrid(grid, start), "", ""]];

  while (q.length > 0) {
    let [pos, path, pathCell] = q.shift();

    let [i, j] = pos;
    let cell = grid[i]?.[j];
    if (cell === "#") continue;

    if (cell === end) {
      paths.push(path);
      continue;
    }

    for (let [dx, dy, dir] of dirs) {
      let [x, y] = [i + dx, j + dy];
      if (!pathCell.includes(cell)) {
        q.push([[x, y], path + dir, pathCell + cell]);
      }
    }
  }
  let min = Math.min(...paths.map((p) => p.length));

  paths = paths.filter((p) => p.length === min);

  return paths;
}

function getPath1(code, paths) {
  let p = [""];
  for (let i = 0; i < code.length - 1; i++) {
    let pair = code.slice(i, i + 2);

    let newP = [];
    paths[pair].forEach((possiblePath) => {
      p.forEach((pp) => {
        newP.push(pp + possiblePath + "A");
      });
    });
    p = newP;
  }

  return p;
}

function getPathOne(code, paths) {
  let p = "";

  for (let i = 0; i < code.length - 1; i++) {
    let pair = code.slice(i, i + 2);
    let possiblePath = paths[pair][0];
    p += possiblePath + "A";
  }

  return p;
}

function toPairs(code) {
  let p = {};

  for (let i = 0; i < code.length - 1; i++) {
    let pair = code.slice(i, i + 2);

    if (!p[pair]) p[pair] = 0;
    p[pair]++;
  }

  return p;
}

function part2notMy(inp) {
  // https://old.reddit.com/r/adventofcode/comments/1hj2odw/2024_day_21_solutions/m36z9y2/
  const getSum = (a, b) => a + b;
  const toInt = (n) => parseInt(n, 10);

  class RobotInstructionTranslator {
    #instructions;

    constructor() {
      // Priority: <, v, ^, >, A (except when it would make us cross over a gap)
      this.#instructions = JSON.parse(
        `{"10":">vA","12":">A","13":">>A","14":"^A","15":"^>A","16":"^>>A","17":"^^A","18":"^^>A","19":"^^>>A","20":"vA","21":"<A","23":">A","24":"<^A","25":"^A","26":"^>A","27":"<^^A","28":"^^A","29":"^^>A","30":"<vA","31":"<<A","32":"<A","34":"<<^A","35":"<^A","36":"^A","37":"<<^^A","38":"<^^A","39":"^^A","40":">vvA","41":"vA","42":"v>A","43":"v>>A","45":">A","46":">>A","47":"^A","48":"^>A","49":"^>>A","50":"vvA","51":"<vA","52":"vA","53":"v>A","54":"<A","56":">A","57":"<^A","58":"^A","59":"^>A","60":"<vvA","61":"<<vA","62":"<vA","63":"vA","64":"<<A","65":"<A","67":"<<^A","68":"<^A","69":"^A","70":">vvvA","71":"vvA","72":"vv>A","73":"vv>>A","74":"vA","75":"v>A","76":"v>>A","78":">A","79":">>A","80":"vvvA","81":"<vvA","82":"vvA","83":"vv>A","84":"<vA","85":"vA","86":"v>A","87":"<A","89":">A","90":"<vvvA","91":"<<vvA","92":"<vvA","93":"vvA","94":"<<vA","95":"<vA","96":"vA","97":"<<A","98":"<A","A0":"<A","A1":"^<<A","A2":"<^A","A3":"^A","A4":"^^<<A","A5":"<^^A","A6":"^^A","A7":"^^^<<A","A8":"<^^^A","A9":"^^^A","0A":">A","01":"^<A","02":"^A","03":"^>A","04":"^^<A","05":"^^A","06":"^^>A","07":"^^^<A","08":"^^^A","09":"^^^>A","1A":">>vA","2A":"v>A","3A":"vA","4A":">>vvA","5A":"vv>A","6A":"vvA","7A":">>vvvA","8A":">vvvA","9A":"vvvA","A^":"<A","A<":"v<<A","Av":"<vA","A>":"vA","^A":">A","^<":"v<A","^v":"vA","^>":"v>A","<A":">>^A","<^":">^A","<v":">A","<>":">>A","vA":"^>A","v^":"^A","v<":"<A","v>":">A",">A":"^A",">^":"<^A","><":"<<A",">v":"<A"}`,
      );
    }

    translate(key) {
      if (key[0] === key[1]) {
        // Robot arms don't need to move in this case; we can just press 'A' again.
        return "A";
      } else {
        return this.#instructions[key];
      }
    }
  }

  class RobotKeypad {
    #code;
    #translator;
    #instructions;

    #setNewKeystrokes(counts, keyStrokes, multiplier) {
      multiplier = multiplier || 1;
      for (let j = 0; j < keyStrokes.length - 1; j++) {
        // The order of the movements doesn't matter, just how many times each one happens.
        let key = keyStrokes.substring(j, j + 2);
        if (counts.has(key)) {
          counts.set(key, counts.get(key) + multiplier);
        } else {
          counts.set(key, multiplier);
        }
      }
    }

    #translateParentInstructions(instructions) {
      let commandCounts = new Map();
      for (let instruction of instructions.keys()) {
        let count = instructions.get(instruction);
        // All robots start on "A" from the previous keystrokes, so we need to account for that.
        this.#setNewKeystrokes(
          commandCounts,
          "A" + this.#translator.translate(instruction),
          count,
        );
      }
      return commandCounts;
    }

    #translateMainKeypadInstructions(layers) {
      let instructions = "A" + this.#code;
      let commandCounts = new Map();
      for (let i = 0; i < instructions.length - 1; i++) {
        this.#setNewKeystrokes(
          commandCounts,
          "A" + this.#translator.translate(instructions.substring(i, i + 2)),
        );
      }
      for (; layers > 1; layers--) {
        commandCounts = this.#translateParentInstructions(commandCounts);
      }
      return commandCounts;
    }

    constructor(code, translator, layers) {
      this.#code = code;
      this.#translator = translator;
      this.#instructions = this.#translateMainKeypadInstructions(layers);
    }

    get complexity() {
      // The sum of these values gives us the number of movements the last robot needed to make.
      // Because all robots start at "A", this conveniently equals the number of key presses the
      // human has to make, so we don't need to adjust the resulting sum.
      return this.#instructions.values().reduce(getSum, 0) * toInt(this.#code);
    }
  }

  function getCodeComplexities(input, layers) {
    let translator = new RobotInstructionTranslator();
    let total = 0;
    for (let line of input) {
      let keypad = new RobotKeypad(line, translator, layers);
      total += keypad.complexity;
    }
    return total;
  }

  return getCodeComplexities(inp.split("\n"), 26);
}
