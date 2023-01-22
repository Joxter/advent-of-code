
// https://adventofcode.com/2022/day/5

let stepsStr = `move 3 from 2 to 1
move 8 from 6 to 4
move 4 from 8 to 2
move 3 from 1 to 9
move 1 from 2 to 4
move 3 from 7 to 5
move 3 from 9 to 2
move 3 from 3 to 5
move 1 from 5 to 1
move 5 from 1 to 8
move 2 from 1 to 8
move 3 from 7 to 3
move 1 from 8 to 9
move 6 from 9 to 8
move 3 from 8 to 7
move 7 from 8 to 9
move 2 from 5 to 9
move 2 from 2 to 9
move 3 from 3 to 7
move 2 from 8 to 3
move 7 from 4 to 8
move 3 from 4 to 1
move 4 from 8 to 6
move 4 from 6 to 1
move 8 from 1 to 2
move 1 from 1 to 4
move 3 from 5 to 1
move 8 from 9 to 8
move 4 from 3 to 1
move 5 from 5 to 3
move 2 from 7 to 1
move 1 from 7 to 4
move 1 from 7 to 2
move 3 from 3 to 5
move 3 from 9 to 1
move 9 from 8 to 1
move 2 from 9 to 7
move 1 from 8 to 5
move 4 from 5 to 3
move 1 from 3 to 4
move 1 from 9 to 6
move 1 from 6 to 9
move 7 from 4 to 9
move 1 from 7 to 3
move 1 from 8 to 2
move 8 from 2 to 1
move 4 from 3 to 5
move 2 from 9 to 6
move 2 from 6 to 2
move 2 from 4 to 9
move 8 from 9 to 2
move 3 from 7 to 9
move 1 from 3 to 5
move 2 from 3 to 8
move 9 from 2 to 1
move 1 from 8 to 7
move 4 from 2 to 9
move 4 from 5 to 6
move 1 from 8 to 9
move 27 from 1 to 2
move 1 from 6 to 4
move 3 from 6 to 4
move 7 from 9 to 8
move 4 from 4 to 1
move 9 from 2 to 6
move 2 from 1 to 9
move 6 from 1 to 3
move 1 from 5 to 3
move 3 from 3 to 5
move 3 from 5 to 3
move 3 from 3 to 1
move 4 from 6 to 7
move 3 from 9 to 2
move 1 from 6 to 4
move 4 from 3 to 5
move 3 from 6 to 5
move 1 from 6 to 2
move 15 from 2 to 3
move 5 from 5 to 9
move 13 from 3 to 9
move 2 from 5 to 7
move 1 from 4 to 2
move 3 from 3 to 7
move 11 from 2 to 7
move 7 from 9 to 5
move 3 from 5 to 7
move 6 from 8 to 9
move 4 from 1 to 2
move 6 from 1 to 6
move 3 from 5 to 1
move 1 from 8 to 2
move 4 from 2 to 9
move 1 from 5 to 7
move 6 from 7 to 6
move 18 from 7 to 5
move 1 from 7 to 1
move 8 from 9 to 5
move 1 from 2 to 6
move 15 from 5 to 6
move 6 from 5 to 3
move 4 from 3 to 6
move 26 from 6 to 5
move 2 from 1 to 7
move 4 from 5 to 9
move 8 from 5 to 7
move 3 from 7 to 9
move 14 from 9 to 8
move 7 from 5 to 2
move 4 from 2 to 1
move 5 from 1 to 9
move 12 from 5 to 3
move 5 from 8 to 5
move 14 from 3 to 2
move 1 from 5 to 2
move 10 from 2 to 6
move 7 from 9 to 6
move 6 from 8 to 6
move 1 from 2 to 7
move 2 from 9 to 7
move 2 from 8 to 6
move 6 from 2 to 7
move 1 from 1 to 8
move 15 from 6 to 2
move 1 from 6 to 9
move 1 from 5 to 9
move 1 from 9 to 6
move 2 from 2 to 4
move 3 from 9 to 5
move 5 from 5 to 3
move 3 from 3 to 6
move 6 from 2 to 7
move 1 from 5 to 9
move 8 from 6 to 9
move 2 from 6 to 7
move 3 from 2 to 4
move 9 from 6 to 7
move 17 from 7 to 5
move 1 from 8 to 4
move 7 from 9 to 3
move 12 from 5 to 8
move 3 from 5 to 2
move 4 from 7 to 8
move 2 from 5 to 7
move 1 from 7 to 9
move 8 from 3 to 7
move 17 from 7 to 5
move 3 from 2 to 5
move 1 from 3 to 6
move 10 from 5 to 4
move 5 from 2 to 7
move 1 from 4 to 2
move 3 from 9 to 8
move 7 from 7 to 2
move 5 from 5 to 1
move 14 from 4 to 9
move 3 from 9 to 8
move 1 from 6 to 9
move 2 from 1 to 4
move 2 from 8 to 5
move 16 from 8 to 6
move 1 from 6 to 2
move 11 from 9 to 2
move 2 from 7 to 5
move 1 from 1 to 6
move 11 from 2 to 9
move 4 from 2 to 8
move 9 from 5 to 3
move 1 from 4 to 2
move 2 from 1 to 8
move 1 from 2 to 9
move 2 from 4 to 3
move 8 from 6 to 9
move 16 from 9 to 3
move 16 from 3 to 2
move 17 from 2 to 6
move 1 from 9 to 3
move 1 from 2 to 5
move 1 from 9 to 4
move 3 from 2 to 8
move 1 from 9 to 1
move 1 from 9 to 6
move 7 from 3 to 1
move 5 from 3 to 5
move 3 from 8 to 3
move 2 from 3 to 4
move 6 from 8 to 4
move 7 from 6 to 4
move 3 from 6 to 7
move 3 from 8 to 9
move 3 from 5 to 2
move 3 from 1 to 3
move 1 from 4 to 8
move 3 from 5 to 1
move 13 from 4 to 7
move 14 from 6 to 7
move 6 from 1 to 9
move 3 from 9 to 6
move 1 from 8 to 7
move 1 from 8 to 7
move 20 from 7 to 3
move 1 from 8 to 9
move 1 from 1 to 9
move 1 from 1 to 5
move 1 from 4 to 6
move 14 from 3 to 9
move 1 from 2 to 6
move 3 from 7 to 6
move 6 from 3 to 2
move 1 from 3 to 8
move 2 from 7 to 3
move 7 from 6 to 3
move 12 from 3 to 1
move 1 from 8 to 2
move 1 from 4 to 9
move 1 from 5 to 6
move 1 from 6 to 4
move 1 from 4 to 2
move 2 from 2 to 3
move 16 from 9 to 7
move 3 from 6 to 7
move 6 from 9 to 4
move 4 from 4 to 7
move 6 from 1 to 8
move 2 from 3 to 6
move 3 from 1 to 9
move 3 from 2 to 3
move 3 from 3 to 8
move 5 from 2 to 8
move 2 from 7 to 8
move 3 from 1 to 5
move 1 from 4 to 3
move 2 from 9 to 8
move 1 from 6 to 8
move 2 from 9 to 1
move 15 from 7 to 1
move 1 from 6 to 5
move 10 from 1 to 5
move 1 from 4 to 1
move 2 from 1 to 6
move 9 from 7 to 8
move 27 from 8 to 3
move 1 from 6 to 1
move 1 from 8 to 5
move 5 from 5 to 6
move 12 from 3 to 1
move 3 from 7 to 1
move 7 from 5 to 1
move 1 from 6 to 4
move 3 from 6 to 9
move 1 from 4 to 2
move 2 from 6 to 5
move 1 from 7 to 6
move 1 from 9 to 2
move 2 from 5 to 6
move 2 from 6 to 5
move 3 from 1 to 3
move 19 from 3 to 1
move 2 from 2 to 9
move 42 from 1 to 7
move 4 from 9 to 7
move 1 from 6 to 8
move 1 from 8 to 5
move 2 from 1 to 9
move 3 from 5 to 7
move 27 from 7 to 4
move 1 from 1 to 4
move 3 from 9 to 2
move 18 from 4 to 9
move 2 from 5 to 3
move 1 from 7 to 1
move 2 from 3 to 4
move 8 from 7 to 5
move 15 from 9 to 3
move 1 from 9 to 7
move 3 from 7 to 2
move 2 from 7 to 2
move 2 from 5 to 3
move 1 from 1 to 5
move 1 from 9 to 1
move 1 from 3 to 1
move 1 from 4 to 3
move 8 from 7 to 3
move 8 from 2 to 4
move 1 from 9 to 6
move 23 from 3 to 9
move 1 from 9 to 6
move 2 from 6 to 8
move 1 from 8 to 6
move 1 from 5 to 3
move 7 from 4 to 8
move 7 from 5 to 7
move 2 from 8 to 3
move 1 from 1 to 8
move 3 from 7 to 4
move 5 from 4 to 3
move 1 from 1 to 8
move 3 from 3 to 1
move 8 from 9 to 7
move 3 from 8 to 4
move 1 from 6 to 2
move 5 from 8 to 7
move 6 from 3 to 1
move 1 from 2 to 9
move 7 from 7 to 9
move 4 from 1 to 9
move 2 from 4 to 2
move 1 from 4 to 9
move 1 from 1 to 6
move 8 from 4 to 8
move 4 from 1 to 5
move 3 from 5 to 2
move 2 from 2 to 5
move 2 from 5 to 6
move 1 from 3 to 7
move 2 from 6 to 4
move 1 from 5 to 7
move 1 from 6 to 9
move 1 from 4 to 1
move 6 from 9 to 2
move 8 from 9 to 7
move 4 from 7 to 3
move 4 from 8 to 3
move 3 from 8 to 3
move 8 from 3 to 5
move 1 from 1 to 7
move 11 from 9 to 7
move 5 from 2 to 7
move 1 from 8 to 1
move 3 from 2 to 3
move 1 from 1 to 4
move 1 from 2 to 5
move 20 from 7 to 8
move 7 from 7 to 9
move 4 from 4 to 7
move 3 from 9 to 4
move 5 from 7 to 4
move 7 from 4 to 7
move 4 from 9 to 2
move 1 from 4 to 3
move 4 from 3 to 5
move 2 from 5 to 8
move 4 from 5 to 2
move 5 from 2 to 6
move 2 from 6 to 3
move 22 from 8 to 5
move 13 from 7 to 9
move 11 from 9 to 3
move 2 from 6 to 8
move 7 from 3 to 1
move 18 from 5 to 2
move 1 from 6 to 4
move 1 from 4 to 9
move 2 from 8 to 5
move 2 from 9 to 1
move 9 from 3 to 1
move 4 from 5 to 6
move 2 from 6 to 7
move 3 from 9 to 5
move 10 from 5 to 8
move 6 from 8 to 7
move 3 from 8 to 1
move 6 from 2 to 3
move 1 from 9 to 6
move 5 from 3 to 4
move 4 from 1 to 4
move 17 from 1 to 5
move 12 from 2 to 7
move 1 from 3 to 6
move 16 from 5 to 8
move 3 from 5 to 6
move 9 from 8 to 3
move 8 from 8 to 4
move 7 from 4 to 1
move 5 from 1 to 4
move 4 from 3 to 7
move 14 from 7 to 3
move 6 from 4 to 8
move 9 from 7 to 4
move 5 from 6 to 1
move 1 from 7 to 1
move 1 from 6 to 7
move 16 from 4 to 5
move 1 from 4 to 2
move 1 from 7 to 5
move 2 from 1 to 7
move 2 from 7 to 4
move 4 from 1 to 6
move 13 from 5 to 6
move 5 from 6 to 3
move 22 from 3 to 2
move 1 from 4 to 7
move 4 from 5 to 4
move 1 from 7 to 6
move 5 from 8 to 5
move 2 from 3 to 1
move 13 from 6 to 1
move 6 from 1 to 4
move 1 from 8 to 1
move 6 from 1 to 4
move 1 from 5 to 4
move 7 from 4 to 7
move 3 from 1 to 5
move 2 from 5 to 7
move 5 from 5 to 1
move 8 from 7 to 4
move 1 from 6 to 4
move 1 from 7 to 4
move 9 from 2 to 7
move 8 from 7 to 6
move 5 from 6 to 4
move 1 from 7 to 4
move 2 from 4 to 9
move 2 from 6 to 1
move 8 from 2 to 6
move 9 from 1 to 8
move 9 from 6 to 2
move 1 from 1 to 8
move 6 from 8 to 4
move 2 from 9 to 7
move 2 from 7 to 9
move 15 from 2 to 8
move 18 from 4 to 2
move 14 from 4 to 5
move 10 from 2 to 4
move 9 from 2 to 6
move 1 from 9 to 3
move 1 from 3 to 1
move 6 from 5 to 8
move 3 from 4 to 9
move 2 from 2 to 1
move 1 from 1 to 6
move 3 from 9 to 7
move 22 from 8 to 6
move 1 from 8 to 9
move 2 from 1 to 5
move 5 from 5 to 4
move 2 from 5 to 8
move 2 from 8 to 7
move 1 from 9 to 7
move 1 from 5 to 8
move 1 from 9 to 8
move 15 from 6 to 4
move 2 from 5 to 2
move 11 from 4 to 6
move 5 from 4 to 1
move 5 from 4 to 2
move 2 from 1 to 5
move 6 from 2 to 8
move 11 from 6 to 3
move 12 from 6 to 8
move 1 from 3 to 9
move 3 from 3 to 2
move 6 from 4 to 2
move 2 from 5 to 8
move 5 from 7 to 2
move 11 from 8 to 4
move 1 from 7 to 4
move 1 from 9 to 6
move 7 from 2 to 1
move 3 from 6 to 5
move 2 from 5 to 3
move 1 from 5 to 9
move 3 from 4 to 9
move 4 from 9 to 1
move 4 from 3 to 6
move 3 from 4 to 8
move 3 from 8 to 9
move 2 from 8 to 2
move 9 from 8 to 7
move 2 from 3 to 1
move 2 from 3 to 2
move 1 from 3 to 6
move 2 from 9 to 1
move 8 from 7 to 5
move 7 from 2 to 7
move 2 from 8 to 9
move 4 from 6 to 5
move 13 from 1 to 5
move 4 from 1 to 8
move 3 from 9 to 3
move 12 from 5 to 9
move 3 from 8 to 9
move 1 from 8 to 4
move 3 from 2 to 7
move 3 from 3 to 7
move 1 from 9 to 2
move 4 from 6 to 4
move 6 from 5 to 6
move 2 from 7 to 3
move 2 from 2 to 1
move 5 from 6 to 5
move 1 from 1 to 7
move 9 from 5 to 4
move 10 from 9 to 6
move 1 from 2 to 6
move 12 from 7 to 6
move 1 from 7 to 4
move 23 from 6 to 1
move 10 from 4 to 3
move 16 from 1 to 5
move 5 from 1 to 2
move 6 from 3 to 7
move 5 from 4 to 8`;

