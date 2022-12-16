import fs from 'fs';

// https://adventofcode.com/2022/day/16

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput) === 1651);
console.log('answer: ', part1(inputData), [2250]);

// console.log("test2 OK:", part2(testInput) === 93);
// console.log("answer2:", part2(inputData), [27551]);

function part1(inp) {
  let map = {};
  let maxValves = 1;
  let maxMins = 30;

  inp.split('\n').forEach((line) => {
    let [_, name, rate, next] = /Valve\s(..).+rate=(\d+).+valve[s]? (.+)/.exec(line);

    if (+rate) maxValves++;
    map[name] = {
      rate: +rate,
      next: next.split(', '),
      name
    };
  });

  // console.log(map);
  let newMap = getNewMap(map);
  // console.log(newMap);
  let newNewMap = addRoads(newMap);
  // console.log(newNewMap);

  let results = 0;

  // return 444;

  // let fastestTestPath = ['AA', 'DD', 'BB', 'JJ', 'HH', 'EE', 'CC'];
  // console.log(testPath(fastestTestPath));

  let startTime = Date.now();
  let ans = goNext(
    newNewMap.AA,
    {released: 0, opened: ['AA'], path: '', rawPath: ['AA']},
    1
  );
  console.log({maxMins, results, time: (Date.now() - startTime) / 1000});
  return ans;

  function goNext(node, {released, opened, path, rawPath}, minutes) {
    // console.log(released, rawPath, minutes);
    if (opened.length === maxValves || minutes > maxMins) {
      // if (released >= 1651) {
      //   console.log({rawPath: rawPath.join(', '), released});
      //   console.log(path, released);
      // }
      results++;
      // console.log('end', released);
      return released;
    }

    // path += `\n [${minutes}] current position ${node.name}`;
    // minutes++;

    return Math.max(...node.next.filter((_nodeName) => {
      let [nodeName, cost] = _nodeName.split(',');
      return !rawPath.includes(nodeName);
    }).map((_nodeName) => {
      // console.log('>>>>', _nodeName);
      let [nodeName, cost] = _nodeName.split(',');

      let rate = newNewMap[nodeName].rate;
      let minLeft = maxMins - (minutes + +cost);

      // path += `\n [${minutes}] open: ${nodeName} (${cost}*${minLeft})`;

      let ifIGo = goNext(newNewMap[nodeName], {
        rawPath: [...rawPath, nodeName],
        path: path
          + `\n [${minutes}] go to: ${nodeName} (cost ${cost})`
          + `\n [${minutes + 1}] open: ${nodeName} (${rate}*${minLeft})`,
        released: released + (+rate * minLeft),
        opened: [...opened, nodeName],
      }, minutes + (+cost) + 1);


      return ifIGo;
    }));
  }

  function testPath(path) {
    let released = 0;
    let [curPoint, ...tail] = path;
    let minutes = 1;

    tail.forEach((nodeName) => {
      let cost = +newNewMap[curPoint].next
        .filter((it) => {
          return it.startsWith(nodeName);
        }).map(it => {
          return it.split(',')[1];
        });

      let rate = newNewMap[nodeName].rate;
      let minLeft = maxMins - (minutes + +cost);
      released += (+rate * minLeft);
      minutes += (+cost) + 1;

      curPoint = nodeName;
    });
    return released;
  }
}

function addRoads(map) {
  let newNewMap = {};
  const heads = Object.keys(map);

  for (let i = 0; i < heads.length; i++) {
    let from = heads[i];

    newNewMap[from] = {name: from, rate: map[from].rate, next: []};
    for (let j = 0; j < heads.length; j++) {
      let to = heads[j];
      if (from !== to) {
        newNewMap[from].next.push(findPath(map, from, to));
      }
    }
  }

  return newNewMap;
}

function findPath(map, start, finish) {
  let results = [];

  dfs([start], 0);

  let [minScore, minArr] = results[0];
  results.forEach(([score, arr], i) => {
    if (score < minScore) {
      minScore = score;
      minArr = arr;
    }
  });
  return finish + ',' + minScore;

  function dfs(path, score) {
    let last = path[path.length - 1];
    // console.log(path, last, score);
    if (last === finish) {
      results.push([score, path]);
      return;
    }

    for (let i = 0; i < map[last].next.length; i++) {
      let [nodeName, cost] = map[last].next[i].split(',');
      if (!path.includes(nodeName)) {
        dfs([...path, nodeName], score + +cost);
      }
    }
  }
}

function getNewMap(map) {
  let newMap = {};

  Object.values(map).forEach(({rate, next, name}) => {
    if (rate || name === 'AA') {
      let pathes = goTillEnd(name, [name]);

      newMap[name] = {
        name: name,
        rate: rate,
        next: pathes.map((path) => {
          let end = path[path.length - 1];
          return [end, path.length - 1].join(',');
        }),
      };
    }
  });
  return newMap;

  function goTillEnd(current, path, expand = false) {
    if (expand) {
      if (map[current].rate || current === 'AA') return path;
    }

    let res = [];
    for (let i = 0; i < map[current].next.length; i++) {
      let ch = map[current].next[i];
      if (!path.includes(ch)) {
        if (expand) {
          res.push(...goTillEnd(ch, [...path, ch], true));
        } else {
          res.push(goTillEnd(ch, [...path, ch], true));
        }
      }
    }

    return res;
  }
}

function render(map, lastLeftRock, lastRightRock, bottom) {
  let result = '';

  for (let y = -1; y <= bottom + 2; y++) {
    let row = '';
    for (let x = lastLeftRock - 2; x < lastRightRock + 2; x++) {
      row += map[x + ',' + y] || '.';
    }
    result += String(y).padStart(3, '0') + ' ' + row + '\n';
  }

  console.log(result);
}


/*

 [1] go to: DD (cost 1)
 [2] open: DD (20*28)   +++++++

 [3] go to: BB (cost 2)
 [4] open: BB (13*26) ----- !!! 5

 [6] go to: JJ (cost 3)
 [7] open: JJ (21*23)

 [10] go to: HH (cost 7)
 [11] open: HH (22*19)

 [18] go to: EE (cost 3)
 [19] open: EE (3*11)

 [22] go to: CC (cost 2)
 [23] open: CC (2*7) 1846

*/