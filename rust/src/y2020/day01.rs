use itertools::Itertools;
use std::collections::HashMap;

pub fn part1(input: &str) -> usize {
    let mut m = [false; 2020];

    for it in input.lines() {
        let num = it.parse::<usize>().unwrap();

        if m[2020 - num] {
            return num * (2020 - num);
        } else {
            m[num] = true
        }
    }

    unreachable!()
}

pub fn part2(input: &str) -> usize {
    let mut nums: Vec<usize> = input
        .lines()
        .map(|it| it.parse::<usize>().unwrap())
        .collect();
    nums.sort_unstable();

    for i in 0..nums.len() {
        let target = 2020 - nums[i];

        let mut left = i + 1;
        let mut right = nums.len() - 1;

        while left < right {
            let sum = nums[left] + nums[right];

            #[allow(clippy::comparison_chain)]
            if sum > target {
                right -= 1;
            } else if sum < target {
                left += 1
            } else {
                return nums[i] * nums[left] * nums[right];
            }
        }
    }

    unreachable!()
}
