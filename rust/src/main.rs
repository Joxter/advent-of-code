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

// d1 d2.1 #some_query dbg save
fn parse_args() -> (HashMap<i32, (bool, bool)>, String, bool, bool) {
    let args = env::args().skip(1); // target/debug/rust

    let mut filter = String::new();
    let mut debug = false;
    let mut save = false;
    let mut days = HashMap::new();

    for part in args {
        if part == "dbg" || part == "debug" {
            debug = true;
        } else if part == "save" {
            save = true;
        } else {
            if part.starts_with('d') {
                if let Some((day, parts)) = parse_day(&part[1..]) {
                    days.insert(day, parts);
                }
            }
            if part.starts_with('#') {
                filter = Vec::from_iter(part[1..].split('_')).join(" ");
            }
        }
    }

    (days, filter, debug, save)
}

fn parse_day(raw: &str) -> Option<(i32, (bool, bool))> {
    if !raw.contains('.') {
        if let Ok(day) = raw.parse::<i32>() {
            if (0..=25).contains(&day) {
                return Some((day, (true, true)));
            }
            return None;
        }
        return None;
    }

    let (day, part) = raw.split_once('.').unwrap();

    match day.parse::<i32>() {
        Ok(day) if (0..=25).contains(&day) => match part {
            "1" => Some((day, (true, false))),
            "2" => Some((day, (false, true))),
            _ => Some((day, (true, true))),
        },
        _ => None,
    }
}
