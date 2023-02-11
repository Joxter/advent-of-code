use std::collections::{HashMap, HashSet, VecDeque};

type Position = (usize, usize);

pub fn naive_js_copy_part1(input: &str) -> usize {
    let mut height_map: HashMap<char, usize> = HashMap::from_iter(
        "abcdefghijklmnopqrstuvwxyz"
            .chars()
            .enumerate()
            .map(|(a, b)| (b, a)),
    );
    height_map.insert('S', *height_map.get(&'a').unwrap());
    height_map.insert('E', *height_map.get(&'z').unwrap());

    let path = find_path(input, 'S', 'E', &height_map);
    path.len()
}

pub fn naive_js_copy_part2(input: &str) -> usize {
    let mut height_map: HashMap<char, usize> = HashMap::from_iter(
        "zyxwvutsrqponmlkjihgfedcba"
            .chars()
            .enumerate()
            .map(|(a, b)| (b, a)),
    );
    height_map.insert('E', *height_map.get(&'z').unwrap());

    let path = find_path(input, 'E', 'a', &height_map);
    path.len()
}

fn find_path(
    input: &str,
    start: char,
    finish: char,
    height_map: &HashMap<char, usize>,
) -> Vec<Position> {
    let grid: Vec<Vec<char>> = input
        .lines()
        .map(|line| Vec::from_iter(line.chars()))
        .collect();

    let mut start_position = (0, 0);
    for (start_x, row) in grid.iter().enumerate() {
        for (start_y, char) in row.iter().enumerate() {
            if *char == start {
                start_position = (start_x, start_y)
            }
        }
    }

    let mut queue: VecDeque<(Position, Vec<Position>)> = VecDeque::new();
    let mut visited = HashSet::new();

    queue.push_back((start_position, vec![start_position])); // pop_front
    visited.insert(start_position);

    while !queue.is_empty() {
        let (position, mut path) = queue.pop_front().unwrap();
        let current_char = grid[position.0][position.1];

        if current_char == finish {
            path.pop();
            return path;
        }

        for (x, y) in get_neibs(position, &visited, &grid) {
            let neib_char = grid[x][y];

            if height_map.get(&current_char).unwrap() + 1 >= *height_map.get(&neib_char).unwrap() {
                let mut new_path = path.clone();
                new_path.push((x, y));
                queue.push_back(((x, y), new_path));
                visited.insert((x, y));
            }
        }
    }

    unreachable!();
}

fn get_neibs((x, y): Position, visited: &HashSet<Position>, grid: &[Vec<char>]) -> Vec<Position> {
    let mut res = vec![];

    if x > 0 && !visited.contains(&(x - 1, y)) {
        res.push((x - 1, y));
    }
    if grid.get(x + 1).is_some() && !visited.contains(&(x + 1, y)) {
        res.push((x + 1, y));
    }
    if y > 0 && !visited.contains(&(x, y - 1)) {
        res.push((x, y - 1));
    }
    if grid[x].get(y + 1).is_some() && !visited.contains(&(x, y + 1)) {
        res.push((x, y + 1));
    }

    res
}
