import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/7

let CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
let CARDS2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
let CARDS_POWER = ['C', 'B', 'A', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];

runDay(2023, 7)
  .part(1, part1)
  .part(2, part2);

function part1(inp) {
  let lines = inp.split('\n');

  lines.sort((a, b) => {
    let aPower = combPower(a);
    let bPower = combPower(b);

    if (aPower !== bPower) {
      return bPower - aPower;
    }

    let aOrder = orderPower(a);
    let bOrder = orderPower(b);

    return bOrder - aOrder;
  });
  lines.reverse();

  let bids = lines.map((line, i) => {
    let bid = +line.split(' ')[1];
    return bid * (i + 1);
  });

  return sum(bids);
}

function combPower(line) {
  let cards = line.slice(0, 5).split('');

  let cnts = CARDS.map((c) => {
    return cards.filter(it => it === c).length;
  });

  if (cnts.includes(5)) return 10;
  if (cnts.includes(4)) return 9;
  if (cnts.includes(3) && cnts.includes(2)) return 8;
  if (cnts.includes(3)) return 7;
  if (cnts.filter(it => it === 2).length === 2) return 6;
  if (cnts.includes(2)) return 5;

  return 4;
}

function combPowerJ(line) {
  let cards = line.slice(0, 5).split('');
  if (!cards.includes('J')) return combPower(line);

  let cc = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  let total = [];

  function replace(cards) {
    if (cards.includes('J')) {
      let p = cards.indexOf('J');

      cc.forEach((c) => {
        let newCards = [...cards];
        newCards[p] = c;
        total.push(newCards);
        replace(newCards);
      });
    }
  }

  let max = 0;

  replace(cards);
  for (let i = 0; i < total.length; i++) {
    let p = combPower(total[i].join(''))
    if (p > max) max = p;
  }

  return max;
}

function part2(inp) {
  let lines = inp.split('\n');

  lines.sort((a, b) => {
    let aPower = combPowerJ(a);
    let bPower = combPowerJ(b);

    if (aPower !== bPower) {
      return bPower - aPower;
    }

    let aOrder = orderPower2(a);
    let bOrder = orderPower2(b);

    return bOrder - aOrder;
  });
  lines.reverse();

  let bids = lines.map((line, i) => {
    let bid = +line.split(' ')[1];
    return bid * (i + 1);
  });

  return sum(bids);
}

function orderPower(line) {
  let powers = line.slice(0, 5).split('').map(c => CARDS_POWER[CARDS.indexOf(c)]).join('');
  return parseInt(powers, 16);
}

function orderPower2(line) {
  let powers = line.slice(0, 5).split('').map(c => CARDS_POWER[CARDS2.indexOf(c)]).join('');
  return parseInt(powers, 16);
}
