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
    //   - save sum of all rates, like it is a maximum impossible score

    pub fn better_part1(input: &str) -> i32 {
        let (new_map, all_opened, heads, total_rate) = parse(input);

        // println!("total_rate: {}", total_rate); // 261
        // println!("heads: {:?}", heads);
        // println!("new_map: {:?}", new_map);

        // (node_name, released, opened, minutes)
        let mut stack: Vec<(&str, i32, i32, i32)> = vec![("AA", 0, 0, 1)];
        let max_mins = 30;

        let mut max_released = 0; // 2250
                                  // let mut run_out_of_time = 0; // 4_703_853

        /*
        new_map: {"UU": Valve2 { rate: 24, next: [("AA", 6), ("CO", 8), ("RU", 11), ("ZM", 7), ("WH", 7), ("UD", 3), ("PL", 5), ("FD", 5), ("DW", 8), ("OZ", 5), ("YJ", 3), ("EW", 6), ("MJ", 8), ("WJ", 8), ("ZI", 2)], name: "UU" }, "UD": Valve2 { rate: 19, next: [("AA", 7), ("CO", 9), ("RU", 8), ("ZM", 10), ("WH", 8), ("PL", 2), ("FD", 8), ("DW", 5), ("OZ", 8), ("YJ", 6), ("EW", 3), ("MJ", 7), ("WJ", 5), ("UU", 3), ("ZI", 5)], name: "UD" }, "WJ": Valve2 { rate: 25, next: [("AA", 10), ("CO", 12), ("RU", 11), ("ZM", 15), ("WH", 11), ("UD", 5), ("PL", 3), ("FD", 13), ("DW", 8), ("OZ", 13), ("YJ", 11), ("EW", 6), ("MJ", 10), ("UU", 8), ("ZI", 10)], name: "WJ" }, "FD": Valve2 { rate: 21, next: [("AA", 6), ("CO", 6), ("RU", 10), ("ZM", 2), ("WH", 4), ("UD", 8), ("PL", 10), ("DW", 7), ("OZ", 2), ("YJ", 5), ("EW", 9), ("MJ", 5), ("WJ", 13), ("UU", 5), ("ZI", 3)], name: "FD" }, "MJ": Valve2 { rate: 6, next: [("AA", 2), ("CO", 2), ("RU", 5), ("ZM", 7), ("WH", 3), ("UD", 7), ("PL", 7), ("FD", 5), ("DW", 2), ("OZ", 3), ("YJ", 5), ("EW", 4), ("WJ", 10), ("UU", 8), ("ZI", 6)], name: "MJ" }, "ZM": Valve2 { rate: 23, next: [("AA", 8), ("CO", 8), ("RU", 12), ("WH", 6), ("UD", 10), ("PL", 12), ("FD", 2), ("DW", 9), ("OZ", 4), ("YJ", 7), ("EW", 11), ("MJ", 7), ("WJ", 15), ("UU", 7), ("ZI", 5)], name: "ZM" }, "PL": Valve2 { rate: 22, next: [("AA", 7), ("CO", 9), ("RU", 8), ("ZM", 12), ("WH", 8), ("UD", 2), ("FD", 10), ("DW", 5), ("OZ", 10), ("YJ", 8), ("EW", 3), ("MJ", 7), ("WJ", 3), ("UU", 5), ("ZI", 7)], name: "PL" }, "YJ": Valve2 { rate: 15, next: [("AA", 3), ("CO", 5), ("RU", 8), ("ZM", 7), ("WH", 5), ("UD", 6), ("PL", 8), ("FD", 5), ("DW", 5), ("OZ", 3), ("EW", 7), ("MJ", 5), ("WJ", 11), ("UU", 3), ("ZI", 5)], name: "YJ" }, "AA": Valve2 { rate: 0, next: [("CO", 2), ("RU", 5), ("ZM", 8), ("WH", 2), ("UD", 7), ("PL", 7), ("FD", 6), ("DW", 2), ("OZ", 4), ("YJ", 3), ("EW", 4), ("MJ", 2), ("WJ", 10), ("UU", 6), ("ZI", 7)], name: "AA" }, "ZI": Valve2 { rate: 20, next: [("AA", 7), ("CO", 7), ("RU", 11), ("ZM", 5), ("WH", 5), ("UD", 5), ("PL", 7), ("FD", 3), ("DW", 8), ("OZ", 3), ("YJ", 5), ("EW", 8), ("MJ", 6), ("WJ", 10), ("UU", 2)], name: "ZI" }, "EW": Valve2 { rate: 16, next: [("AA", 4), ("CO", 6), ("RU", 5), ("ZM", 11), ("WH", 5), ("UD", 3), ("PL", 3), ("FD", 9), ("DW", 2), ("OZ", 7), ("YJ", 7), ("MJ", 4), ("WJ", 6), ("UU", 6), ("ZI", 8)], name: "EW" }, "DW": Valve2 { rate: 10, next: [("AA", 2), ("CO", 4), ("RU", 3), ("ZM", 9), ("WH", 3), ("UD", 5), ("PL", 5), ("FD", 7), ("OZ", 5), ("YJ", 5), ("EW", 2), ("MJ", 2), ("WJ", 8), ("UU", 8), ("ZI", 8)], name: "DW" }, "RU": Valve2 { rate: 14, next: [("AA", 5), ("CO", 7), ("ZM", 12), ("WH", 6), ("UD", 8), ("PL", 8), ("FD", 10), ("DW", 3), ("OZ", 8), ("YJ", 8), ("EW", 5), ("MJ", 5), ("WJ", 11), ("UU", 11), ("ZI", 11)], name: "RU" }, "WH": Valve2 { rate: 11, next: [("AA", 2), ("CO", 2), ("RU", 6), ("ZM", 6), ("UD", 8), ("PL", 8), ("FD", 4), ("DW", 3), ("OZ", 2), ("YJ", 5), ("EW", 5), ("MJ", 3), ("WJ", 11), ("UU", 7), ("ZI", 5)], name: "WH" }, "OZ": Valve2 { rate: 17, next: [("AA", 4), ("CO", 4), ("RU", 8), ("ZM", 4), ("WH", 2), ("UD", 8), ("PL", 10), ("FD", 2), ("DW", 5), ("YJ", 3), ("EW", 7), ("MJ", 3), ("WJ", 13), ("UU", 5), ("ZI", 3)], name: "OZ" }, "CO": Valve2 { rate: 18, next: [("AA", 2), ("RU", 7), ("ZM", 8), ("WH", 2), ("UD", 9), ("PL", 9), ("FD", 6), ("DW", 4), ("OZ", 4), ("YJ", 5), ("EW", 6), ("MJ", 2), ("WJ", 12), ("UU", 8), ("ZI", 7)], name: "CO" }}
        */

        while let Some((node_name, released, opened, minutes)) = stack.pop() {
            // println!("{} {} {} {}", node_name, released, opened, minutes);
            if minutes > max_mins && opened != all_opened {
                // run_out_of_time += 1;
                // continue;
            }

            // let opened_AA = path.iter().filter(|n| **n == "AA").count();
            // if opened_AA > 1 {
            //     // println!("opened_AA: {}", opened_AA);
            //     continue;
            // }

            if minutes > max_mins {
                if released > max_released {
                    max_released = released;
                    // println!("{} {:b} {}", opened.count_ones(), opened, minutes);
                    // println!("-- {}", max_released);
                }
                // println!("open - {}", released);
                continue;
            }

            for (nod_name, cost) in &new_map.get(node_name).unwrap().next {
                if (opened & heads.get(nod_name).unwrap()) == 0 {
                    let rate = new_map.get(nod_name).unwrap().rate;
                    let left_mins = max_mins - (minutes + cost);

                    let new_opened = heads.get(nod_name).unwrap() | opened;

                    stack.push((
                        nod_name,
                        released + rate * left_mins,
                        new_opened,
                        minutes + cost + 1,
                    ));
                }
            }
        }

        max_released
    }

    pub fn better_part2(input: &str) -> i32 {
        let (new_map, all_opened, heads, _total_rate) = parse(input);
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
                .filter(|(nod_name, _)| {
                    return (opened & heads.get(nod_name).unwrap()) == 0;
                })
                .map(|(nod_name, cost)| {
                    let rate = new_map.get(nod_name).unwrap().rate;
                    let left_mins = max_mins - (minutes + cost);

                    let new_opened = heads.get(nod_name).unwrap() | opened;

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

    fn parse(input: &str) -> (HashMap<&str, Valve2>, i32, HashMap<&str, i32>, i32) {
        let mut map: HashMap<&str, Valve> = HashMap::new();

        let mut max_valves = 0;
        let mut heads: HashMap<&str, i32> = HashMap::new();
        let mut total_rate = 0;

        input.lines().for_each(|line| {
            let parts = Vec::from_iter(line.split_whitespace());

            let name = parts[1];
            let rate = parts[4][5..parts[4].len() - 1].parse::<i32>().unwrap();
            let next = Vec::from_iter(parts[9..].iter().map(|n| &n[0..2]));

            if rate > 0 && name != "AA" {
                heads.insert(name, 1 << max_valves);
                max_valves += 1;
                total_rate += rate;
            }

            map.insert(name, Valve { rate, next, name });
        });
        let all_opened = i32::pow(2, max_valves) - 1;

        let new_map = transform_map(&map);

        (new_map, all_opened, heads, total_rate)
    }

    fn transform_map<'a, 'b>(map: &HashMap<&'a str, Valve<'b>>) -> HashMap<&'b str, Valve2<'b>> {
        let mut val_heads_names = vec!["AA"];

        val_heads_names.extend(map.iter().filter(|(_, v)| v.rate > 0).map(|(_, v)| v.name));

        let mut new_map: HashMap<&str, Valve2> = HashMap::new();

        for from_name in &val_heads_names {
            let mut next = vec![];
            for to_name in &val_heads_names {
                if from_name != to_name && *to_name != "AA" {
                    // todo remove hack
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
