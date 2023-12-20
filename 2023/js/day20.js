import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/20

// console.log(part1(`broadcaster -> a, b, c
// %a -> b
// %b -> c
// %c -> inv
// &inv -> a`), [32000000]);

// console.log(part1(`broadcaster -> a
// %a -> inv, con
// &inv -> b
// %b -> con
// &con -> output`), [11687500]);

runDay(2023, 20)
  .part(1, part1)
  // .part(2, part2)
  .end();

function part1(inp) {
  let modules = {
    // name: [target]
  };
  let flipStatus = {}; // on/off
  let mem = {
    // todo init all [OFF]
    // [name]: "on"|"off"[]
  };

  inp
    .split('\n')
    .forEach((line) => {
      let [name, targets] = line.split(' -> ');
      modules[name] = targets.split(', ');

      if (name[0] === '%') {
        flipStatus[name] = 'off';
      }
      if (name[0] === '&') {
        mem[name] = {}
      }
    });

  Object
    .entries(modules)
    .forEach(([sender, modules]) => {
      modules.forEach((t) => {
        if (mem[getName(t)]) {
          mem[getName(t)][sender] = 'lo'
        }
      })
    })

  // console.log(JSON.stringify(mem, null, 2));
  // return ;


  let times = 1000;
  // let times = 4;

  let cnt = { lo: 0, hi: 0 };

  for (let i = 1; i <= times; i++) {
    // console.log('Click', i);
    let signals = [['lo', 'broadcaster']]; // [lo|hi, target]

    let nextSignals = [];
    let lim = 100;

    // console.log('1', ['button', 'lo', 'broadcaster']);
    cnt.lo++;

    while (signals.length > 0 && lim--) {
      // console.log({ signals });
      nextSignals = [];
      // debugger

      let recc = [];

      signals.forEach(([power, senderName]) => {
        modules[senderName]
          .map(t => getName(t))
          .forEach((receiverName) => {
            // console.log('2', [senderName, power, receiverName]);
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

            // debugger

            if (receiverName[0] === "&") {
              mem[receiverName][senderName] = power;
              recc.push(receiverName);
            }
          });
      });

      // console.log(JSON.stringify(mem));
      // return ;
      // Conjunction (remembers)
      //   - if all "hi" -> do "lo"
      //   - else -> do "hi"

      // debugger
      recc.forEach((r) => {
        let history = mem[r]
        // debugger
        if (Object.values(history).every((p) => p === "hi")) {
          nextSignals.push(["lo", r]);
          // console.log(['??', "lo", target]);
        } else {
          nextSignals.push(["hi", r]);
          // console.log(['??', "hi", target]);
        }
      });

      signals = nextSignals;
    }
    // console.log(cnt);
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