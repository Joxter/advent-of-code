import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/15

runDay(2023, 15)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let hashes = inp
    .split(',')
    .map((part) => {
      let h = 0;

      part.split('').forEach((ch) => {
        h += ch.charCodeAt(0);
        h *= 17;
        h = h % 256;
      });
      return h;
    });

  return sum(hashes);
}

function part2(inp) {
  let boxes = {};

  inp
    .split(',')
    .map((part) => {
      let label = part.split(/[=-]/)[0];
      let remove = part.includes('-');

      let h = 0;
      label.split('').forEach((ch) => {
        h += ch.charCodeAt(0);
        h *= 17;
        h = h % 256;
      });

      if (!boxes[h]) {
        boxes[h] = [];
      }

      let ind = boxes[h].findIndex(it => it.startsWith(label + '='));
      if (remove) {
        if (ind > -1) {
          boxes[h].splice(ind, 1);
        }
      } else {
        if (ind > -1) {
          boxes[h][ind] = part;
        } else {
          boxes[h].push(part);
        }
      }

      return h;
    });

  let powers = Object.entries(boxes).map(([boxNumber, parts]) => {
    return sum(parts.map((part, slot) => {
      let n = +part.split(/[=-]/)[1];

      return (+boxNumber + 1) * (slot + 1) * n;
    }));
  });

  return sum(powers);
}