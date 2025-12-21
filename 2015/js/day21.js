import { runDay, ints } from "../../utils.js";

// https://adventofcode.com/2015/day/21

runDay(2015, 21)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  const weapons = parse(`Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0`);
  const armors = parse(`Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5`);
  const rings = parse(`DamageA    25     1       0
DamageB    50     2       0
DamageC   100     3       0
DefenseA   20     0       1
DefenseB   40     0       2
DefenseC   80     0       3`);

  let [hp, damage, armor] = ints(inp);
  let boss = { hp, damage, armor };

  let minCost = Infinity;

  for (let i = 0; i < weapons.length; i++) {
    let weapon = weapons[i];

    for (let k = 0; k < armors.length; k++) {
      let armor = armors[k];

      for (let j = 0; j < rings.length - 1; j++) {
        for (let jj = j + 1; jj < rings.length; jj++) {
          let ring1 = rings[j];
          let ring2 = rings[jj];

          let aa = [null, armor];
          let rr = [[], [ring1], [ring2], [ring1, ring2]];

          aa.forEach((a) => {
            rr.forEach((rr) => {
              let hero = {
                hp: 100,
                armor: 0,
                damage: weapon.damage,
              };
              let cost = weapon.cost;

              if (a) {
                hero.armor += a.armor;
                cost += a.cost;
              }

              rr.forEach((r) => {
                hero.armor += r.armor;
                hero.damage += r.damage;
                cost += r.cost;
              });

              if (isHeroWin(hero, boss)) {
                if (cost < minCost) {
                  minCost = cost;
                }
              }
            });
          });
        }
      }
    }
  }

  return minCost;

  function isHeroWin(hero, boss) {
    let heroMoves = Math.ceil(boss.hp / Math.max(hero.damage - boss.armor, 1));
    let bossMoves = Math.ceil(hero.hp / Math.max(boss.damage - hero.armor, 1));

    return heroMoves <= bossMoves;
  }

  function parse(str) {
    return str.split("\n").map((l) => {
      let [label, cost, damage, armor] = l.split(/\s+/);
      return { label, cost: +cost, damage: +damage, armor: +armor };
    });
  }
}

function part2(inp) {
  const weapons = parse(`Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0`);
  const armors = parse(`Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5`);
  const rings = parse(`DamageA    25     1       0
DamageB    50     2       0
DamageC   100     3       0
DefenseA   20     0       1
DefenseB   40     0       2
DefenseC   80     0       3`);

  let [hp, damage, armor] = ints(inp);
  let boss = { hp, damage, armor };

  let maxCost = 0;

  for (let i = 0; i < weapons.length; i++) {
    let weapon = weapons[i];

    for (let k = 0; k < armors.length; k++) {
      let armor = armors[k];

      for (let j = 0; j < rings.length - 1; j++) {
        for (let jj = j + 1; jj < rings.length; jj++) {
          let ring1 = rings[j];
          let ring2 = rings[jj];

          let aa = [null, armor];
          let rr = [[], [ring1], [ring2], [ring1, ring2]];

          aa.forEach((a) => {
            rr.forEach((rr) => {
              let hero = {
                hp: 100,
                armor: 0,
                damage: weapon.damage,
              };
              let cost = weapon.cost;

              if (a) {
                hero.armor += a.armor;
                cost += a.cost;
              }

              rr.forEach((r) => {
                hero.armor += r.armor;
                hero.damage += r.damage;
                cost += r.cost;
              });

              if (isHeroLose(hero, boss)) {
                if (cost > maxCost) {
                  maxCost = cost;
                }
              }
            });
          });
        }
      }
    }
  }

  return maxCost;

  function isHeroLose(hero, boss) {
    let heroMoves = Math.ceil(boss.hp / Math.max(hero.damage - boss.armor, 1));
    let bossMoves = Math.ceil(hero.hp / Math.max(boss.damage - hero.armor, 1));

    return heroMoves > bossMoves;
  }

  function parse(str) {
    return str.split("\n").map((l) => {
      let [label, cost, damage, armor] = l.split(/\s+/);
      return { label, cost: +cost, damage: +damage, armor: +armor };
    });
  }
}
