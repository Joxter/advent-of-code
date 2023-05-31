use std::collections::HashSet;

pub fn naive_js_copy_part1(input: &str) -> usize {
    let input = input.as_bytes();

    let mut marker = input[0..4].to_vec();

    for i in 4..input.len() {
        marker[i % 4] = input[i];

        if HashSet::<u8>::from_iter(marker.clone()).len() == 4 {
            return i + 1;
        }
    }
    unreachable!()
}

pub fn naive_js_copy_part2(input: &str) -> usize {
    let input = input.as_bytes();

    let mut marker = input[0..14].to_vec();

    for i in 14..input.len() {
        marker[i % 14] = input[i];

        if HashSet::<u8>::from_iter(marker.clone()).len() == 14 {
            return i + 1;
        }
    }
    unreachable!()
}

pub mod optimised {
    use serde_json::Value::String;

    pub fn part1_copilot(input: &str) -> usize {
        // FULL copilot code, only based on the naive_js_copy_part1 function
        let input = input.as_bytes();

        let mut marker = input[0..4].to_vec();

        for i in 4..input.len() {
            marker[i % 4] = input[i];

            if marker[0] != marker[1]
                && marker[0] != marker[2]
                && marker[0] != marker[3]
                && marker[1] != marker[2]
                && marker[1] != marker[3]
                && marker[2] != marker[3]
            {
                return i + 1;
            }
        }
        unreachable!()
    }

    pub fn part1_bitmask(input: &str) -> usize {
        find_uniq_bitmask(input, 4)
    }
    pub fn part2_bitmask(input: &str) -> usize {
        find_uniq_bitmask(input, 14)
    }

    pub fn part1_from_right(input: &str) -> usize {
        find_uniq_from_right(input, 4)
    }
    pub fn part2_from_right(input: &str) -> usize {
        find_uniq_from_right(input, 14)
    }

    fn find_uniq_bitmask(input: &str, size: usize) -> usize {
        let input = input.as_bytes();

        for i in size..input.len() {
            let mut uniq: i32 = 0;
            for ch in &input[i - size..i] {
                if uniq & 1 << (ch - b'a') == 0 {
                    uniq |= 1 << (ch - b'a')
                } else {
                    break;
                }
                if uniq.count_ones() as usize == size {
                    return i;
                }
            }
        }

        unreachable!()
    }

    fn find_uniq_from_right(input: &str, size: usize) -> usize {
        // inspired by ThePrimeagen's YouTube video https://www.youtube.com/watch?v=U16RnpV48KQ
        let input = input.as_bytes();

        let mut i = size;
        while i < input.len() {
            let mut uniq: i32 = 0;

            let mut j = 0;
            while j < size {
                let bit_pos = 1 << input[i - (j + 1)] % 32;
                if uniq & bit_pos == 0 {
                    uniq |= bit_pos
                } else {
                    break;
                }
                j += 1;
            }
            if j == size {
                return i;
            }
            i += size - j;
        }

        unreachable!()
    }

    #[cfg(test)]
    mod day06 {
        use super::*;

