import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/5

console.log(part2(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`));

runDay(2023, 5)
  // .part(1, part1)
  .part(2, part2);

function part1(inp) {
  let [seeds, ...paths] = inp.split('\n\n');

  seeds = seeds.split(': ')[1].split(' ').map((n) => +n);

  paths.forEach((path) => {
    let [name, ...ranges] = path.split('\n');

    let newSeeds = [...seeds];
    ranges.forEach((r) => {
      let [destination, source, len] = r.split(' ').map((n) => +n);

      seeds.forEach((s, i) => {
        if (s >= source && s <= source + len) {
          newSeeds[i] = destination + (s - source);
        }
      });
    });
    seeds = [...newSeeds];
  });

  return Math.min(...seeds);
}

function part2(inp) {
  return 123;
}
