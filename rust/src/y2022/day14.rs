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
    use super::not_my_smith61::build_grid;
    use ndarray::Array2;
    use serde_json::Value::String;
    use std::cmp;
    use std::collections::{HashMap, HashSet};

    type RockMap = HashSet<(usize, usize)>;

    fn parse(input: &str) -> (RockMap, usize, usize, usize) {
        let mut map: RockMap = HashSet::new();
        let mut bottom = 0;
        let mut left = usize::MAX;
        let mut right = 0;

        input.lines().for_each(|line| {
            let mut h_vec = line.split(" -> ").map(|it| {
                let (l, r) = it.split_once(',').unwrap();
                (l.parse::<usize>().unwrap(), r.parse::<usize>().unwrap())
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

                    bottom = usize::max(bottom, hy);
                    left = usize::min(left, hx);
                    right = usize::max(right, hx);
                }
            }
        });

        (map, bottom, left, right)
    }

    fn parse_to_grid(input: &str) -> (Array2<bool>, usize, usize, usize) {
        let mut bottom = 0;
        let mut left = usize::MAX;
        let mut right = 0;

        let parsed_lines = Vec::from_iter(input.lines().map(|line| {
            Vec::from_iter(line.split(" -> ").map(|it| {
                let (l, r) = it.split_once(',').unwrap();
                (l.parse::<usize>().unwrap(), r.parse::<usize>().unwrap())
            }))
        }));

        parsed_lines.iter().for_each(|line| {
            for (tx, ty) in line {
                bottom = cmp::max(bottom, *ty);
                left = cmp::min(left, *tx);
                right = cmp::max(right, *tx);
            }
        });

        let width = right - left + 1;
        let offset_x = left - 1;
        let mut grid = Array2::from_elem((bottom + 2, width + 2), false);

        parsed_lines.iter().for_each(|line| {
            let mut line = line.iter();

            let (mut hx, mut hy) = line.next().unwrap();
            grid[(hy, hx - offset_x)] = true;

            for (tx, ty) in line {
                let (tx, ty) = (*tx, *ty);

                while tx != hx || ty != hy {
                    if tx == hx {
                        if ty > hy {
                            hy += 1;
                        } else {
                            hy -= 1;
                        }
                    } else if ty == hy {
                        if tx > hx {
                            hx += 1;
                        } else {
                            hx -= 1;
                        }
                    }
                    grid[(hy, hx - offset_x)] = true;
                }
            }
        });

        (grid, bottom, left, width + 2)
    }

    pub fn part1(input: &str) -> usize {
        let (mut map, bottom, _, _) = parse(input);

        let init_size = map.len();
        let mut path = Vec::with_capacity(bottom);
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

        map.len() - init_size
    }

    pub fn part2(input: &str) -> usize {
        let (map, mut bottom, mut left, right) = parse(input);

        let mut res = 1;
        let start = 500;

        bottom += 2;
        left -= 2;
        let row_len = right - left + 2;

        let mut sand_row = vec![false; row_len];
        sand_row[start - left] = true;

        let mut left_part = 0;
        let mut right_part = 0;

        for row_i in 1..bottom {
            let mut new_row = Vec::with_capacity(row_len);

            if left_part == 0 && sand_row[0] {
                left_part = bottom - row_i;
            }
            if right_part == 0 && *sand_row.last().unwrap() {
                right_part = bottom - row_i;
            }

            for (i, prev) in sand_row.iter().enumerate() {
                let i_plus_left = i + left;

                if map.contains(&(i_plus_left, row_i)) {
                    new_row.push(false);
                } else if *prev || i > 0 && sand_row[i - 1] || i + 1 < row_len && sand_row[i + 1] {
                    new_row.push(true);
                    res += 1;
                } else {
                    new_row.push(false);
                }
            }

            sand_row = new_row;
        }

        let left_sum = left_part * (left_part + 1) / 2;
        let right_sum = right_part * (right_part + 1) / 2;

        // print_map_to_file(&map, bottom, "map_2_optimised");

        res + left_sum + right_sum
    }

    pub fn part2_smith61_inspired(input: &str) -> usize {
        let (grid, mut bottom, mut left, row_len) = parse_to_grid(input);

        let mut res = 1;
        let start = 500;

        bottom += 2;
        left -= 2;

        let mut sand_row = vec![false; row_len];
        sand_row[start - left] = true;

        let mut left_part = 0;
        let mut right_part = 0;

        for row_i in 1..bottom {
            let mut new_row = Vec::with_capacity(row_len);

            if left_part == 0 && sand_row[0] {
                left_part = bottom - row_i;
            }
            if right_part == 0 && *sand_row.last().unwrap() {
                right_part = bottom - row_i;
            }

            for (i, prev) in sand_row.iter().enumerate() {
                if grid[(row_i, i)] {
                    new_row.push(false);
                } else if *prev
                    || (i > 0 && sand_row[i - 1])
                    || (i + 1 < row_len && sand_row[i + 1])
                {
                    new_row.push(true);
                    res += 1;
                } else {
                    new_row.push(false);
                }
            }

            sand_row = new_row;
        }

        let left_sum = left_part * (left_part + 1) / 2;
        let right_sum = right_part * (right_part + 1) / 2;

        // print_map_to_file(&map, bottom, "map_2_optimised");

        res + left_sum + right_sum
    }

    fn print_map_to_file(map: &RockMap, bottom: usize, name: &str) {
        use std::fs::File;
        use std::io::Write;

        let mut file = File::create(name.to_string() + ".txt").unwrap();
        let most_left_of_map = map.iter().map(|(x, _)| x).min().unwrap() - 4;
        let most_right_of_map = map.iter().map(|(x, _)| x).max().unwrap() + 4;

        let mut file_content = vec![];
        for y in 0..=(bottom + 1) {
            let mut row = "".to_string();

            for x in most_left_of_map..=most_right_of_map {
                let c = map.contains(&(x, y));

                if c {
                    row.push('o');
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

pub mod not_my_smith61 {
    // https://github.com/smith61/advent_of_code/blob/main/src/year_2022/day_14.rs
    use itertools::Itertools;

    use ndarray::Array2;

    use std::cmp;

    struct PointIterator<'a> {
        bytes: &'a [u8],
    }

    impl<'a> PointIterator<'a> {
        fn new(bytes: &'a [u8]) -> Self {
            Self { bytes }
        }
    }

    impl<'a> Iterator for PointIterator<'a> {
        type Item = (usize, usize);

        fn next(&mut self) -> Option<Self::Item> {
            if self.bytes.is_empty() {
                return None;
            }

            let mut x = 0;
            while self.bytes[0] != b',' {
                x = (x * 10) + ((self.bytes[0] - b'0') as usize);
                self.bytes = &self.bytes[1..];
            }

            self.bytes = &self.bytes[1..];

            let mut y = 0;
            while !self.bytes.is_empty() && self.bytes[0] != b' ' {
                y = (y * 10) + ((self.bytes[0] - b'0') as usize);
                self.bytes = &self.bytes[1..];
            }

            if !self.bytes.is_empty() {
                self.bytes = &self.bytes[4..];
            }

            Some((x, y))
        }
    }

    pub fn build_grid<const ADD_FLOOR: bool>(input: &str) -> (Array2<bool>, usize) {
        let mut x_min = usize::MAX;
        let mut y_min = 0;
        let mut x_max = usize::MIN;
        let mut y_max = usize::MIN;

        for line in input.lines() {
            for (x, y) in PointIterator::new(line.as_bytes()) {
                x_min = cmp::min(x_min, x);
                y_min = cmp::min(y_min, y);
                x_max = cmp::max(x_max, x);
                y_max = cmp::max(y_max, y);
            }
        }

        if ADD_FLOOR {
            y_max += 2;
            let floor_left = 500 - y_max - 1;
            let floor_right = 500 + y_max + 1;
            x_min = cmp::min(x_min, floor_left);
            x_max = cmp::max(x_max, floor_right);
        }

        let width = x_max - x_min + 1;
        let height = y_max - y_min + 1;
        let mut grid = Array2::from_elem((height, width), false);
        let x_offset = x_min;

        for line in input.lines() {
            for ((f_x, f_y), (s_x, s_y)) in PointIterator::new(line.as_bytes()).tuple_windows() {
                let x_min = cmp::min(f_x, s_x) - x_offset;
                let x_max = cmp::max(f_x, s_x) - x_offset;
                let y_min = cmp::min(f_y, s_y);
                let y_max = cmp::max(f_y, s_y);
                for x in x_min..=x_max {
                    for y in y_min..=y_max {
                        grid[[y, x]] = true;
                    }
                }
            }
        }

        if ADD_FLOOR {
            for x in 0..width {
                grid[[y_max, x]] = true;
            }
        }

        (grid, x_offset)
    }

    fn run_simulation<const ADD_FLOOR: bool>(input: &str) -> u64 {
        let (mut grid, x_offset) = build_grid::<ADD_FLOOR>(input);
        let mut sand_count = 0;
        let mut point_stack = Vec::with_capacity(grid.nrows());
        point_stack.push((0, 500 - x_offset));
        'outer: while let Some(mut point) = point_stack.pop() {
            'inner: loop {
                let (y, x) = point;
                if y + 1 >= grid.nrows() {
                    break 'outer;
                }

                for new_point in [(y + 1, x), (y + 1, x - 1), (y + 1, x + 1)] {
                    if !grid[new_point] {
                        point_stack.push(point);
                        point = new_point;
                        continue 'inner;
                    }
                }

                break;
            }

            sand_count += 1;
            grid[point] = true;
        }

        sand_count
    }

    pub fn part1(input: &str) -> u64 {
        run_simulation::<false>(input) // OVERFLOW :(
    }

    pub fn part2(input: &str) -> u64 {
        run_simulation::<true>(input)
    }
}
