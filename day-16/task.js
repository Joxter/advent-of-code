import fs from 'fs';

// https://adventofcode.com/2022/day/16

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();
// todo fix cash, p2 takes 10 mins
//          upd. cash is huge and make it worse

let start = Date.now();
console.log('test OK: ', part1(testInput), [1651]);
console.log('answer: ', part1(inputData), [2250]);
console.log('sec', (Date.now() - start) / 1000);

start = Date.now();
console.log('test2 OK:', part2(testInput), [1707]);
console.log('answer2:', part2(inputData), [3015]);
console.log('sec', (Date.now() - start) / 1000);

start = Date.now();
console.log('(cash) test2 OK:', part2_cash(testInput), [1707]);
console.log('(cash) answer2:', part2_cash(inputData), [3015]);
console.log('sec', (Date.now() - start) / 1000);

function parse(inp) {
  let map = {};
  let maxValves = 0;
  let heads = {};

  inp.split('\n').forEach(line => {
    let [_, name, rate, next] = /Valve\s(..).+rate=(\d+).+valve[s]? (.+)/.exec(line);

    if (+rate && name !== 'AA') {
      heads[name] = 1 << maxValves;
      maxValves++;
    }
    map[name] = {
      rate: +rate,
      next: next.split(', '),
      name,
    };
  });
  let allOpened = (2 ** (maxValves) - 1);

  let newNewMap = transformMap(map);

  return { newNewMap, allOpened, heads };
}

function part1(inp) {
  let maxMins = 30;

  let { allOpened, heads, newNewMap } = parse(inp);
  // let cash = {};

  return dfs(newNewMap.AA, { released: 0, opened: heads['AA'] }, 1);

  function dfs(node, { released, opened }, minutes) {
    // let key = `${node.name},${opened},${minutes}`;
    // if (key in cash) {
    //   return cash[key];
    // }
    if (opened === allOpened || minutes > maxMins) {
      return released;
    }

    let result = Math.max(
      ...node.next
        .filter(_nodeName => {
          let [nodeName] = _nodeName.split(',');
          return (opened & heads[nodeName]) === 0;
        })
        .map(_nodeName => {
          let [nodeName, cost] = _nodeName.split(',');

          let rate = newNewMap[nodeName].rate;
          let minLeft = maxMins - (minutes + +cost);

          return dfs(
            newNewMap[nodeName],
            {
              released: released + +rate * minLeft,
              opened: opened | heads[nodeName],
            },
            minutes + +cost + 1
          );
        })
    );
    // cash[key] = result;

    return result;
  }
}

function part2(inp) {
  let maxMins = 26;

  let { allOpened, heads, newNewMap } = parse(inp);
  let res = 0;

  let max = Math.floor(allOpened / 2);

  for (let i = 0; i < max; i++) {
    // console.log(i, max);
    let opened1 = i | heads['AA'];

    let res1 = dfs(newNewMap.AA, { released: 0, opened: opened1 }, 1);
    let res2 = dfs(newNewMap.AA, { released: 0, opened: opened1 ^ allOpened }, 1);

    res = Math.max(res, res1 + res2);
  }

  return res;

  function dfs(node, { released, opened }, minutes) {
    if (opened === allOpened || minutes > maxMins) {
      return released;
    }

    let result = Math.max(
      ...node.next
        .filter(_nodeName => {
          let [nodeName] = _nodeName.split(',');
          return (opened & heads[nodeName]) === 0;
        })
        .map(_nodeName => {
          let [nodeName, cost] = _nodeName.split(',');

          let rate = newNewMap[nodeName].rate;
          let minLeft = maxMins - (minutes + +cost);

          return dfs(
            newNewMap[nodeName],
            {
              released: released + +rate * minLeft,
              opened: opened | heads[nodeName],
            },
            minutes + +cost + 1
          );
        })
    );

    return result;
  }
}

function part2_cash(inp) {
  let { allOpened, heads, newNewMap } = parse(inp);
  let res = 0;
  let cash = {};

  let max = Math.floor(allOpened / 2);

  for (let i = 0; i < max; i++) {
    if (i % 10 === 0) {
      // console.log(i, max, Object.keys(cash).length);
    }
    let opened1 = i | heads['AA'];

    let res1 = dfs(newNewMap.AA, { released: 0, opened: opened1 }, 26);
    let res2 = dfs(newNewMap.AA, { released: 0, opened: opened1 ^ allOpened }, 26);

    res = Math.max(res, res1 + res2);
  }

  return res;

  function dfs(node, { released, opened }, minutes) {
    let key = `${node.name},${opened},${minutes}`;
    if (key in cash) {
      return cash[key];
    }

    let result = Math.max(
      ...node.next
        .map(_nodeName => {
          let [nodeName, cost] = _nodeName.split(',');

          let rate = +newNewMap[nodeName].rate;
          let remTime = minutes - +cost - 1;

          if (minutes <= 0 || (opened & heads[nodeName]) !== 0) {
            return 0;
          }

          return dfs(
            newNewMap[nodeName],
            {
              released: rate * remTime,
              opened: opened | heads[nodeName],
            },
            remTime
          );
        })
    );
    cash[key] = released + result;

    return released + result;
  }
}

function transformMap(map) {
  let valHeadsNames = [
    'AA',
    ...Object.values(map)
      .filter(({ rate, name }) => rate)
      .map(({ name }) => name),
  ];
  let newMap = {};

  valHeadsNames.forEach(fromName => {
    let next = [];
    for (let j = 0; j < valHeadsNames.length; j++) {
      let to = valHeadsNames[j];
      if (fromName !== to) {
        next.push(findPath(map, fromName, to));
      }
    }

    newMap[fromName] = { ...map[fromName], next: next };
  });

  return newMap;
}

function findPath(map, start, finish) {
  let results = [];

  dfs([start], 0);

  let [minScore, minArr] = results[0];
  results.forEach(([score, arr]) => {
    if (score < minScore) {
      minScore = score;
      minArr = arr;
    }
  });
  return finish + ',' + minScore;

  function dfs(path, score) {
    let last = path[path.length - 1];
    if (last === finish) {
      results.push([score, path]);
      return;
    }

    for (let i = 0; i < map[last].next.length; i++) {
      let [nodeName] = map[last].next[i].split(',');
      if (!path.includes(nodeName)) {
        dfs([...path, nodeName], score + 1);
      }
    }
  }
}
