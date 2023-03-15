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

pub fn naive_js_copy_part2_alter(input: &str) -> i32 {
    let mut arr: Vec<i32> = input
        .split("\n\n")
        .map(|lines| lines.lines().map(|line| line.parse::<i32>().unwrap()).sum())
        .collect();

    arr.sort_by(|a, b| b.cmp(a));
    arr[0] + arr[1] + arr[2] + 2
}
