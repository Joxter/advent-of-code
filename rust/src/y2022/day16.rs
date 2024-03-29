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

fn transform_map<'b>(map: &BTreeMap<&str, Valve<'b>>) -> BTreeMap<&'b str, Valve2<'b>> {
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

#[allow(clippy::type_complexity)]
pub mod optimised {
    use std::cmp::Ordering;
    use std::collections::{BTreeMap, BinaryHeap, HashSet, VecDeque};
    use std::usize;

    pub fn part1(input: &str) -> i32 {
        let (new_map, _all_opened, heads_bit_pos, min_cost, total_power) = parse(input);

        // println!("heads: {:?}", heads);
        // println!("new_map: {:?}", new_map);

        // (node_name, released, opened, minutes)
        let mut stack: Vec<(usize, i32, i32, i32, i32)> = vec![(0, 0, 0, 30, total_power)];

        let mut max_released = 0;

        while let Some((node_name, released, opened, minutes, power_left)) = stack.pop() {
            for (nod_name, cost) in &new_map[node_name].next {
                let left_mins = minutes - cost;
                if (opened & heads_bit_pos[*nod_name]) == 0
                    && (released + power_left * left_mins >= max_released)
                {
                    if left_mins < min_cost {
                        if released > max_released {
                            max_released = released;
                        }
                    } else {
                        let rate = new_map[*nod_name].rate;
                        let new_released = released + rate * left_mins;
                        let new_opened = heads_bit_pos[*nod_name] | opened;
                        stack.push((
                            *nod_name,
                            new_released,
                            new_opened,
                            left_mins,
                            power_left - rate,
                        ));
                    }
                }
            }
        }

        max_released
    }

    pub fn part2(input: &str) -> i32 {
        let (new_map, _all_opened, heads_bit_pos, min_cost, total_power) = parse(input);

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

        let mut stack: Vec<((usize, i32), (usize, i32), i32, i32, i32, i32)> =
            vec![((0, 26), (0, 26), 0, 0, 26, total_power)];

        let mut max_released = 0;

        while let Some((p1, p2, game_released, game_opened, game_minutes, power_left)) = stack.pop()
        {
            let (p1_node, p1_minutes) = p1;
            let (p2_node, p2_minutes) = p2;

            let mut p1_variants: Vec<(usize, i32, i32, i32, i32)> = vec![];

            if game_released + power_left * (game_minutes - min_cost) < max_released {
                continue;
            }

            if p1_minutes == game_minutes {
                for (to_node_id, cost) in &new_map[p1_node].next {
                    let left_mins = game_minutes - cost;
                    if left_mins >= min_cost && (game_opened & heads_bit_pos[*to_node_id]) == 0 {
                        let rate = new_map[*to_node_id].rate;
                        let new_released = game_released + rate * left_mins;
                        let new_opened = heads_bit_pos[*to_node_id] | game_opened;

                        p1_variants.push((
                            *to_node_id,
                            new_released,
                            new_opened,
                            left_mins,
                            power_left - rate,
                        ));
                    }
                }
            }
            if p1_variants.is_empty() {
                p1_variants.push((p1_node, game_released, game_opened, p1_minutes, power_left));
            }

            let mut variants: Vec<((usize, i32), (usize, i32), i32, i32, i32, i32)> = vec![];
            if p2_minutes == game_minutes {
                for (p1_node_id, released, opened, p1_minutes, p1_power_left) in &p1_variants {
                    for (to_node_id, cost) in &new_map[p2_node].next {
                        let left_mins = game_minutes - cost;
                        if left_mins >= min_cost && (opened & heads_bit_pos[*to_node_id]) == 0
                        // && (p1_node_id > to_node_id || p1_variants.len() == 1) // todo fix removing duplicates
                        {
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
                                p1_power_left - rate,
                            ));
                        }
                    }
                }
            }
            if variants.is_empty() {
                for (p1_node_id, released, opened, p1_minutes, p1_pover_left) in &p1_variants {
                    let max_min = std::cmp::max(*p1_minutes, p2_minutes);
                    variants.push((
                        (*p1_node_id, *p1_minutes),
                        (p2_node, p2_minutes),
                        *released,
                        *opened,
                        max_min,
                        *p1_pover_left,
                    ));
                }
            }

            if variants.len() == 1 {
                let (_, _, rel, _, _, _) = variants[0];
                if rel > max_released {
                    max_released = rel;
                    // println!("max_released: {}", max_released)
                }
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

    // todo make alter part2, with approach from aive JS solution

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

    fn parse(input: &str) -> (Vec<ValveNum>, i32, Vec<i32>, i32, i32) {
        let mut map: BTreeMap<&str, BasicValve> = BTreeMap::new();

        let mut max_valves = 0;
        let mut total_power = 0;

        input.lines().for_each(|line| {
            let parts = Vec::from_iter(line.split_whitespace());

            let name = parts[1];
            let rate = parts[4][5..parts[4].len() - 1].parse::<i32>().unwrap();
            let next = Vec::from_iter(parts[9..].iter().map(|n| &n[0..2]));

            if rate > 0 && name != "AA" {
                max_valves += 1;
                total_power += rate;
            }

            map.insert(name, BasicValve { rate, next });
        });
        let all_opened = i32::pow(2, max_valves) - 1;

        let (new_map, min_cost, heads_bit_pos) = transform_map(&map);

        (new_map, all_opened, heads_bit_pos, min_cost, total_power)
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
                .map(|(n, _)| <&str>::clone(n)),
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

#[allow(clippy::all)]
pub mod not_my_smith61 {
    // https://github.com/smith61/advent_of_code/blob/main/src/year_2022/day_16.rs
    use std::cmp::{self, Reverse};
    use std::collections::BinaryHeap;

    use fxhash::FxHashMap;

    use ndarray::{Array2, Array3};

    struct SimulationState<const PART_COUNT: u8, const STEP_COUNT: u16> {
        node_count: u8,
        node_distances: Array2<u8>,
        flow_rates: Vec<u16>,
        max_flows: Vec<u16>,
    }

    impl<const PART_COUNT: u8, const STEP_COUNT: u16> SimulationState<PART_COUNT, STEP_COUNT> {
        fn new(input: &str) -> Self {
            let (node_distances, flow_rates, node_count) = Self::parse_input(input);
            assert!(node_count <= 16);

            Self {
                node_count,
                node_distances,
                flow_rates,
                max_flows: vec![0; 1 << node_count],
            }
        }

        fn build_max_flows_table(&mut self) {
            const SEEN_BIT: u16 = 1 << (u16::BITS - 1);

            let mut dp_cache = Array3::<u16>::zeros((
                1 << self.node_count,
                self.node_count as usize,
                STEP_COUNT as usize,
            ));

            let mut queue = BinaryHeap::<Reverse<(u16, usize, usize)>>::with_capacity(50000);
            queue.push(Reverse((0, self.node_count as usize, 0)));
            while let Some(Reverse((current_time, current_node, toggled_valves))) = queue.pop() {
                let rem_time = STEP_COUNT - current_time;
                let mut new_flow = if current_node != (self.node_count as usize) {
                    dp_cache[[toggled_valves, current_node, current_time as usize]]
                } else {
                    0
                };

                new_flow += self.flow_rates[current_node] * rem_time;
                new_flow |= SEEN_BIT;
                for next_node in 0..self.node_count as usize {
                    if toggled_valves & (1 << next_node) != 0 {
                        continue;
                    }

                    let distance = (self.node_distances[(current_node, next_node)] + 1) as u16;
                    if distance >= rem_time {
                        continue;
                    }

                    let new_toggled_valves = toggled_valves | (1 << next_node);
                    let entry = &mut dp_cache[[
                        new_toggled_valves,
                        next_node,
                        (current_time + distance) as usize,
                    ]];

                    if (*entry & SEEN_BIT) == 0 {
                        queue.push(Reverse((
                            current_time + distance,
                            next_node,
                            new_toggled_valves,
                        )));
                    }

                    *entry = cmp::max(*entry, new_flow);
                }

                self.max_flows[toggled_valves] = cmp::max(self.max_flows[toggled_valves], new_flow);
            }

            for index in 0..self.max_flows.len() {
                self.max_flows[index] &= !SEEN_BIT;
            }
        }

        fn run_simulation(&mut self) -> u64 {
            self.build_max_flows_table();
            if PART_COUNT == 1 {
                *self.max_flows.iter().max().unwrap() as u64
            } else {
                assert_eq!(PART_COUNT, 2);

                let mut dp_cache = vec![0; 1 << self.node_count];
                for toggled_valves in 0..(1 << self.node_count) {
                    let mut max_flow = self.max_flows[toggled_valves];
                    for valve in 0..self.node_count {
                        if toggled_valves & (1 << valve) == 0 {
                            continue;
                        }

                        max_flow = max_flow.max(dp_cache[toggled_valves & !(1 << valve)]);
                    }

                    dp_cache[toggled_valves] = max_flow;
                }

                let mut max_flow = 0;
                let mask = (1 << self.node_count) - 1;
                for toggled_valves in 0..(1 << self.node_count) {
                    let non_toggled_valves = !toggled_valves & mask;
                    let non_toggled_potential = dp_cache[non_toggled_valves];
                    max_flow = max_flow.max(self.max_flows[toggled_valves] + non_toggled_potential);
                }

                max_flow as u64
            }
        }

        fn parse_node_id(bytes: &[u8], index: &mut usize) -> u16 {
            let hb = bytes[*index + 0] as u16;
            let lb = bytes[*index + 1] as u16;
            *index += 2;
            (hb << 8) | lb
        }

        fn parse_input(input: &str) -> (Array2<u8>, Vec<u16>, u8) {
            let start_node_id = Self::parse_node_id(&[b'A', b'A'], &mut 0);

            let mut start_node_index = 0;
            let node_count = input
                .lines()
                .inspect(|line| {
                    let bytes = line.as_bytes();
                    if bytes["Valve XG has flow rate=".len()] != b'0' {
                        start_node_index += 1;
                    }
                })
                .count();

            let mut next_flow_node_idx = 0;
            let mut next_blocked_node_idx = node_count - 1;

            let mut node_ids = FxHashMap::default();
            let mut node_edges = FxHashMap::default();
            let mut flow_rates = vec![0; node_count];

            for line in input.lines() {
                let bytes = line.as_bytes();
                let mut index = "Valve ".len();
                let node_id = Self::parse_node_id(bytes, &mut index);

                index += " has flow rate=".len();
                let flow_rate = {
                    let mut val = 0;
                    while bytes[index] != b';' {
                        val = (val * 10) + ((bytes[index] - b'0') as u16);
                        index += 1;
                    }

                    val
                };

                index += "; tunnels lead to valve".len();
                if bytes[index] == b's' {
                    index += 2;
                } else {
                    index += 1;
                }

                let mut edges = Vec::new();
                while index < bytes.len() {
                    edges.push(Self::parse_node_id(bytes, &mut index));
                    index += 2;
                }

                let node_index = if node_id == start_node_id {
                    start_node_index
                } else if flow_rate == 0 {
                    let index = next_blocked_node_idx;
                    next_blocked_node_idx -= 1;
                    index
                } else {
                    let index = next_flow_node_idx;
                    next_flow_node_idx += 1;
                    index
                };

                node_ids.insert(node_id, node_index);
                node_edges.insert(node_index, edges);
                flow_rates[node_index] = flow_rate;
            }

            let mut node_distances = Array2::from_elem((node_count, node_count), u8::MAX / 2);
            for node_idx in 0..node_count {
                node_distances[(node_idx, node_idx)] = 0;
                for &edge in &node_edges[&node_idx] {
                    let dest_idx = node_ids[&edge];
                    node_distances[(node_idx, dest_idx)] = 1;
                }
            }

            for k in 0..node_count {
                for i in 0..node_count {
                    for j in 0..node_count {
                        node_distances[(i, j)] = cmp::min(
                            node_distances[(i, j)],
                            node_distances[(i, k)] + node_distances[(k, j)],
                        );
                    }
                }
            }

            (node_distances, flow_rates, next_flow_node_idx as u8)
        }
    }

    pub fn part1(input: &str) -> u64 {
        SimulationState::<1, 30>::new(input).run_simulation()
    }

    pub fn part2(input: &str) -> u64 {
        SimulationState::<2, 26>::new(input).run_simulation()
    }
}

pub mod not_my_zn6k1l {
    // https://www.reddit.com/r/adventofcode/comments/zn6k1l/comment/j0i7d5k/?context=3
    fn parse(input: &str) -> Option<Vec<(i32, Vec<i32>)>> {
        let regex = regex::Regex::new(
            r"Valve (..) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]*)",
        )
        .unwrap();

        let mut nodes = std::collections::HashMap::new();
        nodes.insert("AA".to_string(), 0usize);

        let mut graph = Vec::<(i32, Vec<usize>)>::new();
        graph.push((0, Vec::new()));

        let mut get_node = |key: &str| {
            let len = nodes.len();
            *nodes.entry(key.to_string()).or_insert(len)
        };

        for line in input.lines() {
            let captures = regex.captures(line)?;
            let node = get_node(captures.get(1).unwrap().as_str());
            if node == graph.len() {
                graph.push((
                    captures.get(2).unwrap().as_str().parse().unwrap(),
                    Vec::new(),
                ));
            } else {
                let node = graph.get_mut(node).unwrap();
                node.0 = captures.get(2).unwrap().as_str().parse().unwrap();
            };

            for neighbor in captures
                .get(3)
                .unwrap()
                .as_str()
                .split(',')
                .map(|str| get_node(str.trim()))
            {
                if neighbor == graph.len() {
                    graph.push((0, Vec::new()));
                }
                graph[node].1.push(neighbor);
            }
        }

        let mut reduced_nodes = std::collections::HashMap::new();
        reduced_nodes.insert(0, 0);
        for (node, (value, _)) in graph.iter().enumerate() {
            if *value != 0 {
                reduced_nodes.insert(node, reduced_nodes.len());
            }
        }

        let mut reduced_graph = vec![(0, vec![0; reduced_nodes.len()]); reduced_nodes.len()];

        for (node, (value, _)) in graph.iter().enumerate() {
            let reduced_node;

            if let Some(v) = reduced_nodes.get(&node) {
                reduced_node = *v;
            } else {
                continue;
            }

            reduced_graph[reduced_node].0 = *value;

            let mut visited = vec![false; nodes.len()];
            let mut queue = std::collections::VecDeque::new();

            visited[node] = true;
            queue.push_back((node, 1));

            while let Some((node, distance)) = queue.pop_front() {
                if let Some(&next) = reduced_nodes.get(&node) {
                    reduced_graph[reduced_node].1[next] = distance;
                }

                for &next in graph[node].1.iter() {
                    if !visited[next] {
                        visited[next] = true;
                        queue.push_back((next, distance + 1));
                    }
                }
            }
        }

        Some(reduced_graph)
    }

    fn dfs<const MAX: i32>(graph: &Vec<(i32, Vec<i32>)>) -> i32 {
        let mut visited = vec![false; graph.len()];
        let max_flow = graph.iter().map(|(flow, _)| *flow).sum();

        let mut max_score = 0;

        fn implementation<const MAX: i32>(
            graph: &Vec<(i32, Vec<i32>)>,
            node: usize,
            distance: i32,
            mut current_score: i32,
            visited: &mut [bool],
            max_score: &mut i32,
            max_flow: i32,
        ) {
            let (flow, costs) = graph.get(node).unwrap();
            let max_flow = max_flow - flow;

            current_score += flow * (MAX - distance);
            *max_score = (*max_score).max(current_score);

            visited[node] = true;

            for (next, cost) in costs.iter().copied().enumerate() {
                let distance = distance + cost;
                if !visited[next]
                    && distance <= MAX
                    && max_flow * (MAX - distance) + current_score > *max_score
                {
                    implementation::<MAX>(
                        graph,
                        next,
                        distance,
                        current_score,
                        visited,
                        max_score,
                        max_flow,
                    );
                }
            }

            visited[node] = false;
        }

        implementation::<MAX>(graph, 0, 0, 0, &mut visited, &mut max_score, max_flow);
        max_score
    }

    fn dfs2<const MAX: i32>(graph: &Vec<(i32, Vec<i32>)>) -> i32 {
        let mut visited = vec![false; graph.len()];
        let max_flow = graph.iter().map(|(flow, _)| *flow).sum();

        let mut max_score = 0;

        fn implementation<const MAX: i32>(
            graph: &Vec<(i32, Vec<i32>)>,
            nodes: (usize, usize),
            distance: (i32, i32),
            mut current_score: i32,
            visited: &mut [bool],
            max_score: &mut i32,
            max_flow: i32,
        ) {
            let (flow0, costs0) = graph.get(nodes.0).unwrap();
            let (flow1, costs1) = graph.get(nodes.1).unwrap();
            let max_flow = max_flow - flow0 - flow1;

            current_score += flow0 * (MAX - distance.0);
            current_score += flow1 * (MAX - distance.1);

            *max_score = (*max_score).max(current_score);

            visited[nodes.0] = true;
            visited[nodes.1] = true;

            for (next0, cost0) in costs0.iter().copied().enumerate() {
                let distance0 = distance.0 + cost0;
                if visited[next0] || distance0 > MAX {
                    continue;
                }
                for (next1, cost1) in costs1.iter().copied().enumerate() {
                    let distance1 = distance.1 + cost1;
                    if next0 == next1 || visited[next1] || distance1 > MAX {
                        continue;
                    }
                    if max_flow * (MAX - distance0.min(distance1)) + current_score > *max_score {
                        implementation::<MAX>(
                            graph,
                            (next0, next1),
                            (distance0, distance1),
                            current_score,
                            visited,
                            max_score,
                            max_flow,
                        );
                    }
                }
            }

            visited[nodes.0] = false;
            visited[nodes.1] = false;
        }

        implementation::<MAX>(
            graph,
            (0, 0),
            (0, 0),
            0,
            &mut visited,
            &mut max_score,
            max_flow,
        );
        max_score
    }

    pub fn part1(input: &str) -> i32 {
        let graph = parse(input).unwrap();

        dfs::<30>(&graph)
    }

    pub fn part2(input: &str) -> i32 {
        let mut graph = parse(input).unwrap();
        for node in graph.iter_mut() {
            node.1.push(0);
        }
        graph.push((0, vec![26; graph.len() + 1]));

        dfs2::<26>(&graph)
    }
}
