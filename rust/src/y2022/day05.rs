fn parse_state(input: &str) -> Vec<Vec<char>> {
    let mut state: Vec<Vec<char>> = vec![];
    let mut indexes = vec![];

    let mut lines = Vec::from_iter(input.lines());
    lines.reverse();

    for (i, ch) in lines.first().unwrap().chars().enumerate() {
        if ch.is_numeric() {
            indexes.push(i);
            state.push(vec![]);
        }
    }

    for line in lines.iter().skip(1) {
        let line = Vec::from_iter(line.chars());

        for (i, col) in indexes.iter().enumerate() {
            let char = line[*col];
            if char.is_alphabetic() {
                state[i].push(char);
            }
        }
    }

    state.insert(0, vec![]);
    for col in state.iter_mut() {
        col.reverse()
    }

    state
}

pub fn naive_js_copy_part1(input: &str) -> String {
    let (state, steps) = input.split_once("\n\n").unwrap();

    let mut state = parse_state(state);

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
    let (state, steps) = input.split_once("\n\n").unwrap();

    let mut state = parse_state(state);
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
