#![allow(dead_code)]
#![allow(unused_imports)]

use crate::y2022::run_2022;
use std::collections::HashMap;
use std::{env, io};

mod aoc_day;
mod y2022;

fn main() {
    let days: HashMap<i32, (bool, bool)> = parse_args();

    run_2022(&days)
}

fn parse_args() -> HashMap<i32, (bool, bool)> {
    // args: 1 2.1 3.2
    // days:
    //   day 1 part1-2,
    //   day 2 part1,
    //   day 3 part2,

    env::args()
        .filter_map(|arg| match arg.parse::<i32>() {
            Ok(day) => Some((day, (true, true))),
            Err(_) => match arg.split_once('.') {
                Some((day, part)) => match day.parse::<i32>() {
                    Ok(day) => match part {
                        "1" => Some((day, (true, false))),
                        "2" => Some((day, (false, true))),
                        _ => Some((day, (true, true))),
                    },
                    Err(_) => None,
                },
                None => None,
            },
        })
        .collect()
}
