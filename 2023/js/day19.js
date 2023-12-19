import { prod, runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/19

runDay(2023, 19)
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  let [_rules, parts] = inp.split('\n\n');

  let rules = {};
  _rules
    .split('\n')
    .forEach((line) => {
      let [name, rest] = line.split('{');
      rest = rest.slice(0, -1);

      let r = rest.split(',').map((l) => {
        if (l[1] === '<' || l[1] === '>') {
          let [r, target] = l.split(':');
          return [l[0], l[1], +r.slice(2), target];
        } else {
          return l;
        }
      });
      rules[name] = r;
    });

  let accepted = parts
    .split('\n')
    .map((line) => {
      line = line.slice(1, -1);
      let res = {};
      line.split(',')
          .forEach((l) => {
            let [name, value] = l.split('=');
            res[name] = +value;
          });

      return res;
    })
    .filter((part) => {

      let current = 'in';
      let limit = 100;

      while (current !== 'R' && current !== 'A') {
        if (!limit--) return false;

        // console.log({current});
        let rule = rules[current];
        // console.log(rule);

        for (const cond of rule) {
          if (Array.isArray(cond)) {
            let [p, sign, val, target] = cond;

            if (sign === '<') {
              if (part[p] < val) {
                current = target;
                break;
              }
            } else {
              if (part[p] > val) {
                current = target;
                break;
              }
            }
          } else {
            current = cond;
          }
        }
      }
      return current === 'A';
    })
    .map((part) => {
      return part['x'] + part['m'] + part['a'] + part['s'];
    });

  return sum(accepted);
}

function part2(inp) {
  let [_rules, parts] = inp.split('\n\n');

  let rules = {};
  _rules
    .split('\n')
    .forEach((line) => {
      let [name, rest] = line.split('{');
      rest = rest.slice(0, -1);

      let r = rest.split(',').map((l) => {
        if (l[1] === '<' || l[1] === '>') {
          let [r, target] = l.split(':');
          return [l[0], l[1], +r.slice(2), target];
        } else {
          return l;
        }
      });
      rules[name] = r;
    });

  let stack = [
    ["in", [], ["in"]]
  ];
  let final = [];

  let op = { '>': '<=', '<': '>=' };

  while (stack.length > 0) {
    let [ruleName, limitations, path] = stack.pop();

    if (ruleName === 'R') {
      continue;
    }
    if (ruleName === 'A') {
      final.push(limitations);
      continue;
    }

    let currLimitations = deepClone(limitations);
    let currNegLimitations = deepClone(limitations);

    for (const cond of rules[ruleName]) {
      if (Array.isArray(cond)) {
        let [p, sign, val, target] = cond;

        let l = deepClone(currNegLimitations);
        l.push([p, sign, val]);
        currLimitations = deepClone(l);
        currNegLimitations.push([p, op[sign], val]);

        stack.push([target, l, [...path, target]]);
      } else {
        stack.push([cond, currNegLimitations, [...path, cond]]);
      }
    }


  }

  let totals = final.map((path) => {
    let totalRule = {
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000]
    };

    path.forEach(([p, cond, val]) => {
      if (cond === '>') {
        // up min val + 1
        totalRule[p][0] = Math.max(totalRule[p][0], val + 1);
      } else if (cond === '>=') {
        // up min val
        totalRule[p][0] = Math.max(totalRule[p][0], val);
      } else if (cond === '<') {
        // down max val - 1
        totalRule[p][1] = Math.min(totalRule[p][1], val - 1);
      } else if (cond === '<=') {
        // down max val
        totalRule[p][1] = Math.min(totalRule[p][1], val);
      }
    });

    let aa = Object.values(totalRule).map(([from, to]) => {
      return to - from + 1
    })

    return prod(aa);
  });


  return sum(totals);
}

function deepClone(limitations) {
  return JSON.parse(JSON.stringify(limitations));
}

