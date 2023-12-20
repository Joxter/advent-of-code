import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/20

// console.log(part1(`broadcaster -> a, b, c
// %a -> b
// %b -> c
// %c -> inv
// &inv -> a`), [32000000]);

console.log(part1(`broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`), [11687500]);

runDay(2023, 20)
  // .part(1, part1) // 262188725922 high
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


  // let times = 1000;
  let times = 1;

  let cnt = { lo: 0, hi: 0 };

  for (let i = 1; i <= times; i++) {
    // console.log('Click', i);
    let signals = [['lo', 'broadcaster']]; // [lo|hi, target]

    let nextSignals = [];
    let lim = 2000000;

    console.log(['button', 'lo', 'broadcaster']);
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
            console.log([senderName, power, receiverName]);
            if (power === 'lo') cnt.lo++;
            if (power === 'hi') cnt.hi++;

            if (receiverName[0] === '%') {
              // flip-flop
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
              mem[receiverName].push(power);
            }
          });
      });

      // Conjunction (remembers)
      //   - if all "hi" -> do "lo"
      //   - else -> do "hi"
      Object.entries(mem).forEach(([target, powers]) => {
        if (powers.every((p) => p === "hi")) {
          nextSignals.push(["lo", target]);
          // console.log(['??', "lo", target]);
        } else {
          nextSignals.push(["hi", target]);
          // console.log(['??', "hi", target]);
        }
      });

      signals = nextSignals;
    }


    console.log(cnt);
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


/*

lll = 17
hhh = 11

1
button -low-> broadcaster
broadcaster -low-> a
a -high-> inv
a -high-> con
inv -low-> b
con -high-> output
b -high-> con
con -low-> output

2
button -low-> broadcaster
broadcaster -low-> a
a -low-> inv
a -low-> con
inv -high-> b
con -high-> output

3
button -low-> broadcaster
broadcaster -low-> a
a -high-> inv
a -high-> con
inv -low-> b
con -low-> output
b -low-> con
con -high-> output

4
button -low-> broadcaster
broadcaster -low-> a
a -low-> inv
a -low-> con
inv -high-> b
con -high-> output

*/