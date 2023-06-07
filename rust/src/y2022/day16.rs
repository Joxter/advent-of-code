use std::collections::BTreeMap;

/*
the worst code ever
*/

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let (new_map, all_opened, heads) = parse(input);

    return dfs(&new_map, "AA", 0, 0, 1, all_opened, &heads);

    fn dfs(
        new_map: &BTreeMap<&str, Valve2>,
        node_name: &str,
        released: i32,
        opened: i32,
        minutes: i32,
        all_opened: i32,
        heads: &BTreeMap<&str, i32>,
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
        new_map: &BTreeMap<&str, Valve2>,
        node_name: &str,
        released: i32,
        opened: i32,
        minutes: i32,
        all_opened: i32,
        heads: &BTreeMap<&str, i32>,
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

fn parse(input: &str) -> (BTreeMap<&str, Valve2>, i32, BTreeMap<&str, i32>) {
    let mut map: BTreeMap<&str, Valve> = BTreeMap::new();

    let mut max_valves = 0;
    let mut heads: BTreeMap<&str, i32> = BTreeMap::new();

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

fn transform_map<'a, 'b>(map: &BTreeMap<&'a str, Valve<'b>>) -> BTreeMap<&'b str, Valve2<'b>> {
    let mut val_heads_names = vec!["AA"];

    val_heads_names.extend(map.iter().filter(|(_, v)| v.rate > 0).map(|(_, v)| v.name));

    let mut new_map: BTreeMap<&str, Valve2> = BTreeMap::new();

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

fn find_path<'a>(map: &BTreeMap<&str, Valve>, start: &str, finish: &'a str) -> (&'a str, i32) {
    let mut results: Vec<i32> = vec![];

    dfs(&mut results, vec![start], 0, finish, map);

    return (finish, *results.iter().min().unwrap());

    fn dfs(
        results: &mut Vec<i32>,
        path: Vec<&str>,
        score: i32,
        finish: &str,
        map: &BTreeMap<&str, Valve>,
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
    use std::collections::{BTreeMap, BinaryHeap, HashSet, VecDeque};
    use std::usize;

    // todo
    //   - realise I can't get more than I already have

    pub fn better_part1(input: &str) -> i32 {
        let (new_map, _all_opened, heads_bit_pos, min_cost) = parse(input);

        // println!("heads: {:?}", heads);
        // println!("new_map: {:?}", new_map);

        // (node_name, released, opened, minutes)
        let mut stack: Vec<(usize, i32, i32, i32)> = vec![(0, 0, 0, 30)];

        let mut max_released = 0;

        while let Some((node_name, released, opened, minutes)) = stack.pop() {
            for (nod_name, cost) in &new_map[node_name].next {
                // todo cheat "*cost < 4" give a huge advantage  (time 150msec -> 1msec)
                if (opened & heads_bit_pos[*nod_name]) == 0 {
                    let left_mins = minutes - cost;
                    if left_mins < min_cost {
                        if released > max_released {
                            max_released = released;
                        }
                    } else {
                        let rate = new_map[*nod_name].rate;
                        let new_released = released + rate * left_mins;
                        let new_opened = heads_bit_pos[*nod_name] | opened;
                        stack.push((*nod_name, new_released, new_opened, left_mins));
                    }
                }
            }
        }

        max_released
    }

    pub fn better_part2_based_on_part1(input: &str) -> i32 {
        let (new_map, _all_opened, heads_bit_pos, min_cost) = parse(input);

        // println!("heads: {:?}", heads_bit_pos);
        // println!("new_map: {:?}", new_map);

        /*
                new_map:
                [
                    0: ValveNum { rate: 0, name: "AA", next: [(1, 2), (2, 2), (3, 4), (4, 6), (5, 2), (6, 4), (7, 7), (8, 5), (9, 7), (10, 6), (11, 2), (12, 10), (13, 3), (14, 7), (15, 8)] },
                    1: ValveNum { rate: 18, name: "CO", next: [(2, 4), (3, 6), (4, 6), (5, 2), (6, 4), (7, 9), (8, 7), (9, 9), (10, 8), (11, 2), (12, 12), (13, 5), (14, 7), (15, 8)] },
                    2: ValveNum { rate: 10, name: "DW", next: [(1, 4), (3, 2), (4, 7), (5, 2), (6, 5), (7, 5), (8, 3), (9, 5), (10, 8), (11, 3), (12, 8), (13, 5), (14, 8), (15, 9)] },
                    3: ValveNum { rate: 16, name: "EW", next: [(1, 6), (2, 2), (4, 9), (5, 4), (6, 7), (7, 3), (8, 5), (9, 3), (10, 6), (11, 5), (12, 6), (13, 7), (14, 8), (15, 11)] },
                    4: ValveNum { rate: 21, name: "FD", next: [(1, 6), (2, 7), (3, 9), (5, 5), (6, 2), (7, 10), (8, 10), (9, 8), (10, 5), (11, 4), (12, 13), (13, 5), (14, 3), (15, 2)] },
                    5: ValveNum { rate: 6, name: "MJ", next: [(1, 2), (2, 2), (3, 4), (4, 5), (6, 3), (7, 7), (8, 5), (9, 7), (10, 8), (11, 3), (12, 10), (13, 5), (14, 6), (15, 7)] },
                    6: ValveNum { rate: 17, name: "OZ", next: [(1, 4), (2, 5), (3, 7), (4, 2), (5, 3), (7, 10), (8, 8), (9, 8), (10, 5), (11, 2), (12, 13), (13, 3), (14, 3), (15, 4)] },
                    7: ValveNum { rate: 22, name: "PL", next: [(1, 9), (2, 5), (3, 3), (4, 10), (5, 7), (6, 10), (8, 8), (9, 2), (10, 5), (11, 8), (12, 3), (13, 8), (14, 7), (15, 12)] },
                    8: ValveNum { rate: 14, name: "RU", next: [(1, 7), (2, 3), (3, 5), (4, 10), (5, 5), (6, 8), (7, 8), (9, 8), (10, 11), (11, 6), (12, 11), (13, 8), (14, 11), (15, 12)] },
                    9: ValveNum { rate: 19, name: "UD", next: [(1, 9), (2, 5), (3, 3), (4, 8), (5, 7), (6, 8), (7, 2), (8, 8), (10, 3), (11, 8), (12, 5), (13, 6), (14, 5), (15, 10)] },
                   10: ValveNum { rate: 24, name: "UU", next: [(1, 8), (2, 8), (3, 6), (4, 5), (5, 8), (6, 5), (7, 5), (8, 11), (9, 3), (11, 7), (12, 8), (13, 3), (14, 2), (15, 7)] },
                   11: ValveNum { rate: 11, name: "WH", next: [(1, 2), (2, 3), (3, 5), (4, 4), (5, 3), (6, 2), (7, 8), (8, 6), (9, 8), (10, 7), (12, 11), (13, 5), (14, 5), (15, 6)] },
                   12: ValveNum { rate: 25, name: "WJ", next: [(1, 12), (2, 8), (3, 6), (4, 13), (5, 10), (6, 13), (7, 3), (8, 11), (9, 5), (10, 8), (11, 11), (13, 11), (14, 10), (15, 15)] },
                   13: ValveNum { rate: 15, name: "YJ", next: [(1, 5), (2, 5), (3, 7), (4, 5), (5, 5), (6, 3), (7, 8), (8, 8), (9, 6), (10, 3), (11, 5), (12, 11), (14, 5), (15, 7)] },
                   14: ValveNum { rate: 20, name: "ZI", next: [(1, 7), (2, 8), (3, 8), (4, 3), (5, 6), (6, 3), (7, 7), (8, 11), (9, 5), (10, 2), (11, 5), (12, 10), (13, 5), (15, 5)] },
                   15: ValveNum { rate: 23, name: "ZM", next: [(1, 8), (2, 9), (3, 11), (4, 2), (5, 7), (6, 4), (7, 12), (8, 12), (9, 10), (10, 7), (11, 6), (12, 15), (13, 7), (14, 5)] }
               ]
        */

        // p (node_name, minutes), (node_name, minutes), released, visited, world_min
        let mut stack: Vec<((usize, i32), (usize, i32), i32, i32, i32)> =
            vec![((0, 26), (0, 26), 0, 0, 26)];

        let mut max_released = 0; // 2250
                                  // return max_released;

        // todo
        //   - remove duplicates
        while let Some((p1, p2, game_released, game_opened, game_minutes)) = stack.pop() {
            let (p1_node, p1_minutes) = p1;
            let (p2_node, p2_minutes) = p2;

            let mut p1_variants: Vec<(usize, i32, i32, i32)> = vec![];

            if p1_minutes == game_minutes {
                for (to_node_id, cost) in &new_map[p1_node].next {
                    let left_mins = game_minutes - cost;
                    if left_mins >= min_cost && (game_opened & heads_bit_pos[*to_node_id]) == 0 {
                        let rate = new_map[*to_node_id].rate;
                        let new_released = game_released + rate * left_mins;
                        let new_opened = heads_bit_pos[*to_node_id] | game_opened;

                        p1_variants.push((*to_node_id, new_released, new_opened, left_mins));
                    }
                }
            }
            if p1_variants.is_empty() {
                p1_variants.push((p1_node, game_released, game_opened, p1_minutes));
            }

            let mut variants: Vec<((usize, i32), (usize, i32), i32, i32, i32)> = vec![];
            if p2_minutes == game_minutes {
                for (p1_node_id, released, opened, p1_minutes) in &p1_variants {
                    for (to_node_id, cost) in &new_map[p2_node].next {
                        let left_mins = game_minutes - cost;
                        if left_mins >= min_cost && (opened & heads_bit_pos[*to_node_id]) == 0 {
                            let rate = new_map[*to_node_id].rate;
                            let new_released = released + rate * left_mins;
                            let new_opened = heads_bit_pos[*to_node_id] | opened;

                            let max_min = std::cmp::max(*p1_minutes, left_mins);
                            // p (node_name, minutes), (node_name, minutes), released, visited, world_min
                            variants.push((
                                (*p1_node_id, *p1_minutes),
                                (*to_node_id, left_mins),
                                new_released,
                                new_opened,
                                max_min,
                            ));
                        }
                    }
                }
            }
            if variants.is_empty() {
                for (p1_node_id, released, opened, p1_minutes) in &p1_variants {
                    let max_min = std::cmp::max(*p1_minutes, p2_minutes);
                    variants.push((
                        (*p1_node_id, *p1_minutes),
                        (p2_node, p2_minutes),
                        *released,
                        *opened,
                        max_min,
                    ));
                }
            }

            if variants.len() == 1 {
                let (_, _, rel, _, _) = variants[0];
                max_released = max_released.max(rel);
            } else {
                // for (p1, p2, released, opened, min) in &variants {
                //     println!(
                //         "stack item: {:?} {:?}, {released} {opened:0>16b}; time: {min}",
                //         p1, p2
                //     );
                // }
                // return 4;
                stack.extend(variants);
            }
        }

        max_released
    }

    #[derive(Debug)]
    struct BasicValve<'a> {
        rate: i32,
        next: Vec<&'a str>,
    }

    #[derive(Debug)]
    struct ValveNum<'a> {
        rate: i32,
        name: &'a str,
        next: Vec<(usize, i32)>,
    }

    fn parse(input: &str) -> (Vec<ValveNum>, i32, Vec<i32>, i32) {
        let mut map: BTreeMap<&str, BasicValve> = BTreeMap::new();

        let mut max_valves = 0;

        input.lines().for_each(|line| {
            let parts = Vec::from_iter(line.split_whitespace());

            let name = parts[1];
            let rate = parts[4][5..parts[4].len() - 1].parse::<i32>().unwrap();
            let next = Vec::from_iter(parts[9..].iter().map(|n| &n[0..2]));

            if rate > 0 && name != "AA" {
                max_valves += 1;
            }

            map.insert(name, BasicValve { rate, next });
        });
        let all_opened = i32::pow(2, max_valves) - 1;

        let (new_map, min_cost, heads_bit_pos) = transform_map(&map);

        (new_map, all_opened, heads_bit_pos, min_cost)
    }

    fn transform_map<'a>(
        map: &BTreeMap<&'a str, BasicValve<'a>>,
    ) -> (Vec<ValveNum<'a>>, i32, Vec<i32>) {
        let mut val_heads_names = vec!["AA"];
        let mut min_cost = i32::MAX;
        let mut heads_bit_pos = Vec::new();

        val_heads_names.extend(
            map.iter()
                .filter(|(_, v)| v.rate > 0)
                .map(|(n, _)| n.clone()),
        );

        let heads_to_num = val_heads_names
            .iter()
            .enumerate()
            .map(|(i, n)| (*n, i))
            .collect::<BTreeMap<&str, usize>>();

        let mut new_map = Vec::new();

        for (i, from_name) in val_heads_names.iter().enumerate() {
            heads_bit_pos.push(1 << i);

            let dist = find_path(map, from_name);
            let mut next = vec![];
            for to_name in &val_heads_names {
                if from_name != to_name && *to_name != "AA" {
                    let cost = dist[to_name] + 1; // "+ 1" time to open the valve
                    min_cost = i32::min(min_cost, cost);
                    next.push((heads_to_num[to_name], cost));
                }
            }

            new_map.push(ValveNum {
                rate: map.get(from_name).unwrap().rate,
                name: from_name,
                next,
            });
        }

        (new_map, min_cost, heads_bit_pos)
    }

    fn find_path<'a>(
        map: &BTreeMap<&'a str, BasicValve<'a>>,
        start: &'a str,
    ) -> BTreeMap<&'a str, i32> {
        let mut queue = VecDeque::new();
        let mut dist: BTreeMap<&str, i32> = map.iter().map(|(k, _)| (*k, i32::MAX)).collect();

        struct State<'a> {
            cost: i32,
            name: &'a str,
        }

        queue.push_front(State {
            cost: 0,
            name: start,
        });
        dist.entry(start).and_modify(|e| *e = 0);

        while let Some(State { name, cost }) = queue.pop_back() {
            if cost > *dist.get(&name).unwrap() {
                continue;
            }

            for next_node_name in &map.get(name).unwrap().next {
                if cost + 1 < *dist.get(next_node_name).unwrap() {
                    queue.push_front(State {
                        cost: cost + 1,
                        name: next_node_name,
                    });
                    dist.entry(next_node_name).and_modify(|e| *e = cost + 1);
                }
            }
        }

        dist
    }
}
