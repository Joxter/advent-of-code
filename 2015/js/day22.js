import { runDay, ints } from "../../utils.js";

// https://adventofcode.com/2015/day/22

runDay(2015, 22)
  //
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  const [bossHp, bossDamage] = ints(inp);

  let q = [
    {
      playerMana: 500,
      playerHp: 50,
      bossHp,
      shield: 0,
      poison: 0,
      recharge: 0,
      manaCnt: 0,
      playerTurn: true,
    },
  ];

  let spells = [
    { name: "Magic Missile", costs: 53, damage: 4, heal: 0 },
    { name: "Drain", costs: 73, damage: 2, heal: 2 },
    { name: "shield", costs: 113, turns: 6 },
    { name: "poison", costs: 173, turns: 6 },
    { name: "recharge", costs: 229, turns: 5 },
  ];

  let min = Infinity;

  while (q.length > 0) {
    let {
      playerMana,
      playerHp,
      bossHp,
      manaCnt,
      playerTurn,
      shield,
      recharge,
      poison,
    } = q.pop();

    if (manaCnt >= min || playerHp <= 0) continue;

    if (shield > 0) shield--;
    if (poison > 0) {
      bossHp -= 3;
      poison--;
    }

    if (bossHp <= 0) {
      min = Math.min(min, manaCnt);
      continue;
    }

    if (recharge > 0) {
      playerMana += 101;
      recharge--;
    }

    if (playerTurn) {
      spells.forEach((s) => {
        if (playerMana < s.costs) return;

        if (s.turns) {
          if (shield === 0 && s.name === "shield") {
            q.push({
              playerHp,
              playerMana: playerMana - s.costs,
              bossHp,
              shield: s.turns,
              poison,
              recharge,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          } else if (poison === 0 && s.name === "poison") {
            q.push({
              playerHp,
              playerMana: playerMana - s.costs,
              bossHp,
              shield,
              poison: s.turns,
              recharge,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          } else if (recharge === 0 && s.name === "recharge") {
            q.push({
              playerHp,
              playerMana: playerMana - s.costs,
              bossHp,
              shield,
              poison,
              recharge: s.turns,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          }
        } else {
          q.push({
            playerHp: playerHp + s.heal,
            playerMana: playerMana - s.costs,
            bossHp: bossHp - s.damage,
            shield,
            poison,
            recharge,
            manaCnt: manaCnt + s.costs,
            playerTurn: false,
          });
        }
      });
    } else {
      const damage = Math.max(bossDamage - (shield > 0 ? 7 : 0), 1);

      q.push({
        playerHp: playerHp - damage,
        playerMana,
        bossHp,
        shield,
        poison,
        recharge,
        manaCnt,
        playerTurn: true,
      });
    }
  }

  return min;
}

function part2(inp) {
  const [bossHp, bossDamage] = ints(inp);

  let q = [
    {
      playerMana: 500,
      playerHp: 50,
      bossHp,
      shield: 0,
      poison: 0,
      recharge: 0,
      manaCnt: 0,
      playerTurn: true,
    },
  ];

  let spells = [
    { name: "Magic Missile", costs: 53, damage: 4, heal: 0 },
    { name: "Drain", costs: 73, damage: 2, heal: 2 },
    { name: "shield", costs: 113, turns: 6 },
    { name: "poison", costs: 173, turns: 6 },
    { name: "recharge", costs: 229, turns: 5 },
  ];

  let min = Infinity;

  while (q.length > 0) {
    let {
      playerMana,
      playerHp,
      bossHp,
      manaCnt,
      playerTurn,
      shield,
      recharge,
      poison,
    } = q.pop();

    if (playerTurn) playerHp--;

    if (manaCnt >= min || playerHp <= 0) continue;

    if (shield > 0) shield--;
    if (poison > 0) {
      bossHp -= 3;
      poison--;
    }

    if (bossHp <= 0) {
      min = Math.min(min, manaCnt);
      continue;
    }

    if (recharge > 0) {
      playerMana += 101;
      recharge--;
    }

    if (playerTurn) {
      spells.forEach((s) => {
        if (playerMana < s.costs) return;

        if (s.turns) {
          if (shield === 0 && s.name === "shield") {
            q.push({
              playerHp,
              playerMana: playerMana - s.costs,
              bossHp,
              shield: s.turns,
              poison,
              recharge,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          } else if (poison === 0 && s.name === "poison") {
            q.push({
              playerHp,
              playerMana: playerMana - s.costs,
              bossHp,
              shield,
              poison: s.turns,
              recharge,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          } else if (recharge === 0 && s.name === "recharge") {
            q.push({
              playerHp,
              playerMana: playerMana - s.costs,
              bossHp,
              shield,
              poison,
              recharge: s.turns,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          }
        } else {
          q.push({
            playerHp: playerHp + s.heal,
            playerMana: playerMana - s.costs,
            bossHp: bossHp - s.damage,
            shield,
            poison,
            recharge,
            manaCnt: manaCnt + s.costs,
            playerTurn: false,
          });
        }
      });
    } else {
      const damage = Math.max(bossDamage - (shield > 0 ? 7 : 0), 1);

      q.push({
        playerHp: playerHp - damage,
        playerMana,
        bossHp,
        shield,
        poison,
        recharge,
        manaCnt,
        playerTurn: true,
      });
    }
  }

  return min;
}
