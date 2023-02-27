use std::collections::HashMap;

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let (map, cur_pos, route) = parse(input);

    1
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let (map, cur_pos, route) = parse(input);

    1
}

type Portals = HashMap<(i32, i32, char), (i32, i32, char)>;
type PortalParam = ((i32, i32), (i32, i32), char);

fn parse(input: &str) -> (Vec<Vec<char>>, (i32, i32), Vec<(char, i32)>) {
    let (str_map, str_route) = input.split_once("\n\n").unwrap();

    let map = Vec::from_iter(str_map.lines().map(|line| Vec::from_iter(line.chars())));

    let cur_pos = (
        0,
        map[0].iter().position(|char| *char == '.').unwrap() as i32,
    );

    let mut route: Vec<(char, i32)> = vec![];

    let mut mode = 'R';
    let mut n = 0;
    for char in str_route.chars() {
        match char {
            'L' => {
                route.push((mode, n));
                mode = 'L';
                n = 0;
            }
            'R' => {
                route.push((mode, n));
                mode = 'R';
                n = 0;
            }
            '0'..='9' => {
                n = n * 10 + char.to_digit(10).unwrap() as i32;
            }
            _ => unreachable!(),
        }
    }
    route.push((mode, n));

    dbg!(&str_route);
    dbg!(&route);

    (map, cur_pos, route)
}

fn add_portals(portals: &mut Portals, from: PortalParam, to: PortalParam) {
    let (from_a, from_b, from_arrow) = from;
    let (to_a, to_b, to_arrow) = to;

    let mut line_1 = vec![];
    if from_a.0 == from_b.0 {
        for n in my_range(from_a.1, from_b.1) {
            line_1.push((from_a.0, n));
        }
    } else {
        for n in my_range(from_a.0, from_b.0) {
            line_1.push((n, from_a.1));
        }
    }

    let mut line_2 = vec![];
    if to_a.0 == to_b.0 {
        for n in my_range(to_a.1, to_b.1) {
            line_2.push((to_a.0, n));
        }
    } else {
        for n in my_range(to_a.0, to_b.0) {
            line_2.push((n, to_a.1));
        }
    }

    let dir_delta = HashMap::from([('>', (0, 1)), ('<', (0, -1)), ('^', (-1, 0)), ('v', (1, 0))]);
    let anti_arrow = HashMap::from([('>', '<'), ('<', '>'), ('^', 'v'), ('v', '^')]);

    line_1.iter().zip(line_2.iter()).for_each(|(l1, l2)| {
        portals.insert(
            (l1.0, l1.1, from_arrow),
            (
                l2.0 - dir_delta.get(&to_arrow).unwrap().0,
                l2.1 - dir_delta.get(&to_arrow).unwrap().1,
                *anti_arrow.get(&to_arrow).unwrap(),
            ),
        );

        portals.insert(
            (l2.0, l2.1, to_arrow),
            (
                l1.0 - dir_delta.get(&from_arrow).unwrap().0,
                l1.1 - dir_delta.get(&from_arrow).unwrap().1,
                *anti_arrow.get(&from_arrow).unwrap(),
            ),
        );
    });
}

fn my_range(a: i32, b: i32) -> Vec<i32> {
    let mut res = vec![];

    if a < b {
        for i in a..=b {
            res.push(i);
        }
    } else {
        let mut i = a;
        while i >= b {
            res.push(i);
            i -= 1;
        }
    }

    res
}