        #[test]
        fn part1_copilot_works() {
            assert_eq!(part1_copilot("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
            assert_eq!(part1_copilot("nppdvjthqldpwncqszvftbrmjlhg"), 6);
            assert_eq!(part1_copilot("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
            assert_eq!(part1_copilot("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
        }

        #[test]
        fn find_uniq_bitmask_works() {
            assert_eq!(find_uniq_bitmask("bvwbjplbgvbhsrlpgdmjqwftvncz", 4), 5);
            assert_eq!(find_uniq_bitmask("nppdvjthqldpwncqszvftbrmjlhg", 4), 6);
            assert_eq!(
                find_uniq_bitmask("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 4),
                10
            );
            assert_eq!(find_uniq_bitmask("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4), 11);

            assert_eq!(find_uniq_bitmask("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14), 19);
            assert_eq!(find_uniq_bitmask("bvwbjplbgvbhsrlpgdmjqwftvncz", 14), 23);
            assert_eq!(find_uniq_bitmask("nppdvjthqldpwncqszvftbrmjlhg", 14), 23);
            assert_eq!(
                find_uniq_bitmask("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14),
                29
            );
            assert_eq!(
                find_uniq_bitmask("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14),
                26
            );
        }

        #[test]
        fn find_uniq_from_right_works() {
            assert_eq!(
                find_uniq_from_right("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14),
                19
            );
            assert_eq!(find_uniq_from_right("bvwbjplbgvbhsrlpgdmjqwftvncz", 14), 23);
            assert_eq!(find_uniq_from_right("nppdvjthqldpwncqszvftbrmjlhg", 14), 23);
            assert_eq!(
                find_uniq_from_right("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14),
                29
            );
            assert_eq!(
                find_uniq_from_right("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14),
                26
            );
        }
    }
}

pub mod not_my_ski_fire13 {
    // https://github.com/SkiFire13/adventofcode-2022-rs/blob/master/src/day6.rs

    struct ByteCounter {
        counts: [usize; 256],
        unique: usize,
    }

    impl ByteCounter {
        fn add(&mut self, b: u8) {
            self.counts[b as usize] += 1;
            self.unique += (self.counts[b as usize] == 1) as usize;
        }
        fn remove(&mut self, b: u8) {
            self.counts[b as usize] -= 1;
            self.unique -= (self.counts[b as usize] == 0) as usize;
        }
    }

    fn position_n_distinct(input: &[u8], n: usize) -> usize {
        let mut counter = ByteCounter {
            counts: [0; 256],
            unique: 0,
        };
        input[0..n].iter().for_each(|&b| counter.add(b));
        if counter.unique == n {
            return n;
        }

        n + 1
            + input
                .windows(n + 1)
                .position(|c| {
                    let &[old, .., new] = c else { panic!("Invalid input") };
                    counter.remove(old);
                    counter.add(new);
                    counter.unique == n
                })
                .expect("Invalid input")
    }

    pub fn part1(input: &str) -> usize {
        position_n_distinct(input.as_bytes(), 4)
    }

    pub fn part2(input: &str) -> usize {
        position_n_distinct(input.as_bytes(), 14)
    }
}

pub mod not_my_smith61 {
    // https://github.com/smith61/advent_of_code/blob/main/src/year_2022/day_06.rs
    fn solve<const COUNT: usize>(input: &str) -> u64 {
        let as_bytes = input.as_bytes();
        let mut mask = 0u64;
        for index in 0..COUNT {
            mask ^= 1 << (as_bytes[index] - b'a');
        }

        for index in COUNT..as_bytes.len() {
            if mask.count_ones() as usize == COUNT {
                return index as u64;
            }

            mask ^= 1 << (as_bytes[index - COUNT] - b'a');
            mask ^= 1 << (as_bytes[index] - b'a');
        }

        unreachable!()
    }

    pub fn part1(input: &str) -> u64 {
        solve::<4>(input)
    }

    pub fn part2(input: &str) -> u64 {
        solve::<14>(input)
    }

    #[cfg(test)]
    mod day06_smith61 {
        use super::*;

        #[test]
        pub fn part1_works() {
            assert_eq!(part1("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
            assert_eq!(part1("nppdvjthqldpwncqszvftbrmjlhg"), 6);
            assert_eq!(part1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
            assert_eq!(part1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
        }
    }
}

pub mod not_my_the_primeagen {
    pub fn part2(input: &str) -> usize {
        let input = input.as_bytes();
        let mut idx = 0;
        while let Some(slice) = input.get(idx..idx + 14) {
            let mut state = 0u32;
            let mut pos = (slice.len() - 1) as isize;
            while pos >= 0 {
                let bit_idx = 1 << (slice[pos as usize] % 32);
                if state & bit_idx != 0 {
                    break;
                } else {
                    state |= bit_idx;
                    pos -= 1;
                }
            }

            if pos < 0 {
                return idx + 14; // in original solution it was only "idx"
            }
            idx += (pos + 1) as usize;
        }

        unreachable!()
    }
}
