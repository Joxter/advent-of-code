import fs from 'fs';
import { runSolution } from '../utils.js';

// https://adventofcode.com/2022/day/19

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

// runSolution('test  ', () => part1(testInput), 33);  // sec 24
// runSolution('part_1', () => part1(inputData), 2193) // sec 157

runSolution('test  ', () => part2(testInput), 56);
// runSolution('part_2', () => part2(inputData));

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
      .map((blueprint, i, blueprints) => {
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
      .map((blueprint, i, blueprints) => {
        let max = simulateBlueprint(blueprint, 32);
        console.log('blueprint', blueprint.number, max);
        return (i + 1) * max;
      })
      .reduce((sum, it) => sum + it, 0)
  );
}

function simulateBlueprint(blueprint, maxMinutes) {
  let storage = [0, 0, 0, 0];
  let robots = [1, 0, 0, 0];

  let maxGeo = 0;
  let saved = 0;

  dfs(storage, robots, 1);

  return maxGeo;

  // ore, clay, obsidian, geode
  function dfs(storage, robots, minute) {
    if (minute > maxMinutes) {
      if (storage[3] > maxGeo) {
        maxGeo = storage[3];
      }
      return;
    }

    const isCanBuild = canBuild(storage, robots, blueprint, maxMinutes - minute);

    if (isCanBuild.geodeRobot) {
      let newRobots = [...robots];
      newRobots[3]++;
      let storageAfterBuild = buildRobot(storage, blueprint.geodeRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      dfs(storageAfterCollect, newRobots, minute + 1);
    } else {

      if (isCanBuild.obsidianRobot) {
        let newRobots = [...robots];
        newRobots[2]++;
        let storageAfterBuild = buildRobot(storage, blueprint.obsidianRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        dfs(storageAfterCollect, newRobots, minute + 1);
      }

      if (isCanBuild.clayRobot) {
        let newRobots = [...robots];
        newRobots[1]++;
        let storageAfterBuild = buildRobot(storage, blueprint.clayRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        dfs(storageAfterCollect, newRobots, minute + 1);
      }

      if (isCanBuild.oreRobot) {
        let newRobots = [...robots];
        newRobots[0]++;
        let storageAfterBuild = buildRobot(storage, blueprint.oreRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        dfs(storageAfterCollect, newRobots, minute + 1);
      }

      let newRobots2 = [...robots];
      let storageAfterCollect2 = collectOres(storage, robots);
      dfs(storageAfterCollect2, newRobots2, minute + 1);
    }
  }
}

function collectOres(storage, robots) {
  let newStorage = [...storage];
  newStorage[0] += robots[0];
  newStorage[1] += robots[1];
  newStorage[2] += robots[2];
  newStorage[3] += robots[3];
  return newStorage;
}

function buildRobot(storage, robotRequirements) {
  let newStorage = [...storage];
  newStorage[0] -= robotRequirements[0];
  newStorage[1] -= robotRequirements[1];
  newStorage[2] -= robotRequirements[2];
  return newStorage;
}

function canBuild(storage, robots, blueprint, timeLeft) {
  // ore, clay, obsidian, geode
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

/*

correct:
2193
blueprint 1 1
blueprint 2 0
blueprint 3 1
blueprint 4 1
blueprint 5 0
blueprint 6 0
blueprint 7 0
blueprint 8 1
blueprint 9 10
blueprint 10 5
blueprint 11 3
blueprint 12 5
blueprint 13 3
blueprint 14 0
blueprint 15 0
blueprint 16 5
blueprint 17 9
blueprint 18 7
blueprint 19 3
blueprint 20 5
blueprint 21 0
blueprint 22 0
blueprint 23 15
blueprint 24 13
blueprint 25 6
blueprint 26 3
blueprint 27 2
blueprint 28 0
blueprint 29 0
blueprint 30 15
*/
