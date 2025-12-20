import { runDay, uniq } from "../../utils.js";

// https://adventofcode.com/2015/day/19

runDay(2015, 19, 1)
  //
  .part(1, part1)
  .part(2, part2)
  .part(2, part2FromReddit, "part2FromReddit")
  .part(2, part2Clever, "part2Clever")
  .end();

function part1(inp) {
  let [atoms_, word] = inp.split("\n\n");

  let atoms = {};
  atoms_.split("\n").map((l) => {
    let [from, to] = l.split(" => ");
    if (!atoms[from]) atoms[from] = [];
    atoms[from].push(to);
  });

  let combinations = new Set();

  for (let i = 0; i < word.length; i++) {
    if (atoms[word.slice(i, i + 1)]) {
      let before = word.slice(0, i);
      let after = word.slice(i + 1);

      atoms[word.slice(i, i + 1)].forEach((w) => {
        combinations.add(before + w + after);
      });
    } else if (atoms[word.slice(i, i + 2)]) {
      let before = word.slice(0, i);
      let after = word.slice(i + 2);

      atoms[word.slice(i, i + 2)].forEach((w) => {
        combinations.add(before + w + after);
      });
    }
  }

  return combinations.size;
}

function part2(inp) {
  function sub(base) {
    let combinations = new Set();

    Object.entries(atoms).forEach(([from, to]) => {
      if (!base.includes(from)) return;

      let offset = 0;
      while (base.indexOf(from, offset) > -1) {
        offset = base.indexOf(from, offset);

        let before = base.slice(0, offset);
        let after = base.slice(offset + from.length);

        combinations.add(before + to + after);
        offset++;
      }
    });

    return [...combinations];
  }

  let [atoms_, target] = inp.split("\n\n");

  let atoms = {};

  atoms_.split("\n").map((l) => {
    let [to, from] = l.split(" => ");
    atoms[from] = to;
  });

  let ws = [target];

  for (let i = 1; i <= 1000; i++) {
    let newWs = [];
    ws.forEach((w) => newWs.push(...sub(w)));

    ws = uniq(newWs);
    ws.sort((a, b) => a.length - b.length);
    ws = ws.slice(0, 100);
    if (ws.includes("e")) {
      return i;
    }
  }
}

function part2FromReddit(inp) {
  let [atoms_, target] = inp.split("\n\n");

  let atoms = new Map();
  atoms_.split("\n").map((l) => {
    let [to, from] = l.split(" => ");
    atoms.set(from, to);
  });

  let result = 0;

  while (target !== "e") {
    for (const [element, replacement] of atoms.entries()) {
      if (target.includes(element)) {
        target = target.replace(element, replacement);
        result = result + 1;
      }
    }
  }

  return result;
}

// from top comment:
/*

No leaderboard for me today, because I decided to sleep on Part 2, before solving it by hand. Since there's really no code to speak of, I'll talk about the solution.
First insight

There are only two types of productions:

    e => XX and X => XX (X is not Rn, Y, or Ar)

    X => X Rn X Ar | X Rn X Y X Ar | X Rn X Y X Y X Ar

Second insight

You can think of Rn Y Ar as the characters ( , ):

X => X(X) | X(X,X) | X(X,X,X)

Whenever there are two adjacent "elements" in your "molecule", you apply the first production. This reduces your molecule length by 1 each time.

And whenever you have T(T) T(T,T) or T(T,T,T) (T is a literal token such as "Mg", i.e. not a nonterminal like "TiTiCaCa"), you apply the second production. This reduces your molecule length by 3, 5, or 7.
Third insight

Repeatedly applying X => XX until you arrive at a single token takes count(tokens) - 1 steps:

ABCDE => XCDE => XDE => XE => X
count("ABCDE") = 5
5 - 1 = 4 steps

Applying X => X(X) is similar to X => XX, except you get the () for free. This can be expressed as count(tokens) - count("(" or ")") - 1.

A(B(C(D(E)))) => A(B(C(X))) => A(B(X)) => A(X) => X
count("A(B(C(D(E))))") = 13
count("(((())))") = 8
13 - 8 - 1 = 4 steps

You can generalize to X => X(X,X) by noting that each , reduces the length by two (,X). The new formula is count(tokens) - count("(" or ")") - 2*count(",") - 1.

A(B(C,D),E(F,G)) => A(B(C,D),X) => A(X,X) => X
count("A(B(C,D),E(F,G))") = 16
count("(()())") = 6
count(",,,") = 3
16 - 6 - 2*3 - 1 = 3 steps

This final formula works for all of the production types (for X => XX, the (,) counts are zero by definition.)
The solution

My input file had:

295 elements in total
 68 were Rn and Ar (the `(` and `)`)
  7 were Y (the `,`)

Plugging in the numbers:

295 - 68 - 2*7 - 1 = 212

Like I said, no leaderboard position today, but this was a heck of a lot more interesting than writing yet another brute force script.
*/

function part2Clever(inp) {
  // Claude generated from the description below

  let [_, target] = inp.split("\n\n");

  // Count total elements (tokens)
  // Elements are either single uppercase or uppercase followed by lowercase
  let elements = target.match(/[A-Z][a-z]?/g);
  let totalElements = elements.length;

  // Count Rn and Ar (parentheses) and Y (commas)
  let rnCount = target.match(/Rn/g).length;
  let arCount = target.match(/Ar/g).length;
  let yCount = target.match(/Y/g).length;

  let parentheses = rnCount + arCount;

  let steps = totalElements - parentheses - 2 * yCount - 1;

  // console.log("Analysis:");
  // console.log("=========");
  // console.log(`Total elements: ${totalElements}`);
  // console.log(
  //   `Rn + Ar (parentheses): ${parentheses} (${rnCount} Rn, ${arCount} Ar)`,
  // );
  // console.log(`Y (commas): ${yCount}`);
  // console.log();
  // console.log(
  //   `Formula: ${totalElements} - ${parentheses} - 2×${yCount} - 1 = ${steps}`,
  // );

  return steps;
}
