use std::collections::HashSet;

pub fn naive_js_copy_part1(input: &str) -> i32 {
    // TODO wtf??? wrong answer
    input
        .lines()
        .map(|line| {
            let mut first_part = HashSet::new();
            let line: Vec<_> = line.chars().collect();

            for i in 1..(line.len() / 2) {
                first_part.insert(line[i]);
            }

            for i in (line.len() / 2)..line.len() {
                if first_part.contains(&line[i]) {
                    return if line[i].is_uppercase() {
                        (line[i] as i32) - 38
                    } else {
                        (line[i] as i32) - 96
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
