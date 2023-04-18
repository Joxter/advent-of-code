use crate::aoc_day::AoCDay;
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
mod day22;
mod day23;
mod day24;
mod day25;

pub fn run_2022(days: &HashSet<i32>) {
    // todo implement something like this:
    //    + remove testing stuff from AoCDay, use `#[cfg(test)]` instead
    //    + repeat X times
    //    + add time limit
    //    + proper writing results to a file

    // AoCDay::clear_result_file(); // todo make it better

    AoCDay::new(2022, 1, days)
        .part1("naive js copy", &day01::naive_js_copy_part1)
        .part2("naive js copy", &day01::naive_js_copy_part2);

    AoCDay::new(2022, 2, days)
        .part1("naive js copy", &day02::naive_js_copy_part1)
        .part2("naive js copy", &day02::naive_js_copy_part2);

    AoCDay::new(2022, 3, days)
        .part1("naive js copy", &day03::naive_js_copy_part1)
        .part2("naive js copy", &day03::naive_js_copy_part2);

    AoCDay::new(2022, 4, days)
        .part1("naive js copy", &day04::naive_js_copy_part1)
        .part2("naive js copy", &day04::naive_js_copy_part2);

    AoCDay::new(2022, 5, days)
        .part1("naive js copy", &day05::naive_js_copy_part1)
        .part2("naive js copy", &day05::naive_js_copy_part2);

    AoCDay::new(2022, 6, days)
        .part1("naive js copy", &day06::naive_js_copy_part1)
        .part2("naive js copy", &day06::naive_js_copy_part2);

    AoCDay::new(2022, 7, days)
        .part1("naive js copy", &day07::naive_js_copy_part1)
        .part2("naive js copy", &day07::naive_js_copy_part2);

    AoCDay::new(2022, 8, days)
        .part1("naive js copy", &day08::naive_js_copy_part1)
        .part2("naive js copy", &day08::naive_js_copy_part2);

    AoCDay::new(2022, 9, days)
        .part1("naive js copy", &day09::naive_js_copy_part1)
        .part2("naive js copy", &day09::naive_js_copy_part2);

    AoCDay::new(2022, 10, days)
        .part1("naive js copy", &day10::naive_js_copy_part1)
        .part2("naive js copy", &day10::naive_js_copy_part2);

    AoCDay::new(2022, 11, days)
        .part1("naive js copy", &day11::naive_js_copy_part1)
        .part2("naive js copy", &day11::naive_js_copy_part2);

    AoCDay::new(2022, 12, days)
        .part1("naive js copy", &day12::naive_js_copy_part1)
        .part2("naive js copy", &day12::naive_js_copy_part2);

    AoCDay::new(2022, 13, days)
        .part1("naive js copy", &day13::naive_js_copy_part1)
        .part2("naive js copy", &day13::naive_js_copy_part2);

    AoCDay::new(2022, 14, days)
        .part1("naive js copy", &day14::naive_js_copy_part1)
        .part2("naive js copy", &day14::naive_js_copy_part2);

    AoCDay::new(2022, 15, days)
        .part1_ver(
            "naive js copy",
            &|inp| day15::naive_js_copy_part1(inp, 10),
            &|inp| day15::naive_js_copy_part1(inp, 2_000_000),
        )
        .part2_ver(
            "naive js copy",
            &|inp| day15::naive_js_copy_part2(inp, 20),
            &|inp| day15::naive_js_copy_part2(inp, 4_000_000),
        );

    AoCDay::new(2022, 16, days)
        .part1("naive js copy", &day16::naive_js_copy_part1) // sec  1.032
        .part2("naive js copy", &day16::naive_js_copy_part2); // sec 86.641

    AoCDay::new(2022, 17, days)
        .part1("naive js copy", &day17::naive_js_copy_part1)
        .part2_ver(
            "naive js copy",
            &day17::naive_js_copy_part2_test,
            &day17::naive_js_copy_part2_real,
        );

    AoCDay::new(2022, 18, days)
        .part1("naive js copy", &day18::naive_js_copy_part1)
        .part2("naive js copy", &day18::naive_js_copy_part2);

    AoCDay::new(2022, 19, days)
        .part1("naive js copy", &day19::naive_js_copy_part1)
        .part2("naive js copy", &day19::naive_js_copy_part2); // todo test is wrong, wtf???

    AoCDay::new(2022, 20, days)
        .part1("naive js copy", &day20::naive_js_copy_part1)
        .part2("naive js copy", &day20::naive_js_copy_part2);

    AoCDay::new(2022, 21, days)
        .part1("naive js copy", &day21::naive_1::part1)
        .part1("naive js copy (compact Node)", &day21::naive_2::part1)
        .part2("naive js copy", &day21::naive_1::part2)
        .part2("naive js copy (compact Node)", &day21::naive_2::part2);

    AoCDay::new(2022, 22, days)
        .part1_ver("naive js copy", &|_| 0, &day22::naive_js_copy_part1) // todo add part1_real
        .part2_ver("naive js copy", &|_| 0, &day22::naive_js_copy_part2); // todo add part1_real

    AoCDay::new(2022, 23, days)
        .part1("naive js copy", &day23::naive_js_copy_part1)
        .part2("naive js copy", &day23::naive_js_copy_part2);

    AoCDay::new(2022, 24, days)
        .part1("naive js copy", &day24::naive_js_copy_part1)
        .part2("naive js copy", &day24::naive_js_copy_part2);

    AoCDay::new(2022, 25, days).part1("naive js copy", &day25::naive_js_copy_part1);
}
