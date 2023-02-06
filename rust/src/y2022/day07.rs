use std::collections::{HashMap, HashSet};

fn parse(input: &str) -> HashMap<String, i32> {
    let mut folders = HashMap::new();
    let mut current_path = "".to_string();

    for line in input.lines() {
        if let Some(dir_name) = line.strip_prefix("$ cd ") {
            if dir_name == ".." {
                current_path = cut_last_folder(&current_path);
            } else if dir_name == "/" {
                current_path = "/".to_string();
            } else {
                current_path.push_str(&format!("{dir_name}/"));
            }
            if !folders.contains_key(&current_path) {
                folders.insert(current_path.clone(), 0);
            }
        } else {
            let file_size = line.split_once(' ').unwrap().0.parse::<i32>().unwrap_or(0);

            if file_size > 0 {
                let mut dir = current_path.clone();

                while !dir.is_empty() {
                    folders
                        .entry(dir.clone()) // todo "clone()" looks wrong
                        .and_modify(|size| *size += file_size);
                    dir = cut_last_folder(&dir);
                }
            }
        }
    }
    folders
}

pub fn naive_js_copy_part1(input: &str) -> i32 {
    parse(input).values().filter(|size| **size <= 100_000).sum()
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let folders = parse(input);

    let free_space = 70_000_000 - folders.get("/").unwrap();
    let need_to_delete = 30_000_000 - free_space;

    let mut folders_to_delete = folders
        .values()
        .filter(|size| **size > need_to_delete)
        .map(|size| *size - need_to_delete)
        .collect::<Vec<i32>>();

    folders_to_delete.sort();
    folders_to_delete.first().unwrap() + need_to_delete
}

fn cut_last_folder(path: &str) -> String {
    if path == "/" {
        return "".to_string();
    }

    let mut arr = Vec::from_iter(path.split('/'));
    arr.pop();
    arr.pop();

    let mut res = arr.join("/");

    if !res.is_empty() && !res.ends_with('/') {
        res.push('/');
    }

    if res.is_empty() {
        "/".to_string()
    } else {
        res
    }
}
