import { formatTime, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/20

runDay(2023, 20)
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let modules = {};
  let flipStatus = {};
  let mem = {};

  inp
    .split('\n')
    .forEach((line) => {
      let [name, targets] = line.split(' -> ');
      modules[name] = targets.split(', ');

      if (name[0] === '%') {
        flipStatus[name] = 'off';
      }
      if (name[0] === '&') {
        mem[name] = {};
      }
    });

  Object
    .entries(modules)
    .forEach(([sender, modules]) => {
      modules.forEach((t) => {
        if (mem[getName(t)]) {
          mem[getName(t)][sender] = 'lo';
        }
      });
    });

  let clicks = 1000;
  let cnt = { lo: 0, hi: 0 };

  for (let i = 1; i <= clicks; i++) {
    let signals = [['lo', 'broadcaster']];

    let nextSignals = [];
    let lim = 100;

    cnt.lo++;

    while (signals.length > 0 && lim--) {
      nextSignals = [];

      let touchedCon = [];

      signals.forEach(([power, senderName]) => {
        modules[senderName]
          .map(t => getName(t))
          .forEach((receiverName) => {
            if (power === 'lo') cnt.lo++;
            if (power === 'hi') cnt.hi++;

            if (receiverName[0] === '%') {
              if (power === "lo") {
                if (flipStatus[receiverName] === 'on') {
                  flipStatus[receiverName] = "off";
                  nextSignals.push(["lo", receiverName]);
                } else if (flipStatus[receiverName] === 'off') {
                  flipStatus[receiverName] = 'on';
                  nextSignals.push(["hi", receiverName]);
                } else {
                  throw 'unreachable';
                }
              }
            }

            if (receiverName[0] === "&") {
              mem[receiverName][senderName] = power;
              touchedCon.push(receiverName);
            }
          });
      });

      touchedCon.forEach((r) => {
        let history = mem[r];
        if (Object.values(history).every((p) => p === "hi")) {
          nextSignals.push(["lo", r]);
        } else {
          nextSignals.push(["hi", r]);
        }
      });

      signals = nextSignals;
    }
  }

  function getName(short) {
    if (short === 'broadcaster') return 'broadcaster';
    if (modules['%' + short]) return '%' + short;
    if (modules['&' + short]) return '&' + short;
    return short;
  }

  return cnt.lo * cnt.hi;
}

function part2(inp) {
  return 123;
}

/*

&kz remembers high pulses for all inputs, it sends a low pulse

       &kz -> rx

&bg -> kz
&sj -> kz
&qq -> kz
&ls -> kz

*/