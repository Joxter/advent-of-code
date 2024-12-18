import { ints, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/17

runDay(2024, 17)
  //
  .part(1, part1)
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

  let aa = 1n;

  while (true) {
    let res = calculate(prog, aa);

    if (program === res) {
      return aa;
    } else if (program.endsWith(res)) {
      aa *= 8n;
      aa -= 7n;
    }
    aa++;
  }
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
  // original: https://topaz.github.io/paste/#XQAAAQCpBgAAAAAAAAA0m0pnuFI8c9Ax53b7qCU52PeXXOG1YE1u32XZcqyQQ3YMAMNGtXMFfC38y1oNFIRt5VfBqHASi2HtSrpkdq6PDuPmRn/L+lE0q+njLOBtuFmDeYuhU6p7LvXmoy5AjFZXSPQ/pZnLGOMb2zotxm+38Cdy+dBQr21Q8jcFXDyGFOKVYDaTDIrglIJ17Fev+58up3NuIRRHlYq8MSeGFJhYv3R+Uo2E0oxGzmJnqfLZooinR3ZLkkgLNLglOqTKq25OQ+GRaIilnUP8cu03h7tqZ1ROgrLA/vz9+zYSYdXQ78R3SnBinLFieRJlwHz1ViCmQbKQV1vW3/tTHKNZ+28KF7ek6pvnB4ByF/CfaHQHCz4ksRJadYKzkykYQLtdPSVOUnV+R8o03N78KOsK714y1ibtQM1MJqS3PC7dvb1HXV9lOJU2MG2tjPHYURpRcSuFx9UWjL2TIlqLvxX9qmViGpD48A34KAE6EYR4K6ijJDu72lhzlIJWV3j+M7JaA2t/d3agptqfvC+TsqAj3ubIINx9P5RTrmDOxeEnQ7rDy5jLsuKK56slfFHef5hkHGLb277AOmEP3TNKn4zKGewep4Yt3HaW//HUL6CzvlpeiGJcunOh5uFYVMStUDd4u+PkOFwdpV5nJ3z2ZbCyRrRPmThRv6t4cygbVLBZOd5sZj4IhZG342fzSinFT9/2nXRTN5jD9dJFXaCssvVJjuK2kM6X5BZyD9gsz9W6tcYnVHh9Pp9eS/CqyhyUmopSUpJ4mw3CCOeJMnKINQ9FyRsW9dbikhSPK4S/BKEndVmEdqRrAXEIxL7oeywcLc8ZVjUF63lzYkYV2X4u3GMGBW5W6RxV9lT3MNwbH9O6Ygt0oI1sKAbM4kNlT7pU8bN+P/wL9zIL2DPW4pf+maKo
  const [A, B, C, ...program] = inp.match(/\d+/gm).map(Number);

  const mod = (n, m) => ((n % m) + m) % m;

  const run = (A, B, C, program) => {
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
  Q.push({ result: 0, len: 0 });
  while (Q.length) {
    const q = Q.shift();
    if (q.len === program.length) {
      console.log("B", q.result);
      console.log("OK", q.result === 190384113204239);
      break;
    }
    let res = q.result;

    const from = res * 8;
    const to = res * 8 + 7;

    const expect = program.slice((q.len + 1) * -1).join(",");

    for (let a = from; a <= to; a++) {
      const r = run(a, B, C, program);
      if (r === expect) {
        Q.push({ result: a, len: q.len + 1 });
      }
    }
  }
}
