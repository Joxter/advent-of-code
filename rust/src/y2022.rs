use crate::answer::AoCDay;
use std::collections::HashSet;

pub mod day01;
pub mod day02;
pub mod day03;
pub mod day04;
pub mod day05;
pub mod day06;
pub mod day07;
pub mod day08;
pub mod day09;
pub mod day10;
pub mod day11;
pub mod day12;
pub mod day13;
pub mod day14;

pub fn run_2022(days: &HashSet<i32>) {
    if days.contains(&1) || days.is_empty() {
        AoCDay::new(2022, 1)
            .part1("naive js copy", &day01::naive_js_copy_part1)
            .part2("naive js copy", &day01::naive_js_copy_part2)
            .print();
    }
    if days.contains(&2) || days.is_empty() {
        AoCDay::new(2022, 2)
            .part1("naive js copy", &day02::naive_js_copy_part1)
            .part2("naive js copy", &day02::naive_js_copy_part2)
            .print();
    }
    if days.contains(&3) || days.is_empty() {
        AoCDay::new(2022, 3)
            .part1("naive js copy", &day03::naive_js_copy_part1)
            .part2("naive js copy", &day03::naive_js_copy_part2)
            .print();
    }
    if days.contains(&4) || days.is_empty() {
        AoCDay::new(2022, 4)
            .part1("naive js copy", &day04::naive_js_copy_part1)
            .part2("naive js copy", &day04::naive_js_copy_part2)
            .print();
    }
    if days.contains(&5) || days.is_empty() {
        AoCDay::new(2022, 5)
            .part1("naive js copy", &day05::naive_js_copy_part1)
            .part2("naive js copy", &day05::naive_js_copy_part2)
            .print();
    }
    if days.contains(&6) || days.is_empty() {
        AoCDay::new(2022, 6)
            .part1("naive js copy", &day06::naive_js_copy_part1)
            .part2("naive js copy", &day06::naive_js_copy_part2)
            .print();
    }
    if days.contains(&7) || days.is_empty() {
        AoCDay::new(2022, 7)
            .part1("naive js copy", &day07::naive_js_copy_part1)
            .part2("naive js copy", &day07::naive_js_copy_part2)
            .print();
    }
    if days.contains(&8) || days.is_empty() {
        AoCDay::new(2022, 8)
            .part1("naive js copy", &day08::naive_js_copy_part1)
            .part2("naive js copy", &day08::naive_js_copy_part2)
            .print();
    }
    if days.contains(&9) || days.is_empty() {
        AoCDay::new(2022, 9)
            .part1("naive js copy", &day09::naive_js_copy_part1)
            .part2("naive js copy", &day09::naive_js_copy_part2)
            .print();
    }
    if days.contains(&10) || days.is_empty() {
        AoCDay::new(2022, 10)
            .part1("naive js copy", &day10::naive_js_copy_part1)
            .part2("naive js copy", &day10::naive_js_copy_part2)
            .print();
    }
    if days.contains(&11) || days.is_empty() {
        AoCDay::new(2022, 11)
            .part1("naive js copy", &day11::naive_js_copy_part1)
            .part2("naive js copy", &day11::naive_js_copy_part2)
            .print();
    }
    if days.contains(&12) || days.is_empty() {
        AoCDay::new(2022, 12)
            .part1("naive js copy", &day12::naive_js_copy_part1)
            .part2("naive js copy", &day12::naive_js_copy_part2)
            .print();
    }
    if days.contains(&13) || days.is_empty() {
        AoCDay::new(2022, 13)
            .part1("naive js copy", &day13::naive_js_copy_part1)
            .part2("naive js copy", &day13::naive_js_copy_part2)
            .print();
    }
    if days.contains(&14) || days.is_empty() {
        AoCDay::new(2022, 14)
            // .test_only("naive js copy", &day14::naive_js_copy_part1)
            .part1("naive js copy", &day14::naive_js_copy_part1)
            .part2("naive js copy", &day14::naive_js_copy_part2)
            .print();
    }
}
