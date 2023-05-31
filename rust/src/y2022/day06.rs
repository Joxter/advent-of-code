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
        // inspired by ThePrimeagen's YouTube video
        let input = input.as_bytes();

        let mut i = size;
        while i < input.len() {
            let mut uniq: i32 = 0;

            let mut j = 0;
            while j < size {
                let ch = input[i - j - 1];
                if uniq & 1 << (ch - b'a') == 0 {
                    uniq |= 1 << (ch - b'a')
                } else {
                    break;
                }
                j += 1;
            }
            if uniq.count_ones() as usize == size {
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
