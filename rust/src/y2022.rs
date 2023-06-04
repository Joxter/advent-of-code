use crate::aoc_day::AoCDay;
use std::collections::{HashMap, HashSet};
use std::fmt::Display;

mod day01;
mod day02;
mod day03;
mod day04;
mod day05;
mod day06;
mod day07;
mod day08;
mod day09;
mod day10;
mod day11;
mod day12;
mod day13;
mod day14;
mod day15;
mod day16;
mod day17;
mod day18;
mod day19;
mod day20;
mod day21;
mod day22;
mod day23;
mod day24;
mod day25;

macro_rules! t {
    ($func:expr) => {
        &|input| {
            let sys_time = std::time::SystemTime::now();
            let answer = std::hint::black_box($func(std::hint::black_box(input)));
            (sys_time.elapsed().unwrap(), answer.to_string())
        }
    };
}

pub fn run_2022(days: &HashMap<i32, (bool, bool)>, filter: &str) {
    // todo implement something like this:
    //    - proper writing results to a file
    //    - move printing results to a different thing

    // AoCDay::clear_result_file(); // todo make it better

    AoCDay::new(2022, days, filter)
        .run_day::<1>(&[
            (1, "naive js copy", t!(day01::naive_js_copy_part1)),
            (2, "naive js copy", t!(day01::naive_js_copy_part2)),
        ])
        .run_day::<2>(&[
            (1, "naive js copy", t!(day02::naive_js_copy_part1)),
            (1, "optimised", t!(day02::optimised::part1)),
            (1, "smith61 version", t!(day02::not_my_smith61::part1)),
            (1, "SkiFire13 version", t!(day02::not_my_ski_fire13::part1)),
            (2, "naive js copy", t!(day02::naive_js_copy_part2)),
            (2, "optimised", t!(day02::optimised::part2)),
            (2, "smith61 version", t!(day02::not_my_smith61::part2)),
            (2, "SkiFire13 version", t!(day02::not_my_ski_fire13::part2)),
        ])
        .run_day::<3>(&[
            (1, "naive js copy", t!(day03::naive_js_copy_part1)),
            (2, "naive js copy", t!(day03::naive_js_copy_part2)),
        ])
        .run_day::<4>(&[
            (1, "naive js copy", t!(day04::naive_js_copy_part1)),
            (2, "naive js copy", t!(day04::naive_js_copy_part2)),
        ])
        .run_day::<5>(&[
            (1, "naive js copy", t!(day05::naive_js_copy_part1)),
            (2, "naive js copy", t!(day05::naive_js_copy_part2)),
        ])
        .run_day::<6>(&[
            (1, "naive js copy", t!(day06::naive_js_copy_part1)),
            (1, "copilot version", t!(day06::optimised::part1_copilot)),
            (1, "bitmask version", t!(day06::optimised::part1_bitmask)),
            (
                1,
                "from right version",
                t!(day06::optimised::part1_from_right),
            ),
            (1, "SkiFire13 variant", t!(day06::not_my_ski_fire13::part1)),
            (1, "smith61 variant", t!(day06::not_my_smith61::part1)),
            (2, "naive js copy", t!(day06::naive_js_copy_part2)),
            (2, "bitmask version", t!(day06::optimised::part2_bitmask)),
            (
                2,
                "from right version",
                t!(day06::optimised::part2_from_right),
            ),
            (2, "SkiFire13 variant", t!(day06::not_my_ski_fire13::part2)),
            (2, "smith61 variant", t!(day06::not_my_smith61::part2)),
            (
                2,
                "ThePrimeagen variant",
                t!(day06::not_my_the_primeagen::part2),
            ),
        ])
        .run_day::<7>(&[
            (1, "naive js copy", t!(day07::naive_js_copy_part1)),
            (2, "naive js copy", t!(day07::naive_js_copy_part2)),
        ])
        .run_day::<8>(&[
            (1, "naive js copy", t!(day08::naive_js_copy_part1)),
            (2, "naive js copy", t!(day08::naive_js_copy_part2)),
        ])
        .run_day::<9>(&[
            (1, "naive js copy", t!(day09::naive_js_copy_part1)),
            (2, "naive js copy", t!(day09::naive_js_copy_part2)),
        ])
        .run_day::<10>(&[
            (1, "naive js copy", t!(day10::naive_js_copy_part1)),
            (2, "naive js copy", t!(day10::naive_js_copy_part2)),
        ])
        .run_day::<11>(&[
            (1, "naive js copy", t!(day11::naive_js_copy_part1)),
            (2, "naive js copy", t!(day11::naive_js_copy_part2)),
        ])
        .run_day::<12>(&[
            (1, "naive js copy", t!(day12::naive_js_copy_part1)),
            (2, "naive js copy", t!(day12::naive_js_copy_part2)),
        ])
        .run_day::<13>(&[
            (1, "naive js copy", t!(day13::naive_js_copy_part1)),
            (2, "naive js copy", t!(day13::naive_js_copy_part2)),
        ])
        .run_day::<14>(&[
            (1, "naive js copy", t!(day14::naive_js_copy_part1)),
            (2, "naive js copy", t!(day14::naive_js_copy_part2)),
        ])
        .run_day::<15>(&[
            (
                1,
                "optimised (general)",
                t!(day15::optimised::part1_general),
            ),
            (1, "optimised", t!(day15::optimised::part1)),
            (1, "naive js copy", t!(day15::naive_js_copy_part1)),
            (2, "naive js copy", t!(day15::naive_js_copy_part2)),
        ])
        .run_day::<16>(&[
            // (1, "naive js copy", t!(day16::naive_js_copy_part1)),
            (1, "better", t!(day16::optimised::better_part1)),
            // (2, "naive js copy", t!(day16::naive_js_copy_part2)),
            (2, "better", t!(day16::optimised::better_part2)),
        ])
        .run_day::<17>(&[
            (1, "naive js copy", t!(day17::naive_js_copy_part1)),
            (2, "naive js copy", t!(day17::naive_js_copy_part2_real)),
        ])
        .run_day::<18>(&[
            (1, "naive js copy", t!(day18::naive_js_copy_part1)),
            (2, "naive js copy", t!(day18::naive_js_copy_part2)),
        ])
        .run_day::<19>(&[
            (1, "naive js copy", t!(day19::naive_js_copy_part1)),
            (2, "naive js copy", t!(day19::naive_js_copy_part2)),
        ])
        .run_day::<20>(&[
            (1, "naive js copy", t!(day20::naive_js_copy_part1)),
            (2, "naive js copy", t!(day20::naive_js_copy_part2)),
        ])
        .run_day::<21>(&[
            (1, "naive js copy", t!(day21::naive_1::part1)),
            (1, "naive js copy (compact Node)", t!(day21::naive_2::part1)),
            (2, "naive js copy", t!(day21::naive_1::part2)),
            (2, "naive js copy (compact Node)", t!(day21::naive_2::part2)),
        ])
        .run_day::<22>(&[
            (1, "naive js copy", t!(day22::naive_js_copy_part1)),
            (2, "naive js copy", t!(day22::naive_js_copy_part2)),
        ])
        .run_day::<23>(&[
            (1, "naive js copy", t!(day23::naive_js_copy_part1)),
            (2, "naive js copy", t!(day23::naive_js_copy_part2)),
        ])
        .run_day::<24>(&[
            (1, "naive js copy", t!(day24::naive_js_copy_part1)),
            (2, "naive js copy", t!(day24::naive_js_copy_part2)),
        ])
        .run_day::<25>(&[(1, "naive js copy", t!(day25::naive_js_copy_part1))]);
}
