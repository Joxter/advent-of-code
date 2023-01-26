pub fn naive_js_copy_part1(input: &str) -> i32 {
    input
        .lines()
        .filter(|line| {
            let (a, b) = line.split_once(',').unwrap();
            let (a1, a2) = a.split_once('-').unwrap();
            let (b1, b2) = b.split_once('-').unwrap();
            let a1 = a1.parse::<i32>().unwrap();
            let a2 = a2.parse::<i32>().unwrap();
            let b1 = b1.parse::<i32>().unwrap();
            let b2 = b2.parse::<i32>().unwrap();

            return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2);
        })
        .count() as i32
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    input
        .lines()
        .filter(|line| {
            let (a, b) = line.split_once(',').unwrap();
            let (a1, a2) = a.split_once('-').unwrap();
            let (b1, b2) = b.split_once('-').unwrap();
            let a1 = a1.parse::<i32>().unwrap();
            let a2 = a2.parse::<i32>().unwrap();
            let b1 = b1.parse::<i32>().unwrap();
            let b2 = b2.parse::<i32>().unwrap();

            return a2 >= b1 && b2 >= a1;
        })
        .count() as i32
}
