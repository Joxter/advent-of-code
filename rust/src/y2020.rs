use crate::aoc_day::{AoCDay, Params};
use crate::y2020;
use std::fmt::Display;

mod day01;
mod day02;
mod day03;

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
        .end();
}
