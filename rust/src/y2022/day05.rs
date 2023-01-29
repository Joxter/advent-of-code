pub fn naive_js_copy_part1(input: &str) -> String {
    // todo remove hardcode
    let (_, steps) = input.split_once("\n\n").unwrap();

    let steps: Vec<(usize, usize, usize)> = steps
        .lines()
        .map(|line| {
            let parts = line.split(" ").collect::<Vec<&str>>();

            return (
                parts[1].parse::<usize>().unwrap(),
                parts[3].parse::<usize>().unwrap(),
                parts[5].parse::<usize>().unwrap(),
            );
        })
        .collect();

    let mut state = vec![
        vec![],
        vec!['H', 'L', 'R', 'F', 'B', 'C', 'J', 'M'],
        vec!['D', 'C', 'Z'],
        vec!['W', 'G', 'N', 'C', 'F', 'J', 'H'],
        vec!['B', 'S', 'T', 'M', 'D', 'J', 'P'],
        vec!['J', 'R', 'D', 'C', 'N'],
        vec!['Z', 'G', 'J', 'P', 'Q', 'D', 'L', 'W'],
        vec!['H', 'R', 'F', 'T', 'Z', 'P'],
        vec!['G', 'M', 'V', 'L'],
        vec!['J', 'R', 'Q', 'F', 'P', 'G', 'B', 'C'],
    ];

    for (crates, from, to) in steps {
        let mut taken = state[from][0..crates].to_vec();
        taken.reverse();
        state[from] = state[from][crates..].to_vec();
        taken.append(&mut state[to]);
        state[to] = taken;
    }

    state
        .iter()
        .skip(1)
        .map(|row| row.first().unwrap())
        .collect::<String>()
}

pub fn naive_js_copy_part2(input: &str) -> String {
    // todo remove hardcode
    let (_, steps) = input.split_once("\n\n").unwrap();

    let steps: Vec<(usize, usize, usize)> = steps
        .lines()
        .map(|line| {
            let parts = line.split(" ").collect::<Vec<&str>>();

            return (
                parts[1].parse::<usize>().unwrap(),
                parts[3].parse::<usize>().unwrap(),
                parts[5].parse::<usize>().unwrap(),
            );
        })
        .collect();

    let mut state = vec![
        vec![],
        vec!['H', 'L', 'R', 'F', 'B', 'C', 'J', 'M'],
        vec!['D', 'C', 'Z'],
        vec!['W', 'G', 'N', 'C', 'F', 'J', 'H'],
        vec!['B', 'S', 'T', 'M', 'D', 'J', 'P'],
        vec!['J', 'R', 'D', 'C', 'N'],
        vec!['Z', 'G', 'J', 'P', 'Q', 'D', 'L', 'W'],
        vec!['H', 'R', 'F', 'T', 'Z', 'P'],
        vec!['G', 'M', 'V', 'L'],
        vec!['J', 'R', 'Q', 'F', 'P', 'G', 'B', 'C'],
    ];

    for (crates, from, to) in steps {
        let mut taken = state[from][0..crates].to_vec();
        state[from] = state[from][crates..].to_vec();
        taken.append(&mut state[to]);
        state[to] = taken;
    }

    state
        .iter()
        .skip(1)
        .map(|row| row.first().unwrap())
        .collect::<String>()
}
