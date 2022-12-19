import fs from 'fs';

// https://adventofcode.com/2022/day/19

let testInput = fs.readFileSync('./testData.txt').toString();
let inputData = fs.readFileSync('./input.txt').toString();

console.log('test OK: ', part1(testInput), [33]);
console.log('answer: ', part1(inputData));

// console.log('test2 OK:', part1(testInput) === 123);
// console.log('answer2:', part1(inputData));

function part1(inp) {
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
        Math.max(+obsRobotClay),
        +geodeCostObs,
      ],
      number: +n,
    };
  });
  /*
  {
    oreRobot: [ 4, 0, 0 ],
    clayRobot: [ 2, 0, 0, 0 ],
    obsidianRobot: [ 3, 14, 0 ],
    geodeRobot: [ 2, 0, 7 ]
    MAX: [ 4, 14, 7 ]
  },
  {
    oreRobot: [ 2, 0, 0 ],
    clayRobot: [ 3, 0, 0, 0 ],
    obsidianRobot: [ 3, 8, 0 ],
    geodeRobot: [ 3, 0, 12 ] =>
    MAX: [ 3, 0, 12 ] =>
  }

*/

  // ore, clay, obsidian, geode
  return (
    // [blueprints[22]]
    blueprints
      // .slice(4, 11)
      .map((blueprint, i, blueprints) => {
        let max = simulateBlueprint(blueprint);
        console.log('blueprint', blueprint.number, max);
        return (i + 1) * max;
      })
      .reduce((sum, it) => sum + it, 0)
  );
}

function simulateBlueprint(blueprint) {
  const MAX_MINUTES = 24; // 24
  let storage = [0, 0, 0, 0];
  let robots = [1, 0, 0, 0];

  let maxGeo = 0;
  let saved = 0;

  goNext(storage, robots, 1);

  return maxGeo;

  // ore, clay, obsidian, geode
  function goNext(storage, robots, minute) {
    const isCanBuild = canBuild(storage, robots, blueprint, MAX_MINUTES - minute);

    if (minute > MAX_MINUTES) {
      if (storage[3] > maxGeo) {
        // render(storage, robots, isCanBuild, minute);
        maxGeo = storage[3];
      } else {
        // if (Math.random() * 5000000 < 1) {
        //   render(storage, robots, isCanBuild, minute);
        // }
      }
      return;
    }

    let wasBuildSomething = false;

    if (isCanBuild.geodeRobot) {
      wasBuildSomething = true;
      let newRobots = [...robots];
      newRobots[3]++;
      let storageAfterBuild = buildRobot(storage, blueprint.geodeRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      goNext(storageAfterCollect, newRobots, minute + 1);
    } else {

      if (isCanBuild.obsidianRobot) {
        wasBuildSomething = true;
        let newRobots = [...robots];
        newRobots[2]++;
        let storageAfterBuild = buildRobot(storage, blueprint.obsidianRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        goNext(storageAfterCollect, newRobots, minute + 1);
      }

      if (isCanBuild.clayRobot) {
        wasBuildSomething = true;
        let newRobots = [...robots];
        newRobots[1]++;
        let storageAfterBuild = buildRobot(storage, blueprint.clayRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        goNext(storageAfterCollect, newRobots, minute + 1);
      }

      if (isCanBuild.oreRobot) {
        wasBuildSomething = true;
        let newRobots = [...robots];
        newRobots[0]++;
        let storageAfterBuild = buildRobot(storage, blueprint.oreRobot);
        let storageAfterCollect = collectOres(storageAfterBuild, robots);
        goNext(storageAfterCollect, newRobots, minute + 1);
      }

      if (!wasBuildSomething) {
        let newRobots = [...robots];
        let storageAfterCollect = collectOres(storage, robots);
        goNext(storageAfterCollect, newRobots, minute + 1);
      }
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
  function howManyRobots(robotRequirements) {
    let st = [...storage];
    let cnt = 0;

    while (
      st[0] >= robotRequirements[0] &&
      st[1] >= robotRequirements[1] &&
      st[2] >= robotRequirements[2]
      ) {
      st[0] -= robotRequirements[0];
      st[1] -= robotRequirements[1];
      st[2] -= robotRequirements[2];
      cnt++;
    }

    return cnt;
  }

  return {
    oreRobot:
      storage[0] > timeLeft * blueprint.max[0]
        ? 0
        : robots[0] < blueprint.max[0] ? howManyRobots(blueprint.oreRobot) : 0,
    clayRobot: storage[1] > timeLeft * blueprint.max[1]
      ? 0
      : robots[1] < blueprint.max[1] ? howManyRobots(blueprint.clayRobot) : 0,
    obsidianRobot: storage[1] > timeLeft * blueprint.max[2]
      ? 0
      : robots[2] < blueprint.max[2] ? howManyRobots(blueprint.obsidianRobot) : 0,
    geodeRobot: howManyRobots(blueprint.geodeRobot),
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
blueprint 11 3 (2)
blueprint 12 5 (4)
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
blueprint 23 15 (14)
blueprint 24 13
blueprint 25 6
blueprint 26 3
blueprint 27 2
blueprint 28 0
blueprint 29 0
blueprint 30 15
*/

function part2(inp) {
  let result = 0;
  inp.trim().split('\n').forEach((line) => {
  });
  return result;
}