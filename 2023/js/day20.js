import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/20

console.log(part1(`broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`), [32000000]);

console.log(part1(`broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`), [11687500]);

runDay(2023, 20)
  // .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let modules = {
    // name: [target]
  };
  let flipStatus = {}; // on/off

  inp
    .split('\n')
    .forEach((line) => {
      let [name, targets] = line.split(' -> ');
      modules[name] = targets.split(', ');

      if (name[0] === '%') {
        flipStatus[name] = 'off';
      }
    });


  let times = 1000;
  // let times = 2;

  let cnt = { lo: 0, hi: 0 };

  for (let i = 1; i <= times; i++) {
    // console.log('Click', i);
    let signals = [['lo', 'broadcaster']]; // [lo|hi, target]

    let nextSignals = [];
    let lim = 2000000;
    cnt.lo++;

    while (signals.length > 0 && lim--) {
      nextSignals = [];

      let mem = {
        // [name]: "on"|"off"[]
      };

      signals.forEach(([power, senderName]) => {
        modules[senderName]
          .map(t => getName(t))
          .forEach((receiverName) => {
            // debugger
            // if (receiverName === "inv") debugger

            // if (senderName === 'broadcaster') {
            //   nextSignals.push([power, receiverName]);
            //   console.log([senderName, power, receiverName]);
            //   return;
            // }
            // console.log([senderName, power, receiverName]);
            if (power === 'lo') cnt.lo++;
            if (power === 'hi') cnt.hi++;

            if (receiverName[0] === '%') {
              // flip-flop (OFF at the beginning)
              //  - if "hi" -> do nothing
              //  - if "lo" ->
              //       if WAS "on"  -> do "lo", set "off"
              //       if WAS "off" -> do "hi", set "on"
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
              if (!mem[receiverName]) {
                mem[receiverName] = [];
              }
              // if (flipStatus[senderName] === 'on') {
              //   mem[receiverName].push('lo');
              // } else if (flipStatus[senderName] === 'off') {
              //   mem[receiverName].push('hi');
              // } else {
              mem[receiverName].push(power);
              // }
            } else {
              // nothing
            }
          });
      });

      debugger

      // Conjunction (remembers)
      //   - if all "hi" -> do "lo"
      //   - else -> do "hi"

      Object.entries(mem).forEach(([target, powers]) => {
        if (powers.every((p) => p === "hi")) {
          nextSignals.push(["lo", target]);
          // cnt.lo++;

          // console.log(['??', "lo", target]);
        } else {
          nextSignals.push(["hi", target]);
          // console.log(['??', "hi", target]);
          // cnt.hi++;
        }
      });

      signals = nextSignals;

      // console.log({ nextSignals });
    }


  }

  function getName(short) {
    if (short === 'broadcaster') return 'broadcaster';
    if (modules['%' + short]) return '%' + short;
    if (modules['&' + short]) return '&' + short;
    return short;
  }

  console.log('---');
  // console.log(modules);
  console.log(cnt);

  return cnt.lo * cnt.hi;
}

function part2(inp) {
  return 123;
}
