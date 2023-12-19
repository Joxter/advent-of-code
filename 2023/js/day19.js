import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/19

console.log(part1(`px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`));

runDay(2023, 19)
  .part(1, part1)
  // .part(2, part2)
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
          let [r, target] = l.split(':')
          return [l[0], l[1], +r.slice(2), target];
        } else {
          return  l
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
            current = cond
          }
        }
      }
      // console.log(part, { current, limit });
      return current === 'A';
    })
    .map((part) => {
      return part['x'] + part['m'] + part['a'] + part['s'];
    })

  // console.log(accepted);

  return sum(accepted);
}

function part2(inp) {
  return 123;
}
