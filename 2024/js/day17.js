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

  /*
35184372104207n 2,4,1,2,7 { A: 1073741824n, B: 4294967303n, C: 4294967297n }
{ max: 6 }
35184372104207n 2,4,1,2,7,5 { A: 134217728n, B: 268435461n, C: 268435456n }
{ max: 7 }
35184373480463n 2,4,1,2,7,5,0 { A: 16777216n, B: 1048576n, C: 1048576n }
{ max: 8 }
*/
  debugger;

  // let aa = 10_000_000_000; // 28_704_000_000
  // let aa = 14190000000n; //  21_350_000_000n

  // let aa = 281_474_976_710_656n; //      62_300_000_000n +8
  // let aa = 281488600000000n;
  let aa = 8n ** 17n;
  // let aa = 1n;
  // let aa = 1n;
  //                 281_474_976_710_656
  // A = 117440;

  let max = 0;
  while (true) {
    reg = { A: aa, B: 0, C: 0 };
    let output = [];

    if (aa % 100_000_000n === 0n) {
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

      if (max < output.length) {
        max = output.length;
        console.log({ max });
        console.log(aa, output.join(","), reg);
      }

      if (output.length > 10) {
        console.log("------", aa, output.join(","), reg);
      }
    }
    // console.log(aa, output, reg);

    /*


{ max: 1 }
7n 2 { A: 0n, B: 2n, C: 0n } (3)
{ max: 2 }
15n 2,4 { A: 0n, B: 4n, C: 0n } (4)
{ max: 3 }
1039n 2,4,1 { A: 2n, B: 1n, C: 4n }  (10)
{ max: 4 }
8177n 2,4,1,2 { A: 1n, B: 2n, C: 0n } (13)

{ max: 6 }
15375n 2,4,1,2,7,5 { A: 0n, B: 5n, C: 0n } (13.9)
{ max: 7 }
1391631n 2,4,1,2,7,5,0 { A: 0n, B: 0n, C: 0n } (20.5)
{ max: 8 }
13974543n 2,4,1,2,7,5,0,3 { A: 0n, B: 3n, C: 0n } (23.7)
{ max: 9 }
24132623n 2,4,1,2,7,5,0,3,4 { A: 0n, B: 4n, C: 0n }
^C



{ max: 6 }
2251799813700623n 2,4,1,2,7,5 { A: 8589934592n, B: 17179869189n, C: 17179869184n }
{ max: 7 }
2251799815076879n 2,4,1,2,7,5,0 { A: 1073741824n, B: 67108864n, C: 67108864n }
{ max: 8 }
2251799827659791n 2,4,1,2,7,5,0,3 { A: 134217728n, B: 67108867n, C: 67108864n }
{ max: 9 }
2251799837817871n 2,4,1,2,7,5,0,3,4 { A: 16777216n, B: 16777220n, C: 16777216n }


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
    aa += 1n;
  }

  // console.log("END", reg, output.join(","));
  // console.log([output.join(",")]);
  //
  // return output.join(",");
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
