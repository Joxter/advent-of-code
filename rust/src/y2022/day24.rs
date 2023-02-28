use std::collections::{HashMap, HashSet, VecDeque};

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let (map, winds_cash, start) = parse(input);

    let mov = HashMap::from([('^', (-1, 0)), ('v', (1, 0)), ('<', (0, -1)), ('>', (0, 1))]);

    let mut q_set = HashSet::new();
    q_set.insert((start, 0));
    let mut queue = VecDeque::from([(start, 0)]);

    while !queue.is_empty() {
        let (position, minute) = queue.pop_front().unwrap();
        q_set.remove(&(position, minute));

        let min_winds = &winds_cash[minute + 1];

        for (delta_row, delta_col) in mov.values() {
            let new_row = (position.0 as i32 + delta_row) as usize;
            let new_col = (position.1 as i32 + delta_col) as usize;

            if let Some(char) = map.get(new_row).and_then(|r| r.get(new_col)) {
                if *char == '.' {
                    if !min_winds.contains_key(&(new_row, new_col)) {
                        if !q_set.contains(&((new_row, new_col), minute + 1)) {
                            queue.push_back(((new_row, new_col), minute + 1));
                            q_set.insert(((new_row, new_col), minute + 1));
                        }

                        if new_row == map.len() - 1 {
                            return minute as i32 + 1;
                        }
                    }
                }
            }
        }

        if !min_winds.contains_key(&position) {
            queue.push_back((position, minute + 1));
            q_set.insert((position, minute + 1));
        }
    }

    unreachable!();
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let (map, winds_cash, start) = parse(input);

    let mov = HashMap::from([('^', (-1, 0)), ('v', (1, 0)), ('<', (0, -1)), ('>', (0, 1))]);

    let mut q_set = HashSet::new();
    q_set.insert((start, 0, "finish"));
    let mut queue = VecDeque::from([(start, 0, "finish")]);

    while !queue.is_empty() {
        let (position, minute, goal) = queue.pop_front().unwrap();
        q_set.remove(&(position, minute, "finish"));

        let min_winds = &winds_cash[minute + 1];

        for (delta_row, delta_col) in mov.values() {
            let new_row = (position.0 as i32 + delta_row) as usize;
            let new_col = (position.1 as i32 + delta_col) as usize;

            if let Some(char) = map.get(new_row).and_then(|r| r.get(new_col)) {
                if *char == '.' {
                    if !min_winds.contains_key(&(new_row, new_col)) {
                        if !q_set.contains(&((new_row, new_col), minute + 1, goal)) {
                            queue.push_back(((new_row, new_col), minute + 1, goal));
                            q_set.insert(((new_row, new_col), minute + 1, goal));
                        }

                        if goal == "finish" && new_row == map.len() - 1 {
                            queue.clear();
                            queue.push_back(((new_row, new_col), minute + 1, "snacks"));
                            q_set.clear();
                            q_set.insert(((new_row, new_col), minute + 1, "snacks"));
                        } else if goal == "snacks" && new_row == 0 {
                            queue.clear();
                            queue.push_back(((0, 1), minute + 1, "finish2"));
                            q_set.clear();
                            q_set.insert(((0, 1), minute + 1, "finish2"));
                        } else if goal == "finish2" && new_row == map.len() - 1 {
                            return minute as i32 + 1;
                        }
                    }
                }
            }
        }

        if !min_winds.contains_key(&position) {
            queue.push_back((position, minute + 1, goal));
            q_set.insert((position, minute + 1, goal));
        }
    }

    unreachable!();
}

type Coords = (usize, usize);
type Winds = HashMap<Coords, Vec<char>>;
type Map = Vec<Vec<char>>;

fn parse(input: &str) -> (Map, Vec<Winds>, Coords) {
    let mut winds: HashMap<Coords, Vec<char>> = HashMap::new();
    let mut start = (0, 1);

    let map: Vec<Vec<char>> = input
        .lines()
        .enumerate()
        .map(|(row_i, line)| {
            line.chars()
                .enumerate()
                .map(|(col_i, char)| {
                    if char == 'E' || char == '#' || char == '.' {
                        if char == 'E' {
                            start = (row_i, col_i);
                        }
                        return char;
                    }
                    let entry = winds.entry((row_i, col_i)).or_default();
                    entry.push(char);

                    '.'
                })
                .collect()
        })
        .collect();

    let mut winds_cash = vec![winds];
    for _ in 1..1000 {
        winds_cash.push(get_winds(winds_cash.last().unwrap(), &map));
    }

    (map, winds_cash, start)
}

fn get_winds(winds: &Winds, map: &Map) -> Winds {
    let mov = HashMap::from([('^', (-1, 0)), ('v', (1, 0)), ('<', (0, -1)), ('>', (0, 1))]);

    let mut new_winds: Winds = HashMap::new();

    winds.iter().for_each(|((row, col), ws)| {
        ws.iter().for_each(|w| {
            let mut new_row = (*row as i32 + mov[w].0) as usize;
            let mut new_col = (*col as i32 + mov[w].1) as usize;

            if map[new_row][new_col] == '#' {
                match w {
                    '^' => new_row = map.len() - 2,
                    'v' => new_row = 1,
                    '<' => new_col = map[0].len() - 2,
                    '>' => new_col = 1,
                    _ => unreachable!(),
                }
            }
            let entry = new_winds.entry((new_row, new_col)).or_default();
            entry.push(*w);
        });
    });

    new_winds
}
