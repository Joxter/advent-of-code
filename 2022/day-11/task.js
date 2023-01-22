
// https://adventofcode.com/2022/day/11

console.log('test OK: ', part1(getTestData()) === 10605);
console.log('answer: ', part1(getInputData()));

console.log('test2 OK: ', part2(getTestData()) === 2713310158);
console.log('answer2: ', part2(getInputData()));

function part1(monkeys) {
  let inspectedTimes = Array(monkeys.length).fill(0);

  for (let round = 1; round <= 20; round++) {
    monkeys.forEach((monkey, i) => {
      monkey.items.forEach((item) => {
        inspectedTimes[i]++;
        let newWorry = Math.floor(monkey.operation(item) / 3);
        if (newWorry % monkey.test.divisible === 0) {
          monkeys[monkey.test.yes].items.push(newWorry);
        } else {
          monkeys[monkey.test.no].items.push(newWorry);
        }
      });
      monkey.items.length = 0;
    });
  }

  inspectedTimes.sort((a, b) => b - a);

  return inspectedTimes[0] * inspectedTimes[1];
}

function part2(monkeys) {
  let superMod = monkeys
    .map(monkey => monkey.test.divisible)
    .reduce((mul, it) => it * mul, 1);
  // thanks Reddit https://www.reddit.com/r/adventofcode/comments/zih7gf/2022_day_11_part_2_what_does_it_mean_find_another/
  // and Mariia (https://t.me/MarieSwandy) for the help with "you'll need to find another way to keep your worry levels manageable"

  let inspectedTimes = Array(monkeys.length).fill(0);

  for (let round = 1; round <= 10_000; round++) {
    monkeys.forEach((monkey, i) => {
      monkey.items.forEach((item) => {
        inspectedTimes[i]++;

        let newWorry = monkey.operation(item) % superMod;

        if (newWorry % monkey.test.divisible === 0) {
          monkeys[monkey.test.yes].items.push(newWorry);
        } else {
          monkeys[monkey.test.no].items.push(newWorry);
        }
      });
      monkey.items.length = 0;
    });
  }

  inspectedTimes.sort((a, b) => b - a);

  return inspectedTimes[0] * inspectedTimes[1];
}

function getTestData() {
  return [
    {
      items: [79, 98],
      operation: (old) => old * 19,
      test: {divisible: 23, yes: 2, no: 3},
    },
    {
      items: [54, 65, 75, 74],
      operation: (old) => old + 6,
      test: {divisible: 19, yes: 2, no: 0},
    },
    {
      items: [79, 60, 97],
      operation: (old) => old * old,
      test: {divisible: 13, yes: 1, no: 3},
    },
    {
      items: [74],
      operation: (old) => old + 3,
      test: {divisible: 17, yes: 0, no: 1},
    },
  ];
}

function getInputData() {
  return [
    { // 0
      items: [54, 89, 94],
      operation: (old) => old * 7,
      test: {divisible: 17, yes: 5, no: 3},
    },
    { // 1
      items: [66, 71],
      operation: (old) => old + 4,
      test: {divisible: 3, yes: 0, no: 3},
    },
    { // 2
      items: [76, 55, 80, 55, 55, 96, 78],
      operation: (old) => old + 2,
      test: {divisible: 5, yes: 7, no: 4},
    },
    { // 3
      items: [93, 69, 76, 66, 89, 54, 59, 94],
      operation: (old) => old + 7,
      test: {divisible: 7, yes: 5, no: 2},
    },
    { // 4
      items: [80, 54, 58, 75, 99],
      operation: (old) => old * 17,
      test: {divisible: 11, yes: 1, no: 6},
    },
    { // 5
      items: [69, 70, 85, 83],
      operation: (old) => old + 8,
      test: {divisible: 19, yes: 2, no: 7},
    },
    { // 6
      items: [89],
      operation: (old) => old + 6,
      test: {divisible: 2, yes: 0, no: 1},
    },
    { // 7
      items: [62, 80, 58, 57, 93, 56],
      operation: (old) => old * old,
      test: {divisible: 13, yes: 6, no: 4},
    },
  ];
}