let steps = stepsStr
  .split('\n')
  .map(line => {
    return line.split(/\D+/).filter(it => !!it).map((it) => +it);
  });

console.log(part1());
console.log(part2());

function part1() {
  let state = [
    [],
    ['H', 'L', 'R', 'F', 'B', 'C', 'J', 'M'],
    ['D', 'C', 'Z'],
    ['W', 'G', 'N', 'C', 'F', 'J', 'H'],
    ['B', 'S', 'T', 'M', 'D', 'J', 'P'],
    ['J', 'R', 'D', 'C', 'N'],
    ['Z', 'G', 'J', 'P', 'Q', 'D', 'L', 'W'],
    ['H', 'R', 'F', 'T', 'Z', 'P'],
    ['G', 'M', 'V', 'L'],
    ['J', 'R', 'Q', 'F', 'P', 'G', 'B', 'C'],
  ];

  steps.forEach(([crates, from, to]) => {
    let taken = state[from].slice(0, crates).reverse();
    state[from] = state[from].slice(crates);
    state[to] = [...taken, ...state[to]];
  });

  return state.map((row) => row[0]).join('');
}

function part2() {
  let state = [
    [],
    ['H', 'L', 'R', 'F', 'B', 'C', 'J', 'M'],
    ['D', 'C', 'Z'],
    ['W', 'G', 'N', 'C', 'F', 'J', 'H'],
    ['B', 'S', 'T', 'M', 'D', 'J', 'P'],
    ['J', 'R', 'D', 'C', 'N'],
    ['Z', 'G', 'J', 'P', 'Q', 'D', 'L', 'W'],
    ['H', 'R', 'F', 'T', 'Z', 'P'],
    ['G', 'M', 'V', 'L'],
    ['J', 'R', 'Q', 'F', 'P', 'G', 'B', 'C'],
  ];

  steps.forEach(([crates, from, to]) => {
    let taken = state[from].slice(0, crates);
    state[from] = state[from].slice(crates);
    state[to] = [...taken, ...state[to]];
  });

  return state.map((row) => row[0]).join('');
}
