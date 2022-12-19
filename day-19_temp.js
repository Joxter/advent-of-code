let inputTest = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

let input = `Blueprint 1: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 15 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint  2: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 2 ore and 8 obsidian.
Blueprint  3: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint  4: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 15 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint  5: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 18 obsidian.
Blueprint  6: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 17 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint  7: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 12 clay. Each geode robot costs 4 ore and 19 obsidian.
Blueprint  8: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 15 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint  9: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 9 clay. Each geode robot costs 2 ore and 9 obsidian.
Blueprint 10: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 12 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 11: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 10 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint 12: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 6 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 13: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 14: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 15: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 18 obsidian.
Blueprint 16: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 4 ore and 10 obsidian.
Blueprint 17: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 18: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 19: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 13 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 20: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 21: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 4 ore and 15 obsidian.
Blueprint 22: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 2 ore and 15 obsidian.
Blueprint 23: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 5 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 24: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 25: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 26: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 6 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint 27: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 28: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 17 clay. Each geode robot costs 4 ore and 20 obsidian.
Blueprint 29: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 3 ore and 17 obsidian.
Blueprint 30: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 9 clay. Each geode robot costs 3 ore and 9 obsidian.`;

console.log("test OK:", part1(inputTest), [33]);
console.log("part1: ", part1(input));
/// 2103 LOW

