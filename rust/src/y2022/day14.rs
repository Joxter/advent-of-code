use std::collections::HashMap;

type TaskMap = HashMap<(i32, i32), char>;

pub fn parse(input: &str) -> (HashMap<(i32, i32), char>, i32) {
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
        map.insert((hx, hy), '#');

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
                map.insert((hx, hy), '#');

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

        return Some((x, y));
    }

    let mut result = 0;
    let sand_source = (500, 0);

    loop {
        match get_finish_pos(&map, sand_source, bottom) {
            Some(pos) => {
                result += 1;
                map.insert(pos, 'o')
            }
            None => break,
        };
    }

    result
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

        return (x, y);
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

    result
}
