#![allow(dead_code)]
#![allow(unused_imports)]

use crate::y2022::day01;
use crate::y2022::day02;
use crate::y2022::day03;
use crate::y2022::day04;
use crate::y2022::day05;
use std::fmt::Display;
use std::fs;

mod y2022;

fn main() {
    // run_solution(
    //     "../2022/inputs/d01",
    //     "day1",
    //     Box::new(day01::naive_js_copy_part1),
    //     Box::new(day01::naive_js_copy_part2),
    // );
    // run_solution(
    //     "../2022/inputs/d02",
    //     "day2",
    //     Box::new(day02::naive_js_copy_part1),
    //     Box::new(day02::naive_js_copy_part2),
    // );
    // run_solution(
    //     "../2022/inputs/d03",
    //     "day3",
    //     Box::new(day03::naive_js_copy_part1),
    //     Box::new(day03::naive_js_copy_part2),
    // );
    // run_solution(
    //     "../2022/inputs/d04",
    //     "day4",
    //     Box::new(day04::naive_js_copy_part1),
    //     Box::new(day04::naive_js_copy_part2),
    // );
    run_solution(
        "../2022/inputs/d05",
        "day5",
        Box::new(day05::naive_js_copy_part1),
        Box::new(day05::naive_js_copy_part2),
    );
}

struct Answers {
    part1_test: String,
    part1: String,
    part2_test: String,
    part2: String,
}

fn parse_answers(path: &str) -> Answers {
    let ans_str = fs::read_to_string(path).unwrap();

    let bbb: Vec<String> = ans_str
        .lines()
        .map(|l| {
            let splited_iter: Vec<_> = l.split(' ').collect();
            splited_iter.last().unwrap().to_string()
        })
        .collect();

    Answers {
        part1_test: bbb[0].clone(),
        part1: bbb[1].clone(),
        part2_test: bbb[2].clone(),
        part2: bbb[3].clone(),
    }
}

// looks very shitty
fn run_solution<T: Display>(
    input_folder: &str,
    label: &str,
    part_1: Box<dyn Fn(&str) -> T>,
    part_2: Box<dyn Fn(&str) -> T>,
) {
    let test_inp = fs::read_to_string(format!("{}/test.txt", input_folder)).unwrap();
    let inp = fs::read_to_string(format!("{}/input.txt", input_folder)).unwrap();

    let answers = parse_answers(format!("{}/answer.txt", input_folder).as_str());

    println!(
        "{} part1 test {} [{}]",
        label,
        part_1(&test_inp),
        answers.part1_test
    );
    println!("{} part1 {} [{}]", label, part_1(&inp), answers.part1);

    println!(
        "{} part2 test {} [{}]",
        label,
        part_2(&test_inp),
        answers.part2_test
    );
    println!("{} part2 {} [{}]", label, part_2(&inp), answers.part2);
}
