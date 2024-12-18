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

  let aa = 1n; // 207976299400113n high

  let limit = 100_000_000;
  while (limit-- > 0) {
    let res = calculate(prog, aa);

    if (limit % 10_000_000 === 0) {
      console.log(limit);
    }

    if (program === res) {
      console.log("WIN!", aa);
      return aa;
    } else if (program.endsWith(res)) {
      console.log("endsWith", aa, res);
      aa *= 8n;
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
    output.push(reg["B"] % 8n);
  }

  return output.join(",");
}

/*

           1 2   3 4   5 6   7 8   9 10 11 12 13 14 15 16
  Program: 2,4   1,2   7,5   0,3   4,7   1,7   5,5   3,0

// в начале каждого цикла можно обнулять "B" и "C" регистры
  reg["B"] = reg["A"] % 8n;
  reg["B"] = reg["B"] ^ 2;
  reg["C"] = reg["A"] / 2n ** reg["B"];
  reg["A"] = reg["A"] / 8;
  reg["B"] = reg["B"] ^ reg["C"];
  reg["B"] = reg["B"] ^ 7;
  output.push(reg["B"] % 8)


117440
117441
117442
117443
117444
117445
117446
117447
+ 2.097.152 = 8^7 (program 0,3,5,4,3,0)
2214592
2214593
2214594
2214595
2214596
2214597
2214598
2214599

+ 2.097.152
4311744
4311745
4311746
4311747
4311748
4311749
4311750
4311751



8 ** 8   16777216
8 ** 16  281_474_976_710_656

*/
