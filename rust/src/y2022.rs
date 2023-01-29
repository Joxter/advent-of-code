use crate::answer::run_solution;

pub mod day01;
pub mod day02;
pub mod day03;
pub mod day04;
pub mod day05;

pub fn run_2022() {
    // run_solution(
    //     "../2022/inputs/d01",
    //     "day1",
    //     day01::naive_js_copy_part1,
    //     day01::naive_js_copy_part2,
    // );
    // run_solution(
    //     "../2022/inputs/d02",
    //     "day2",
    //     day02::naive_js_copy_part1,
    //     day02::naive_js_copy_part2,
    // );
    // run_solution(
    //     "../2022/inputs/d03",
    //     "day3",
    //     day03::naive_js_copy_part1,
    //     day03::naive_js_copy_part2,
    // );
    // run_solution(
    //     "../2022/inputs/d04",
    //     "day4",
    //     day04::naive_js_copy_part1,
    //     day04::naive_js_copy_part2,
    // );
    run_solution(
        "../2022/inputs/d05",
        "day5",
        day05::naive_js_copy_part1,
        day05::naive_js_copy_part2,
    );
}
