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

      rules[name] = rest.split(',').map((l) => {
        if (l[1] === '<' || l[1] === '>') {
          let [r, target] = l.split(':');
          return [l[0], l[1], +r.slice(2), target];
        } else {
          return l;
        }
      });
    });

  let accepted = parts
    .split('\n')
    .map((line) => {
      line = line.slice(1, -1);
      let res = {};

      line
        .split(',')
        .forEach((l) => {
          let [name, value] = l.split('=');
          res[name] = +value;
        });

      return res;
    })
    .filter((part) => {
      let current = 'in';

      while (current !== 'R' && current !== 'A') {

        let rule = rules[current];
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
    ["in", []]
  ];

  let neg = { '>': '<=', '<': '>=' };
  let totals = [];

  while (stack.length > 0) {
    let [ruleName, limitations] = stack.pop();

    if (ruleName === 'R') {
      continue;
    }
    if (ruleName === 'A') {
      totals.push( applyLimitations(limitations))
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
        currNegLimitations.push([p, neg[sign], val]);

        stack.push([target, l]);
      } else {
        stack.push([cond, currNegLimitations]);
      }
    }
  }

  return sum(totals);
}

function deepClone(limitations) {
  return JSON.parse(JSON.stringify(limitations));
}

function applyLimitations(path) {
  let totalRule = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000]
  };

  path.forEach(([p, cond, val]) => {
    if (cond === '>') {
      totalRule[p][0] = Math.max(totalRule[p][0], val + 1);
    } else if (cond === '>=') {
      totalRule[p][0] = Math.max(totalRule[p][0], val);
    } else if (cond === '<') {
      totalRule[p][1] = Math.min(totalRule[p][1], val - 1);
    } else if (cond === '<=') {
      totalRule[p][1] = Math.min(totalRule[p][1], val);
    }
  });

  let combinations = Object.values(totalRule).map(([from, to]) => {
    return to - from + 1;
  });

  return prod(combinations);
}
