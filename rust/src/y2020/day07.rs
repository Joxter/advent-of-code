use std::collections::{HashMap, HashSet};

pub fn part1(input: &str) -> usize {
    let mut rules: HashMap<String, HashMap<String, i32>> = HashMap::new();

    for line in input.lines() {
        let (parent_bag, inner_bags) = parse_line(line);

        for inner_bag in inner_bags {
            rules
                .entry(inner_bag.name.to_string())
                .or_default()
                .insert(parent_bag.to_string(), inner_bag.count);
        }
    }

    let mut can_contains: Vec<&String> = rules.get("shiny gold").unwrap().keys().collect();

    let mut result = HashSet::new();
    result.extend(can_contains.clone());

    while let Some(name) = can_contains.pop() {
        if let Some(parents) = rules.get(name) {
            can_contains.extend(parents.keys());
            result.extend(parents.keys());
        }
    }

    result.len()
}

pub fn part2(input: &str) -> i32 {
    let mut rules: HashMap<String, HashMap<String, i32>> = HashMap::new();

    for line in input.lines() {
        let (parent_bag, inner_bags) = parse_line(line);

        for inner_bag in inner_bags {
            rules
                .entry(parent_bag.to_string())
                .or_default()
                .insert(inner_bag.name.to_string(), inner_bag.count);
        }
    }

    count_bags(&rules, "shiny gold")
}

fn count_bags(rules: &HashMap<String, HashMap<String, i32>>, name: &str) -> i32 {
    match rules.get(name) {
        Some(bag) => bag
            .iter()
            .map(|(new_name, cnt)| count_bags(rules, new_name) * cnt + cnt)
            .sum(),
        _ => 0,
    }
}

struct BagCnt {
    name: String,
    count: i32,
}

fn parse_line(line: &str) -> (String, Vec<BagCnt>) {
    let words: Vec<&str> = line.split_whitespace().collect();

    let name = format!("{} {}", words[0], words[1]);
    let mut bags = vec![];

    if words.len() == 7 {
        return (name, bags);
    }

    let mut i = 4;
    while i < words.len() {
        bags.push(BagCnt {
            name: format!("{} {}", words[i + 1], words[i + 2]),
            count: words[i].parse::<i32>().unwrap(),
        });
        i += 4;
    }

    (name, bags)
}
