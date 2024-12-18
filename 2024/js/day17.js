import { ints, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/17

// console.log(
//   part1(`Register A: 2024
// Register B: 0
// Register C: 0
//
// Program: 0,3,5,4,3,0
// `),
//   [117440],
// );
// console.log(
//   part2(`Register A: 2024
// Register B: 0
// Register C: 0
//
// Program: 0,3,5,4,3,0
// `),
//   [117440],
// );

notMy(`Register A: 30878003
Register B: 0
Register C: 0

Program: 2,4,1,2,7,5,0,3,4,7,1,7,5,5,3,0`);

runDay(2024, 17)
  //
  // .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let [regs, prog] = inp.trim().split("\n\n");

  let [A, B, C] = ints(regs);
  let reg = { A, B, C };

  prog = ints(prog.split(" ")[1]);

  let i = 0;

  function literal(n) {
    return n;
  }
  function combo(n) {
    if (n <= 3) return n;
    if (n === 4) return reg["A"];
    if (n === 5) return reg["B"];
    if (n === 6) return reg["C"];
    throw new Error("Invalid combo operand");
  }

  let output = [];

  while (i < prog.length) {
    let [opcode, operand] = prog.slice(i, i + 2);

    if (opcode === 0) {
      reg["A"] = Math.floor(reg["A"] / 2 ** combo(operand));
    } else if (opcode === 1) {
      reg["B"] = reg["B"] ^ literal(operand);
    } else if (opcode === 2) {
      reg["B"] = combo(operand) % 8;
    } else if (opcode === 3) {
      if (reg["A"] !== 0) {
        i = literal(operand);
        continue;
      }
    } else if (opcode === 4) {
      reg["B"] = reg["B"] ^ reg["C"];
    } else if (opcode === 5) {
      output.push(combo(operand) % 8);
    } else if (opcode === 6) {
      reg["B"] = Math.floor(reg["A"] / 2 ** combo(operand));
    } else if (opcode === 7) {
      reg["C"] = Math.floor(reg["A"] / 2 ** combo(operand));
    } else {
      throw new Error("Invalid opcode");
    }
    i += 2;
  }

  return output.join(",");
}

function part2(inp) {
  let [regs, prog] = inp.trim().split("\n\n");

  let [A, B, C] = ints(regs).map((it) => BigInt(it));
  let reg = { A, B, C };

  let program = prog.split(" ")[1];
  prog = ints(prog.split(" ")[1]);
  console.log(program);

  // let aa = 190384113204239n;
  let aa = 1n;
  // let aa = 25997599819840n;
  // WIN! 207976299400113n
  // WIN! 207976299314191n
  // WIN! 207976299248655n high
  //   ... nothing
  //       29710494914302
  // (     25997037424972n)
  // ... 25997599819840 checker

  // WIN!      207976299248655n high
  // correct = 190384113204239

  // correct = 190_384_113_204_239

  let limit = 10_000_000_000;
  while (limit-- > 0) {
    let res = calculate(prog, aa);

    // 207976299248655
    // 101 111 010 010 011 101 000 001 011 100 000 011 110 000 001 111
    if (limit % 5_000_000 === 0) {
      console.log(limit, aa);
    }

    if (program === res) {
      console.log("WIN!", aa);
      // aa *= 8n;
      return aa;
    } else if (program.endsWith(res)) {
      console.log("endsWith", aa, res);
      // aa *= 8n;
      // aa /= 7n;
    }
    aa++;
  }
  console.log("----- end");
  console.log(limit);
}

function calculate(prog, a) {
  let reg = { A: a, B: 0n, C: 0n };

  let output = [];

  while (reg["A"]) {
    reg["B"] = reg["A"] % 8n;
    reg["B"] = reg["B"] ^ 2n;
    reg["C"] = reg["A"] / 2n ** reg["B"];
    reg["A"] = reg["A"] / 8n;
    reg["B"] = reg["B"] ^ reg["C"];
    reg["B"] = reg["B"] ^ 7n;
    output.push(reg["B"] & 7n);
  }

  return output.join(",");
}

function notMy(inp) {
  const [A, B, C, ...program] = inp.match(/\d+/gm).map(Number);

  const mod = (n, m) => ((n % m) + m) % m;

  let cnt = 0;

  const run = (A, B, C, program) => {
    cnt++;
    let ptr = 0;
    const out = [];
    while (program[ptr] !== undefined) {
      const code = program[ptr];
      const operand = program[ptr + 1];
      let combo;
      if ([0, 1, 2, 3].includes(operand)) combo = operand;
      if (operand === 4) combo = A;
      if (operand === 5) combo = B;
      if (operand === 6) combo = C;

      if (code === 0) A = Math.floor(A / Math.pow(2, combo));
      if (code === 1) B = (B ^ operand) >>> 0; //js xor unsigned
      if (code === 2) B = mod(combo, 8);

      let jumped = false;
      if (code === 3 && A !== 0) {
        ptr = operand;
        jumped = true;
      }
      if (code === 4) B = (B ^ C) >>> 0;
      if (code === 5) out.push(mod(combo, 8));
      if (code === 6) B = Math.floor(A / Math.pow(2, combo));
      if (code === 7) C = Math.floor(A / Math.pow(2, combo));

      if (!jumped) ptr += 2;
    }
    return out.join(",");
  };

  console.log("A", run(A, B, C, program));

  const Q = [];
  Q.push({ result: "", len: 0 });
  while (Q.length) {
    const q = Q.shift();
    if (q.len === program.length) {
      console.log("B", parseInt(q.result, 2));
      break;
    }
    const from = parseInt(q.result + "000", 2);
    const to = parseInt(q.result + "111", 2);
    const expect = program.slice((q.len + 1) * -1).join(",");
    console.log(from);
    console.log(expect);
    for (let a = from; a <= to; a++) {
      const r = run(a, B, C, program);
      if (r === expect) {
        Q.push({ result: a.toString(2), len: q.len + 1 });
      }
    }
  }
  console.log(cnt);
}
