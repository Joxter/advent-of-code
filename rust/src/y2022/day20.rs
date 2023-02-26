use std::ops::Index;

#[derive(Clone)]
struct Item {
    val: i64,
    original: i64,
}

pub fn naive_js_copy_part1(input: &str) -> i64 {
    let mut arr = Vec::from_iter(input.lines().enumerate().map(|(i, line)| Item {
        val: line.parse::<i64>().unwrap(),
        original: i as i64,
    }));

    let arr_len = arr.len();

    for i in 0..arr_len {
        mix(&mut arr, i as i64);
    }

    let zero_index = arr.iter().position(|it| it.val == 0).unwrap();

    let a = arr[(zero_index + 1000) % arr_len].val;
    let b = arr[(zero_index + 2000) % arr_len].val;
    let c = arr[(zero_index + 3000) % arr_len].val;

    a + b + c
}

pub fn naive_js_copy_part2(input: &str) -> i64 {
    let mut arr = Vec::from_iter(input.lines().enumerate().map(|(i, line)| Item {
        val: line.parse::<i64>().unwrap() * 811589153,
        original: i as i64,
    }));

    let arr_len = arr.len();

    for _ in 1..=10 {
        for i in 0..arr_len {
            mix(&mut arr, i as i64);
        }
    }

    let zero_index = arr.iter().position(|it| it.val == 0).unwrap();

    let a = arr[(zero_index + 1000) % arr_len].val;
    let b = arr[(zero_index + 2000) % arr_len].val;
    let c = arr[(zero_index + 3000) % arr_len].val;

    a + b + c
}

fn mix(arr: &mut Vec<Item>, original: i64) {
    let target_index = arr.iter().position(|it| it.original == original).unwrap();
    let target = arr[target_index].clone();

    if target.val == 0 {
        return;
    }

    arr.remove(target_index);

    if target.val > 0 {
        let first_line_offset = arr.len() - target_index;
        let new_index =
            (target.val - first_line_offset as i64 + arr.len() as i64) % arr.len() as i64;
        arr.insert(new_index as usize, target);
    } else {
        let first_line_offset = target_index;

        let new_index = if -target.val < first_line_offset as i64 {
            first_line_offset as i64 - -target.val
        } else {
            arr.len() as i64 - (-target.val - first_line_offset as i64) % arr.len() as i64
        };
        arr.insert(new_index as usize, target);
    }
}
