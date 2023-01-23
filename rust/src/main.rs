use crate::y2022::day01::{naive_js_copy_part1, naive_js_copy_part2};
use std::fs;

mod y2022;

fn main() {
    y2022_d01()
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

#[allow(dead_code)]
fn y2022_d01() {
    let test_inp = fs::read_to_string("../2022/inputs/d01/test.txt").unwrap();
    let inp = fs::read_to_string("../2022/inputs/d01/input.txt").unwrap();

    let answers = parse_answers("../2022/inputs/d01/answer.txt");

    println!(
        "day1 part1 test {} [{}]",
        naive_js_copy_part1(&test_inp),
        answers.part1_test
    );
    println!(
        "day1 part1 {} [{}]",
        naive_js_copy_part1(&inp),
        answers.part1
    );

    println!(
        "day1 part2 test {} [{}]",
        naive_js_copy_part2(&test_inp),
        answers.part2_test
    );
    println!(
        "day1 part2 {} [{}]",
        naive_js_copy_part2(&inp),
        answers.part2
    );
}
