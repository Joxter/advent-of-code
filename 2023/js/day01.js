import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/1

runDay(2023, 1)
  .part(1, part1)
  .part(2, part2)
  .part(2, part2AhoCorasick, 'Aho-Corasick');

function part1(inp) {
  return inp
    .split('\n')
    .map((l) => {
      let d = l.replace(/\D/g, '');
      return +(d[0] + d[d.length - 1]);
    })
    .reduce((sum, n) => sum + n, 0);
}

function part2(inp) {
  return inp
    .split('\n')
    .map((l) => {
      return getCode(l);
    })
    .reduce((sum, n) => sum + n, 0);
}

function getCode(line) {
  let numbers1 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  let numbers2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let first = null;
  let min = Infinity;

  numbers1.forEach((textN, i) => {
    let foundN1 = line.indexOf(textN);
    let foundN2 = line.indexOf(numbers2[i]);

    let found = Math.min(...[min, foundN1, foundN2].filter((n) => n > -1));

    if (found < min) {
      min = found;
      first = i + 1;
    }
  });

  let last = null;
  let max = -1;

  numbers1.forEach((textN, i) => {
    let foundN1 = line.lastIndexOf(textN);
    let foundN2 = line.lastIndexOf(numbers2[i]);

    let found = Math.max(max, foundN1, foundN2);

    if (found > max) {
      max = found;
      last = i + 1;
    }
  });

  return first * 10 + last;
}

function part2AhoCorasick(inp) {
  // modified https://github.com/BrunoRB/ahocorasick
  class AhoCorasick {
    constructor(keywords) {
      var gotoFn = [{}];
      var output = [];

      var state = 0;

      Object.entries(keywords).forEach(function ([word, digit]) {
        var curr = 0;
        for (var i = 0; i < word.length; i++) {
          var l = word[i];
          if (gotoFn[curr] && l in gotoFn[curr]) {
            curr = gotoFn[curr][l];
          } else {
            state++;
            gotoFn[curr][l] = state;
            gotoFn[state] = {};
            curr = state;
          }
        }

        output[curr] = digit;
      });

      var failure = [];
      var xs = [];

      for (var l in gotoFn[0]) {
        state = gotoFn[0][l];
        failure[state] = 0;
        xs.push(state);
      }

      while (xs.length) {
        var r = xs.shift();
        for (var l in gotoFn[r]) {
          var s = gotoFn[r][l];
          xs.push(s);

          state = failure[r];
          while (state > 0 && !(l in gotoFn[state])) {
            state = failure[state];
          }

          if (l in gotoFn[state]) {
            failure[s] = gotoFn[state][l];
          } else {
            failure[s] = 0;
          }
        }
      }

      this.gotoFn = gotoFn;
      this.output = output;
      this.failure = failure;
    };

    search(string) {
      var state = 0;

      let first = null;
      let last = null;

      for (var i = 0; i < string.length; i++) {
        var l = string[i];
        while (state > 0 && !(l in this.gotoFn[state])) {
          state = this.failure[state];
        }
        if (!(l in this.gotoFn[state])) {
          continue;
        }

        state = this.gotoFn[state][l];

        if (this.output[state]) {
          if (first === null) first = this.output[state];
          last = this.output[state];
        }
      }

      return first * 10 + last;
    };
  }

  let aho = new AhoCorasick({
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
  });

  return inp
    .split('\n')
    .map((line) => aho.search(line))
    .reduce((sum, n) => sum + n, 0);
}
