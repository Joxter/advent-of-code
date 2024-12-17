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
  // prog = ints(prog.split(" ")[1]);

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

  debugger;

  // let aa = 10_000_000_000; // 28_704_000_000
  // let aa = 1;
  let aa = 14190000000n; //  14_190_000_000n
  // A = 117440;
  while (true) {
    reg = { A: aa, B: 0, C: 0 };
    let output = [];

    if (aa % 10_000_000n === 0n) {
      console.log("aa", aa);
    }
    let i = 0;

    reg["A"] = aa;

    let lim = 100000;
    while (lim-- > 0) {
      reg["B"] = reg["A"] % 8n ^ 2n;
      reg["C"] = reg["A"] / 2n ** reg["B"];
      reg["A"] = reg["A"] / 8n;
      reg["B"] = reg["B"] ^ reg["C"] ^ 7n;

      output.push(reg["B"] % 8n);

      let o = output.join(",");

      if (!program.startsWith(o)) break;
      if (program === o) return aa;
    }

    /*

invalid
{ A: 14680, B: 29365, C: 29360 }
5

valid
{ A: 14680, B: 0, C: 0 }
0

  117440
  117441
  117442
  117443
  117444
  117445
  117446
  117447
  + 2.097.152
  */
    aa++;
  }

  // console.log("END", reg, output.join(","));
  // console.log([output.join(",")]);
  //
  // return output.join(",");
}

/*

0,3    5,4    3,0

/reg["A"] = Math.floor(reg["A"] / 8)
/out.push(reg["B"] % 8)



*/

/*

Register A: 30878003
Register B: 0
Register C: 0

Program: 2,4   1,2   7,5   0,3   4,7   1,7   5,5   3,0
                                             /out.push(reg["B"] % 8)
                                       /reg["B"] = reg["B"] ^ 7
                                /reg["B"] = reg["B"] ^ reg["C"]
                          /reg["A"] = Math.floor(reg["A"] / 8)
                     /reg["C"] = floor(reg["A"] / 2 ** reg["B"])
               /reg["B"] = reg["B"] ^ 2;
         /reg["B"] = reg["A"] % 8;



  reg["A"] = aa;

  /reg["B"] = (reg["A"] % 8) ^ 2;
  /reg["C"] = floor(reg["A"] / 2 ** reg["B"])
  /reg["A"] = Math.floor(reg["A"] / 8)
  /reg["B"] = (reg["B"] ^ reg["C"]) ^ 7
  /out.push(reg["B"] % 8)




  reg["A"] = aa;
  reg["B"] = (reg["A"] % 8) ^ 2;
  reg["C"] = floor(reg["A"] / (2**reg["B"]) )

 /out.push(((reg["B"] ^ reg["C"]) ^ 7) % 8)

  reg["A"] = Math.floor(reg["A"] / 8)



117440
117441
117442
117443
117444
117445
117446
117447
+ 2.097.152
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




*/
