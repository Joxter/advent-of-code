pub fn naive_js_copy_part1(input: &str) -> usize {
    let commands = parse_commands(input);
    let signal_strength = [20, 60, 100, 140, 180, 220];

    let mut x_value = 1;
    let mut tick = 0;
    let mut result = 0;

    signal_strength.into_iter().for_each(|strength| {
        while tick < (strength - 1) {
            x_value += commands[tick];
            tick += 1;
        }
        result += strength * (x_value as usize);
    });

    result
}

pub fn naive_js_copy_part2(input: &str) -> String {
    let commands = parse_commands(input);
    let signal_strength = [40, 80, 120, 160, 200, 240];

    let mut x_value = 1;
    let mut tick = 0;
    let mut result: Vec<String> = vec![];

    signal_strength.into_iter().for_each(|strength| {
        let mut res_line = "".to_string();

        for i in (strength - 40)..strength {
            if i - 1 <= x_value && i + 1 >= x_value {
                res_line.push('#')
            } else {
                res_line.push('.')
            }
            x_value += commands[tick];
            tick += 1;
        }

        x_value += 40;
        result.push(res_line);
    });

    result.join("\n")
}

fn parse_commands(input: &str) -> Vec<i32> {
    let mut commands = Vec::new();
    input.lines().for_each(|line| {
        commands.push(0);

        if let Some((command, value)) = line.split_once(' ') {
            if command == "addx" {
                commands.push(value.parse::<i32>().unwrap());
            }
        }
    });

    commands
}
