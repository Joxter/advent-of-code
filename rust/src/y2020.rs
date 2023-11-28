use crate::aoc_day::{AoCDay, Params};
use crate::y2020;
use std::fmt::Display;

mod day01;
mod day02;
mod day03;
mod day04;
mod day05;

macro_rules! t {
    ($func:expr) => {
        &|input| {
            let sys_time = std::time::SystemTime::now();
            let answer = std::hint::black_box($func(std::hint::black_box(input)));
            (sys_time.elapsed().unwrap(), answer.to_string())
        }
    };
}

pub fn run_2020(params: Params) {
    AoCDay::new(2020, params)
        .run_day::<1>(&[(1, "", t!(day01::part1)), (2, "", t!(day01::part2))])
        .run_day::<2>(&[
            (1, "", t!(day02::part1)),
            (2, "", t!(day02::part2)),
            (1, "bytes", t!(day02::part1_bytes)),
            (2, "bytes", t!(day02::part2_bytes)),
        ])
        .run_day::<3>(&[(1, "", t!(day03::part1)), (2, "", t!(day03::part2))])
        .run_day::<4>(&[
            (1, "", t!(day04::part1)),
            (1, "timvisee", t!(day04::not_my::part1_timvisee)),
            (1, "timvisee+vec", t!(day04::not_my::part1_timvisee_vec)),
            (2, "", t!(day04::part2)),
        ])
        .run_day::<5>(&[
            (1, "", t!(day05::part1)),
            (1, "hacky", t!(day05::part1_hacky)),
            (2, "", t!(day05::part2)),
            (2, "sort", t!(day05::part2_sort)),
            (2, "sort unstable", t!(day05::part2_sort_unstable)),
        ])
        .end();
}
