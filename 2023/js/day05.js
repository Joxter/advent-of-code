import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/5

class Range {
  constructor(start, len) {
    this.start = +start;
    this.len = +len;
  }

  end() {
    return this.start + this.len;
  }
}

runDay(2023, 5)
  .part(1, part1)
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
        if (s >= source && s < source + len) {
          newSeeds[i] = destination + (s - source);
        }
      });
    });
    seeds = newSeeds;
  });

  return Math.min(...seeds);
}

function part2(inp) {
  let [seeds, ...paths] = inp.split('\n\n');

  seeds = seeds.split(': ')[1].split(' ').map((n) => +n);

  let seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push(new Range(seeds[i], seeds[i + 1]));
  }

  paths.forEach((path) => {
    let [name, ...ranges] = path.split('\n');

    let newSeedRanges = [...seedRanges];
    ranges.forEach((r) => {
      let [destination, source, len] = r.split(' ').map((n) => +n);
      let ruleRange = new Range(source, len);

      seedRanges.forEach((seedRange) => {
        let overlap = getOverlapOfRanges(ruleRange, seedRange);

        if (overlap.len > 0) {
          newSeedRanges.splice(newSeedRanges.indexOf(seedRange) - 1, 1);

          let leftOvers = removeRange(seedRange, overlap);
          if (leftOvers.length) {
            newSeedRanges.push(...leftOvers);
          }

          overlap.start += destination - source;
          if (overlap.start > 0 && overlap.len > 0) { // why do we need .start>0 here?
            newSeedRanges.push(overlap);
          }
        }
      });
    });
    seedRanges = newSeedRanges;
  });

  return Math.min(...seedRanges.map(r => r.start));
}

/**
 * @param {Range} range1
 * @param {Range} range2
 * */
function getOverlapOfRanges(range1, range2) {
  if (range1.start > range2.start) {
    return getOverlapOfRanges(range2, range1);
  }

  if (range1.end() <= range2.start) {
    return new Range(0, 0);
  }

  if (range1.end() < range2.end()) {
    return new Range(range2.start, range1.end() - range2.start);
  }

  return new Range(range2.start, range2.len);
}

/**
 * @param {Range} base
 * @param {Range} target
 * @returns {Range[]}
 * */
function removeRange(base, target) {
  let res = [];

  if (target.start > base.start) {
    res.push(new Range(base.start, target.start - base.start));
  }

  if (target.end() < base.end()) {
    res.push(new Range(target.end(), base.end() - target.end()));
  }

  return res;
}
