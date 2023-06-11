import fs from 'fs';
import { runSolution } from '../../utils.js';

// https://adventofcode.com/2022/day/19

let folder = '../inputs/d19/';
let testInput = fs.readFileSync(folder + 'test.txt').toString();
let inputData = fs.readFileSync(folder + 'input.txt').toString();

//                                                                 cash   optGeo
runSolution('test  ', () => part1(testInput), 33); //    sec 24     4.2      0.9
runSolution('part_1', () => part1(inputData), 2193); //  sec 157   32.4     15.0

runSolution('test  ', () => part2(testInput), 3410); //  sec          -      5.1
runSolution('part_2', () => part2(inputData), 7200); //  sec          -     13.8

function parse(inp) {
  let blueprints = inp.split('\n').map((line) => {
    let [
      ,
      n,
      oreCost,
      clayCost,
      obsRobotOre,
      obsRobotClay,
      geodeCostOre,
      geodeCostObs,
    ] = line.split(/\D+/);

    let robots = {
      oreRobot: [+oreCost, 0, 0],
      clayRobot: [+clayCost, 0, 0],
      obsidianRobot: [+obsRobotOre, +obsRobotClay, 0],
      geodeRobot: [+geodeCostOre, 0, +geodeCostObs],
    };

    return {
      ...robots,
      max: [
        Math.max(+oreCost, +clayCost, +obsRobotOre, +geodeCostOre),
        +obsRobotClay,
        +geodeCostObs,
      ],
      number: +n,
    };
  });
  return blueprints;
}

function part1(inp) {
  let blueprints = parse(inp);

  return (
    blueprints
      .map((blueprint, i) => {
        let max = simulateBlueprint(blueprint, 24);
        console.log('blueprint', blueprint.number, max);
        return (i + 1) * max;
      })
      .reduce((sum, it) => sum + it, 0)
  );
}

function part2(inp) {
  let blueprints = parse(inp);

  return (
    blueprints
      .slice(0, 3)
      .map((blueprint) => {
        let max = simulateBlueprint(blueprint, 32);
        console.log('blueprint', blueprint.number, max);
        return max;
      })
      .reduce((sum, it) => sum * it, 1)
  );
}

function simulateBlueprint(blueprint, maxMinutes) {
  let storage = [0, 0, 0, 0];
  let robots = [1, 0, 0, 0];

  let maxGeo = 0;
  let cash = {};

  dfs(storage, robots, 1);

  return maxGeo;

  function dfs(storage, robots, minute) {
    let key = `${storage.join(',')},${robots.join(',')},${minute}`;
    if (key in cash) {
      return cash[key];
    }
    if (minute > maxMinutes) {
      if (storage[3] > maxGeo) {
        maxGeo = storage[3];
      }
      return storage[3];
    }

    let n = (maxMinutes - minute) + robots[3];
    let optGeo = storage[3] + Math.floor(n * (1 + n) / 2);
    if (optGeo < maxGeo) {
      return 0;
    }

    const isCanBuild = canBuild(storage, robots, blueprint, maxMinutes - minute);
    let locMax = 0;

    if (isCanBuild.geodeRobot) {
      let newRobots = [...robots];
      newRobots[3]++;
      let storageAfterBuild = buildRobot(storage, blueprint.geodeRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);

      locMax = Math.max(locMax, dfs(storageAfterCollect, newRobots, minute + 1));
    } else {

      if (isCanBuild.obsidianRobot) {
        let newRobots = [...robots];
        newRobots[2]++;
        let storageAfterBuild = buildRobot(storage, blueprint.obsidianRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        locMax = Math.max(locMax, dfs(storageAfterCollect, newRobots, minute + 1));
      }

      if (isCanBuild.clayRobot) {
        let newRobots = [...robots];
        newRobots[1]++;
        let storageAfterBuild = buildRobot(storage, blueprint.clayRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        locMax = Math.max(locMax, dfs(storageAfterCollect, newRobots, minute + 1));
      }

      if (isCanBuild.oreRobot) {
        let newRobots = [...robots];
        newRobots[0]++;
        let storageAfterBuild = buildRobot(storage, blueprint.oreRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        locMax = Math.max(locMax, dfs(storageAfterCollect, newRobots, minute + 1));
      }

      let newRobots2 = [...robots];
      let storageAfterCollect2 = collectOres(storage, robots);
      locMax = Math.max(locMax, dfs(storageAfterCollect2, newRobots2, minute + 1));
    }

    cash[key] = locMax;

    return locMax;
  }

}

function collectOres(storage, robots) {
  storage[0] += robots[0];
  storage[1] += robots[1];
  storage[2] += robots[2];
  storage[3] += robots[3];
  return storage;
}

function buildRobot(storage, robotRequirements) {
  let newStorage = [...storage];
  newStorage[0] -= robotRequirements[0];
  newStorage[1] -= robotRequirements[1];
  newStorage[2] -= robotRequirements[2];
  return newStorage;
}

function canBuild(storage, robots, blueprint, timeLeft) {
  function can(robotRequirements) {
    return storage[0] >= robotRequirements[0] &&
      storage[1] >= robotRequirements[1] &&
      storage[2] >= robotRequirements[2];
  }

  return {
    oreRobot:
      storage[0] > timeLeft * blueprint.max[0]
        ? false
        : robots[0] < blueprint.max[0]
          ? can(blueprint.oreRobot)
          : false,
    clayRobot: storage[1] > timeLeft * blueprint.max[1]
      ? false
      : robots[1] < blueprint.max[1]
        ? can(blueprint.clayRobot)
        : false,
    obsidianRobot: storage[1] > timeLeft * blueprint.max[2]
      ? false
      : robots[2] < blueprint.max[2]
        ? can(blueprint.obsidianRobot)
        : false,
    geodeRobot: can(blueprint.geodeRobot),
  };
}

function render(storage, robots, isCanBuild, minute) {
  // ore, clay, obsidian, geode
  console.log(`Minute:${String(minute).padStart(2, ' ')}  ore  clay   obs   geo
storage:  ${storage.map((it) => String(it).padStart(4, ' ')).join('  ')}
robots:   ${robots.map((it) => String(it).padStart(4, ' ')).join('  ')}
can build    ${+isCanBuild.oreRobot}     ${+isCanBuild.clayRobot}     ${+isCanBuild.obsidianRobot}     ${+isCanBuild.geodeRobot}
`);
}
