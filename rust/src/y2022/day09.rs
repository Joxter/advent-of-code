use std::collections::{HashMap, HashSet};

#[derive(Eq, Hash, PartialEq, Clone, Copy)]
struct Point(i32, i32);

pub fn naive_js_copy_part1(input: &str) -> usize {
    simulate(input, 1)
}

pub fn naive_js_copy_part2(input: &str) -> usize {
    simulate(input, 9)
}

fn simulate(input: &str, rope_len: usize) -> usize {
    let mut history: HashSet<Point> = HashSet::new();

    let mut rope = Vec::with_capacity(rope_len + 1);
    for _i in 0..=rope_len {
        rope.push(Point(0, 0))
    }

    for line in input.lines() {
        let (direction, steps) = line.split_once(" ").unwrap();
        let steps = steps.parse::<i32>().unwrap();

        for _i in 0..steps {
            let head = rope.first_mut().unwrap();

            match direction {
                "U" => head.0 += 1,
                "D" => head.0 -= 1,
                "R" => head.1 += 1,
                "L" => head.1 -= 1,
                _ => (),
            };

            for i in 1..=rope_len {
                rope[i] = follow(&rope[i], &rope[i - 1]);
            }
            history.insert(*(rope.last().unwrap()));
        }
    }
    history.len()
}

fn length_between(a: &Point, b: &Point) -> i32 {
    i32::max((a.0 - b.0).abs(), (a.1 - b.1).abs())
}

fn follow(tail: &Point, head: &Point) -> Point {
    let mut res = Point(tail.0, tail.1);

    if length_between(&tail, &head) < 2 {
        return res;
    }

    if tail.0 == head.0 {
        if tail.1 < head.1 {
            res.1 += 1;
        } else if tail.1 > head.1 {
            res.1 -= 1;
        };
        return res;
    }

    if tail.1 == head.1 {
        if tail.0 < head.0 {
            res.0 += 1;
        } else if tail.0 > head.0 {
            res.0 -= 1;
        };
        return res;
    }

    if tail.0 < head.0 {
        res.0 += 1;
    } else {
        res.0 -= 1;
    }

    if tail.1 < head.1 {
        res.1 += 1;
    } else {
        res.1 -= 1;
    }

    res
}
