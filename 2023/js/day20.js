import { formatTime, lcm, runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/20

runDay(2023, 20)
  .part(1, part1)
  .part(2, part2)
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

  let cnt = { lo: 0, hi: 0 };

  for (let i = 1; i <= 1000; i++) {
    let signals = [['lo', 'broadcaster']];
    let nextSignals = [];
    cnt.lo++;

    while (signals.length > 0) {
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
  let modules = {};
  let flipStatus = {};
  let mem = {};

  let rxSender = null;

  inp
    .split('\n')
    .forEach((line) => {
      let [name, targets] = line.split(' -> ');
      modules[name] = targets.split(', ');

      if (targets === 'rx') {
        rxSender = name.slice(1);
      }

      if (name[0] === '%') {
        flipStatus[name] = 'off';
      }
      if (name[0] === '&') {
        mem[name] = {};
      }
    });

  let periods = {};

  Object
    .entries(modules)
    .forEach(([sender, receivers]) => {
      receivers.forEach((receiver) => {

        if (receiver === rxSender) {
          periods[sender] = null;
        }
        if (mem[getName(receiver)]) {
          mem[getName(receiver)][sender] = 'lo';
        }
      });
    });

  let i = 0;
  steps: while (true) {
    i++;
    let signals = [['lo', 'broadcaster']];

    let nextSignals = [];

    while (signals.length > 0) {
      nextSignals = [];

      let touchedCon = [];

      for (let [power, senderName] of signals) {
        let receivers = modules[senderName].map(t => getName(t));

        for (let receiverName of receivers) {
          if (power === 'lo' && receiverName in periods && !periods[receiverName]) {
            periods[receiverName] = i;

            if (Object.values(periods).every(it => it !== null)) break steps;
          }

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
        }
      }

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

  return lcm(Object.values(periods));

  function getName(short) {
    if (short === 'broadcaster') return 'broadcaster';
    if (modules['%' + short]) return '%' + short;
    if (modules['&' + short]) return '&' + short;
    return short;
  }
}
