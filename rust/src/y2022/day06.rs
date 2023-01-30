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
