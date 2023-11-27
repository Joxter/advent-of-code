use itertools::Itertools;

pub fn part1(input: &str) -> usize {
    input
        .lines()
        .filter(|line| {
            let (p0, password) = line.split_once(": ").unwrap();

            let (times, ch) = p0.split_once(' ').unwrap();
            let ch = ch.chars().next().unwrap();
            let (min, max) = times.split_once('-').unwrap();

            let cnt = password.chars().filter(|c| *c == ch).count();

            cnt >= to_usize(min) && cnt <= to_usize(max)
        })
        .count()
}

pub fn part2(input: &str) -> usize {
    input
        .lines()
        .filter(|line| {
            let (p0, password) = line.split_once(": ").unwrap();
            let password = password.chars().collect_vec();

            let (times, ch) = p0.split_once(' ').unwrap();
            let ch = ch.chars().next().unwrap();
            let (first, second) = times.split_once('-').unwrap();

            (password[to_usize(first) - 1] == ch) != (password[to_usize(second) - 1] == ch)
        })
        .count()
}

pub fn part1_bytes(input: &str) -> usize {
    input
        .lines()
        .filter(|line| {
            let (p0, password) = line.split_once(": ").unwrap();

            let (times, ch) = p0.split_once(' ').unwrap();
            let ch = ch.as_bytes()[0];
            let (min, max) = times.split_once('-').unwrap();

            let cnt = password.as_bytes().iter().filter(|c| **c == ch).count();

            cnt >= to_usize(min) && cnt <= to_usize(max)
        })
        .count()
}

pub fn part2_bytes(input: &str) -> usize {
    input
        .lines()
        .filter(|line| {
            let (p0, password) = line.split_once(": ").unwrap();
            let password = password.as_bytes();

            let (times, ch) = p0.split_once(' ').unwrap();
            let ch = ch.as_bytes()[0];
            let (first, second) = times.split_once('-').unwrap();

            (password[to_usize(first) - 1] == ch) != (password[to_usize(second) - 1] == ch)
        })
        .count()
}

fn to_usize(str: &str) -> usize {
    str.parse::<usize>().unwrap()
}
