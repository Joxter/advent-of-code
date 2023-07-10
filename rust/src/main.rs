#![allow(dead_code)]
#![allow(unused_imports)]

use crate::y2022::run_2022;
use std::collections::HashMap;
use std::{env, io};

mod aoc_day;
mod y2022;

fn main() {
    let (days, filter, debug, save) = parse_args();

    run_2022(&days, &filter, debug, save)
}

// args: 1 2.1 dbg save --filter "some filter"
fn parse_args() -> (HashMap<i32, (bool, bool)>, String, bool, bool) {
    let mut filter_next = false;
    let mut filter = String::new();

    let mut debug = false;
    let mut save = false;
    let mut days = HashMap::new();

    for part in env::args() {
        if part == "--filter" {
            filter_next = true
        } else if filter_next {
            filter_next = false;
            filter = part
        } else if part == "dbg" || part == "debug" {
            debug = true;
        } else if part == "save" {
            save = true;
        } else if let Some((day, parts)) = parse_day(&part) {
            days.insert(day, parts);
        }
    }

    (days, filter, debug, save)
}

fn parse_day(raw: &str) -> Option<(i32, (bool, bool))> {
    let (day, part) = raw.split_once('.').unwrap_or((raw, ""));
    let parts = match part {
        "1" => (true, false),
        "2" => (false, true),
        _ => (true, true),
    };

    match day.parse::<i32>() {
        Ok(day) if (0..=25).contains(&day) => Some((day, parts)),
        _ => None,
    }
}
