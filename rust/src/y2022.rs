use crate::answer::AoCDay;
use std::collections::HashSet;

mod day01;
mod day02;
mod day03;
mod day04;
mod day05;
mod day06;
mod day07;
mod day08;
mod day09;
mod day10;
mod day11;
mod day12;
mod day13;
mod day14;
mod day15;
mod day16;
mod day17;
mod day18;
mod day19;
mod day20;
mod day21;
mod day22_todo;
mod day23;

pub fn run_2022(days: &HashSet<i32>) {
    /*
    // todo implement something like this:
    AoCDay::new(2022, days)
        .day(1, p1, "naive js copy", &day01::naive_js_copy_part1)
        .day(1, p2, "naive js copy", &day01::naive_js_copy_part1)
        .day_test(2, p1, "naive js copy", |inp| &day02::naive_js_copy_part1(inp, 1))
        .day_real(2, p1, "naive js copy", |inp| &day02::naive_js_copy_part1(inp, 2))
        .day(2, p2, "naive js copy", &day02::naive_js_copy_part1)
        .print()

    */
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
            .part1("naive js copy", &day14::naive_js_copy_part1)
            .part2("naive js copy", &day14::naive_js_copy_part2)
            .print();
    }
    if days.contains(&15) || days.is_empty() {
        AoCDay::new(2022, 15)
            .part1_test("naive js copy", &|inp| day15::naive_js_copy_part1(inp, 10))
            .part1_real("naive js copy", &|inp| {
                day15::naive_js_copy_part1(inp, 2_000_000)
            })
            .part2_test("naive js copy", &|inp| day15::naive_js_copy_part2(inp, 20))
            .part2_real("naive js copy", &|inp| {
                day15::naive_js_copy_part2(inp, 4_000_000)
            })
            .print();
    }
    if days.contains(&16) || days.is_empty() {
        AoCDay::new(2022, 16)
            .part1("naive js copy", &day16::naive_js_copy_part1) // sec  1.032
            .part2("naive js copy", &day16::naive_js_copy_part2) // sec 86.641
            .print();
    }
    if days.contains(&17) || days.is_empty() {
        AoCDay::new(2022, 17)
            .part1("naive js copy", &day17::naive_js_copy_part1)
            .part2_test("naive js copy", &day17::naive_js_copy_part2_test)
            .part2_real("naive js copy", &day17::naive_js_copy_part2_real)
            .print();
    }
    if days.contains(&18) || days.is_empty() {
        AoCDay::new(2022, 18)
            .part1("naive js copy", &day18::naive_js_copy_part1)
            .part2("naive js copy", &day18::naive_js_copy_part2)
            .print();
    }
    if days.contains(&19) || days.is_empty() {
        AoCDay::new(2022, 19)
            .part1("naive js copy", &day19::naive_js_copy_part1)
            .part2("naive js copy", &day19::naive_js_copy_part2) // todo test is wrong, wtf???
            .print();
    }
    if days.contains(&20) || days.is_empty() {
        AoCDay::new(2022, 20)
            .part1("naive js copy", &day20::naive_js_copy_part1)
            .part2("naive js copy", &day20::naive_js_copy_part2)
            .print();
    }
    if days.contains(&21) || days.is_empty() {
        AoCDay::new(2022, 21)
            .part1("naive js copy", &day21::naive_1::part1)
            .part2("naive js copy", &day21::naive_1::part2)
            .part1("naive js copy (compact Node)", &day21::naive_2::part1)
            .part2("naive js copy (compact Node)", &day21::naive_2::part2)
            .print();
    }
    if days.contains(&22) || days.is_empty() {
        AoCDay::new(2022, 22) // todo
            .part1("naive js copy", &day22_todo::naive_js_copy_part1)
            .part2("naive js copy", &day22_todo::naive_js_copy_part2)
            .print();
    }
    if days.contains(&23) || days.is_empty() {
        AoCDay::new(2022, 23)
            .part1("naive js copy", &day23::naive_js_copy_part1)
            .part2("naive js copy", &day23::naive_js_copy_part2)
            .print();
    }
}
