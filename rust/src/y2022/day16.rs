use std::collections::HashMap;

/*
the worst code ever
*/

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let (new_map, all_opened, heads) = parse(input);

    return dfs(&new_map, "AA", 0, 0, 1, all_opened, &heads);

    fn dfs(
        new_map: &HashMap<&str, Valve2>,
        node_name: &str,
        released: i32,
        opened: i32,
        minutes: i32,
        all_opened: i32,
        heads: &HashMap<&str, i32>,
    ) -> i32 {
        let max_mins = 30;
        if opened == all_opened || minutes > max_mins {
            return released;
        }

        new_map
            .get(node_name)
            .unwrap()
            .next
            .iter()
            .filter(|nod_name| {
                return nod_name.0 == "AA" || (opened & heads.get(nod_name.0).unwrap()) == 0;
            })
            .map(|(nod_name, cost)| {
                let rate = new_map.get(nod_name).unwrap().rate;
                let left_mins = max_mins - (minutes + cost);

                let new_opened = if *nod_name == "AA" {
                    opened
                } else {
                    heads.get(nod_name).unwrap() | opened
                };

                dfs(
                    new_map,
                    nod_name,
                    released + rate * left_mins,
                    new_opened,
                    minutes + cost + 1,
                    all_opened,
                    heads,
                )
            })
            .max()
            .unwrap()
    }
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let (new_map, all_opened, heads) = parse(input);
    let mut res = 0;
    let max = all_opened / 2;

    for i in 0..max {
        let opened1 = i;

        let res1 = dfs(&new_map, "AA", 0, opened1, 1, all_opened, &heads);
        let res2 = dfs(
            &new_map,
            "AA",
            0,
            opened1 ^ all_opened,
            1,
            all_opened,
            &heads,
        );

        res = i32::max(res, res1 + res2);
    }

    return res;

    fn dfs(
        new_map: &HashMap<&str, Valve2>,
        node_name: &str,
        released: i32,
        opened: i32,
        minutes: i32,
        all_opened: i32,
        heads: &HashMap<&str, i32>,
    ) -> i32 {
        let max_mins = 26;
        if opened == all_opened || minutes > max_mins {
            return released;
        }

        new_map
            .get(node_name)
            .unwrap()
            .next
            .iter()
            .filter(|nod_name| {
                return nod_name.0 == "AA" || (opened & heads.get(nod_name.0).unwrap()) == 0;
            })
            .map(|(nod_name, cost)| {
                let rate = new_map.get(nod_name).unwrap().rate;
                let left_mins = max_mins - (minutes + cost);

                let new_opened = if *nod_name == "AA" {
                    opened
                } else {
                    heads.get(nod_name).unwrap() | opened
                };

                dfs(
                    new_map,
                    nod_name,
                    released + rate * left_mins,
                    new_opened,
                    minutes + cost + 1,
                    all_opened,
                    heads,
                )
            })
            .max()
            .unwrap()
    }
}

struct Valve<'a> {
    rate: i32,
    next: Vec<&'a str>,
    name: &'a str,
}

struct Valve2<'a> {
    rate: i32,
    next: Vec<(&'a str, i32)>,
    name: &'a str,
}

fn parse(input: &str) -> (HashMap<&str, Valve2>, i32, HashMap<&str, i32>) {
    let mut map: HashMap<&str, Valve> = HashMap::new();

    let mut max_valves = 0;
    let mut heads: HashMap<&str, i32> = HashMap::new();

    input.lines().for_each(|line| {
        let parts = Vec::from_iter(line.split_whitespace());

        let name = parts[1];
        let rate = parts[4][5..parts[4].len() - 1].parse::<i32>().unwrap();
        let next = Vec::from_iter(parts[9..].iter().map(|n| &n[0..2]));

        if rate > 0 && name != "AA" {
            heads.insert(name, 1 << max_valves);
            max_valves += 1;
        }

        map.insert(name, Valve { rate, next, name });
    });
    let all_opened = i32::pow(2, max_valves) - 1;

    let new_map = transform_map(&map);

    (new_map, all_opened, heads)
}

