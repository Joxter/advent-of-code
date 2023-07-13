#![allow(dead_code)]
#![allow(unused_imports)]

use crate::aoc_day::AoCDay;
use crate::y2022::run_2022;
use std::collections::HashMap;
use std::{env, io};

mod aoc_day;
mod y2022;

fn main() {
    run_2022(AoCDay::parse_env_args())
}
