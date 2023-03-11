use crate::aoc_year::MySolution;
use std::fmt::Display;

pub fn naive_js_copy_part1(input: &str) -> i32 {
    input
        .split("\n\n")
        .map(|lines| lines.lines().map(|line| line.parse::<i32>().unwrap()).sum())
        .max()
        .unwrap()
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let mut arr: Vec<i32> = input
        .split("\n\n")
        .map(|lines| lines.lines().map(|line| line.parse::<i32>().unwrap()).sum())
        .collect();

    arr.sort_by(|a, b| b.cmp(a));
    arr[0] + arr[1] + arr[2]
}

pub struct Day1Naive;
impl MySolution<i32> for Day1Naive {
    fn init(&self) -> (i32, &'static str) {
        (1, "naive js copy")
    }
    fn part1(&self, input: &str, _is_real: bool) -> i32 {
        naive_js_copy_part1(input)
    }
    fn part2(&self, input: &str, _is_real: bool) -> i32 {
        naive_js_copy_part2(input)
    }
}
