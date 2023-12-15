import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/15

console.log(part2(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`));

runDay(2023, 15)
  // .part(1, part1)
  .part(2, part2) // low 244845
  .end();

function part1(inp) {
  let hashs = inp
    .split(',')
    .map((part) => {
      let h = 0;

      part.split('').forEach((ch) => {
        h += ch.charCodeAt(0);
        h *= 17;
        h = h % 256;
      });
      // console.log(part, h);
      return h;
    });

  return sum(hashs);
}

function part2(inp) {
  let boxes = {};

  inp
    .split(',')
    .map((part) => {
      let [str, n] = part.split(/[=-]/);
      let remove = part.includes('-');

      let h = 0;
      str.split('').forEach((ch) => {
        h += ch.charCodeAt(0);
        h *= 17;
        h = h % 256;
      });
      // console.log(part, { remove });

      if (!boxes[h]) {
        boxes[h] = [];
      }
      if (remove) {
        boxes[h] = boxes[h].filter(it => !it.startsWith(str));
      } else {
        if (boxes[h].find(it => it.startsWith(str))) {
          boxes[h] = boxes[h].map(it => {
            if (it.startsWith(str)) {
              return part;
            } else {
              return it;
            }
          });
        } else {
          boxes[h].push(part);
        }
      }

      // console.log(boxes);

      return h;
    });

  let ccc = Object.entries(boxes).map(([key, parts]) => {
    return sum(parts.map((part, i) => {
      let [str, n] = part.split(/[=-]/);
      n = +n;

      // console.log(part, [(+key + 1) , (i + 1) , n]);

      return (+key + 1) * (i + 1) * n;
    }));
  });

  return sum(ccc);
}
