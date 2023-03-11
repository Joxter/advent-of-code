#![allow(dead_code)]
#![allow(unused_imports)]

use crate::y2022::run_2022;
use std::collections::HashSet;
use std::{env, io};

mod aoc_day;
mod aoc_year;
mod y2022;

fn main() {
    let days: HashSet<i32> = env::args()
        .filter_map(|arg| arg.parse::<i32>().ok())
        .collect();

    run_2022(&days)
}
