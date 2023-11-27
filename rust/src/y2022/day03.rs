use std::collections::HashSet;

pub fn naive_js_copy_part1(input: &str) -> i32 {
    input
        .lines()
        .map(|line| {
            let mut first_part = HashSet::new();
            for char in line[0..(line.len() / 2)].chars() {
                first_part.insert(char);
            }

            for char in line[line.len() / 2..].chars() {
                if first_part.contains(&char) {
                    return if char.is_uppercase() {
                        (char as i32) - 38
                    } else {
                        (char as i32) - 96
                    };
                }
            }
            0
        })
        .sum()
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let lines: Vec<_> = input.lines().collect();
    let mut res = 0;

    for i in 0..(lines.len() / 3) {
        let i = i * 3;

        let line_1 = lines[i];
        let mut line_1_set = HashSet::new();
        for char in line_1.chars() {
            line_1_set.insert(char);
        }

        let line_2 = lines[i + 1];
        let mut line_2_set = HashSet::new();
        for char in line_2.chars() {
            if line_1_set.contains(&char) {
                line_2_set.insert(char);
            }
        }

        let line_3 = lines[i + 2];
        for char in line_3.chars() {
            if line_2_set.contains(&char) {
                if char.is_uppercase() {
                    res += (char as i32) - 38
                } else {
                    res += (char as i32) - 96
                };
                break;
            }
        }
    }

    res
}

pub mod optimised {
    use itertools::Itertools;
    use std::collections::HashSet;

    pub fn part1(input: &str) -> usize {
        input
            .lines()
            .map(|line| {
                let mut first_part: u64 = 0;
                for byte in line[0..(line.len() / 2)].as_bytes() {
                    first_part |= 1 << (byte - b'A');
                }

                for byte in line[line.len() / 2..].as_bytes() {
                    if first_part & (1 << (byte - b'A')) != 0 {
                        return match byte {
                            b'A'..=b'Z' => byte - 38,
                            _ => byte - 96,
                        } as usize;
                    }
                }
                0
            })
            .sum()
    }

    pub fn part2(input: &str) -> usize {
        input
            .lines()
            .chunks(3)
            .into_iter()
            .map(|mut l| {
                let line_1 = l.next().unwrap();
                let line_2 = l.next().unwrap();
                let line_3 = l.next().unwrap();

                let mut first_part: u64 = 0;
                for byte in line_1.as_bytes() {
                    first_part |= 1 << (byte - b'A');
                }

                let mut second_part: u64 = 0;
                for byte in line_2.as_bytes() {
                    second_part |= 1 << (byte - b'A');
                }
                let total = first_part & second_part;

                for byte in line_3.as_bytes() {
                    if (total & 1 << (byte - b'A')) != 0 {
                        return match byte {
                            b'A'..=b'Z' => byte - 38,
                            _ => byte - 96,
                        } as usize;
                    }
                }

                unreachable!();
            })
            .sum()
    }
}

pub mod not_my_ski_fire13 {
    // https://github.com/SkiFire13/adventofcode-2022-rs/blob/master/src/day3.rs

    type Input = Vec<(u64, u64)>;

    pub fn input_generator(input: &str) -> Input {
        input
            .lines()
            .map(|line| {
                let (left, right) = line.as_bytes().split_at(line.len() / 2);
                (to_bitset(left), to_bitset(right))
            })
            .collect()
    }

    fn to_bitset(s: &[u8]) -> u64 {
        s.iter()
            .map(|b| match b {
                b'a'..=b'z' => b - b'a' + 1,
                b'A'..=b'Z' => b - b'A' + 27,
                _ => panic!("Invalid input"),
            })
            .fold(0, |acc, b| acc | (1 << b))
    }

    pub fn part1(input: &str) -> u32 {
        input_generator(input)
            .iter()
            .map(|&(left, right)| (left & right).trailing_zeros())
            .sum()
    }

    pub fn part2(input: &str) -> u32 {
        input_generator(input)
            .chunks_exact(3)
            .map(|chunk| {
                let [(a1, a2), (b1, b2), (c1, c2)]: [_; 3] = chunk.try_into().unwrap();
                ((a1 | a2) & (b1 | b2) & (c1 | c2)).trailing_zeros()
            })
            .sum()
    }
}
