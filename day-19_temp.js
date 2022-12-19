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
  simulateBlueprint(blueprints[0]);

  return 3;
}

function simulateBlueprint(blueprint) {
  let storage = [0, 0, 0, 0];
  let robots = [1, 0, 0, 0];

  for (let minute = 1; minute <= 24; minute++) {
    const isCanBuild = canBuild(storage, blueprint);

    let newRobots = [...robots];
    if (isCanBuild.geodeRobot) {
      newRobots[3]++;
      buildRobot(storage, blueprint.geodeRobot);
      //
    } else if (isCanBuild.obsidianRobot) {
      newRobots[2]++;
      buildRobot(storage, blueprint.obsidianRobot);
      //
    } else if (isCanBuild.clayRobot) {
      newRobots[1]++;
      buildRobot(storage, blueprint.clayRobot);
      //
    } else if (isCanBuild.oreRobot) {
      newRobots[0]++;
      buildRobot(storage, blueprint.oreRobot);
      //
    }

    // ore, clay, obsidian, geode

    storage[0] += robots[0];
    storage[1] += robots[1];
    storage[2] += robots[2];
    storage[3] += robots[3];

    robots = newRobots;
    render(storage, robots, minute);
    console.log();
  }

  return storage[3];
}

function buildRobot(storage, robotRequirements) {
  storage[0] -= robotRequirements[0];
  storage[1] -= robotRequirements[1];
  storage[2] -= robotRequirements[2];
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

function render(storage, robots, min) {
  // ore, clay, obsidian, geode
  console.log(`Minute:${String(min).padStart(2, " ")}  ore  clay   obs   geo
storage:  ${storage.map((it) => String(it).padStart(4, " ")).join("  ")}
robots:   ${robots.map((it) => String(it).padStart(4, " ")).join("  ")}
`);
}