fn transform_map<'a, 'b>(map: &HashMap<&'a str, Valve<'b>>) -> HashMap<&'b str, Valve2<'b>> {
    let mut val_heads_names = vec!["AA"];

    val_heads_names.extend(map.iter().filter(|(_, v)| v.rate > 0).map(|(_, v)| v.name));

    let mut new_map: HashMap<&str, Valve2> = HashMap::new();

    for from_name in &val_heads_names {
        let mut next = vec![];
        for to_name in &val_heads_names {
            if from_name != to_name {
                next.push(find_path(map, from_name, to_name));
            }
        }

        new_map.insert(
            from_name,
            Valve2 {
                name: from_name,
                rate: map.get(from_name).unwrap().rate,
                next,
            },
        );
    }

    new_map
}

fn find_path<'a>(map: &HashMap<&str, Valve>, start: &str, finish: &'a str) -> (&'a str, i32) {
    let mut results: Vec<i32> = vec![];

    dfs(&mut results, vec![start], 0, finish, map);

    return (finish, *results.iter().min().unwrap());

    fn dfs(
        results: &mut Vec<i32>,
        path: Vec<&str>,
        score: i32,
        finish: &str,
        map: &HashMap<&str, Valve>,
    ) {
        let last = path.last().unwrap();
        if *last == finish {
            results.push(score);
        }

        for node_name in &map.get(last).unwrap().next {
            if !path.contains(node_name) {
                let mut new_path = path.clone();
                new_path.push(node_name);
                dfs(results, new_path, score + 1, finish, map);
            }
        }
    }
}

pub mod optimised {
    use std::cmp::Ordering;
    use std::collections::{BinaryHeap, HashMap, VecDeque};
    use std::usize;

    // ideas
    //   - sort "new_map.get(node_name).unwrap().next" to go closest Valves first
    //   - need to reduce run_out_of_time, filter out paths that are too long

    pub fn better_part1(input: &str) -> i32 {
        let (new_map, all_opened, heads) = parse(input);
        let mut run_out_of_time = 0;

        // (node_name, released, opened, minutes)
        let mut stack = vec![("AA", 0, 0, 1)];
        let max_mins = 30;

        let mut max_released = 0;

        while let Some((node_name, released, opened, minutes)) = stack.pop() {
            if minutes > max_mins && opened != all_opened {
                run_out_of_time += 1;
                continue
            }
            if opened == all_opened || minutes > max_mins {
                if released > max_released {
                    max_released = released;
                    // println!("-- {}", max_released)
                }
                continue;
            }

            for (nod_name, cost) in &new_map.get(node_name).unwrap().next {
                if *nod_name == "AA" || (opened & heads.get(nod_name).unwrap()) == 0 {
                    let rate = new_map.get(nod_name).unwrap().rate;
                    let left_mins = max_mins - (minutes + cost);

                    let new_opened = if *nod_name == "AA" {
                        opened
                    } else {
                        heads.get(nod_name).unwrap() | opened
                    };

                    stack.push((
                        nod_name,
                        released + rate * left_mins,
                        new_opened,
                        minutes + cost + 1,
                    ));
                }
            }
        }

        println!("run_out_of_time: {}", run_out_of_time);
        return max_released;
    }

    pub fn better_part2(input: &str) -> i32 {
        let (new_map, all_opened, heads) = parse(input);
        let mut res = 0;
        let max = all_opened / 2;

        for i in 0..max {
            let opened1 = i;

            let res1 = dfs(&new_map, "AA", 0, opened1, 1, all_opened, &heads);
            let res2 = dfs(
                &new_map,
                "AA",
                0,
                opened1 ^ all_opened,
                1,
                all_opened,
                &heads,
            );

            res = i32::max(res, res1 + res2);
        }

        return res;

        fn dfs(
            new_map: &HashMap<&str, Valve2>,
            node_name: &str,
            released: i32,
            opened: i32,
            minutes: i32,
            all_opened: i32,
            heads: &HashMap<&str, i32>,
        ) -> i32 {
            let max_mins = 26;
            if opened == all_opened || minutes > max_mins {
                return released;
            }

            new_map
                .get(node_name)
                .unwrap()
                .next
                .iter()
                .filter(|nod_name| {
                    return nod_name.0 == "AA" || (opened & heads.get(nod_name.0).unwrap()) == 0;
                })
                .map(|(nod_name, cost)| {
                    let rate = new_map.get(nod_name).unwrap().rate;
                    let left_mins = max_mins - (minutes + cost);

                    let new_opened = if *nod_name == "AA" {
                        opened
                    } else {
                        heads.get(nod_name).unwrap() | opened
                    };

                    dfs(
                        new_map,
                        nod_name,
                        released + rate * left_mins,
                        new_opened,
                        minutes + cost + 1,
                        all_opened,
                        heads,
                    )
                })
                .max()
                .unwrap()
        }
    }

