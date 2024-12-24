import { runDay } from "../../utils.js";

// https://adventofcode.com/2024/day/24

// console.log(
//   part2(`x00: 1
// x01: 0
// x02: 1
// x03: 1
// x04: 0
// y00: 1
// y01: 1
// y02: 1
// y03: 1
// y04: 1
//
// ntg XOR fgs -> mjb
// y02 OR x01 -> tnw
// kwq OR kpj -> z05
// x00 OR x03 -> fst
// tgd XOR rvg -> z01
// vdt OR tnw -> bfw
// bfw AND frj -> z10
// ffh OR nrd -> bqk
// y00 AND y03 -> djm
// y03 OR y00 -> psh
// bqk OR frj -> z08
// tnw OR fst -> frj
// gnj AND tgd -> z11
// bfw XOR mjb -> z00
// x03 OR x00 -> vdt
// gnj AND wpb -> z02
// x04 AND y00 -> kjc
// djm OR pbm -> qhw
// nrd AND vdt -> hwm
// kjc AND fst -> rvg
// y04 OR y02 -> fgs
// y01 AND x02 -> pbm
// ntg OR kjc -> kwq
// psh XOR fgs -> tgd
// qhw XOR tgd -> z09
// pbm OR djm -> kpj
// x03 XOR y03 -> ffh
// x00 XOR y04 -> ntg
// bfw OR bqk -> z06
// nrd XOR fgs -> wpb
// frj XOR qhw -> z04
// bqk OR frj -> z07
// y03 OR x01 -> nrd
// hwm AND bqk -> z03
// tgd XOR rvg -> z12
// tnw OR pbm -> gnj`),
// );

runDay(2024, 24)
  //
  // .part(1, part1)
  .part(2, part2)
  .end(false);

function part1(inp) {
  let [reg, commands] = inp.trim().split("\n\n");
  reg = Object.fromEntries(
    reg.split("\n").map((l) => {
      let [n, v] = l.split(": ");
      return [n, +v];
    }),
  );

  let gates = {};

  commands.split("\n").forEach((com) => {
    let [left, save] = com.split(" -> ");
    gates[save] = left.split(" ");
  });

  function comp([a, act, b]) {
    if (a[0] === "x" || a[0] === "y" || b[0] === "x" || b[0] === "y") {
      if (act === "XOR") {
        return reg[a] ^ reg[b];
      } else if (act === "OR") {
        return reg[a] | reg[b];
      } else if (act === "AND") {
        return reg[a] & reg[b];
      }
    }

    if (act === "XOR") {
      return comp(gates[a]) ^ comp(gates[b]);
    } else if (act === "OR") {
      return comp(gates[a]) | comp(gates[b]);
    } else if (act === "AND") {
      return comp(gates[a]) & comp(gates[b]);
    }
  }

  let rs = [];

  Object.entries(gates).forEach(([r, val]) => {
    if (r[0] === "z") {
      rs[+r.slice(1)] = comp(val);
    }
  });

  return +("0b" + rs.toReversed().join(""));
}

function part2(inp) {
  let [reg, commands] = inp.trim().split("\n\n");
  reg = Object.fromEntries(
    reg.split("\n").map((l) => {
      let [n, v] = l.split(": ");
      return [n, +v];
    }),
  );

  let gates = {};

  let gg = [];

  let cnt = 0;

  commands.split("\n").forEach((com) => {
    let [left, save] = com.split(" -> ");
    gates[save] = left.split(" ");
    // A1 -> AND1
    // A2 -> AND1
    // AND1 -> R1

    let [a, act, b] = left.split(" ");

    if (!(/x|y\d\d/.test(a) && /x|y\d\d/.test(b))) {
      gg.push(`${a} -> ${act}${cnt}`);
      gg.push(`${b} -> ${act}${cnt}`);
      gg.push(`${act}${cnt} -> ${save}`);
      cnt++;
    }

  });
  // console.log(gg.join("\n"));

  /*  for (let i = 0; i <= 44; i++) {
      console.log(i);
      let xor = null;
      let and = null;

      let x = "x" + String(i).padStart(2, "0");
      let y = "y" + String(i).padStart(2, "0");

      Object.entries(gates).filter(([name, [a, act, b]]) => {
        if ((a === x && b === y) || (a === y && b === x)) {
          if (act === "XOR") {
            if (!xor) {
              xor = name;
            } else {
              console.log("double XOR");
            }
          }
          if (act === "AND") {
            if (!and) {
              and = name;
            } else {
              console.log("double AND");
            }
          }
        }
      });
      if (!xor) {
        console.log("no XOR");
      }
      if (!and) {
        console.log("no AND");
      }
      console.log({ xor, and });
    }*/


  function comp([a, act, b]) {
    if (a[0] === "x" || a[0] === "y" || b[0] === "x" || b[0] === "y") {
      if (act === "XOR") {
        return reg[a] ^ reg[b];
      } else if (act === "OR") {
        return reg[a] | reg[b];
      } else if (act === "AND") {
        return reg[a] & reg[b];
      }
    }

    if (act === "XOR") {
      return comp(gates[a]) ^ comp(gates[b]);
    } else if (act === "OR") {
      return comp(gates[a]) | comp(gates[b]);
    } else if (act === "AND") {
      return comp(gates[a]) & comp(gates[b]);
    }
  }

  let rs = [];

  Object.entries(gates).forEach(([r, val]) => {
    if (r[0] === "z") {
      rs[+r.slice(1)] = comp(val);
    }
  });

  return +("0b" + rs.toReversed().join(""));
}

/*

x23,y23


x28,y28
x32,y32
x40,y40




near by x7




*/
