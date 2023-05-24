use std::collections::HashMap;

const WIN: i32 = 6;
const DRAW: i32 = 3;
const LOSE: i32 = 0;

const ROCK: i32 = 1;
const PAPER: i32 = 2;
const SCISSORS: i32 = 3;

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let scores = HashMap::from([
        ("A X", ROCK + DRAW),
        ("A Y", PAPER + WIN),
        ("A Z", SCISSORS + LOSE),
        ("B X", ROCK + LOSE),
        ("B Y", PAPER + DRAW),
        ("B Z", SCISSORS + WIN),
        ("C X", ROCK + WIN),
        ("C Y", PAPER + LOSE),
        ("C Z", SCISSORS + DRAW),
    ]);

    input
        .lines()
        .map(|line| scores.get(line).unwrap())
        .sum::<i32>()
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let scores = HashMap::from([
        ("A X", SCISSORS + LOSE),
        ("A Y", ROCK + DRAW),
        ("A Z", PAPER + WIN),
        ("B X", ROCK + LOSE),
        ("B Y", PAPER + DRAW),
        ("B Z", SCISSORS + WIN),
        ("C X", PAPER + LOSE),
        ("C Y", SCISSORS + DRAW),
        ("C Z", ROCK + WIN),
    ]);

    input
        .lines()
        .map(|line| scores.get(line).unwrap())
        .sum::<i32>()
}

/*#[cfg(test)]
mod tests {
    use crate::aoc_day::AoCDay;

    #[test]
    fn naive_js_copy_part1_works() {
        let (input, result) = AoCDay::get_test_data(2022, 2, 1);
        assert_eq!(super::naive_js_copy_part1(&input).to_string(), result);
    }
    #[test]
    fn naive_js_copy_part2_works() {
        let (input, result) = AoCDay::get_test_data(2022, 2, 2);
        assert_eq!(super::naive_js_copy_part2(&input).to_string(), result);
    }
}
*/
