use crate::aoc_day::{AoCDay, Params};
use crate::y2020;
use std::fmt::Display;

mod day14;

macro_rules! t {
    ($func:expr) => {
        &|input| {
            let sys_time = std::time::SystemTime::now();
            let answer = std::hint::black_box($func(std::hint::black_box(input)));
            (sys_time.elapsed().unwrap(), answer.to_string())
        }
    };
}

pub fn run_2023(params: Params) {
    unreachable!();
    AoCDay::new(2023, params)
        .run_day::<14>(&[(2, "", t!(day14::part2))])
        .end();
}
