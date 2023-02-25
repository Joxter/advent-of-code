use std::collections::{HashMap, HashSet};

#[allow(clippy::let_and_return)]
pub fn naive_js_copy_part1(input: &str) -> i32 {
    let blueprints = parse(input);

    blueprints
        .iter()
        .map(|blueprint| {
            let max = simulate(blueprint, 24);
            // println!("blueprint {} {}", blueprint.number, max);
            blueprint.number * max
        })
        .sum()
}

#[allow(clippy::let_and_return)]
pub fn naive_js_copy_part2(input: &str) -> i32 {
    let blueprints = parse(input);

    blueprints
        .iter()
        .take(3)
        .map(|blueprint| {
            let max = simulate(blueprint, 32);
            // println!("blueprint {} {}", blueprint.number, max);
            max
        })
        .product()
}

#[derive(Debug)]
struct Blueprint {
    ore_bot: Resource,
    clay_bot: Resource,
    obsidian_bot: Resource,
    geode_bot: Resource,
    max: [i32; 3],
    number: i32,
}

#[derive(Eq, Hash, PartialEq, Debug, Clone)]
struct Resource {
    ore: i32,
    clay: i32,
    obsidian: i32,
    geode: i32,
}

struct CanBuild {
    ore_bot: bool,
    clay_bot: bool,
    obsidian_bot: bool,
    geode_bot: bool,
}

type MyCash = HashMap<(Resource, Resource, i32), i32>;

fn simulate(blueprint: &Blueprint, max_minutes: i32) -> i32 {
    let storage = Resource {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0,
    };
    let robots = Resource {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0,
    };

    let mut max_geo = 0;
    let mut cash: MyCash = HashMap::new();

    return dfs(
        &storage,
        &robots,
        1,
        &mut cash,
        max_minutes,
        &mut max_geo,
        blueprint,
    );

    fn dfs(
        storage: &Resource,
        robots: &Resource,
        minute: i32,
        cash: &mut MyCash,
        max_minutes: i32,
        max_geo: &mut i32,
        blueprint: &Blueprint,
    ) -> i32 {
        let key = (storage.clone(), robots.clone(), minute);
        if cash.contains_key(&key) {
            return *cash.get(&key).unwrap();
        }

        if minute > max_minutes {
            *max_geo = i32::max(storage.geode, *max_geo);
            return *max_geo;
        }

        let n = max_minutes - minute + robots.geode;
        let opt_geo = storage.geode + (n * (1 + n) / 2);
        if opt_geo < *max_geo {
            return 0;
        }

        let is_can_build = can_build(storage, robots, blueprint, max_minutes - minute);
        let mut loc_max = 0;
        if is_can_build.geode_bot {
            let mut new_robots = robots.clone();
            new_robots.geode += 1;
            let storage_after_build = build_robot(storage, &blueprint.geode_bot);
            let storage_after_collect = collect_ores(&storage_after_build, robots);
            loc_max = i32::max(
                loc_max,
                dfs(
                    &storage_after_collect,
                    &new_robots,
                    minute + 1,
                    cash,
                    max_minutes,
                    max_geo,
                    blueprint,
                ),
            );
        } else {
            if is_can_build.obsidian_bot {
                let mut new_robots = robots.clone();
                new_robots.obsidian += 1;
                let storage_after_build = build_robot(storage, &blueprint.obsidian_bot);
                let storage_after_collect = collect_ores(&storage_after_build, robots);
                loc_max = i32::max(
                    loc_max,
                    dfs(
                        &storage_after_collect,
                        &new_robots,
                        minute + 1,
                        cash,
                        max_minutes,
                        max_geo,
                        blueprint,
                    ),
                );
            }

            if is_can_build.clay_bot {
                let mut new_robots = robots.clone();
                new_robots.clay += 1;
                let storage_after_build = build_robot(storage, &blueprint.clay_bot);
                let storage_after_collect = collect_ores(&storage_after_build, robots);
                loc_max = i32::max(
                    loc_max,
                    dfs(
                        &storage_after_collect,
                        &new_robots,
                        minute + 1,
                        cash,
                        max_minutes,
                        max_geo,
                        blueprint,
                    ),
                );
            }

            if is_can_build.ore_bot {
                let mut new_robots = robots.clone();
                new_robots.ore += 1;
                let storage_after_build = build_robot(storage, &blueprint.ore_bot);
                let storage_after_collect = collect_ores(&storage_after_build, robots);
                loc_max = i32::max(
                    loc_max,
                    dfs(
                        &storage_after_collect,
                        &new_robots,
                        minute + 1,
                        cash,
                        max_minutes,
                        max_geo,
                        blueprint,
                    ),
                );
            }

            let new_robots = robots.clone();
            let storage_after_collect = collect_ores(storage, robots);
            loc_max = i32::max(
                loc_max,
                dfs(
                    &storage_after_collect,
                    &new_robots,
                    minute + 1,
                    cash,
                    max_minutes,
                    max_geo,
                    blueprint,
                ),
            );
        }

        cash.insert(key, loc_max);

        loc_max
    }
}

