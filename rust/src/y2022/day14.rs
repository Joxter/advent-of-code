use serde_json::Value::String;
use std::collections::HashMap;

type TaskMap = HashMap<(i32, i32), char>;

const BORDER_CHAR: char = '■';

fn parse(input: &str) -> (HashMap<(i32, i32), char>, i32) {
    let mut map: TaskMap = HashMap::new();
    let mut bottom = 0;

    input.lines().for_each(|line| {
        let h_vec: Vec<(i32, i32)> = line
            .split(" -> ")
            .map(|it| {
                let (l, r) = it.split_once(',').unwrap();
                (l.parse::<i32>().unwrap(), r.parse::<i32>().unwrap())
            })
            .collect();

        let (mut hx, mut hy) = h_vec.first().unwrap();
        map.insert((hx, hy), BORDER_CHAR);

        for (tx, ty) in h_vec.into_iter().skip(1) {
            while tx != hx || ty != hy {
                if tx == hx && ty > hy {
                    hy += 1;
                } else if tx == hx && ty < hy {
                    hy -= 1;
                } else if ty == hy && tx > hx {
                    hx += 1;
                } else if ty == hy && tx < hx {
                    hx -= 1;
                }
                map.insert((hx, hy), BORDER_CHAR);

                bottom = i32::max(bottom, hy);
            }
        }
    });

    (map, bottom)
}

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let (mut map, bottom) = parse(input);

    fn get_finish_pos(map: &TaskMap, (x, y): (i32, i32), bottom: i32) -> Option<(i32, i32)> {
        if y > bottom {
            return None;
        };

        if !map.contains_key(&(x, y + 1)) {
            return get_finish_pos(map, (x, y + 1), bottom);
        }
        if !map.contains_key(&(x - 1, y + 1)) {
            return get_finish_pos(map, (x - 1, y + 1), bottom);
        }
        if !map.contains_key(&(x + 1, y + 1)) {
            return get_finish_pos(map, (x + 1, y + 1), bottom);
        }

        Some((x, y))
    }

    let mut result = 0;
    let sand_source = (500, 0);

    while let Some(pos) = get_finish_pos(&map, sand_source, bottom) {
        result += 1;
        map.insert(pos, 'o');
    }

    // print_map_to_file(&map, bottom, &sand_source, "map_1");

    result
}

fn print_map_to_file(map: &TaskMap, bottom: i32, sand_source: &(i32, i32), name: &str) {
    use std::fs::File;
    use std::io::Write;

    let mut file = File::create(name.to_string() + ".txt").unwrap();
    let most_left_of_map = map
        .iter()
        .filter_map(|((x, _), c)| if *c == BORDER_CHAR { Some(x) } else { None })
        .min()
        .unwrap()
        - 4;
    let most_right_of_map = map
        .iter()
        .filter_map(|((x, _), c)| if *c == BORDER_CHAR { Some(x) } else { None })
        .max()
        .unwrap()
        + 4;

    let mut file_content = vec![];
    for y in -1..=(bottom + 1) {
        let cnt_of_sand = map
            .iter()
            .filter(|((_, y_), c)| *y_ == y && **c == 'o')
            .count();
        let mut row = "".to_string();

        for x in most_left_of_map..=most_right_of_map {
            let c = map.get(&(x, y)).unwrap_or(&'.');

            if (x, y) == *sand_source {
                row.push('S');
                continue;
            }

            row.push(*c);
        }

        row.push_str(&format!("{cnt_of_sand:5} {y:4}\n"));

        file_content.push(row);
    }

    file.write_all(file_content.join("").as_bytes()).unwrap();
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let (mut map, bottom) = parse(input);

    fn get_finish_pos(map: &TaskMap, (x, y): (i32, i32), bottom: i32) -> (i32, i32) {
        if y > bottom {
            return (x, y);
        };

        if !map.contains_key(&(x, y + 1)) {
            return get_finish_pos(map, (x, y + 1), bottom);
        }
        if !map.contains_key(&(x - 1, y + 1)) {
            return get_finish_pos(map, (x - 1, y + 1), bottom);
        }
        if !map.contains_key(&(x + 1, y + 1)) {
            return get_finish_pos(map, (x + 1, y + 1), bottom);
        }

        (x, y)
    }

    let mut result = 0;
    let sand_source = (500, 0);

    loop {
        let last_pose = get_finish_pos(&map, sand_source, bottom);
        map.insert(last_pose, 'o');
        result += 1;

        if last_pose == sand_source {
            break;
        }
    }
    // print_map_to_file(&map, bottom, &sand_source, "map_2");

    result
}

pub mod optimised {
    use serde_json::Value::String;
    use std::collections::{HashMap, HashSet};

    type TaskMap = HashSet<(i32, i32)>;

    fn parse(input: &str) -> (TaskMap, i32) {
        let mut map: TaskMap = HashSet::new();
        let mut bottom = 0;

        input.lines().for_each(|line| {
            let mut h_vec = line.split(" -> ").map(|it| {
                let (l, r) = it.split_once(',').unwrap();
                (l.parse::<i32>().unwrap(), r.parse::<i32>().unwrap())
            });

            let (mut hx, mut hy) = h_vec.next().unwrap();
            map.insert((hx, hy));

            for (tx, ty) in h_vec {
                while tx != hx || ty != hy {
                    if tx == hx && ty > hy {
                        hy += 1;
                    } else if tx == hx && ty < hy {
                        hy -= 1;
                    } else if ty == hy && tx > hx {
                        hx += 1;
                    } else if ty == hy && tx < hx {
                        hx -= 1;
                    }
                    map.insert((hx, hy));

                    bottom = i32::max(bottom, hy);
                }
            }
        });

        (map, bottom)
    }

    pub fn part1(input: &str) -> i32 {
        let (mut map, bottom) = parse(input);

        let init_size = map.len();
        let mut path = Vec::with_capacity(bottom as usize);
        path.push((500, 0));

        loop {
            let (x, y) = *path.last().unwrap();

            if y > bottom {
                break;
            }

            if !map.contains(&(x, y + 1)) {
                path.push((x, y + 1));
                continue;
            }
            if !map.contains(&(x - 1, y + 1)) {
                path.push((x - 1, y + 1));
                continue;
            }
            if !map.contains(&(x + 1, y + 1)) {
                path.push((x + 1, y + 1));
                continue;
            }

            map.insert((x, y));
            path.pop();
        }

        (map.len() - init_size) as i32
    }

    fn print_map_to_file(map: &TaskMap, bottom: i32, name: &str) {
        use std::fs::File;
        use std::io::Write;

        let mut file = File::create(name.to_string() + ".txt").unwrap();
        let most_left_of_map = map.iter().map(|(x, _)| x).min().unwrap() - 4;
        let most_right_of_map = map.iter().map(|(x, _)| x).max().unwrap() + 4;

        let mut file_content = vec![];
        for y in -1..=(bottom + 1) {
            let mut row = "".to_string();

            for x in most_left_of_map..=most_right_of_map {
                let c = map.contains(&(x, y));

                if c {
                    row.push('#');
                } else {
                    row.push('.');
                }
            }

            row.push_str(&format!(" {y:4}\n"));

            file_content.push(row);
        }

        file.write_all(file_content.join("").as_bytes()).unwrap();
    }
}
