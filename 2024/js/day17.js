import { ints, runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/17

console.log(
  part2(`Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0
`),
  [117440],
);
// console.log(
//   part1(`Register A: 117440
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
  // .part(2, part2)
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

  let limit = 100;

  debugger;

  while (i < prog.length && limit-- > 0) {
    let [opcode, operand] = prog.slice(i, i + 2);
    // opcode == instructions
    // console.log(i, [opcode, operand], reg, output.join(","));

    if (opcode === 0) {
      // "adv", division
      reg["A"] = Math.floor(reg["A"] / 2 ** combo(operand)); // COMBO OPERAND ???
    } else if (opcode === 1) {
      // "bxl", XOR
      reg["B"] = reg["B"] ^ literal(operand); // LITERAL OPERAND ???
    } else if (opcode === 2) {
      // "bst", modulo 8
      reg["B"] = combo(operand) % 8;
    } else if (opcode === 3) {
      // "jnz",
      if (reg["A"] !== 0) {
        i = literal(operand);
        continue;
      }
    } else if (opcode === 4) {
      // "bxc", XOR
      reg["B"] = reg["B"] ^ reg["C"];
    } else if (opcode === 5) {
      // "out", XOR + out
      // console.log(operand, "-----", combo(operand));
      output.push(combo(operand) % 8);
    } else if (opcode === 6) {
      // "bdv"
      reg["B"] = Math.floor(reg["A"] / 2 ** combo(operand));
    } else if (opcode === 7) {
      // "cdv"
      reg["C"] = Math.floor(reg["A"] / 2 ** combo(operand));
    } else {
      throw new Error("Invalid opcode");
    }

    // console.log(reg);
    i += 2;
  }

  console.log("END", reg, output.join(","));
  console.log([output.join(",")]);

  return output.join(",");
}

function part2(inp) {
  let [regs, prog] = inp.trim().split("\n\n");

  let [A, B, C] = ints(regs);
  let reg = { A, B, C };

  let program = prog.split(" ")[1];
  prog = ints(prog.split(" ")[1]);

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

  // debugger;

  // let aa = 6_500_000_000; // 6_000_000_000
  // let aa = 117440;
  let aa = 1;
  while (true) {
    reg = { A: aa, B: 0, C: 0 };
    let output = [];

    if (aa % 1_000_000 === 0) {
      console.log("aa", aa / 1_000_000);
    }
    let i = 0;

    while (i < prog.length) {
      let [opcode, operand] = prog.slice(i, i + 2);
      // opcode == instructions
      // console.log(i, [opcode, operand], reg, output.join(","));


      if (opcode === 0) {
        // "adv", division
        reg["A"] = Math.floor(reg["A"] / 2 ** combo(operand));
      } else if (opcode === 1) {
        // "bxl", XOR
        reg["B"] = reg["B"] ^ literal(operand);
      } else if (opcode === 2) {
        // "bst", modulo 8
        reg["B"] = combo(operand) % 8;
      } else if (opcode === 3) {
        // "jnz",
        if (reg["A"] !== 0) {
          i = literal(operand);
          continue;
        }
      } else if (opcode === 4) {
        // "bxc", XOR
        reg["B"] = reg["B"] ^ reg["C"];
      } else if (opcode === 5) {
        // "out", XOR + out
        output.push(combo(operand) % 8);

        let o = output.join(",");
        if (!program.startsWith(o)) break;

        if (program === o) return aa;
      } else if (opcode === 6) {
        // "bdv"
        reg["B"] = Math.floor(reg["A"] / 2 ** combo(operand));
      } else if (opcode === 7) {
        // "cdv"
        reg["C"] = Math.floor(reg["A"] / 2 ** combo(operand));
      } else {
        throw new Error("Invalid opcode");
      }

      // console.log(reg);
      i += 2;
    }
    aa++;
  }

  // console.log("END", reg, output.join(","));
  // console.log([output.join(",")]);
  //
  // return output.join(",");
}

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
  reg["B"] = (reg["A"] % 8) ^ 2;
  reg["C"] = floor(reg["A"] / (2**reg["B"]) )

 /out.push(((reg["B"] ^ reg["C"]) ^ 7) % 8)

  reg["A"] = Math.floor(reg["A"] / 8)




*/