fn parse(input: &str) -> Vec<Blueprint> {
    Vec::from_iter(input.lines().enumerate().map(|(n, line)| {
        let aaa = Vec::from_iter(
            line.split_whitespace()
                .filter_map(|s| match s.parse::<i32>() {
                    Ok(n) => Some(n),
                    Err(_) => None,
                }),
        );

        let ore_cost = aaa[0];
        let clay_cost = aaa[1];
        let obs_robot_ore = aaa[2];
        let obs_robot_clay = aaa[3];
        let geode_cost_ore = aaa[4];
        let geode_cost_obs = aaa[5];

        let ore_max = vec![ore_cost, clay_cost, obs_robot_ore, geode_cost_ore]
            .into_iter()
            .max()
            .unwrap();
        Blueprint {
            number: n as i32 + 1,
            ore_bot: Resource {
                ore: ore_cost,
                clay: 0,
                obsidian: 0,
                geode: 0,
            },
            clay_bot: Resource {
                ore: clay_cost,
                clay: 0,
                obsidian: 0,
                geode: 0,
            },
            obsidian_bot: Resource {
                ore: obs_robot_ore,
                clay: obs_robot_clay,
                obsidian: 0,
                geode: 0,
            },
            geode_bot: Resource {
                ore: geode_cost_ore,
                clay: 0,
                obsidian: geode_cost_obs,
                geode: 0,
            },
            max: [ore_max, obs_robot_clay, geode_cost_obs],
        }
    }))
}

fn build_robot(storage: &Resource, robot_requirements: &Resource) -> Resource {
    Resource {
        ore: storage.ore - robot_requirements.ore,
        clay: storage.clay - robot_requirements.clay,
        obsidian: storage.obsidian - robot_requirements.obsidian,
        geode: storage.geode - robot_requirements.geode,
    }
}

fn collect_ores(storage: &Resource, robots: &Resource) -> Resource {
    Resource {
        ore: storage.ore + robots.ore,
        clay: storage.clay + robots.clay,
        obsidian: storage.obsidian + robots.obsidian,
        geode: storage.geode + robots.geode,
    }
}

fn can_build(
    storage: &Resource,
    robots: &Resource,
    blueprint: &Blueprint,
    time_left: i32,
) -> CanBuild {
    let can = |robot_requirements: &Resource| -> bool {
        storage.ore >= robot_requirements.ore
            && storage.clay >= robot_requirements.clay
            && storage.obsidian >= robot_requirements.obsidian
    };

    CanBuild {
        ore_bot: if storage.ore > time_left * blueprint.max[0] {
            false
        } else if robots.ore < blueprint.max[0] {
            can(&blueprint.ore_bot)
        } else {
            false
        },
        clay_bot: if storage.clay > time_left * blueprint.max[1] {
            false
        } else if robots.clay < blueprint.max[1] {
            can(&blueprint.clay_bot)
        } else {
            false
        },
        obsidian_bot: if storage.obsidian > time_left * blueprint.max[2] {
            false
        } else if robots.obsidian < blueprint.max[2] {
            can(&blueprint.obsidian_bot)
        } else {
            false
        },
        geode_bot: can(&blueprint.geode_bot),
    }
}
