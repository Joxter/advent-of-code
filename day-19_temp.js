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

  let storage = [0, 0, 0, 0];
  let robots = [1, 0, 0, 0];

  console.log(blueprints);
  render(storage, robots, 3);

  storage = [0, 20, 0, 93];
  robots = [51, 0, 30, 0];
  render(storage, robots, 13);
  return 3;
}

function render(storage, robots, min) {
  // ore, clay, obsidian, geode
  console.log(`Minute:${String(min).padStart(2, " ")}  ore  clay   obs   geo
storage:  ${storage.map((it) => String(it).padStart(4, " ")).join("  ")}
robots:   ${robots.map((it) => String(it).padStart(4, " ")).join("  ")}
`);
}
