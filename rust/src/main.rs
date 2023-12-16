#![allow(dead_code)]
#![allow(unused_imports)]

use crate::aoc_day::AoCDay;

mod aoc_day;
mod y2020;
mod y2022;
mod y2023;

// cargo run -- 1 2.1 dbg save --filter "some filter"

fn main() {
    // y2020::run_2020(AoCDay::parse_env_args())
    y2022::run_2022(AoCDay::parse_env_args())
    // y2023::run_2023(AoCDay::parse_env_args())
}
