import {
  findInGrid,
  makeGrid,
  printGridCb,
  runDay,
  PriorityQueue,
} from "../../utils.js";

// https://adventofcode.com/2024/day/16

runDay(2024, 16, 1)
  //
  .part(1, part1) // (32 sec) -> (optimised to 0.390 sec)
  .part(1, part1dijkstra, "Dijkstra rock!") // (0:00.066 min)
  .part(2, part2) // (1:05 min) -> (optimised to 6.8sec)
  // .part(2, part2dijkstra) // TODO
  .end();

function part1(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let finish = findInGrid(grid, "E");
  let max = Infinity;

  let maxpoins = {};

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let q = [[start, 0, [], [0, 1]]];

  while (q.length > 0) {
    let [position, score, visited, dir] = q.shift();

    if (score > max) continue;

    let [i, j] = position;
    let k = `${i},${j}`;

    if (!maxpoins[k]) maxpoins[k] = score;

    if (score > maxpoins[k]) continue;
    if (score < maxpoins[k]) maxpoins[k] = score;

    if (grid[i][j] === "#") continue;
    if (visited.includes(k)) continue;

    if (i === finish[0] && j === finish[1]) {
      if (max > score) max = score;
      continue;
    }

    for (const d of dirs) {
      let add = d === dir ? 1 : 1001;
      if (d[0] === -dir[0] && d[1] === -dir[1]) continue;

      q.push([[i + d[0], j + d[1]], score + add, [...visited, k], d]);
    }
  }

  return max;
}

function part2(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let finish = findInGrid(grid, "E");
  let best = part1(inp);

  let maxpoins = {};
  let bestTies = {};

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let q = [[start, 0, [], [0, 1]]];

  while (q.length > 0) {
    let [position, score, visited, dir] = q.shift();

    let [i, j] = position;
    let k = `${i},${j}`;

    if (grid[i][j] === "#") continue;

    if (!maxpoins[k]) maxpoins[k] = score;

    if (score > maxpoins[k] + 1001) continue;
    if (score < maxpoins[k]) maxpoins[k] = score;

    if (visited.includes(k)) continue;

    if (i === finish[0] && j === finish[1]) {
      if (best === score) {
        bestTies = {
          ...bestTies,
          ...Object.fromEntries(visited.map((it) => [it, it])),
        };
      }
      continue;
    }
    if (score > best) continue;

    for (const d of dirs) {
      let add = d === dir ? 1 : 1001;
      if (d[0] === -dir[0] && d[1] === -dir[1]) continue;

      q.push([[i + d[0], j + d[1]], score + add, [...visited, k], d]);
    }
  }

  return Object.keys(bestTies).length + 1;
}

function part1dijkstra(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let finish = findInGrid(grid, "E");

  let visited = {};
  let q = new PriorityQueue();

  q.push(0, [start, 0, [], [0, 1]]);

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (!q.isEmpty()) {
    let [position, score, dir] = q.pop();

    let [i, j] = position;
    if (grid[i][j] === "#") continue;

    if (i === finish[0] && j === finish[1]) return score;

    let k = `${i},${j}`;
    if (visited[k] && visited[k] < score) continue;
    visited[k] = score;

    for (const d of dirs) {
      let add = d === dir ? 1 : 1001;

      q.push(score + add, [[i + d[0], j + d[1]], score + add, d]);
    }
  }
}

function part2dijkstra(inp) {
  let grid = makeGrid(inp.trim());

  let start = findInGrid(grid, "S");
  let finish = findInGrid(grid, "E");

  let visited = {};
  let q = new PriorityQueue();

  q.push(0, [start, 0, [], [0, 1], ["0,0"]]);

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (!q.isEmpty()) {
    let [position, score, dir, path] = q.pop();

    let [i, j] = position;
    if (grid[i][j] === "#") continue;

    if (i === finish[0] && j === finish[1]) {
      visited[finish.join(",")] = score;
      break;
    }

    let k = `${i},${j}`;
    if (visited[k] && visited[k] < score) continue;
    visited[k] = score;

    for (const d of dirs) {
      let add = d === dir ? 1 : 1001;
      visited[k] = score;

      q.push(score + add, [[i + d[0], j + d[1]], score + add, d, [...path, k]]);
    }
  }

  let all = {};
  dfs([...finish], visited[finish.join(",")] + 1);

  function dfs(pos, prevScore) {
    let [i, j] = pos;
    if (grid[i][j] === "#") return;

    let k = `${i},${j}`;

    // if (k === `7,4`) debugger;
    if (visited[k] === prevScore - 1 || visited[k] === prevScore - 1001) {
      all[k] = true;
      for (const d of dirs) {
        dfs([i + d[0], j + d[1]], visited[k]);
      }
    }
  }

  // print(grid, visited);
  // print(grid, all);
  // console.log(visited);
  // console.log(all);
  return Object.keys(all).length;
}

function print(grid, scores) {
  console.log(
    printGridCb(grid, (cell, i, j) => {
      let k = `${i},${j}`;
      // if (scores[k]) return String(scores[k]).padStart(6, " ");
      if (scores[k]) return String(k).padStart(6, " ");
      return cell.repeat(6);
    }),
  );
}

/*
##########################################################################################
######  5016  6017  6018  6019  6020  6021  6022######........................EEEEEE######
######  5015######  7017##################  7023######......##################  7035######
######  5014  6015  6016  6017  6018######  7024######............  7020######  7034######
######  5013##################  7019##############################  7019######  7033######
######  5012######  3010######  6020  6019  6018  6017  5016  6017  6018######  7032######
######  5011######  3009##############################  5015##################  7031######
######  4010  4009  3008  4009  3010  4011  4012  4013  4014  4015  4016######  7030######
##################  3007######  3009##############################  5017######  7029######
######  1004  2005  2006######  3008  4009  4010  4011  4012######  5018######  7028######
######  1003######  3005######  3007##################  5013######  5019######  7027######
######  1002  2003  2004  2005  2006######  5012  6013  5014######  5020######  7026######
######  1001##################  3007######  5011######  5013######  5021######  7025######
######  2002  1001  1002######  3008  4009  4010  4011  4012######  5022  6023  6024######
##########################################################################################

##########################################################################################
######..........................................######........................  1,13######
######......######......##################......######......##################  2,13######
######..............................######......######..................######  3,13######
######......##################......##############################......######  4,13######
######......######......######..........................................######  5,13######
######......######......##############################......##################  6,13######
######........................   7,5   7,6   7,7   7,8   7,9  7,10  7,11######  7,13######
##################......######   8,5##############################  8,11######  8,13######
######..................######   9,5........................######  9,11######  9,13######
######......######......######  10,5##################......###### 10,11###### 10,13######
######  11,1  11,2  11,3  11,4  11,5######..................###### 11,11###### 11,13######
######  12,1##################......######......######......###### 12,11###### 12,13######
######SSSSSS............######..............................###### 13,11 13,12 13,13######
##########################################################################################

###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############

###############
#.......#....O#
#.#.###.#.###O#
#.....#.#...#O#
#.###.#####.#O#
#.#.#.......#O#
#.#.#####.###O#
#..OOOOOOOOO#O#
###O#O#####O#O#
#OOO#O....#O#O#
#O#O#O###.#O#O#
#OOOOO#...#O#O#
#O###.#.#.#O#O#
#O..#.....#OOO#
###############

*/
