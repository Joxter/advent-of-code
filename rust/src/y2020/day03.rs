use itertools::Itertools;
use std::str::Chars;

pub fn part1(input: &str) -> usize {
    let vec = input.lines().map(|l| l.as_bytes()).collect_vec();

    count_trees(&vec, 3, 1)
}

pub fn part2(input: &str) -> usize {
    let vec = input.lines().map(|l| l.as_bytes()).collect_vec();

    count_trees(&vec, 1, 1)
        * count_trees(&vec, 3, 1)
        * count_trees(&vec, 5, 1)
        * count_trees(&vec, 7, 1)
        * count_trees(&vec, 1, 2)
}

fn count_trees(grid: &[&[u8]], right: usize, down: usize) -> usize {
    let mut res = 0;
    let mut offset = 0;
    let width = grid[0].len();

    for row in grid.iter().step_by(down) {
        if row[offset] == b'#' {
            res += 1;
        }
        offset = (offset + right) % width
    }

    res
}
