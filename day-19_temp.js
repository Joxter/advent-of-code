let input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

console.log("test OK:", part1(input), [33]);
// console.log("part1: ", part1(input));

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

    return {
      oreRobot: [+oreCost, 0, 0],
      clayRobot: [+clayCost, 0, 0, 0],
      obsidianRobot: [+obsRobotOre, +obsRobotClay, 0],
      geodeRobot: [+geodeCostOre, 0, +geodeCostObs],
    };
  });

  // ore, clay, obsidian, geode

  return blueprints
    .map((blueprint, i) => {
      console.log("blueprint", i + 1);
      return (i + 1) * simulateBlueprint(blueprint);
    })
    .reduce((sum, it) => sum + it, 0);
}

function simulateBlueprint(blueprint) {
  let storage = [0, 0, 0, 0];
  let robots = [1, 0, 0, 0];

  let maxGeo = 0;

  goNext(storage, robots, 1);
  console.log({ maxGeo });

  return maxGeo;

  // ore, clay, obsidian, geode
  function goNext(storage, robots, minute) {
    // console.log(minute);
    if (minute > 24) {
      maxGeo = Math.max(maxGeo, storage[3]);
      // console.log({ maxGeo });
      // render(storage, robots, minute);
      // console.log(storage, { maxGeo });
      return;
    }

    if (robots[2] === 0 && minute > 12) {
      return;
    }
    // render(storage, robots, minute);
    const isCanBuild = canBuild(storage, blueprint);

    if (isCanBuild.geodeRobot) {
      // console.log("build geodeRobot");
      let newRobots = [...robots];
      newRobots[3]++;
      let storageAfterBuild = buildRobot(storage, blueprint.geodeRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      goNext(storageAfterCollect, newRobots, minute + 1);
    }

    if (isCanBuild.obsidianRobot) {
      // console.log("build obsidianRobot");
      let newRobots = [...robots];
      newRobots[2]++;
      let storageAfterBuild = buildRobot(storage, blueprint.obsidianRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      goNext(storageAfterCollect, newRobots, minute + 1);
    }

    if (isCanBuild.clayRobot) {
      // console.log("build clayRobot");
      let newRobots = [...robots];
      newRobots[1]++;
      let storageAfterBuild = buildRobot(storage, blueprint.clayRobot);
      let storageAfterCollect = collectOres(storageAfterBuild, robots);
      goNext(storageAfterCollect, newRobots, minute + 1);
    }

    if (isCanBuild.oreRobot) {
      // console.log("build oreRobot");
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

function canBuild(storage, blueprint) {
  // ore, clay, obsidian, geode
  function canBuildRobot(storage, robotRequirements) {
    if (storage[0] < robotRequirements[0]) return false;
    if (storage[1] < robotRequirements[1]) return false;
    if (storage[2] < robotRequirements[2]) return false;

    return true;
  }

  return {
    oreRobot: canBuildRobot(storage, blueprint.oreRobot),
    clayRobot: canBuildRobot(storage, blueprint.clayRobot),
    obsidianRobot: canBuildRobot(storage, blueprint.obsidianRobot),
    geodeRobot: canBuildRobot(storage, blueprint.geodeRobot),
  };
}

function render(storage, robots, minute) {
  // ore, clay, obsidian, geode
  console.log(`Minute:${String(minute).padStart(2, " ")}  ore  clay   obs   geo
storage:  ${storage.map((it) => String(it).padStart(4, " ")).join("  ")}
robots:   ${robots.map((it) => String(it).padStart(4, " ")).join("  ")}
`);
}
