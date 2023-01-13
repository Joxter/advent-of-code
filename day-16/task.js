import fs from 'fs';

// https://adventofcode.com/2022/day/16

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput, 30) === 1651);
console.log('answer: ', part1(inputData, 30), [2250]);

console.log('test2 OK:', part1(testInput, 26) === 1707);
// console.log('answer2:', part1(inputData, 26));

function part1(inp, maxMins) {
  let map = {}
  let maxValves = 1

  inp.split('\n').forEach(line => {
    let [_, name, rate, next] = /Valve\s(..).+rate=(\d+).+valve[s]? (.+)/.exec(line)

    if (+rate) maxValves++
    map[name] = {
      rate: +rate,
      next: next.split(', '),
      name,
    }
  })

  let newNewMap = addRoads(map)

  let ans = goNext(newNewMap.AA, { released: 0, opened: ['AA'], path: '', rawPath: ['AA'] }, 1)
  return ans

  function goNext(node, { released, opened, path, rawPath }, minutes) {
    if (opened.length === maxValves || minutes > maxMins) {
      return released
    }

    return Math.max(
      ...node.next
        .filter(_nodeName => {
          let [nodeName] = _nodeName.split(',')
          return !rawPath.includes(nodeName)
        })
        .map(_nodeName => {
          let [nodeName, cost] = _nodeName.split(',')

          let rate = newNewMap[nodeName].rate
          let minLeft = maxMins - (minutes + +cost)

          let ifIGo = goNext(
            newNewMap[nodeName],
            {
              rawPath: [...rawPath, nodeName],
              path:
                path +
                `\n [${minutes}] go to: ${nodeName} (cost ${cost})` +
                `\n [${minutes + 1}] open: ${nodeName} (${rate}*${minLeft})`,
              released: released + +rate * minLeft,
              opened: [...opened, nodeName],
            },
            minutes + +cost + 1
          )

          return ifIGo
        })
    )
  }
}

function part2(inp, maxMins) {
  let map = {}
  let maxValves = 1

  inp.split('\n').forEach(line => {
    let [_, name, rate, next] = /Valve\s(..).+rate=(\d+).+valve[s]? (.+)/.exec(line)

    if (+rate) maxValves++
    map[name] = {
      rate: +rate,
      next: next.split(', '),
      name,
    }
  })

  let newNewMap = addRoads(map)

  return splitCases()

  function splitCases() {
    let heads = Object.keys(newNewMap).filter(it => it !== 'AA')
    let allCases = permutationIterator(heads)

    let from = Math.floor(heads.length / 3)
    let to = Math.floor(heads.length / 2)

    let result = 0

    for (let currCase of allCases) {
      for (let j = from; j <= to; j++) {
        let myArr = ['AA', ...currCase.slice(0, j)]
        let elArr = ['AA', ...currCase.slice(j)]
        let myScore = testPath(myArr)
        let elScore = testPath(elArr)

        result = Math.max(result, myScore + elScore)
      }
    }

    return result
  }

  function testPath(path) {
    let released = 0
    let [curPoint, ...tail] = path
    let minutes = 1

    tail.forEach(nodeName => {
      let cost = +newNewMap[curPoint].next
        .filter(it => {
          return it.startsWith(nodeName)
        })
        .map(it => {
          return it.split(',')[1]
        })

      let rate = newNewMap[nodeName].rate
      let minLeft = maxMins - (minutes + +cost)
      released += +rate * minLeft
      minutes += +cost + 1

      curPoint = nodeName
    })
    return released
  }
}

function addRoads(map) {
  let valHeadsNames = [
    'AA',
    ...Object.values(map)
      .filter(({ rate, name }) => rate)
      .map(({ name }) => name),
  ]
  let newMap = {}

  valHeadsNames.forEach(fromName => {
    let next = []
    for (let j = 0; j < valHeadsNames.length; j++) {
      let to = valHeadsNames[j]
      if (fromName !== to) {
        next.push(findPath(map, fromName, to))
      }
    }

    newMap[fromName] = { ...map[fromName], next: next }
  })

  return newMap
}

function findPath(map, start, finish) {
  let results = []

  dfs([start], 0)

  let [minScore, minArr] = results[0]
  results.forEach(([score, arr], i) => {
    if (score < minScore) {
      minScore = score
      minArr = arr
    }
  })
  return finish + ',' + minScore

  function dfs(path, score) {
    let last = path[path.length - 1]
    if (last === finish) {
      results.push([score, path])
      return
    }

    for (let i = 0; i < map[last].next.length; i++) {
      let [nodeName] = map[last].next[i].split(',')
      if (!path.includes(nodeName)) {
        dfs([...path, nodeName], score + 1)
      }
    }
  }
}

function render(map, lastLeftRock, lastRightRock, bottom) {
  let result = ''

  for (let y = -1; y <= bottom + 2; y++) {
    let row = ''
    for (let x = lastLeftRock - 2; x < lastRightRock + 2; x++) {
      row += map[x + ',' + y] || '.'
    }
    result += String(y).padStart(3, '0') + ' ' + row + '\n'
  }

  console.log(result)
}

function* permutationIterator(object) {
  if (object == null || object.length === 0) return
  const keys = Object.keys(object)
  for (const indexes of permutate(keys)) {
    yield indexes.map(i => object[i])
  }
}

// Heap's method, time complexity O(N)
function* permutate(array) {
  const { length } = array
  const c = new Array(length).fill(0)
  let i = 1

  yield array.slice()
  while (i < length) {
    if (c[i] < i) {
      const k = i % 2 && c[i]
      const p = array[i]
      array[i] = array[k]
      array[k] = p
      ++c[i]
      i = 1
      yield array.slice()
    } else {
      c[i] = 0
      ++i
    }
  }
}
