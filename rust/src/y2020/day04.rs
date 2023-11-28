pub fn part1(input: &str) -> usize {
    input
        .split("\n\n")
        .filter(|s| is_valid_password_1(s))
        .count()
}

pub fn part2(input: &str) -> usize {
    input
        .split("\n\n")
        .filter(|s| is_valid_password_2(s))
        .count()
}

fn is_valid_password_1(raw: &str) -> bool {
    let mut cnt = 0;
    let mut cid = false;

    for part in raw.split_whitespace() {
        let (key, _) = part.split_once(':').unwrap();

        match key {
            "byr" | "iyr" | "eyr" | "hgt" | "hcl" | "ecl" | "pid" => cnt += 1,
            "cid" => {
                cid = true;
                cnt += 1
            }
            _ => (),
        }
    }

    cnt == 8 || cnt == 7 && !cid
}

fn is_valid_password_2(raw: &str) -> bool {
    let mut cnt = 0;

    for part in raw.split_whitespace() {
        let (key, val) = part.split_once(':').unwrap();

        match key {
            "byr" => match val.parse::<i32>() {
                Ok(num) if (1920..=2002).contains(&num) => cnt += 1,
                _ => return false,
            },
            "iyr" => match val.parse::<i32>() {
                Ok(num) if (2010..=2020).contains(&num) => cnt += 1,
                _ => return false,
            },
            "eyr" => match val.parse::<i32>() {
                Ok(num) if (2020..=2030).contains(&num) => cnt += 1,
                _ => return false,
            },
            "hgt" => {
                if let Some(num) = val.strip_suffix("cm") {
                    match num.parse::<i32>() {
                        Ok(num) if (150..=193).contains(&num) => cnt += 1,
                        _ => return false,
                    }
                } else if let Some(num) = val.strip_suffix("in") {
                    match num.parse::<i32>() {
                        Ok(num) if (59..=76).contains(&num) => cnt += 1,
                        _ => return false,
                    }
                } else {
                    return false;
                }
            }
            "hcl" => {
                let chars = val.as_bytes();

                // println!("{}", val);
                if chars.len() == 7 {
                    // println!("1 {}",chars[0] == b'#');
                    if chars[0] == b'#' {
                        for c in &chars[1..] {
                            if !c.is_ascii_hexdigit() {
                                return false;
                            }
                        }
                        cnt += 1;
                        continue;
                        // println!("OK");
                    }
                    // println!("2");
                }
                // println!("ERR");
                return false;
            }
            "ecl" => match val {
                "amb" | "blu" | "brn" | "gry" | "grn" | "hzl" | "oth" => cnt += 1,
                _ => return false,
            },
            "pid" => {
                if val.len() == 9 {
                    for c in val.as_bytes() {
                        if !c.is_ascii_digit() {
                            return false;
                        }
                    }
                    cnt += 1;
                    continue;
                    // println!("OK");
                }
                return false;
            }
            _ => (),
        }
    }

    cnt == 7
}

pub mod not_my {
    use itertools::Itertools;
    use std::collections::HashSet;

    const REQ_FIELDS: [&str; 7] = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

    pub fn part1_timvisee(input: &str) -> usize {
        input
            .split("\n\n")
            .map(|fields| {
                fields
                    .split_ascii_whitespace()
                    .map(|field| field.split(':').next().unwrap())
                    .collect::<HashSet<_>>()
            })
            .filter(|passport| REQ_FIELDS.iter().all(|item| passport.contains(item)))
            .count()
    }

    pub fn part1_timvisee_vec(input: &str) -> usize {
        input
            .split("\n\n")
            .map(|fields| {
                fields
                    .split_ascii_whitespace()
                    .map(|field| field.split(':').next().unwrap())
                    .collect_vec()
            })
            .filter(|passport| REQ_FIELDS.iter().all(|item| passport.contains(item)))
            .count()
    }
}