function part1(inp) {
  let blueprints = inp.split("\n").map((line) => {
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
        (+oreCost + +clayCost + +obsRobotOre + +geodeCostOre) / 4 + 1,
        Math.max(+obsRobotClay) / 2 + 1,
        +geodeCostObs,
      ],
      number: n,
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

  /*
  console.log(blueprints[0]);

  let storage = [20, 120, 120, 20];
  let robots = [1, 0, 0, 0];

  console.log(canBuild(storage, robots, blueprints[0]));

  let robots2 = [1, 13, 6, 0];
  console.log(canBuild(storage, robots2, blueprints[0]));
  let robots3 = [2, 14, 7, 0];
  console.log(canBuild(storage, robots3, blueprints[0]));

  // console.log(blueprints);
  return;
*/

  // ore, clay, obsidian, geode

  return (
    blueprints
      // .slice(4, 11)
      .map((blueprint, i, blueprints) => {
        // console.log(blueprint);
        console.log("blueprint", blueprint.number, blueprints.length);
        return (i + 1) * simulateBlueprint(blueprint);
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
  console.log({ maxGeo });

  return maxGeo;

  // ore, clay, obsidian, geode
  function goNext(storage, robots, minute) {
    // console.log(minute);

    // render(storage, robots, minute);
    const isCanBuild = canBuild(storage, robots, blueprint);

    if (minute > MAX_MINUTES) {
      if (storage[3] > maxGeo) {
        // console.log(".............. maxGeo", storage[3]);
        // render(storage, robots, isCanBuild, minute);
        maxGeo = storage[3];
      } else {
        // if (Math.random() * 5000000 < 1) {
        //   render(storage, robots, isCanBuild, minute);
        // }
      }
      // console.log({ maxGeo });
      // render(storage, robots, minute);
      // console.log(storage, { maxGeo });
      return;
    }

    if (robots[2] === 0 && minute > 20) {
      // return;
    }

    // if currentGeo + ALL+POSSBILE < "maxGeo"
    let currentGeo = storage[3];
    let geoRobots = robots[3] || 1;
    let obsRobots = robots[2] || 1;
    let allPossibleGeo = geoRobots * (MAX_MINUTES - minute) + currentGeo + obsRobots + 1;
    if (minute > 15 && currentGeo + allPossibleGeo < maxGeo) {
      // console.log(saved++);
      // console.log({ currentGeo, allPossibleGeo, maxGeo });
      // render(storage, robots, minute);
      return;
    }

    if (
      isCanBuild.geodeRobot > 1 ||
      isCanBuild.obsidianRobot > 1 ||
      isCanBuild.clayRobot > 3 ||
      isCanBuild.oreRobot > 3
    ) {
      return;
    }

    if (isCanBuild.geodeRobot === 1) {
      let newRobots = [...robots];
      newRobots[3]++;
      let storageAfterBuild = buildRobot(storage, blueprint.geodeRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      goNext(storageAfterCollect, newRobots, minute + 1);
    } else if (isCanBuild.obsidianRobot) {
      let newRobots = [...robots];
      newRobots[2]++;
      let storageAfterBuild = buildRobot(storage, blueprint.obsidianRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      goNext(storageAfterCollect, newRobots, minute + 1);
    }

    if (isCanBuild.clayRobot) {
      let newRobots = [...robots];
      newRobots[1]++;
      let storageAfterBuild = buildRobot(storage, blueprint.clayRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      goNext(storageAfterCollect, newRobots, minute + 1);
    }

    if (isCanBuild.oreRobot) {
      let newRobots = [...robots];
      newRobots[0]++;
      let storageAfterBuild = buildRobot(storage, blueprint.oreRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      goNext(storageAfterCollect, newRobots, minute + 1);
    }

    let newRobots = [...robots];
    let storageAfterCollect = collectOres(storage, robots);
    goNext(storageAfterCollect, newRobots, minute + 1);
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

function canBuild(storage, robots, blueprint) {
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
      robots[0] < blueprint.max[0] ? howManyRobots(blueprint.oreRobot) : 0,
    clayRobot:
      robots[1] < blueprint.max[1] ? howManyRobots(blueprint.clayRobot) : 0,
    obsidianRobot:
      robots[2] < blueprint.max[2] ? howManyRobots(blueprint.obsidianRobot) : 0,
    geodeRobot: howManyRobots(blueprint.geodeRobot),
  };
}

function render(storage, robots, isCanBuild, minute) {
  // ore, clay, obsidian, geode
  console.log(`Minute:${String(minute).padStart(2, " ")}  ore  clay   obs   geo
storage:  ${storage.map((it) => String(it).padStart(4, " ")).join("  ")}
robots:   ${robots.map((it) => String(it).padStart(4, " ")).join("  ")}
can build    ${+isCanBuild.oreRobot}     ${+isCanBuild.clayRobot}     ${+isCanBuild.obsidianRobot}     ${+isCanBuild.geodeRobot}
`);
}

/*

 2103 LOW

  2062
blueprint 1 30
{ maxGeo: 1 }
blueprint 2 30
{ maxGeo: 0 }
blueprint 3 30
{ maxGeo: 1 }
blueprint 4 30
{ maxGeo: 1 }
blueprint 5 30
{ maxGeo: 0 }
blueprint 6 30
{ maxGeo: 0 }
blueprint 7 30
{ maxGeo: 0 }
blueprint 8 30
{ maxGeo: 1 }
blueprint 9 30
{ maxGeo: 10 }
blueprint 10 30
{ maxGeo: 5 }
blueprint 11 30
{ maxGeo: 2 }
blueprint 12 30
{ maxGeo: 4 }
blueprint 13 30
{ maxGeo: 3 }
blueprint 14 30
{ maxGeo: 0 }
blueprint 15 30
{ maxGeo: 0 }
blueprint 16 30
{ maxGeo: 5 }
blueprint 17 30
{ maxGeo: 9 }
blueprint 18 30
{ maxGeo: 6 }
blueprint 19 30
{ maxGeo: 3 }
blueprint 20 30
{ maxGeo: 5 }
blueprint 21 30
{ maxGeo: 0 }
blueprint 22 30
{ maxGeo: 0 }
blueprint 23 30
{ maxGeo: 15 }
blueprint 24 30
{ maxGeo: 13 }
blueprint 25 30
{ maxGeo: 6 }
blueprint 26 30
{ maxGeo: 3 }
blueprint 27 30
{ maxGeo: 2 }
blueprint 28 30
{ maxGeo: 0 }
blueprint 29 30
{ maxGeo: 0 }
blueprint 30 30
{ maxGeo: 12 }
part1:  2062
*/