    #[derive(Debug)]
    struct Valve<'a> {
        rate: i32,
        next: Vec<&'a str>,
        name: &'a str,
    }

    #[derive(Debug)]
    struct Valve2<'a> {
        rate: i32,
        next: Vec<(&'a str, i32)>,
        name: &'a str,
    }

    fn parse(input: &str) -> (HashMap<&str, Valve2>, i32, HashMap<&str, i32>) {
        let mut map: HashMap<&str, Valve> = HashMap::new();

        let mut max_valves = 0;
        let mut heads: HashMap<&str, i32> = HashMap::new();

        input.lines().for_each(|line| {
            let parts = Vec::from_iter(line.split_whitespace());

            let name = parts[1];
            let rate = parts[4][5..parts[4].len() - 1].parse::<i32>().unwrap();
            let next = Vec::from_iter(parts[9..].iter().map(|n| &n[0..2]));

            if rate > 0 && name != "AA" {
                heads.insert(name, 1 << max_valves);
                max_valves += 1;
            }

            map.insert(name, Valve { rate, next, name });
        });
        let all_opened = i32::pow(2, max_valves) - 1;

        let new_map = transform_map(&map);

        (new_map, all_opened, heads)
    }

    fn transform_map<'a, 'b>(map: &HashMap<&'a str, Valve<'b>>) -> HashMap<&'b str, Valve2<'b>> {
        let mut val_heads_names = vec!["AA"];

        val_heads_names.extend(map.iter().filter(|(_, v)| v.rate > 0).map(|(_, v)| v.name));

        let mut new_map: HashMap<&str, Valve2> = HashMap::new();

        for from_name in &val_heads_names {
            let mut next = vec![];
            for to_name in &val_heads_names {
                if from_name != to_name {
                    next.push((*to_name, find_path(map, from_name, to_name)));
                }
            }

            new_map.insert(
                from_name,
                Valve2 {
                    name: from_name,
                    rate: map.get(from_name).unwrap().rate,
                    next,
                },
            );
        }

        new_map
    }

    fn find_path(map: &HashMap<&str, Valve>, start: &str, finish: &str) -> i32 {
        // Dijkstra’s algorithm :)

        let mut heap = BinaryHeap::new();
        let mut dist: HashMap<&str, i32> = map.iter().map(|(k, _)| (*k, i32::MAX)).collect();
        let mut max_len = 0;

        #[derive(Copy, Clone, Eq, PartialEq)]
        struct State<'a> {
            cost: i32,
            name: &'a str,
        }

        impl<'a> Ord for State<'a> {
            fn cmp(&self, other: &Self) -> Ordering {
                other.cost.cmp(&self.cost)
            }
        }
        impl<'a> PartialOrd for State<'a> {
            fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
                Some(self.cmp(other))
            }
        }

        heap.push(State {
            cost: 0,
            name: start,
        });
        dist.entry(start).and_modify(|e| *e = 0);

        while let Some(State { name, cost }) = heap.pop() {
            max_len = usize::max(max_len, heap.len());

            if name == finish {
                return cost;
            }
            if cost > *dist.get(&name).unwrap() {
                continue;
            }

            for next_node_name in &map.get(name).unwrap().next {
                let next_state = State {
                    cost: cost + 1,
                    name: next_node_name,
                };

                if next_state.cost < *dist.get(next_state.name).unwrap() {
                    heap.push(next_state);
                    dist.entry(next_state.name).and_modify(|e| *e = cost + 1);
                }
            }
        }

        unreachable!();
    }
}
