use crate::aoc_day::AoCDay;
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

#[cfg(test)]
mod tests {
    use crate::aoc_day::AoCDay;

    #[test]
    fn naive_js_copy_part1_works() {
        let (input, result) = AoCDay::get_test_data(2022, 1, 1);
        assert_eq!(super::naive_js_copy_part1(&input).to_string(), result);
    }
    #[test]
    fn naive_js_copy_part2_works() {
        let (input, result) = AoCDay::get_test_data(2022, 1, 2);
        assert_eq!(super::naive_js_copy_part2(&input).to_string(), result);
    }
}
