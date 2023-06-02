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

pub mod optimised {
    pub fn part1(inp: &str) -> u32 {
        inp.lines()
            .map(|line| {
                let mut chars = line.bytes();
                let x = chars.next().unwrap() - b'A';
                let y = chars.nth(1).unwrap() - b'X';

                if x == y {
                    y as u32 + 1 + 3
                } else if (3 + y - x) % 3 == 1 {
                    y as u32 + 1 + 6
                } else {
                    y as u32 + 1
                }
            })
            .sum::<u32>()
    }

    pub fn part2(inp: &str) -> u32 {
        inp.lines()
            .map(|line| {
                let mut chars = line.bytes();
                let x = chars.next().unwrap() - b'A';
                let y = chars.nth(1).unwrap() as char;

                if y == 'Z' {
                    let win_pos = (x + 1) % 3;
                    win_pos as u32 + 6 + 1
                } else if y == 'Y' {
                    let draw_pos = x;
                    draw_pos as u32 + 3 + 1
                } else {
                    let lose_pos = (3 + x - 1) % 3;
                    lose_pos as u32 + 1
                }
            })
            .sum::<u32>()
    }
}

#[allow(clippy::all)]
pub mod not_my_smith61 {
    // https://github.com/smith61/advent_of_code/blob/main/src/year_2022/day_02.rs

    fn solve(input: &str, lookup_table: &[u64; 16]) -> u64 {
        let mut score = 0;
        for line in input.lines() {
            let o = line.as_bytes()[0] - b'A';
            let m = line.as_bytes()[2] - b'X';
            score += lookup_table[((o << 2) | m) as usize];
        }

        score
    }

    pub fn part1(input: &str) -> u64 {
        const LOOKUP_TABLE: [u64; 16] = [
            1 + 3, // R-R
            2 + 6, // R-P
            3 + 0, // R-S
            0,
            1 + 0, // P-R
            2 + 3, // P-P
            3 + 6, // P-S
            0,
            1 + 6, // S-R
            2 + 0, // S-P
            3 + 3, // S-S
            0,
            0,
            0,
            0,
            0,
        ];

        solve(input, &LOOKUP_TABLE)
    }

    pub fn part2(input: &str) -> u64 {
        const LOOKUP_TABLE: [u64; 16] = [
            3 + 0, // R-S
            1 + 3, // R-R
            2 + 6, // R-P
            0,
            1 + 0, // P-R
            2 + 3, // P-P
            3 + 6, // P-S
            0,
            2 + 0, // S-P
            3 + 3, // S-S
            1 + 6, // S-R
            0,
            0,
            0,
            0,
            0,
        ];

        solve(input, &LOOKUP_TABLE)
    }
}

pub mod not_my_ski_fire13 {
    // https://github.com/SkiFire13/adventofcode-2022-rs/blob/master/src/day2.rs

    type Input = Vec<(usize, usize)>;

    pub fn input_generator(input: &str) -> Input {
        input
            .lines()
            .map(str::as_bytes)
            .map(|line| ((line[0] - b'A') as usize, (line[2] - b'X') as usize))
            .collect()
    }

    pub fn part1(input: &str) -> usize {
        input_generator(input)
            .iter()
            .copied()
            .map(|(a, x)| {
                let move_score = x + 1;
                let game_result = (3 + x - a + 1) % 3;
                move_score + 3 * game_result
            })
            .sum()
    }

    pub fn part2(input: &str) -> usize {
        input_generator(input)
            .iter()
            .copied()
            .map(|(a, x)| {
                let move_to_play = (a + x + 3 - 1) % 3;
                let move_score = move_to_play + 1;
                let game_result = x;
                game_result * 3 + move_score
            })
            .sum()
    }
}
