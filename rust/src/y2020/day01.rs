use itertools::Itertools;
use std::collections::HashMap;

pub fn part1(input: &str) -> usize {
    let mut m = [false; 2020];

    for it in input.lines() {
        let num = it.parse::<usize>().unwrap();

        match m[2020 - num] {
            true => return num * (2020 - num),
            false => m[num] = true,
        };
    }

    0
}

pub fn part2(input: &str) -> usize {
    let mut nums: Vec<usize> = input
        .lines()
        .map(|it| it.parse::<usize>().unwrap())
        .collect();
    nums.sort();

    for i in 0..nums.len() {
        let target = 2020 - nums[i];

        let mut left = i + 1;
        let mut right = nums.binary_search(&(target / 2)).unwrap_err();

        while left < right {
            let sum = nums[left] + nums[right];

            if sum > target {
                right -= 1;
            } else if sum < target {
                left += 1
            } else {
                return nums[i] * nums[left] * nums[right];
            }
        }
    }

    0
}
