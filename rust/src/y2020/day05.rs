pub fn part1(input: &str) -> usize {
    input.lines().map(get_seat_id).max().unwrap()
}

pub fn part1_hacky(input: &str) -> usize {
    input.lines().map(get_seat_id_hacky).max().unwrap()
}

pub fn part2(input: &str) -> usize {
    let mut lines = input.lines();

    let id = get_seat_id(lines.next().unwrap());

    let mut min = id;
    let mut max = id;
    let mut total = id;
    let mut n = 1;

    for line in lines {
        let id = get_seat_id(line);

        total += id;
        n += 1;

        min = usize::min(min, id);
        max = usize::max(max, id);
    }

    let expected_total = (min + max) * (n + 1) / 2;

    expected_total - total
}

pub fn part2_sort(input: &str) -> usize {
    let mut ids = input.lines().map(get_seat_id).collect::<Vec<_>>();
    ids.sort();

    let mut prev = ids[0];
    for id in ids.iter().skip(1) {
        if *id - prev == 2 {
            return prev + 1;
        }
        prev = *id;
    }

    unreachable!();
}

pub fn part2_sort_unstable(input: &str) -> usize {
    let mut ids = input.lines().map(get_seat_id).collect::<Vec<_>>();
    ids.sort_unstable();

    let mut prev = ids[0];
    for id in ids.iter().skip(1) {
        if *id - prev == 2 {
            return prev + 1;
        }
        prev = *id;
    }

    unreachable!();
}

fn get_seat_id(code: &str) -> usize {
    let row = code[..7]
        .as_bytes()
        .iter()
        .fold(0, |acc, char| (acc << 1) + (*char == b'B') as usize);

    let col = code[7..]
        .as_bytes()
        .iter()
        .fold(0, |acc, char| (acc << 1) + (*char == b'R') as usize);

    row * 8 + col
}

fn get_seat_id_hacky(code: &str) -> usize {
    // nice move (from https://github.com/timvisee/advent-of-code-2020/blob/master/day05a/src/main.rs)
    return code
        .as_bytes()
        .iter()
        .fold(0, |id, b| (id << 1) | ((!b & 4) as usize >> 2));
}
