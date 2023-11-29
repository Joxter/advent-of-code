pub fn part1(input: &str) -> u32 {
    let mut total = 0;

    for group in input.split("\n\n") {
        let mut mask = 0;

        for ans in group.lines() {
            mask |= get_mask(ans);
        }

        total += mask.count_ones();
    }

    total
}

pub fn part1_iter(input: &str) -> u32 {
    input
        .split("\n\n")
        .map(|group| {
            group
                .lines()
                .fold(0, |mask, ans| {
                    //
                    mask | get_mask(ans)
                })
                .count_ones()
        })
        .sum()
}

pub fn part2(input: &str) -> u32 {
    let mut total = 0;

    for group in input.split("\n\n") {
        let mut mask = (1 << 27) - 1;

        for ans in group.lines() {
            mask &= get_mask(ans);
        }

        total += mask.count_ones();
    }

    total
}

fn get_mask(ans: &str) -> u32 {
    let mut mask = 0;

    for byte in ans.bytes() {
        mask |= 1 << (byte - b'a');
    }

    mask
}
