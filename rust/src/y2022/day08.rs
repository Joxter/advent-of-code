use std::collections::HashSet;

pub fn naive_js_copy_part1(input: &str) -> usize {
    let mut grid: Vec<Vec<i32>> = vec![];

    for line in input.lines() {
        grid.push(
            line.chars()
                .map(|ch| ch.to_digit(10).unwrap() as i32)
                .collect(),
        );
    }

    let height = grid.len();
    let width = grid[0].len();

    let mut result: HashSet<(usize, usize)> = HashSet::new();

    for (i, row) in grid.iter().enumerate() {
        let mut max = -1;
        for (j, cur) in row.iter().enumerate() {
            if *cur > max {
                max = *cur;
                result.insert((i, j));

                if max == 9 {
                    break;
                }
            }
        }

        let mut max = -1;
        for j in (0..width).rev() {
            let cur = row[j];
            if cur > max {
                max = cur;
                result.insert((i, j));

                if max == 9 {
                    break;
                }
            }
        }
    }

    for j in 0..height {
        let mut max = -1;
        for (i, row) in grid.iter().enumerate() {
            let cur = row[j];
            if cur > max {
                max = cur;
                result.insert((i, j));

                if max == 9 {
                    break;
                }
            }
        }

        let mut max = -1;
        for i in (0..width).rev() {
            let cur = grid[i][j];
            if cur > max {
                max = cur;
                result.insert((i, j));

                if max == 9 {
                    break;
                }
            }
        }
    }

    result.len()
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let mut grid: Vec<Vec<i32>> = vec![];

    for line in input.lines() {
        grid.push(
            line.chars()
                .map(|ch| ch.to_digit(10).unwrap() as i32)
                .collect(),
        );
    }

    let height = grid.len();
    let width = grid[0].len();
    let mut result = 0;

    for i in 0..height {
        for j in 0..width {
            let current_tree = grid[i][j];

            let mut left_score = 0;
            if j > 0 {
                for a in (0..=(j - 1)).rev() {
                    left_score += 1;
                    if current_tree <= grid[i][a] {
                        break;
                    }
                }
            }

            let mut right_score = 0;
            for a in (j + 1)..width {
                right_score += 1;
                if current_tree <= grid[i][a] {
                    break;
                }
            }

            let mut top_score = 0;
            if i > 0 {
                for a in (0..=(i - 1)).rev() {
                    top_score += 1;
                    if current_tree <= grid[a][j] {
                        break;
                    }
                }
            }

            let mut bottom_score = 0;
            #[allow(clippy::all)]
            for a in (i + 1)..height {
                bottom_score += 1;
                if current_tree <= grid[a][j] {
                    break;
                }
            }

            result = i32::max(result, left_score * right_score * top_score * bottom_score);
        }
    }

    result
}
