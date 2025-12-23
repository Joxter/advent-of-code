import { runDay, ints } from "../../utils.js";

// https://adventofcode.com/2015/day/22

runDay(2015, 22)
  //
  .part(1, part1)
  // .part(2, part2)
  .end(1);

function part1(inp) {
  const player = { hp: 50, mana: 500 };
  const p = ints(inp);
  const boss = { hp: p[0], damage: p[1] };

  let q = [
    {
      player,
      boss,
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
    let { player, boss, manaCnt, playerTurn, shield, recharge, poison } =
      q.pop();

    if (manaCnt >= min) continue; // Prune branches that already exceed minimum

    // Apply effects at START of turn
    if (shield > 0) shield--;
    if (poison > 0) {
      boss.hp -= 3;
      poison--;
    }
    if (recharge > 0) {
      player.mana += 101;
      recharge--;
    }

    // Check if boss is dead after effects
    if (boss.hp <= 0) {
      min = Math.min(min, manaCnt);
      continue;
    }

    if (playerTurn) {
      // Player turn - cast spell
      spells.forEach((s) => {
        if (player.mana < s.costs) return;

        if (!s.turns) {
          // Instant spells
          q.push({
            player: {
              hp: player.hp + s.heal,
              mana: player.mana - s.costs,
            },
            boss: { hp: boss.hp - s.damage, damage: boss.damage },
            shield,
            poison,
            recharge,
            manaCnt: manaCnt + s.costs,
            playerTurn: false,
          });
        } else {
          // Effect spells - can only cast if not already active
          if (s.name === "shield" && shield === 0) {
            q.push({
              player: { ...player, mana: player.mana - s.costs },
              boss: { ...boss },
              shield: s.turns,
              poison,
              recharge,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          } else if (s.name === "poison" && poison === 0) {
            q.push({
              player: { ...player, mana: player.mana - s.costs },
              boss: { ...boss },
              shield,
              poison: s.turns,
              recharge,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          } else if (s.name === "recharge" && recharge === 0) {
            q.push({
              player: { ...player, mana: player.mana - s.costs },
              boss: { ...boss },
              shield,
              poison,
              recharge: s.turns,
              manaCnt: manaCnt + s.costs,
              playerTurn: false,
            });
          }
        }
      });
    } else {
      // Boss turn - attack
      const armor = shield > 0 ? 7 : 0;
      const damage = Math.max(boss.damage - armor, 1);

      if (player.hp > damage) {
        // Only continue if player survives
        q.push({
          player: { hp: player.hp - damage, mana: player.mana },
          boss: { ...boss },
          shield,
          poison,
          recharge,
          manaCnt,
          playerTurn: true,
        });
      }
    }
  }

  return min;
}

function part2(inp) {}
