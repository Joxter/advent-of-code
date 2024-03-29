import { runDay, sum } from '../../utils.js';

// https://adventofcode.com/2023/day/7

let CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
let CARDS_NO_J = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
let CARDS_PART_2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
let CARDS_TO_HEX = ['C', 'B', 'A', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];

runDay(2023, 7)
  .part(1, part1)
  .part(2, part2, 'rush advent solution')
  .part(2, part2opt, 'part2 optimised')
  .part(2, part2alter, 'alter approach');

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

  function combPowerJ(line) {
    let cards = line.slice(0, 5).split('');
    if (!cards.includes('J')) return combPower(line);

    let total = [];

    function replaceJ(cards) {
      let p = cards.indexOf('J');
      if (p === -1) return;

      CARDS_NO_J.forEach((c) => {
        let newCards = [...cards];
        newCards[p] = c;
        total.push(newCards);
        replaceJ(newCards);
      });
    }

    replaceJ(cards);

    let max = 0;
    for (let i = 0; i < total.length; i++) {
      let p = combPower(total[i].join(''));
      if (p > max) max = p;
    }

    return max;
  }
}

function part2opt(inp) {
  let lines = inp.split('\n');

  let bids = lines
    .map(l => [l, combPowerJ(l)])
    .sort(([a, aPower], [b, bPower]) => {
      if (aPower !== bPower) {
        return aPower - bPower;
      }

      let aOrder = orderPower2(a);
      let bOrder = orderPower2(b);

      return aOrder - bOrder;
    })
    .map((line, i) => {
      let bid = +line[0].slice(5);
      return bid * (i + 1);
    });

  return sum(bids);

  function combPowerJ(line) {
    if (!line.includes('J')) return combPower(line);
    let cards = line.slice(0, 5).split('');

    let max = 0;

    function replaceJ(cards) {
      let p = cards.indexOf('J');
      if (p === -1) return;

      CARDS_NO_J.forEach((c) => {
        let newCards = [...cards];
        newCards[p] = c;

        let r = combPower(newCards.join(''));
        if (r > max) max = r;

        replaceJ(newCards);
      });
    }

    replaceJ(cards);

    return max;
  }
}

function part2alter(inp) {
  let lines = inp.split('\n');

  let bids = lines
    .map(l => [l, combPower2(l)])
    .sort(([a, aPower], [b, bPower]) => {

      if (aPower !== bPower) {
        return aPower - bPower;
      }

      let aOrder = orderPower2(a);
      let bOrder = orderPower2(b);

      return aOrder - bOrder;
    })
    .map((line, i) => {
      let bid = +line[0].slice(5);
      return bid * (i + 1);
    });

  return sum(bids);

  function combPower2(line) {
    let cards = line.slice(0, 5).split('');

    let cnts = CARDS.map((c) => {
      return cards.filter(it => it === c).length;
    });
    let jcnt = cnts[3]; // index of "J" in CARDS
    cnts[3] = 0;

    if (jcnt === 0) {
      if (cnts.includes(5)) return 10;
      if (cnts.includes(4)) return 9;
      if (cnts.includes(3) && cnts.includes(2)) return 8;
      if (cnts.includes(3)) return 7;
      if (cnts.filter(it => it === 2).length === 2) return 6;
      if (cnts.includes(2)) return 5;
      return 4;
    }

    if (jcnt === 1) {
      if (cnts.includes(4)) return 10;
      if (cnts.includes(3)) return 9;
      if (cnts.filter(it => it === 2).length === 2) return 8;
      if (cnts.includes(2)) return 7;
      return 5;
    }

    if (jcnt === 2) {
      if (cnts.includes(3)) return 10;
      if (cnts.includes(2)) return 9;
      return 7;
    }

    if (jcnt === 3) {
      if (cnts.includes(2)) return 10;
      return 9;
    }

    return 10;
  }
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

function orderPower(line) {
  let powers = line.slice(0, 5).split('').map(c => CARDS_TO_HEX[CARDS.indexOf(c)]).join('');
  return parseInt(powers, 16);
}

function orderPower2(line) {
  let powers = line.slice(0, 5).split('').map(c => CARDS_TO_HEX[CARDS_PART_2.indexOf(c)]).join('');
  return parseInt(powers, 16);
}
